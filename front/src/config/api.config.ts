// src/config/api.config.ts

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000'),
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'info',
};

export const API_ENDPOINTS = {
  // Search endpoints
  SEARCH: '/api/search',
  SEARCH_DETAIL: '/api/search/:id',
  SEARCH_HISTORY: '/api/search/history',

  // Analysis endpoints
  ANALYSIS: '/api/analysis',
  ANALYSIS_DETAIL: '/api/analysis/:searchId',
  ANALYSIS_EXPORT: '/api/analysis/:analysisId/export',

  // Gap endpoints
  GAPS: '/api/gaps',
  GAP_DETAIL: '/api/gaps/:gapId',
  GAP_VALIDATION: '/api/gaps/:gapId/validate',

  // MVP endpoints
  MVP_GENERATE: '/api/mvp/generate',
  MVP_DETAIL: '/api/mvp/:gapId',
  MVP_EXPORT: '/api/mvp/:mvpId/export',

  // System endpoints
  SOURCES: '/api/system/sources',
  HEALTH: '/api/health',
  STATUS: '/api/system/status',
};

export const RETRY_CONFIG = {
  maxRetries: 3,
  backoffMultiplier: 2,
  initialDelayMs: 1000,
};

export const CACHE_CONFIG = {
  SEARCH_RESULTS: 1000 * 60 * 5, // 5 minutes
  GAP_ANALYSIS: 1000 * 60 * 10, // 10 minutes
  MVP_STRATEGY: 1000 * 60 * 15, // 15 minutes
};

export const REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  BAD_REQUEST: 'Invalid request. Please check your input.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  TIMEOUT: 'Request timeout. The server took too long to respond.',
  VALIDATION_ERROR: 'Please fix the validation errors and try again.',
} as const;

export const SUCCESS_MESSAGES = {
  SEARCH_COMPLETED: 'Search completed successfully',
  ANALYSIS_COMPLETED: 'Analysis completed successfully',
  MVP_GENERATED: 'MVP strategy generated successfully',
  DATA_EXPORTED: 'Data exported successfully',
} as const;
