// src/services/api/apiClient.ts

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG, RETRY_CONFIG, REQUEST_HEADERS, ERROR_MESSAGES } from '../../config/api.config';

class ApiClient {
  private client: AxiosInstance;
  private requestCount = 0;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: REQUEST_HEADERS,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        this.requestCount++;
        
        if (API_CONFIG.LOG_LEVEL === 'debug') {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }

        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        this.requestCount--;
        
        if (API_CONFIG.LOG_LEVEL === 'debug') {
          console.log(`[API] Response from ${response.config.url}:`, response.data);
        }

        return response;
      },
      async (error: AxiosError) => {
        this.requestCount--;

        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }

        if (error.response?.status === 429) {
          // Too many requests - implement backoff
          console.warn('[API] Rate limited. Backing off...');
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private async retryRequest<T>(
    fn: () => Promise<AxiosResponse<T>>,
    attempt = 0
  ): Promise<T> {
    try {
      const response = await fn();
      return response.data;
    } catch (error) {
      if (
        attempt < RETRY_CONFIG.maxRetries &&
        this.isRetryableError(error as AxiosError)
      ) {
        const delay =
          RETRY_CONFIG.initialDelayMs *
          Math.pow(RETRY_CONFIG.backoffMultiplier, attempt);

        console.log(`[API] Retrying after ${delay}ms (attempt ${attempt + 1})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retryRequest(fn, attempt + 1);
      }

      throw error;
    }
  }

  private isRetryableError(error: AxiosError): boolean {
    const retryableStatuses = [408, 429, 500, 502, 503, 504];
    return retryableStatuses.includes(error.response?.status || 0);
  }

  private handleError(error: AxiosError): Error {
    let message = ERROR_MESSAGES.SERVER_ERROR;

    if (error.message === 'Network Error') {
      message = ERROR_MESSAGES.NETWORK_ERROR;
    } else if (error.code === 'ECONNABORTED') {
      message = ERROR_MESSAGES.TIMEOUT;
    } else if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 400:
          message = data?.message || ERROR_MESSAGES.BAD_REQUEST;
          break;
        case 401:
          message = ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case 403:
          message = ERROR_MESSAGES.FORBIDDEN;
          break;
        case 404:
          message = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 422:
          message = ERROR_MESSAGES.VALIDATION_ERROR;
          break;
        default:
          message = data?.message || ERROR_MESSAGES.SERVER_ERROR;
      }
    }

    const error_obj = new Error(message);
    (error_obj as any).statusCode = error.response?.status;
    (error_obj as any).details = error.response?.data;

    return error_obj;
  }

  async get<T>(url: string, config = {}): Promise<T> {
    return this.retryRequest(() =>
      this.client.get<T>(url, config)
    );
  }

  async post<T>(url: string, data?: any, config = {}): Promise<T> {
    return this.retryRequest(() =>
      this.client.post<T>(url, data, config)
    );
  }

  async put<T>(url: string, data?: any, config = {}): Promise<T> {
    return this.retryRequest(() =>
      this.client.put<T>(url, data, config)
    );
  }

  async patch<T>(url: string, data?: any, config = {}): Promise<T> {
    return this.retryRequest(() =>
      this.client.patch<T>(url, data, config)
    );
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    return this.retryRequest(() =>
      this.client.delete<T>(url, config)
    );
  }

  isLoading(): boolean {
    return this.requestCount > 0;
  }
}

export const apiClient = new ApiClient();
