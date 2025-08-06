# Deployment Guide

## Overview
This project uses a **split deployment strategy**:
- **Frontend**: Deployed on Vercel (React + Vite)
- **Backend**: Deployed on Railway (Flask + Python)

## 🚀 Deployment Steps

### 1. Backend Deployment (Railway)

#### Prerequisites
- Railway account (free tier available)
- GitHub repository connected

#### Steps:
1. **Go to [Railway.app](https://railway.app)**
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**
5. **Set Root Directory to: `backend`**
6. **Configure Environment Variables:**
   ```
   GOOGLE_API_KEY=your_google_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   SECRET_KEY=your_flask_secret_key
   PORT=5001
   ```
7. **Deploy** - Railway will automatically detect Python and install dependencies
8. **Get your Railway URL** (e.g., `https://your-app.railway.app`)

### 2. Frontend Deployment (Vercel)

#### Prerequisites
- Vercel account (free tier available)
- GitHub repository connected

#### Steps:
1. **Go to [Vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure project settings:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm install && pnpm run build`
   - **Output Directory**: `dist`
5. **Add Environment Variable:**
   ```
   VITE_API_BASE_URL=https://your-railway-backend-url.railway.app/api
   ```
6. **Deploy** - Vercel will build and deploy your React app

## 🔧 Configuration Files

### Railway Configuration (`railway.json`)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && python3.11 src/main.py",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "cd frontend && pnpm install && pnpm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🌐 Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-railway-backend-url.railway.app/api
```

### Backend (Railway Environment Variables)
```env
GOOGLE_API_KEY=your_google_gemini_api_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
SECRET_KEY=your_flask_secret_key
PORT=5001
```

## 🔍 Health Checks

### Backend Health Check
- **URL**: `https://your-railway-url.railway.app/api/health`
- **Expected Response**:
  ```json
  {
    "status": "healthy",
    "message": "DSCPL Spiritual Companion API is running",
    "version": "1.0.0"
  }
  ```

## 📊 Monitoring

### Railway Dashboard
- Monitor backend logs and performance
- View deployment status
- Check environment variables

### Vercel Dashboard
- Monitor frontend performance
- View build logs
- Check deployment status

## 🔄 Updates

### Backend Updates
1. Push changes to GitHub
2. Railway automatically redeploys
3. Check Railway dashboard for deployment status

### Frontend Updates
1. Push changes to GitHub
2. Vercel automatically redeploys
3. Check Vercel dashboard for deployment status

## 🛠️ Troubleshooting

### Common Issues

#### Backend Issues
- **Port conflicts**: Ensure `PORT` environment variable is set
- **API key errors**: Verify all environment variables are set in Railway
- **Import errors**: Check Python version compatibility

#### Frontend Issues
- **API connection errors**: Verify `VITE_API_BASE_URL` points to correct Railway URL
- **Build failures**: Check Vercel build logs for dependency issues
- **CORS errors**: Ensure Railway backend has proper CORS configuration

### Debug Commands

#### Local Backend Testing
```bash
cd backend
python3.11 src/main.py
```

#### Local Frontend Testing
```bash
cd frontend
pnpm dev
```

## 💰 Cost Analysis

### Free Tier Limits
- **Railway**: $5/month free tier (500 hours)
- **Vercel**: Unlimited free tier for personal projects
- **Total Cost**: $5/month for production deployment

### Scaling Options
- **Railway**: Upgrade to paid plan for more resources
- **Vercel**: Pro plan for team features and advanced analytics

## 🔐 Security Considerations

1. **Environment Variables**: Never commit API keys to repository
2. **CORS Configuration**: Properly configure CORS for production
3. **HTTPS**: Both platforms provide automatic HTTPS
4. **API Rate Limiting**: Consider implementing rate limiting for production

## 📈 Performance Optimization

### Backend (Railway)
- Use connection pooling for database
- Implement caching strategies
- Monitor memory usage

### Frontend (Vercel)
- Optimize bundle size
- Use CDN for static assets
- Implement lazy loading

---

**Last Updated**: August 2024
**Version**: 2.0.0

