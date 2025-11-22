// src/components/GapAnalysis/GapList.tsx

import React from 'react';
import { MarketGap } from '../../types/gap.types';
import { MVPGenerationRequest } from '../../types/mvp.types';
import GapCard from './GapCard';

interface GapListProps {
  gaps: MarketGap[];
  searchId: string;
  onGenerateMVP: (request: MVPGenerationRequest) => void;
  isGeneratingMVP: boolean;
}

const GapList: React.FC<GapListProps> = ({
  gaps,
  searchId,
  onGenerateMVP,
  isGeneratingMVP,
}) => {
  if (gaps.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg">
        <p className="text-slate-600">No market gaps found for this search</p>
      </div>
    );
  }

  // Sort by opportunity score (combination of confidence and competition)
  const sortedGaps = [...gaps].sort((a, b) => {
    const scoreA = a.confidence * (b.competition === 'Low' ? 1.5 : b.competition === 'Medium' ? 1.2 : 1);
    const scoreB = b.confidence * (a.competition === 'Low' ? 1.5 : a.competition === 'Medium' ? 1.2 : 1);
    return scoreB - scoreA;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          {gaps.length} Market Gap{gaps.length !== 1 ? 's' : ''} Found
        </h2>
      </div>

      <div className="space-y-4">
        {sortedGaps.map((gap, index) => (
          <GapCard
            key={gap.id}
            gap={gap}
            rank={index + 1}
            onGenerateMVP={() =>
              onGenerateMVP({
                gapId: gap.id,
                niche: gap.title,
                marketGap: gap,
              })
            }
            isGenerating={isGeneratingMVP}
          />
        ))}
      </div>
    </div>
  );
};

export default GapList;
