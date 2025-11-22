// src/types/gap.types.ts

export interface GapAnalysisRequest {
  searchId: string;
  niche: string;
  results: any[];
}

export interface GapAnalysisResponse {
  id: string;
  searchId: string;
  gaps: MarketGap[];
  summary: string;
  confidence: number;
  analysisDate: string;
  totalOpportunities: number;
}

export interface MarketGap {
  id: string;
  title: string;
  description: string;
  reason: string;
  marketSize: string;
  competition: CompetitionLevel;
  opportunity: string;
  targetAudience: string;
  estimatedRevenue: string;
  riskFactors: string[];
  validationSources: string[];
  confidence: number;
  tags: string[];
}

export interface GapDetail extends MarketGap {
  competitors: Competitor[];
  targetMarketMetrics: MarketMetrics;
  entryBarriers: string[];
  successFactors: string[];
  relatedTrends: string[];
}

export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  marketPosition: string;
  url?: string;
}

export interface MarketMetrics {
  potentialMarketSize: string;
  growthRate: string;
  customerAcquisitionCost: string;
  lifetimeValue: string;
  breakEvenMonths: number;
}

export type CompetitionLevel = 'Low' | 'Medium' | 'High' | 'Very High';

export interface GapFilter {
  competitionLevel?: CompetitionLevel[];
  minConfidence?: number;
  tags?: string[];
  marketSizeRange?: {
    min: string;
    max: string;
  };
}
