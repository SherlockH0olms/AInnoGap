# Market Gap Finder - Frontend

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will open at `http://localhost:3000`

## 📋 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=Market Gap Finder
REACT_APP_VERSION=1.0.0
```

## 🎨 Features

### 1. Market Research
- Enter your niche or business idea
- Add optional description for better context
- Click "Find Market Gaps" to start research

### 2. Multi-Source Data
The app fetches data from 6+ sources:
- GitHub (trending repositories)
- Hacker News (tech discussions)
- Reddit (startup communities)
- Stack Overflow (developer questions)
- Dev.to (developer articles)
- Product Hunt (new launches)

### 3. Results Display
- **Stats Bar**: Quick overview of results
- **Results Grid**: All findings with engagement metrics
- **Source Badges**: Easy identification of data sources
- **External Links**: Direct access to original sources

### 4. AI Analysis
- Click "Analyze with AI" to send data to n8n webhook
- Get AI-powered gap analysis
- View identified market opportunities
- See competition levels and market size estimates

## 🏗️ Project Structure

```
src/
├── App.js              # Main application component
├── App.css            # Application styles
├── index.js           # React entry point
├── index.css          # Global styles
└── public/
    └── index.html     # HTML template
```

## 🎨 Design System

### Colors
- **Primary**: `#667eea` (Purple Blue)
- **Secondary**: `#764ba2` (Deep Purple)
- **Background**: `#f8fafc` (Light Gray)
- **Text**: `#1e293b` (Dark Slate)
- **Muted**: `#64748b` (Slate Gray)

### Typography
- **Headings**: System font stack (SF Pro, Segoe UI, Roboto)
- **Body**: Same system fonts for consistency
- **Weight**: 400 (normal), 600 (semi-bold), 700 (bold), 800 (extra-bold)

### Components
- **Cards**: White background, rounded corners, subtle shadows
- **Buttons**: Gradient background, hover animations
- **Badges**: Color-coded by source
- **Icons**: Lucide React icon library

## 📱 Responsive Design

The app is optimized for:
- **Desktop**: 1280px+ (full layout)
- **Tablet**: 768px-1279px (adapted grid)
- **Mobile**: < 768px (single column)

## 🔧 Customization

### Changing API URL
Edit `.env` file:
```env
REACT_APP_API_URL=https://your-api-url.com
```

### Modifying Styles
Main styles are in:
- `src/index.css` - Global styles and utilities
- `src/App.css` - Component-specific styles

### Adding New Features
1. Add new component in `src/App.js`
2. Add corresponding styles in `src/App.css`
3. Update state management if needed

## 🐛 Debugging

### Backend Connection Issues
If you see "Failed to fetch research data":
1. Check if backend is running on port 5000
2. Verify `REACT_APP_API_URL` in `.env`
3. Check browser console for CORS errors

### API Errors
- Check Network tab in browser DevTools
- Verify backend endpoints are responding
- Ensure JSON format is correct

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build project
npm run build

# Drag & drop 'build' folder to Netlify
```

### Environment Variables for Production
Don't forget to set `REACT_APP_API_URL` to your production backend URL.

## 📦 Dependencies

- **react**: ^18.2.0 - UI library
- **react-dom**: ^18.2.0 - React DOM renderer
- **axios**: ^1.6.2 - HTTP client (optional)
- **lucide-react**: ^0.294.0 - Icon library

## 🎯 Performance

- Lazy loading for images
- Debounced search input (optional)
- Memoized components (optional)
- Code splitting with React.lazy (optional)

## 📝 License

MIT License - Fireland Hackathon 2024

## 🤝 Contributing

This is a hackathon MVP. Improvements welcome!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Check backend is running
- Verify environment variables
- Check browser console for errors
- Review API response in Network tab
