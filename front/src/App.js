import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  Github,
  MessageSquare,
  Sparkles,
  Target,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [niche, setNiche] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('research');

  const handleResearch = async (e) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setAnalysis(null);

    try {
      const response = await fetch(`${API_URL}/api/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niche: niche.trim(),
          description: description.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setResults(data);
        setActiveTab('results');
      } else {
        throw new Error(data.message || 'Research failed');
      }
    } catch (err) {
      console.error('Research error:', err);
      setError(err.message || 'Failed to fetch research data. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!results || !results.results || results.results.length === 0) {
      setError('No results to analyze');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niche: results.query,
          description: results.description,
          results: results.results
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setAnalysis(data);
        setActiveTab('analysis');
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze data. Make sure n8n webhook is configured.');
    } finally {
      setAnalyzing(false);
    }
  };

  const getSourceIcon = (source) => {
    if (source.includes('GitHub')) return <Github className="w-4 h-4" />;
    if (source.includes('Reddit')) return <MessageSquare className="w-4 h-4" />;
    return <TrendingUp className="w-4 h-4" />;
  };

  const getSourceColor = (source) => {
    if (source.includes('GitHub')) return 'bg-gray-700 text-white';
    if (source.includes('Reddit')) return 'bg-orange-500 text-white';
    if (source.includes('Hacker News')) return 'bg-orange-600 text-white';
    if (source.includes('Stack Overflow')) return 'bg-orange-400 text-white';
    if (source.includes('Dev.to')) return 'bg-black text-white';
    if (source.includes('Product Hunt')) return 'bg-orange-500 text-white';
    return 'bg-blue-500 text-white';
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero gradient-bg">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Market Research</span>
            </div>
            <h1 className="hero-title">
              <Target className="hero-icon" />
              Market Gap Finder
            </h1>
            <p className="hero-subtitle">
              Discover untapped market opportunities in seconds. Our AI analyzes 6+ data sources
              to find gaps your competitors are missing.
            </p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <form onSubmit={handleResearch} className="search-form">
            <div className="input-group">
              <div className="input-wrapper">
                <Search className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter your niche (e.g., 'AI customer support', 'sustainable packaging', 'no-code tools')"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  disabled={loading}
                  className="input-field"
                  required
                />
              </div>
              
              <textarea
                placeholder="Additional description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                className="textarea-field"
                rows="2"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !niche.trim()}
              className="btn btn-primary btn-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Find Market Gaps
                </>
              )}
            </button>
          </form>

          {/* Features */}
          <div className="features-grid">
            <div className="feature-card">
              <BarChart3 className="feature-icon" />
              <h3>Multi-Source Analysis</h3>
              <p>Aggregates data from GitHub, Reddit, Hacker News, and more</p>
            </div>
            <div className="feature-card">
              <Sparkles className="feature-icon" />
              <h3>AI-Powered Insights</h3>
              <p>Intelligent gap detection with actionable recommendations</p>
            </div>
            <div className="feature-card">
              <Lightbulb className="feature-icon" />
              <h3>MVP Suggestions</h3>
              <p>Get practical advice on building your product</p>
            </div>
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="container">
          <div className="alert alert-error">
            <AlertCircle className="w-5 h-5" />
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <section className="results-section animate-fadeIn">
          <div className="container">
            {/* Tabs */}
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'results' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('results')}
              >
                <BarChart3 className="w-4 h-4" />
                Research Results ({results.resultsCount})
              </button>
              <button 
                className={`tab ${activeTab === 'analysis' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('analysis')}
                disabled={!analysis}
              >
                <Sparkles className="w-4 h-4" />
                AI Analysis {analysis && '✓'}
              </button>
            </div>

            {/* Results Tab */}
            {activeTab === 'results' && (
              <div className="tab-content">
                {/* Stats Bar */}
                <div className="stats-bar">
                  <div className="stat-card">
                    <span className="stat-label">Total Results</span>
                    <span className="stat-value">{results.resultsCount}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Top Engagement</span>
                    <span className="stat-value">
                      {results.results[0]?.engagement?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Sources</span>
                    <span className="stat-value">
                      {results.metadata?.successfulSources || 0}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">
                      {(results.metadata?.duration / 1000).toFixed(1)}s
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="action-bar">
                  <h2 className="results-title">
                    Results for "<span className="gradient-text">{results.query}</span>"
                  </h2>
                  <button 
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="btn btn-primary"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze with AI
                      </>
                    )}
                  </button>
                </div>

                {/* Results Grid */}
                <div className="results-grid">
                  {results.results.map((result, idx) => (
                    <div key={idx} className="result-card card">
                      <div className="result-header">
                        <h3 className="result-title">{result.title}</h3>
                        <span className={`source-badge ${getSourceColor(result.source)}`}>
                          {getSourceIcon(result.source)}
                          {result.source}
                        </span>
                      </div>
                      
                      <p className="result-description">
                        {result.description}
                      </p>
                      
                      <div className="result-footer">
                        <div className="engagement-badge">
                          <TrendingUp className="w-4 h-4" />
                          {result.engagement.toLocaleString()} engagement
                        </div>
                        {result.url && (
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-link"
                          >
                            View
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Tab */}
            {activeTab === 'analysis' && analysis && (
              <div className="tab-content animate-fadeIn">
                {analysis.mock && (
                  <div className="alert alert-warning">
                    <AlertCircle className="w-5 h-5" />
                    <div>
                      <strong>Mock Analysis Mode:</strong> Configure N8N_WEBHOOK_URL in backend/.env for real AI analysis.
                    </div>
                  </div>
                )}

                {analysis.analysis && (
                  <div className="analysis-content">
                    <h2 className="analysis-title">
                      <Sparkles className="w-6 h-6" />
                      AI-Powered Gap Analysis
                    </h2>

                    {analysis.analysis.summary && (
                      <div className="summary-card card">
                        <h3>Executive Summary</h3>
                        <p>{analysis.analysis.summary}</p>
                      </div>
                    )}

                    {analysis.analysis.gaps && analysis.analysis.gaps.length > 0 && (
                      <div className="gaps-section">
                        <h3>Identified Market Gaps</h3>
                        <div className="gaps-grid">
                          {analysis.analysis.gaps.map((gap, idx) => (
                            <div key={idx} className="gap-card card">
                              <div className="gap-header">
                                <h4>{gap.title}</h4>
                                <span className={`competition-badge ${
                                  gap.competition === 'Low' ? 'competition-low' :
                                  gap.competition === 'Medium' ? 'competition-medium' :
                                  'competition-high'
                                }`}>
                                  {gap.competition} Competition
                                </span>
                              </div>
                              <p className="gap-reason">{gap.reason}</p>
                              <div className="gap-metrics">
                                <div className="gap-metric">
                                  <span className="metric-label">Market Size</span>
                                  <span className="metric-value">{gap.market_size}</span>
                                </div>
                                <div className="gap-metric">
                                  <span className="metric-label">Opportunity</span>
                                  <span className="metric-value">{gap.opportunity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Market Gap Finder</h3>
              <p>AI-powered market research for entrepreneurs</p>
            </div>
            <div className="footer-section">
              <h4>Built with</h4>
              <p>React • Node.js • Express • n8n</p>
            </div>
            <div className="footer-section">
              <h4>Hackathon 2024</h4>
              <p>© Fireland Team</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
