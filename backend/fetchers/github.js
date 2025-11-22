const axios = require('axios');

/**
 * Fetch trending repositories from GitHub
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of results
 */
async function fetchGitHub(query) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { 'Authorization': `token ${token}` } : {};
    
    const response = await axios.get(
      `https://api.github.com/search/repositories`,
      {
        params: {
          q: query,
          sort: 'stars',
          order: 'desc',
          per_page: 20
        },
        headers
      }
    );

    return response.data.items.map(repo => ({
      title: repo.name,
      description: repo.description || 'No description available',
      source: 'GitHub',
      url: repo.html_url,
      engagement: repo.stargazers_count + repo.forks_count,
      metadata: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        created_at: repo.created_at
      }
    }));
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    return [];
  }
}

module.exports = { fetchGitHub };
