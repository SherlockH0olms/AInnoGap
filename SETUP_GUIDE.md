# 🚀 Market Gap Finder - Setup Guide

Complete step-by-step guide to get the project running in 15 minutes.

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js 16+ installed ([Download](https://nodejs.org/))
- [ ] npm (comes with Node.js)
- [ ] Git installed
- [ ] A code editor (VS Code recommended)
- [ ] Terminal/Command Prompt

To check your installations:
```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show 8.x.x or higher
git --version     # Should show git version x.x.x
```

## 🎯 Step 1: Get the Code

```bash
# Navigate to your projects folder
cd Desktop  # or wherever you want the project

# If you haven't cloned yet
git clone <your-repo-url>

# Navigate to project
cd fireland_hackathon-master
```

## 🔧 Step 2: Setup Backend

### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express (web server)
- cors (cross-origin requests)
- axios (HTTP client)
- dotenv (environment variables)
- cheerio (HTML parsing)

### 2.2 Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Or on Windows Command Prompt
copy .env.example .env
```

Now open `.env` in your code editor and configure:

```env
PORT=5000
NODE_ENV=development

# IMPORTANT: Add your n8n webhook URL here
# Get this from your n8n workflow
N8N_WEBHOOK_URL=

# OPTIONAL: These make the app better but aren't required
GITHUB_TOKEN=
PRODUCTHUNT_API_KEY=

FRONTEND_URL=http://localhost:3000
```

### 2.3 Test Backend

```bash
# Start the server
npm start
```

You should see:
```
🚀 ===================================
🎯 Market Gap Finder API
🚀 ===================================
📍 Server running on: http://localhost:5000
🏥 Health check: http://localhost:5000/api/health
...
```

**Test it**: Open http://localhost:5000/api/health in your browser. You should see:
```json
{
  "status": "OK",
  "message": "Market Gap Finder API is running",
  ...
}
```

✅ **Backend is ready!** Keep this terminal open.

## 🎨 Step 3: Setup Frontend

Open a **NEW terminal window** (keep backend running).

### 3.1 Install Frontend Dependencies

```bash
# From project root
cd front
npm install
```

This will install:
- react & react-dom
- lucide-react (icons)
- axios (optional)

### 3.2 Configure Frontend Environment

```bash
# The .env file should already exist, but verify it contains:
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=Market Gap Finder
REACT_APP_VERSION=1.0.0
```

### 3.3 Start Frontend

```bash
npm start
```

Your browser should automatically open http://localhost:3000

✅ **Frontend is ready!**

## 🤖 Step 4: Setup n8n (AI Integration)

### Option A: Use n8n Cloud (Easiest)

1. Go to [n8n.io](https://n8n.io) and create a free account
2. Create a new workflow
3. Add these nodes:
   - **Webhook** (trigger) - Listen for data
   - **OpenAI/Claude** - Process with AI
   - **Respond to Webhook** - Return results

4. **Webhook Node Setup:**
   - Method: POST
   - Path: /market-gap-analysis (or any name)
   - Response Mode: Using 'Respond to Webhook' Node

5. **AI Node Setup** (example with OpenAI):
   - Model: gpt-4 or gpt-3.5-turbo
   - Prompt:
   ```
   You are a market research analyst. Based on these search results for "{{$json.niche}}", identify market gaps.
   
   Results: {{$json.results}}
   
   Return JSON with:
   {
     "gaps": [{"title": "", "reason": "", "market_size": "", "competition": "", "opportunity": ""}],
     "summary": "",
     "recommendations": []
   }
   ```

6. **Respond to Webhook Node:**
   - Response Data: Output from AI node

7. Copy the webhook URL (looks like: https://your-instance.app.n8n.cloud/webhook/abc123)

8. Add to backend `.env`:
   ```env
   N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/abc123
   ```

9. Restart backend server (Ctrl+C, then `npm start` again)

### Option B: Self-hosted n8n

```bash
# Using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Or using npm
npm install n8n -g
n8n start
```

Then follow the same workflow setup as Option A.

### Testing AI Integration

1. Do a research in the frontend
2. Click "Analyze with AI"
3. Check backend terminal for logs
4. Check n8n for incoming webhook calls

## ✅ Step 5: Verify Everything Works

### Backend Tests

```bash
# Health check
curl http://localhost:5000/api/health

# Research endpoint
curl -X POST http://localhost:5000/api/research \
  -H "Content-Type: application/json" \
  -d '{"niche": "AI tools"}'

# Sources
curl http://localhost:5000/api/sources
```

### Frontend Tests

1. Open http://localhost:3000
2. Enter a niche (e.g., "AI customer support")
3. Click "Find Market Gaps"
4. Wait for results (should take 2-5 seconds)
5. Click "Analyze with AI" (if n8n is configured)

## 🔍 Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change port in backend/.env
PORT=5001
# Also update frontend/.env
REACT_APP_API_URL=http://localhost:5001
```

**"Failed to fetch" errors:**
- Check backend is running
- Check URL in frontend/.env
- Check CORS settings in backend/server.js

### Frontend Issues

**Blank page:**
- Check browser console (F12)
- Verify backend is running
- Check API_URL in .env

**"Module not found":**
```bash
cd front
rm -rf node_modules
npm install
```

### n8n Issues

**Webhook not receiving data:**
- Check webhook URL is correct
- Verify webhook is activated in n8n
- Check n8n logs

**AI not responding:**
- Verify OpenAI/Claude API key in n8n
- Check AI node configuration
- Test with simpler prompt

## 🎯 Quick Start Checklist

- [ ] Node.js and npm installed
- [ ] Project cloned
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend running on port 3000
- [ ] n8n workflow created (optional)
- [ ] n8n webhook URL added to backend .env (optional)
- [ ] Both terminals running
- [ ] Tested research functionality
- [ ] Tested AI analysis (if configured)

## 🚀 Next Steps

1. **Add API Keys** (optional but recommended):
   - GitHub token for higher rate limits
   - Product Hunt key for product data

2. **Customize**:
   - Modify colors in frontend/src/App.css
   - Add more data sources in backend/fetchers/
   - Enhance AI prompts in n8n

3. **Deploy**:
   - Backend to Render/Heroku
   - Frontend to Vercel/Netlify
   - Configure production environment variables

## 📞 Need Help?

Common issues:
1. **Port conflicts**: Change ports in .env files
2. **CORS errors**: Check CORS settings in backend
3. **No results**: Check API keys and rate limits
4. **AI not working**: Configure n8n webhook URL

For more help:
- Check README.md
- Review backend logs
- Check browser console
- Test API endpoints with curl/Postman

## 🎉 Success!

If you've reached here, your Market Gap Finder should be running!

Try searching for:
- "AI customer support"
- "sustainable packaging"
- "no-code tools"
- "remote work software"

Happy researching! 🚀
