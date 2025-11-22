const axios = require('axios');

/**
 * Fetch products from Product Hunt
 * Note: Requires API key from https://www.producthunt.com/v2/oauth/applications
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of results
 */
async function fetchProductHunt(query) {
  try {
    const apiKey = process.env.PH_API_KEY;
    
    if (!apiKey) {
      console.warn('Product Hunt API key not found, skipping...');
      return [];
    }

    const graphqlQuery = `
      query {
        posts(first: 20, order: VOTES_COUNT) {
          edges {
            node {
              id
              name
              tagline
              url
              votesCount
              commentsCount
              createdAt
            }
          }
        }
      }
    `;

    const response = await axios.post(
      'https://api.producthunt.com/v2/api/graphql',
      { query: graphqlQuery },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data?.data?.posts?.edges) {
      return response.data.data.posts.edges.map(edge => ({
        title: edge.node.name,
        description: edge.node.tagline || 'No description',
        source: 'Product Hunt',
        url: edge.node.url,
        engagement: (edge.node.votesCount || 0) + (edge.node.commentsCount || 0),
        metadata: {
          votes: edge.node.votesCount || 0,
          comments: edge.node.commentsCount || 0,
          created_at: edge.node.createdAt
        }
      }));
    }
    return [];
  } catch (error) {
    console.error('Product Hunt API Error:', error.message);
    return [];
  }
}

module.exports = { fetchProductHunt };
