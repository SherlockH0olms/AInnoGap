// src/pages/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Zap, BarChart3, Brain, Rocket } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Market Intelligence',
      description: 'Search across 8+ data sources in real-time',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Get AI-driven insights on market gaps',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Trend Detection',
      description: 'Identify emerging trends and opportunities',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Data Visualization',
      description: 'Beautiful charts and analytics',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'MVP Strategies',
      description: 'Get ready-to-implement MVP plans',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast & Reliable',
      description: 'Results in seconds, not hours',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="space-y-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Discover Your Next
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Market Opportunity
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Leverage AI and market research to identify profitable market gaps. Get comprehensive analysis and MVP strategies in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/search"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold text-center"
              >
                Start Searching
              </Link>
              <button className="px-6 py-3 border-2 border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition font-semibold">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 h-96 flex items-center justify-center border border-slate-200">
              <div className="text-center">
                <Search className="w-24 h-24 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to find and validate market opportunities
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg hover:border-blue-300 transition"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'Enter Niche', desc: 'Describe your market interest' },
            { num: '2', title: 'AI Search', desc: 'Search 8+ data sources' },
            { num: '3', title: 'Analysis', desc: 'Get gap insights' },
            { num: '4', title: 'MVP Plan', desc: 'Launch your idea' },
          ].map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                {step.num}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-white text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Find Your Market Gap?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Start your market research journey today and discover your next business opportunity
        </p>
        <Link
          to="/search"
          className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:shadow-lg transition font-semibold"
        >
          Begin Search
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
