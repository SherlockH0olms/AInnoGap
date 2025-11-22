const axios = require('axios');

/**
 * Fetch questions from Stack Overflow
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of results
 */
async function fetchStackOverflow(query) {
  try {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/search/advanced`,
      {
        params: {
          order: 'desc',
          sort: 'relevance',
          q: query,
          site: 'stackoverflow',
          pagesize: 20
        }
      }
    );

    if (response.data && response.data.items) {
      return response.data.items.map(question => ({
        title: question.title,
        description: question.link,
        source: 'Stack Overflow',
        url: question.link,
        engagement: (question.score || 0) + (question.answer_count || 0),
        metadata: {
          score: question.score || 0,
          answers: question.answer_count || 0,
          views: question.view_count || 0,
          created: question.creation_date
        }
      }));
    }
    return [];
  } catch (error) {
    console.error('Stack Overflow API Error:', error.message);
    return [];
  }
}

module.exports = { fetchStackOverflow };
