# 🎯 Market Gap Finder

> **AI-Powered Market Research Tool for Entrepreneurs**

Discover untapped market opportunities in seconds. Market Gap Finder aggregates data from 6+ sources and uses AI to identify gaps your competitors are missing.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Hackathon](https://img.shields.io/badge/hackathon-2024-orange)

## ✨ Features

- 🔍 **Multi-Source Research**: Aggregates data from GitHub, Reddit, Hacker News, Stack Overflow, Dev.to, and Product Hunt
- 🤖 **AI-Powered Analysis**: Integrates with n8n for intelligent gap detection
- 📊 **Real-time Results**: Get insights in seconds, not hours
- 💡 **MVP Suggestions**: Actionable recommendations for your product
- 🎨 **Modern UI**: Clean, professional interface built with React
- 🚀 **Production Ready**: Deployable to Vercel, Netlify, or any hosting platform

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │  ← Modern, responsive UI
│   (Port 3000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Express API    │  ← RESTful backend
│   (Port 5000)   │
└────────┬────────┘
         │
         ├─────► GitHub API
         ├─────► Hacker News API
         ├─────► Reddit API
         ├─────► Stack Overflow API
         ├─────► Dev.to API
         └─────► Product Hunt API
         │
         ▼
┌─────────────────┐
│   n8n Webhook   │  ← AI processing
│  (Your n8n URL) │
└─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd fireland_hackathon-master
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your n8n webhook URL
npm start
```

Backend will run on `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
```bash
cd front
npm install
npm start
```

Frontend will open at `http://localhost:3000`

## 📋 Configuration

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

# REQUIRED: Your n8n webhook URL for AI analysis
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id

# OPTIONAL: API keys (system works without them)
GITHUB_TOKEN=your_github_token
PRODUCTHUNT_API_KEY=your_product_hunt_key

FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

### n8n Webhook Setup

1. Create a new workflow in n8n
2. Add a Webhook node (trigger)
3. Add your AI processing nodes (e.g., OpenAI, Claude)
4. Return JSON in this format:
```json
{
  "gaps": [
    {
      "title": "Gap title",
      "reason": "Why this is a gap",
      "market_size": "Estimated size",
      "competition": "Low/Medium/High",
      "opportunity": "Why pursue this"
    }
  ],
  "summary": "Overall analysis",
  "recommendations": ["Rec 1", "Rec 2"]
}
```
5. Copy the webhook URL to your backend `.env`

## 📖 Usage

1. **Enter Your Niche**
   - Type your business idea or niche (e.g., "AI customer support")
   - Add optional description for better context

2. **Get Research Results**
   - Click "Find Market Gaps"
   - Wait 2-5 seconds for results
   - View aggregated data from 6+ sources

3. **Analyze with AI**
   - Click "Analyze with AI" button
   - AI processes the data via n8n webhook
   - Get identified gaps, competition analysis, and recommendations

## 🔌 API Endpoints

### Research
```http
POST /api/research
Content-Type: application/json

{
  "niche": "AI tools",
  "description": "Optional description"
}
```

### AI Analysis
```http
POST /api/analyze
Content-Type: application/json

{
  "niche": "AI tools",
  "results": [...],
  "description": "Optional"
}
```

### Health Check
```http
GET /api/health
```

### Available Sources
```http
GET /api/sources
```

## 📊 Data Sources

| Source | Auth Required | Rate Limit | Data Type |
|--------|---------------|------------|-----------|
| GitHub | Optional | 60/hr (5000 with token) | Repositories |
| Hacker News | No | None | Discussions |
| Reddit | No | None | Community posts |
| Stack Overflow | No | 300/day | Q&A |
| Dev.to | No | None | Articles |
| Product Hunt | Yes | 100/hr | Product launches |

## 🚢 Deployment

### Backend (Render/Heroku)
```bash
# Render
git push render main

# Heroku
git push heroku main
```

Don't forget to set environment variables in your hosting platform!

### Frontend (Vercel)
```bash
npm install -g vercel
cd front
vercel --prod
```

Set `REACT_APP_API_URL` to your production backend URL.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Lucide React (icons)
- Pure CSS (no framework)

**Backend:**
- Node.js
- Express
- Axios
- CORS

**AI Integration:**
- n8n (workflow automation)
- OpenAI/Claude (via n8n)

## 📁 Project Structure

```
fireland_hackathon-master/
├── backend/
│   ├── fetchers/           # Data source fetchers
│   │   ├── github.js
│   │   ├── hackerNews.js
│   │   ├── reddit.js
│   │   ├── stackoverflow.js
│   │   ├── devto.js
│   │   └── producthunt.js
│   ├── server.js           # Main server
│   ├── package.json
│   └── .env
├── front/
│   ├── src/
│   │   ├── App.js         # Main component
│   │   ├── App.css        # Styles
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md
```

## 🤝 Contributing

This is a hackathon MVP, but improvements are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Product Hunt requires API key (optional)
- Reddit rate limiting on high traffic
- AI analysis requires n8n setup

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Save research history
- [ ] Export to PDF
- [ ] More data sources (Twitter, LinkedIn)
- [ ] Advanced filtering
- [ ] Trend prediction
- [ ] Competitor analysis
- [ ] Market size calculator

## 📝 License

MIT License - Fireland Hackathon 2024

Copyright (c) 2024 Fireland Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## 👥 Team

Built with ❤️ by Fireland Hackathon Team

## 🙏 Acknowledgments

- All open-source data providers
- n8n for workflow automation
- React and Node.js communities

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review the troubleshooting guide

---

**Made for Hackathon 2024** 🚀
