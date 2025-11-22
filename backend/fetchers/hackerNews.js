const axios = require('axios');

/**
 * Fetch posts from Hacker News using Algolia API
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of results
 */
async function fetchHackerNews(query) {
  try {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search`,
      {
        params: {
          query: query,
          hitsPerPage: 20,
          typoTolerance: true
        }
      }
    );

    return response.data.hits
      .filter(hit => hit.title && hit.url)
      .map(hit => ({
        title: hit.title,
        description: hit.url || 'No description',
        source: 'Hacker News',
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        engagement: (hit.points || 0) + (hit.num_comments || 0),
        metadata: {
          points: hit.points || 0,
          comments: hit.num_comments || 0,
          author: hit.author,
          created_at: hit.created_at
        }
      }));
  } catch (error) {
    console.error('Hacker News API Error:', error.message);
    return [];
  }
}

module.exports = { fetchHackerNews };
