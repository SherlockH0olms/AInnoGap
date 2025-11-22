import { n8nClient } from './client';
import { SearchRequest, SearchResponse } from '../../types/search.types';

export const searchApi = {
  async triggerSearch(request: SearchRequest): Promise<SearchResponse> {
    try {
      if (!request.niche) {
        throw new Error('Niche is required for search');
      }

      const response = await n8nClient.post('/market-gap-search', {
        ...request,
        timestamp: new Date().toISOString(),
      });

      if (!response.data) {
        throw new Error('No response data received from search API');
      }

      return response.data as SearchResponse;
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  },
};
