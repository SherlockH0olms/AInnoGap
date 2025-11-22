const axios = require('axios');

/**
 * Fetch posts from Reddit
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of results
 */
async function fetchReddit(query) {
  try {
    const subreddits = ['startups', 'entrepreneur', 'SideProject', 'BuiltInPublic'];
    const allPosts = [];

    for (const sub of subreddits) {
      try {
        const response = await axios.get(
          `https://www.reddit.com/r/${sub}/search.json`,
          {
            params: {
              q: query,
              limit: 10,
              sort: 'relevance',
              t: 'month'
            },
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          }
        );

        if (response.data?.data?.children) {
          const posts = response.data.data.children
            .filter(child => child.data && child.data.title)
            .map(child => ({
              title: child.data.title,
              description: child.data.selftext ? 
                child.data.selftext.substring(0, 200) + '...' : 
                'Click to view post',
              source: `Reddit (r/${sub})`,
              url: `https://reddit.com${child.data.permalink}`,
              engagement: (child.data.score || 0) + (child.data.num_comments || 0),
              metadata: {
                score: child.data.score || 0,
                comments: child.data.num_comments || 0,
                subreddit: sub,
                created: child.data.created_utc
              }
            }));
          
          allPosts.push(...posts);
        }
      } catch (subError) {
        console.warn(`Reddit r/${sub} error:`, subError.message);
      }
    }

    return allPosts.slice(0, 30);
  } catch (error) {
    console.error('Reddit API Error:', error.message);
    return [];
  }
}

module.exports = { fetchReddit };
