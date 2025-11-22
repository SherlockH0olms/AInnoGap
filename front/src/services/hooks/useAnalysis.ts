// src/services/hooks/useAnalysis.ts

import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { analysisApi } from '../api/analysisApi';
import {
  GapAnalysisRequest,
  GapAnalysisResponse,
  GapDetail,
  MarketGap,
} from '../../types/gap.types';
import {
  MVPGenerationRequest,
  MVPStrategy,
} from '../../types/mvp.types';

/**
 * Hook for analyzing market gaps
 */
export const useAnalyzeGaps = (
  options?: UseMutationOptions<GapAnalysisResponse, Error, GapAnalysisRequest>
) => {
  return useMutation<GapAnalysisResponse, Error, GapAnalysisRequest>({
    mutationFn: (request: GapAnalysisRequest) =>
      analysisApi.analyzeGaps(request),
    ...options,
  });
};

/**
 * Hook for fetching analysis details
 */
export const useAnalysisDetail = (
  searchId: string | null,
  options?: UseQueryOptions<GapAnalysisResponse>
) => {
  return useQuery<GapAnalysisResponse>({
    queryKey: ['analysis', searchId],
    queryFn: () => {
      if (!searchId) throw new Error('Search ID is required');
      return analysisApi.getAnalysisDetail(searchId);
    },
    enabled: !!searchId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
};

/**
 * Hook for fetching gap details
 */
export const useGapDetail = (
  gapId: string | null,
  options?: UseQueryOptions<GapDetail>
) => {
  return useQuery<GapDetail>({
    queryKey: ['gap', gapId],
    queryFn: () => {
      if (!gapId) throw new Error('Gap ID is required');
      return analysisApi.getGapDetail(gapId);
    },
    enabled: !!gapId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
};

/**
 * Hook for fetching all gaps
 */
export const useAllGaps = (
  searchId: string | null,
  options?: UseQueryOptions<MarketGap[]>
) => {
  return useQuery<MarketGap[]>({
    queryKey: ['gaps', searchId],
    queryFn: () => {
      if (!searchId) throw new Error('Search ID is required');
      return analysisApi.getAllGaps(searchId);
    },
    enabled: !!searchId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
};

/**
 * Hook for validating gap
 */
export const useValidateGap = (
  options?: UseMutationOptions<
    { isValid: boolean; confidence: number; recentUpdates: string[] },
    Error,
    string
  >
) => {
  return useMutation<
    { isValid: boolean; confidence: number; recentUpdates: string[] },
    Error,
    string
  >({
    mutationFn: (gapId: string) => analysisApi.validateGap(gapId),
    ...options,
  });
};

/**
 * Hook for generating MVP strategy
 */
export const useGenerateMVP = (
  options?: UseMutationOptions<MVPStrategy, Error, MVPGenerationRequest>
) => {
  return useMutation<MVPStrategy, Error, MVPGenerationRequest>({
    mutationFn: (request: MVPGenerationRequest) =>
      analysisApi.generateMVPStrategy(request),
    ...options,
  });
};

/**
 * Hook for fetching MVP strategy
 */
export const useMVPStrategy = (
  gapId: string | null,
  options?: UseQueryOptions<MVPStrategy>
) => {
  return useQuery<MVPStrategy>({
    queryKey: ['mvp', gapId],
    queryFn: () => {
      if (!gapId) throw new Error('Gap ID is required');
      return analysisApi.getMVPStrategy(gapId);
    },
    enabled: !!gapId,
    staleTime: 1000 * 60 * 15, // 15 minutes
    ...options,
  });
};

/**
 * Hook for checking analysis status
 */
export const useAnalysisStatus = (
  analysisId: string | null,
  options?: UseQueryOptions<any>
) => {
  return useQuery<any>({
    queryKey: ['analysisStatus', analysisId],
    queryFn: () => {
      if (!analysisId) throw new Error('Analysis ID is required');
      return analysisApi.getAnalysisStatus(analysisId);
    },
    enabled: !!analysisId,
    refetchInterval: 2000, // Poll every 2 seconds
    ...options,
  });
};
