import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
const N8N_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || '';

// Validate URLs
if (!N8N_URL || N8N_URL === 'https://your-n8n-webhook-url') {
  console.warn('Warning: N8N_WEBHOOK_URL is not configured. Please set REACT_APP_N8N_WEBHOOK_URL in .env');
}

export const backendClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const n8nClient = axios.create({
  baseURL: N8N_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Backend Error interceptor
backendClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Backend API Error:', error);
    
    if (error.response?.status === 404) {
      console.error('API endpoint not found:', error.config?.url);
      toast.error('API endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('Server error');
      toast.error('Server error occurred');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      toast.error('Request timeout - please try again');
    }
    
    return Promise.reject(error);
  }
);

// N8N Error interceptor
n8nClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('n8n API Error:', error);
    
    if (!N8N_URL || N8N_URL === 'https://your-n8n-webhook-url') {
      console.error('n8n webhook URL not configured');
      toast.error('n8n service not configured');
    } else if (error.response?.status === 404) {
      console.error('n8n webhook not found:', N8N_URL);
      toast.error('n8n webhook endpoint not found');
    } else if (error.code === 'ECONNABORTED') {
      console.error('n8n request timeout');
      toast.error('Analysis timeout - please try again');
    }
    
    return Promise.reject(error);
  }
);

// Request interceptor to add auth headers if needed
backendClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

n8nClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
