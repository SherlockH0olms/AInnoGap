// src/pages/AnalysisPage.tsx

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorAlert from '../components/Common/ErrorAlert';
import GapList from '../components/GapAnalysis/GapList';
import { useSearchDetail } from '../services/hooks/useSearch';
import { useAnalyzeGaps, useGenerateMVP } from '../services/hooks/useAnalysis';
import { GapAnalysisRequest } from '../types/gap.types';
import { ArrowLeft } from 'lucide-react';

const AnalysisPage: React.FC = () => {
  const { searchId } = useParams<{ searchId: string }>();
  const { data: searchResults, isLoading: searchLoading } = useSearchDetail(searchId || null);
  const { mutate: analyzeGaps, isPending: analyzing, data: analysisData } = useAnalyzeGaps({
    onSuccess: () => {
      toast.success('Gap analysis completed!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Analysis failed');
    },
  });

  const { mutate: generateMVP, isPending: generatingMVP } = useGenerateMVP({
    onSuccess: () => {
      toast.success('MVP strategy generated!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'MVP generation failed');
    },
  });

  // Trigger analysis on mount if we have search results
  useEffect(() => {
    if (searchResults && !analysisData) {
      const request: GapAnalysisRequest = {
        searchId: searchResults.id,
        niche: searchResults.query,
        results: searchResults.results,
      };
      analyzeGaps(request);
    }
  }, [searchResults, analysisData, analyzeGaps]);

  if (searchLoading || analyzing) {
    return (
      <div className="py-12">
        <LoadingSpinner text="Analyzing market gaps with AI... This may take a minute" />
      </div>
    );
  }

  if (!searchResults) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Error</h1>
        <ErrorAlert
          title="Failed to Load Search"
          message="Could not load the search results for analysis"
        />
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Analysis</h1>
        <ErrorAlert
          title="Analysis Not Available"
          message="The analysis could not be completed. Please try again."
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          to={`/results/${searchId}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Market Gap Analysis</h1>
        <p className="text-slate-600">
          Query: <span className="font-semibold">{searchResults.query}</span>
        </p>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Analysis Summary</h3>
        <p className="text-blue-800 mb-4">{analysisData.summary}</p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-blue-700">
            <span className="font-semibold">Confidence:</span> {(analysisData.confidence * 100).toFixed(0)}%
          </span>
          <span className="text-sm text-blue-700">
            <span className="font-semibold">Opportunities Found:</span> {analysisData.totalOpportunities}
          </span>
        </div>
      </div>

      {/* Gaps List */}
      <GapList
        gaps={analysisData.gaps}
        searchId={searchId!}
        onGenerateMVP={generateMVP}
        isGeneratingMVP={generatingMVP}
      />
    </div>
  );
};

export default AnalysisPage;
