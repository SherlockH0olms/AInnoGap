// src/components/Search/SearchForm.tsx

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SearchRequest } from '../../types/search.types';

interface SearchFormProps {
  onSubmit: (request: SearchRequest) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, isLoading }) => {
  const [niche, setNiche] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!niche.trim()) {
      newErrors.niche = 'Niche is required';
    } else if (niche.trim().length < 3) {
      newErrors.niche = 'Niche must be at least 3 characters';
    }

    if (description.trim().length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const request: SearchRequest = {
      niche: niche.trim(),
      description: description.trim() || undefined,
      filters: {
        maxResults: 50,
      },
    };

    onSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Niche Input */}
      <div className="space-y-2">
        <label htmlFor="niche" className="block font-semibold text-slate-900">
          What's your market niche? *
        </label>
        <input
          id="niche"
          type="text"
          placeholder="e.g., AI customer support for SMBs, sustainable packaging solutions"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          disabled={isLoading}
          maxLength={100}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
        />
        {errors.niche && (
          <p className="text-red-600 text-sm">{errors.niche}</p>
        )}
        <p className="text-xs text-slate-500">{niche.length}/100</p>
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label htmlFor="description" className="block font-semibold text-slate-900">
          Additional Context (Optional)
        </label>
        <textarea
          id="description"
          placeholder="Describe your target market, specific problems to solve, or features you're thinking about..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          maxLength={500}
          rows={5}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed resize-none"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description}</p>
        )}
        <p className="text-xs text-slate-500">{description.length}/500</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !niche.trim()}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        {isLoading ? 'Searching...' : 'Search Market Gaps'}
      </button>
    </form>
  );
};

export default SearchForm;
