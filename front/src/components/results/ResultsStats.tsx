// src/components/Results/ResultsStats.tsx

import React from 'react';
import { SearchResponse } from '../../types/search.types';
import { BarChart3, Zap, Clock } from 'lucide-react';

interface ResultsStatsProps {
  results: SearchResponse;
}

const ResultsStats: React.FC<ResultsStatsProps> = ({ results }) => {
  const sourceCount = new Set(results.results.map((r) => r.source)).size;
  const avgEngagement =
    results.results.length > 0
      ? Math.round(
          results.results.reduce((sum, r) => sum + r.engagement, 0) /
            results.results.length
        )
      : 0;

  const stats = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Results Found',
      value: results.resultsCount,
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Data Sources',
      value: sourceCount,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Processing Time',
      value: `${Math.round(results.processingTime / 1000)}s`,
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Avg Engagement',
      value: avgEngagement,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-lg p-4 text-center"
        >
          <div className="text-blue-600 mb-2 flex justify-center">{stat.icon}</div>
          <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsStats;
