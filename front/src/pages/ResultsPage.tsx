// src/pages/ResultsPage.tsx

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSearchDetail } from '../services/hooks/useSearch';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorAlert from '../components/Common/ErrorAlert';
import ResultsGrid from '../components/Results/ResultsGrid';
import ResultsStats from '../components/Results/ResultsStats';
import { ArrowRight } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const { searchId } = useParams<{ searchId: string }>();
  const { data: searchResults, isLoading, error } = useSearchDetail(searchId || null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner text="Loading search results..." />
      </div>
    );
  }

  if (error || !searchResults) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Error</h1>
        <ErrorAlert
          title="Failed to Load Results"
          message={(error as any)?.message || 'Could not load search results'}
        />
        <Link
          to="/search"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Another Search
        </Link>
      </div>
    );
  }

  const filteredResults = selectedSource
    ? searchResults.results.filter((r) => r.source === selectedSource)
    : searchResults.results;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Search Results
        </h1>
        <p className="text-slate-600">
          Query: <span className="font-semibold text-slate-900">"{searchResults.query}"</span>
        </p>
      </div>

      {/* Stats */}
      <ResultsStats results={searchResults} />

      {/* Source Filter */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Filter by Source</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSource(null)}
            className={`px-3 py-1 rounded-lg transition ${
              selectedSource === null
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            All ({searchResults.results.length})
          </button>
          {Array.from(new Set(searchResults.results.map((r) => r.source))).map(
            (source) => (
              <button
                key={source}
                onClick={() => setSelectedSource(source)}
                className={`px-3 py-1 rounded-lg transition ${
                  selectedSource === source
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {source} (
                {searchResults.results.filter((r) => r.source === source).length}
                )
              </button>
            )
          )}
        </div>
      </div>

      {/* Results Grid */}
      <ResultsGrid results={filteredResults} />

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-blue-900">Next Step</h3>
        <p className="text-blue-800">
          Ready to analyze these results for market gaps?
        </p>
        <Link
          to={`/analysis/${searchId}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Analyze for Market Gaps
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
