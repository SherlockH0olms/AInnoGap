// src/components/Results/ResultCard.tsx

import React from 'react';
import { SearchResult } from '../../types/search.types';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      'Product Hunt': 'bg-orange-100 text-orange-700',
      'GitHub': 'bg-slate-100 text-slate-700',
      'Hacker News': 'bg-orange-50 text-orange-600',
      'Reddit': 'bg-red-50 text-red-600',
      'Stack Overflow': 'bg-amber-50 text-amber-600',
      'Medium': 'bg-slate-100 text-slate-600',
      'Dev.to': 'bg-black/5 text-slate-700',
      'Twitter/X': 'bg-slate-800 text-white',
      'Indie Hackers': 'bg-red-50 text-red-600',
    };
    return colors[source] || 'bg-slate-100 text-slate-700';
  };

  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-300 transition group"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition">
            {result.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-blue-600 transition" />
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3">
          {result.description}
        </p>

        {/* Source Badge */}
        <div className="flex items-center justify-between pt-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${getSourceColor(result.source)}`}>
            {result.source}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {result.engagement} engagements
          </div>
          <time>{new Date(result.createdAt).toLocaleDateString()}</time>
        </div>
      </div>
    </a>
  );
};

export default ResultCard;
