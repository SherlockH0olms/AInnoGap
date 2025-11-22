// src/components/GapAnalysis/GapCard.tsx

import React, { useState } from 'react';
import { MarketGap } from '../../types/gap.types';
import { ChevronDown, Zap, Users, TrendingUp } from 'lucide-react';

interface GapCardProps {
  gap: MarketGap;
  rank: number;
  onGenerateMVP: () => void;
  isGenerating: boolean;
}

const GapCard: React.FC<GapCardProps> = ({
  gap,
  rank,
  onGenerateMVP,
  isGenerating,
}) => {
  const [expanded, setExpanded] = useState(false);

  const competitionColors = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-red-100 text-red-800',
    'Very High': 'bg-red-200 text-red-900',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition">
      {/* Header */}
      <div
        className="p-6 cursor-pointer hover:bg-slate-50 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full font-bold text-sm">
              {rank}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {gap.title}
            </h3>
            <p className="text-slate-600 text-sm line-clamp-2">
              {gap.reason}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                competitionColors[gap.competition]
              }`}
            >
              {gap.competition}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 text-sm">
          <div className="flex items-center gap-1 text-slate-600">
            <TrendingUp className="w-4 h-4" />
            <span>Market: {gap.marketSize}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <Users className="w-4 h-4" />
            <span>{gap.targetAudience}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <Zap className="w-4 h-4" />
            <span>Rev: {gap.estimatedRevenue}</span>
          </div>
        </div>
      </div>

      {/* Details */}
      {expanded && (
        <div className="px-6 py-6 border-t border-slate-200 bg-slate-50 space-y-6">
          {/* Opportunity */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Opportunity</h4>
            <p className="text-slate-600 text-sm">{gap.opportunity}</p>
          </div>

          {/* Risk Factors */}
          {gap.riskFactors.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Risk Factors</h4>
              <ul className="space-y-1">
                {gap.riskFactors.map((risk, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-red-600">⚠️</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Validation Sources */}
          {gap.validationSources.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Validation Sources</h4>
              <div className="flex flex-wrap gap-2">
                {gap.validationSources.map((source, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Confidence */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900">Confidence Score</h4>
              <span className="text-sm font-bold text-blue-600">
                {(gap.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-300 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                style={{ width: `${gap.confidence * 100}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onGenerateMVP}
            disabled={isGenerating}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isGenerating ? 'Generating MVP...' : '🚀 Generate MVP Strategy'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GapCard;
