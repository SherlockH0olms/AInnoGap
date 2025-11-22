const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Import fetchers
const { fetchGitHub } = require('./fetchers/github');
const { fetchHackerNews } = require('./fetchers/hackerNews');
const { fetchReddit } = require('./fetchers/reddit');
const { fetchDevTo } = require('./fetchers/devto');
const { fetchStackOverflow } = require('./fetchers/stackoverflow');
const { fetchProductHunt } = require('./fetchers/productHunt');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * Remove duplicate results based on title similarity
 */
function removeDuplicates(results) {
  const seen = new Map();
  
  return results.filter(item => {
    const normalizedTitle = item.title.toLowerCase().trim();
    if (seen.has(normalizedTitle)) {
      return false;
    }
    seen.set(normalizedTitle, true);
    return true;
  });
}

/**
 * Sort results by engagement score
 */
function sortByEngagement(results) {
  return results.sort((a, b) => b.engagement - a.engagement);
}

// ==================== MAIN ENDPOINTS ====================

/**
 * Health check endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * Research endpoint - Fetch data from multiple sources
 * POST /api/research
 * Body: { niche: string, description?: string }
 */
app.post('/api/research', async (req, res) => {
  try {
    const { niche, description } = req.body;

    // Validation
    if (!niche || niche.trim().length === 0) {
      return res.status(400).json({
        error: 'Niche is required',
        message: 'Please provide a niche to research'
      });
    }

    console.log(`\n🔍 Starting research for: "${niche}"`);
    const startTime = Date.now();

    // Fetch data from all sources in parallel
    const fetchPromises = [
      fetchGitHub(niche),
      fetchHackerNews(niche),
      fetchReddit(niche),
      fetchDevTo(niche),
      fetchStackOverflow(niche),
      fetchProductHunt(niche)
    ];

    const results = await Promise.all(fetchPromises);
    
    // Flatten and process results
    let allResults = results.flat().filter(item => item && item.title);
    
    console.log(`📊 Raw results: ${allResults.length} items`);
    
    // Remove duplicates
    allResults = removeDuplicates(allResults);
    console.log(`🔄 After deduplication: ${allResults.length} items`);
    
    // Sort by engagement
    allResults = sortByEngagement(allResults);
    
    // Get top results
    const topResults = allResults.slice(0, 30);

    // Calculate statistics
    const sourceStats = {};
    topResults.forEach(result => {
      sourceStats[result.source] = (sourceStats[result.source] || 0) + 1;
    });

    const totalEngagement = topResults.reduce((sum, r) => sum + r.engagement, 0);
    const avgEngagement = topResults.length > 0 ? 
      Math.round(totalEngagement / topResults.length) : 0;

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`✅ Research completed in ${duration}ms`);
    console.log(`📈 Top engagement: ${topResults[0]?.engagement || 0}`);

    res.json({
      success: true,
      query: niche,
      description: description || null,
      resultsCount: topResults.length,
      results: topResults,
      statistics: {
        totalEngagement,
        averageEngagement: avgEngagement,
        sourceBreakdown: sourceStats,
        processingTime: `${duration}ms`
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Research Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * AI Analysis endpoint - Send data to n8n for AI processing
 * POST /api/analyze
 * Body: { niche: string, results: array, description?: string }
 */
app.post('/api/analyze', async (req, res) => {
  try {
    const { niche, results, description } = req.body;

    if (!niche || !results || !Array.isArray(results)) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Niche and results array are required'
      });
    }

    console.log(`\n🤖 Starting AI analysis for: "${niche}"`);

    // Check if n8n webhook is configured
    const n8nUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nUrl) {
      return res.status(503).json({
        error: 'AI service not configured',
        message: 'n8n webhook URL is not set up. Please configure N8N_WEBHOOK_URL in environment variables.',
        fallback: {
          gaps: [
            {
              title: `${niche} - Market Opportunity`,
              reason: 'Based on the research data, there appears to be significant interest and activity in this niche.',
              market_size: 'Analysis pending - AI service not available',
              competition: 'Medium',
              opportunity: 'Further analysis needed with AI service'
            }
          ],
          summary: 'AI analysis service is not configured. Please set up n8n integration for detailed gap analysis.'
        }
      });
    }

    // Prepare data for n8n
    const analysisPayload = {
      niche,
      description: description || '',
      resultsCount: results.length,
      results: results.slice(0, 20), // Send top 20 results
      timestamp: new Date().toISOString()
    };

    // Call n8n webhook
    const response = await axios.post(n8nUrl, analysisPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log('✅ AI analysis completed');

    res.json({
      success: true,
      query: niche,
      analysis: response.data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ AI Analysis Error:', error.message);
    
    // Provide fallback response
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'AI analysis failed',
      message: error.message,
      fallback: {
        gaps: [],
        summary: 'AI analysis service is currently unavailable. Please try again later.'
      },
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get available sources status
 * GET /api/sources
 */
app.get('/api/sources', (req, res) => {
  const sources = [
    {
      name: 'GitHub',
      status: 'active',
      requiresAuth: !!process.env.GITHUB_TOKEN,
      description: 'Trending repositories and code projects'
    },
    {
      name: 'Hacker News',
      status: 'active',
      requiresAuth: false,
      description: 'Tech news and startup discussions'
    },
    {
      name: 'Reddit',
      status: 'active',
      requiresAuth: false,
      description: 'Community discussions from startup subreddits'
    },
    {
      name: 'Dev.to',
      status: 'active',
      requiresAuth: false,
      description: 'Developer articles and tutorials'
    },
    {
      name: 'Stack Overflow',
      status: 'active',
      requiresAuth: false,
      description: 'Programming questions and answers'
    },
    {
      name: 'Product Hunt',
      status: process.env.PRODUCTHUNT_API_KEY ? 'active' : 'inactive',
      requiresAuth: true,
      description: 'New product launches'
    }
  ];

  res.json({
    sources,
    activeCount: sources.filter(s => s.status === 'active').length,
    totalCount: sources.length
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/sources',
      'POST /api/research',
      'POST /api/analyze'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// Local development için - Vercel'de çalışmaz
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 Market Gap Finder API Server');
    console.log('='.repeat(50));
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log('='.repeat(50) + '\n');
    console.log('📍 Available endpoints:');
    console.log(`   GET  http://localhost:${PORT}/api/health`);
    console.log(`   GET  http://localhost:${PORT}/api/sources`);
    console.log(`   POST http://localhost:${PORT}/api/research`);
    console.log(`   POST http://localhost:${PORT}/api/analyze`);
    console.log('\n' + '='.repeat(50) + '\n');
  });
}

// Vercel için export - ÇOK ÖNEMLİ!
module.exports = app;
