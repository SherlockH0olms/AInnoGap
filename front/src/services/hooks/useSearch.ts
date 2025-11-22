// src/services/hooks/useSearch.ts

import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { searchApi } from '../api/searchApi';
import { SearchRequest, SearchResponse } from '../../types/search.types';

/**
 * Hook for performing market gap search
 */
export const useSearch = (
  options?: UseMutationOptions<SearchResponse, Error, SearchRequest>
) => {
  return useMutation<SearchResponse, Error, SearchRequest>({
    mutationFn: async (request: SearchRequest) => {
      return searchApi.search(request);
    },
    ...options,
  });
};

/**
 * Hook for fetching search details
 */
export const useSearchDetail = (
  searchId: string | null,
  options?: UseQueryOptions<SearchResponse>
) => {
  return useQuery<SearchResponse>({
    queryKey: ['search', searchId],
    queryFn: () => {
      if (!searchId) throw new Error('Search ID is required');
      return searchApi.getSearchDetail(searchId);
    },
    enabled: !!searchId,
    ...options,
  });
};

/**
 * Hook for fetching search history
 */
export const useSearchHistory = (
  limit: number = 10,
  options?: UseQueryOptions<SearchResponse[]>
) => {
  return useQuery<SearchResponse[]>({
    queryKey: ['searchHistory', limit],
    queryFn: () => searchApi.getSearchHistory(limit),
    ...options,
  });
};

/**
 * Hook for filtering search results
 */
export const useFilterResults = (
  options?: UseMutationOptions<any[], Error, { searchId: string; filters: any }>
) => {
  return useMutation<any[], Error, { searchId: string; filters: any }>({
    mutationFn: ({ searchId, filters }) =>
      searchApi.filterResults(searchId, filters),
    ...options,
  });
};

/**
 * Hook for exporting search results
 */
export const useExportResults = (
  options?: UseMutationOptions<Blob, Error, { searchId: string; format: 'csv' | 'json' | 'pdf' }>
) => {
  return useMutation<Blob, Error, { searchId: string; format: 'csv' | 'json' | 'pdf' }>({
    mutationFn: ({ searchId, format }) =>
      searchApi.exportResults(searchId, format),
    ...options,
  });
};
