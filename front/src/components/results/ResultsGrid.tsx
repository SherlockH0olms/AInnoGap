// src/components/Results/ResultsGrid.tsx

import React from 'react';
import { SearchResult } from '../../types/search.types';
import ResultCard from './ResultCard';

interface ResultsGridProps {
  results: SearchResult[];
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg">
        <p className="text-slate-600">No results found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default ResultsGrid;
