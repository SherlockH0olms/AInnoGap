// src/services/api/searchApi.ts

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { 
  SearchRequest, 
  SearchResponse, 
  SearchResult,
  PaginatedResults 
} from '../../types/search.types';

class SearchApiService {
  /**
   * Perform a market gap search
   */
  async search(request: SearchRequest): Promise<SearchResponse> {
    try {
      const response = await apiClient.post<SearchResponse>(
        API_ENDPOINTS.SEARCH,
        {
          niche: request.niche,
          description: request.description,
          filters: request.filters,
          timestamp: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  }

  /**
   * Get search details by ID
   */
  async getSearchDetail(searchId: string): Promise<SearchResponse> {
    const url = API_ENDPOINTS.SEARCH_DETAIL.replace(':id', searchId);
    return apiClient.get<SearchResponse>(url);
  }

  /**
   * Get search results with pagination
   */
  async getSearchResults(
    searchId: string,
    pageNumber: number = 0,
    pageSize: number = 20
  ): Promise<PaginatedResults> {
    const url = `${API_ENDPOINTS.SEARCH}/${searchId}/results`;
    return apiClient.get<PaginatedResults>(
      url,
      {
        params: {
          page: pageNumber,
          size: pageSize,
        },
      }
    );
  }

  /**
   * Filter search results
   */
  async filterResults(
    searchId: string,
    filters: any
  ): Promise<SearchResult[]> {
    const url = `${API_ENDPOINTS.SEARCH}/${searchId}/filter`;
    return apiClient.post<SearchResult[]>(url, filters);
  }

  /**
   * Get search history
   */
  async getSearchHistory(limit: number = 10): Promise<SearchResponse[]> {
    return apiClient.get<SearchResponse[]>(
      API_ENDPOINTS.SEARCH_HISTORY,
      {
        params: { limit },
      }
    );
  }

  /**
   * Delete a search
   */
  async deleteSearch(searchId: string): Promise<void> {
    const url = API_ENDPOINTS.SEARCH_DETAIL.replace(':id', searchId);
    await apiClient.delete(url);
  }

  /**
   * Export search results
   */
  async exportResults(
    searchId: string,
    format: 'csv' | 'json' | 'pdf'
  ): Promise<Blob> {
    const url = `${API_ENDPOINTS.SEARCH}/${searchId}/export`;
    const response = await (apiClient as any).client.get(url, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  }
}

export const searchApi = new SearchApiService();
