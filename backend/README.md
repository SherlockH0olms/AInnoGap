# Market Gap Finder - Backend API

Professional MVP backend for the Market Gap Finder hackathon project.

## 🚀 Quick Start

### Installation

```bash
cd backend
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your API keys in `.env` (optional, see below)

### Run Development Server

```bash
npm run dev
```

Or production:
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### 1. Health Check
```
GET /api/health
```
Returns server status and uptime.

### 2. Get Available Sources
```
GET /api/sources
```
Returns list of all data sources and their status.

### 3. Research Market
```
POST /api/research
Content-Type: application/json

{
  "niche": "AI customer support",
  "description": "Optional description"
}
```

Returns aggregated results from multiple sources.

### 4. AI Analysis
```
POST /api/analyze
Content-Type: application/json

{
  "niche": "AI customer support",
  "results": [...],
  "description": "Optional"
}
```

Sends data to n8n for AI-powered gap analysis.

## 🔑 API Keys (Optional)

The system works WITHOUT any API keys, but you can enhance it with:

### Required for Full Features:
- `N8N_API_URL` - Your n8n webhook URL (for AI analysis)
- `N8N_API_KEY` - Your n8n API key (for AI analysis)

### Optional Enhancements:
- `GITHUB_TOKEN` - Increases rate limit from 60 to 5000 req/hour
- `PH_API_KEY` - Enables Product Hunt data
- `TWITTER_BEARER_TOKEN` - Enables Twitter/X data (future)
- `IH_API_KEY` - Enables Indie Hackers data (future)

## 📊 Data Sources

### Active (No Auth Required):
1. ✅ **GitHub** - Trending repositories (60 req/hour without token)
2. ✅ **Hacker News** - Tech news via Algolia API
3. ✅ **Reddit** - Startup subreddits (startups, entrepreneur, etc.)
4. ✅ **Dev.to** - Developer articles and discussions
5. ✅ **Stack Overflow** - Programming Q&A

### Optional (Auth Required):
6. 🔐 **Product Hunt** - New product launches (requires API key)

## 🏗️ Project Structure

```
backend/
├── fetchers/           # Data fetching modules
│   ├── github.js
│   ├── hackerNews.js
│   ├── reddit.js
│   ├── devto.js
│   ├── stackoverflow.js
│   └── productHunt.js
├── server.js          # Main Express server
├── package.json       # Dependencies
├── .env.example       # Environment template
└── README.md         # This file
```

## 🧪 Testing

### Test health endpoint:
```bash
curl http://localhost:5000/api/health
```

### Test research endpoint:
```bash
curl -X POST http://localhost:5000/api/research \
  -H "Content-Type: application/json" \
  -d '{"niche": "AI chatbots"}'
```

### Test sources status:
```bash
curl http://localhost:5000/api/sources
```

## 🔧 Troubleshooting

### Port already in use?
Change PORT in `.env` file:
```
PORT=5001
```

### API rate limits?
- GitHub: Add `GITHUB_TOKEN` to increase limit
- Others: Built-in retry and fallback logic

### CORS errors?
CORS is enabled for all origins in development. For production, update the CORS configuration in `server.js`.

## 📦 Dependencies

- **express** - Web framework
- **cors** - CORS middleware
- **axios** - HTTP client
- **dotenv** - Environment variables
- **cheerio** - HTML parsing (if needed)
- **nodemon** - Development auto-reload

## 🚀 Deployment

### Render.com (Recommended)
1. Connect your GitHub repo
2. Add environment variables
3. Deploy automatically

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Railway
1. Import from GitHub
2. Add environment variables
3. Deploy

## 📝 Notes for Hackathon

- MVP is fully functional WITHOUT any API keys
- n8n integration is optional but recommended for AI features
- All data sources have error handling and fallbacks
- Response times: 2-5 seconds average
- No database required (stateless API)

## 🤝 Contributing

This is a hackathon MVP. Feel free to enhance!

## 📄 License

MIT License - Free to use and modify
