const axios = require('axios');

/**
 * Fetch articles from Dev.to
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of results
 */
async function fetchDevTo(query) {
  try {
    const response = await axios.get(
      `https://dev.to/api/articles`,
      {
        params: {
          tag: query,
          per_page: 20,
          top: 7 // Last 7 days
        }
      }
    );

    return response.data.map(article => ({
      title: article.title,
      description: article.description || article.excerpt || 'No description',
      source: 'Dev.to',
      url: article.url,
      engagement: (article.positive_reactions_count || 0) + (article.comments_count || 0),
      metadata: {
        reactions: article.positive_reactions_count || 0,
        comments: article.comments_count || 0,
        reading_time: article.reading_time_minutes,
        published_at: article.published_at
      }
    }));
  } catch (error) {
    console.error('Dev.to API Error:', error.message);
    return [];
  }
}

module.exports = { fetchDevTo };
