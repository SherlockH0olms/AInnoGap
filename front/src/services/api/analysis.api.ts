import { n8nClient } from './client';
import { GapAnalysisResponse } from '../../types/gap.types';
import { MVPStrategy } from '../../types/mvp.types';
import { SearchResult } from '../../types/search.types';

export const analysisApi = {
  async analyzeGaps(
    niche: string,
    results: SearchResult[]
  ): Promise<GapAnalysisResponse> {
    try {
      if (!niche) {
        throw new Error('Niche is required for gap analysis');
      }

      if (!results || results.length === 0) {
        throw new Error('Search results are required for gap analysis');
      }

      const response = await n8nClient.post('/gap-analysis', {
        niche,
        results,
        timestamp: new Date().toISOString(),
      });

      if (!response.data) {
        throw new Error('No response data received from gap analysis API');
      }

      return response.data as GapAnalysisResponse;
    } catch (error) {
      console.error('Gap analysis API error:', error);
      throw error;
    }
  },

  async generateMVP(gapId: string): Promise<MVPStrategy> {
    try {
      if (!gapId) {
        throw new Error('Gap ID is required for MVP generation');
      }

      const response = await n8nClient.post('/mvp-generation', {
        gapId,
        timestamp: new Date().toISOString(),
      });

      if (!response.data) {
        throw new Error('No response data received from MVP generation API');
      }

      return response.data as MVPStrategy;
    } catch (error) {
      console.error('MVP generation API error:', error);
      throw error;
    }
  },
};
