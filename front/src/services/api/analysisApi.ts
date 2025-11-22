// src/services/api/analysisApi.ts

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../../config/api.config';
import {
  GapAnalysisRequest,
  GapAnalysisResponse,
  MarketGap,
  GapDetail,
} from '../../types/gap.types';
import {
  MVPGenerationRequest,
  MVPStrategy,
} from '../../types/mvp.types';

class AnalysisApiService {
  /**
   * Trigger gap analysis for search results
   */
  async analyzeGaps(request: GapAnalysisRequest): Promise<GapAnalysisResponse> {
    try {
      const response = await apiClient.post<GapAnalysisResponse>(
        API_ENDPOINTS.ANALYSIS,
        {
          searchId: request.searchId,
          niche: request.niche,
          results: request.results,
          timestamp: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error('Gap analysis API error:', error);
      throw error;
    }
  }

  /**
   * Get analysis details by search ID
   */
  async getAnalysisDetail(searchId: string): Promise<GapAnalysisResponse> {
    const url = API_ENDPOINTS.ANALYSIS_DETAIL.replace(':searchId', searchId);
    return apiClient.get<GapAnalysisResponse>(url);
  }

  /**
   * Get detailed information about a specific gap
   */
  async getGapDetail(gapId: string): Promise<GapDetail> {
    const url = API_ENDPOINTS.GAP_DETAIL.replace(':gapId', gapId);
    return apiClient.get<GapDetail>(url);
  }

  /**
   * Get all gaps from analysis
   */
  async getAllGaps(searchId: string): Promise<MarketGap[]> {
    const url = `${API_ENDPOINTS.ANALYSIS}/${searchId}/gaps`;
    return apiClient.get<MarketGap[]>(url);
  }

  /**
   * Validate gap by checking latest market data
   */
  async validateGap(gapId: string): Promise<{
    isValid: boolean;
    confidence: number;
    recentUpdates: string[];
  }> {
    const url = API_ENDPOINTS.GAP_VALIDATION.replace(':gapId', gapId);
    return apiClient.post(url, {
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Generate MVP strategy for a specific gap
   */
  async generateMVPStrategy(
    request: MVPGenerationRequest
  ): Promise<MVPStrategy> {
    try {
      const response = await apiClient.post<MVPStrategy>(
        API_ENDPOINTS.MVP_GENERATE,
        {
          gapId: request.gapId,
          niche: request.niche,
          marketGap: request.marketGap,
          timestamp: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error('MVP generation API error:', error);
      throw error;
    }
  }

  /**
   * Get MVP strategy for a gap
   */
  async getMVPStrategy(gapId: string): Promise<MVPStrategy> {
    const url = API_ENDPOINTS.MVP_DETAIL.replace(':gapId', gapId);
    return apiClient.get<MVPStrategy>(url);
  }

  /**
   * Export analysis as PDF
   */
  async exportAnalysisPDF(analysisId: string): Promise<Blob> {
    const url = API_ENDPOINTS.ANALYSIS_EXPORT.replace(':analysisId', analysisId);
    const response = await (apiClient as any).client.get(url, {
      responseType: 'blob',
    });
    return response.data;
  }

  /**
   * Export MVP strategy as document
   */
  async exportMVPStrategy(mvpId: string, format: 'pdf' | 'docx'): Promise<Blob> {
    const url = API_ENDPOINTS.MVP_EXPORT.replace(':mvpId', mvpId);
    const response = await (apiClient as any).client.get(url, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  }

  /**
   * Get analysis status
   */
  async getAnalysisStatus(analysisId: string): Promise<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    estimatedTimeRemaining: number;
    error?: string;
  }> {
    const url = `${API_ENDPOINTS.ANALYSIS}/${analysisId}/status`;
    return apiClient.get(url);
  }
}

export const analysisApi = new AnalysisApiService();
