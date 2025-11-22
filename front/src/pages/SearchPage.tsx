// src/pages/SearchPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SearchForm from '../components/Search/SearchForm';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useSearch } from '../services/hooks/useSearch';
import { SearchRequest } from '../types/search.types';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: search, isPending, error } = useSearch({
    onSuccess: (data) => {
      toast.success('Search completed!');
      navigate(`/results/${data.id}`, { state: { results: data } });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Search failed');
    },
  });

  const handleSearch = (request: SearchRequest) => {
    search(request);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          Find Your Market Gap
        </h1>
        <p className="text-xl text-slate-600">
          Enter your niche and let AI search across 8+ platforms to find market opportunities
        </p>
      </div>

      {/* Search Form */}
      {isPending ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner text="Searching market gap... This may take a minute" />
        </div>
      ) : (
        <SearchForm onSubmit={handleSearch} isLoading={isPending} />
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-semibold mb-2">Search Failed</p>
          <p className="text-red-600">{(error as any).message}</p>
        </div>
      )}

      {/* Information Box */}
      {!isPending && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-4">💡 Tips for Better Results</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>✓ Be specific with your niche (e.g., "AI customer support for SMBs")</li>
            <li>✓ Add context about your target market in the description</li>
            <li>✓ Focus on problems you want to solve</li>
            <li>✓ The more detail you provide, the better our AI analysis</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
