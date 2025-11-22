// src/types/search.types.ts

export interface SearchRequest {
  niche: string;
  description?: string;
  filters?: SearchFilters;
}

export interface SearchFilters {
  sources?: DataSource[];
  dateRange?: {
    from: string;
    to: string;
  };
  minEngagement?: number;
  maxResults?: number;
}

export interface SearchResponse {
  id: string;
  query: string;
  resultsCount: number;
  results: SearchResult[];
  timestamp: string;
  processingTime: number;
  status: 'completed' | 'processing' | 'failed';
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  source: DataSource;
  url: string;
  engagement: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
  imageUrl?: string;
}

export interface PaginatedResults {
  content: SearchResult[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

export type DataSource =
  | 'Product Hunt'
  | 'GitHub'
  | 'Hacker News'
  | 'Reddit'
  | 'Stack Overflow'
  | 'Medium'
  | 'Dev.to'
  | 'Twitter/X'
  | 'Indie Hackers';

export const DATA_SOURCES: DataSource[] = [
  'Product Hunt',
  'GitHub',
  'Hacker News',
  'Reddit',
  'Stack Overflow',
  'Medium',
  'Dev.to',
  'Twitter/X',
  'Indie Hackers',
];
