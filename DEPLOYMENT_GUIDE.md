# DSCPL Deployment Guide

This guide provides comprehensive instructions for deploying the DSCPL AI Spiritual Companion application in various environments.

## 🏗️ Deployment Architecture

The DSCPL application can be deployed in multiple configurations:

1. **Development Mode**: Separate frontend and backend servers
2. **Local Production**: Integrated Flask server with React build
3. **Cloud Production**: Scalable cloud deployment

## 🔧 Prerequisites

### System Requirements
- **Operating System**: Linux, macOS, or Windows
- **Node.js**: Version 20.18.0 or higher
- **Python**: Version 3.11 or higher
- **Package Managers**: pnpm, pip3

### API Keys Required
- **Google API Key**: For Gemini AI integration
- **Groq API Key**: For Groq AI integration
- **Google OAuth Credentials**: For calendar integration (optional)

## 🚀 Local Development Deployment

### Step 1: Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dscpl_project
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pip3 install flask flask-cors flask-sqlalchemy langchain langchain-google-genai langchain-groq
   ```

### Step 2: Configuration

1. **Frontend Environment** (`frontend/.env`)
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=DSCPL - AI Spiritual Companion
   VITE_APP_VERSION=1.0.0
   ```

2. **Backend Environment Variables**
   ```bash
   export GOOGLE_API_KEY="your-google-api-key"
   export GROQ_API_KEY="your-groq-api-key"
   export GOOGLE_CLIENT_ID="your-google-client-id"
   export GOOGLE_CLIENT_SECRET="your-google-client-secret"
   export GOOGLE_REDIRECT_URI="http://localhost:5000/api/calendar/callback"
   ```

### Step 3: Start Development Servers

1. **Terminal 1 - Backend Server**
   ```bash
   cd backend
   python3 src/main.py
   ```
   Server runs on: `http://localhost:5000`

2. **Terminal 2 - Frontend Server**
   ```bash
   cd frontend
   pnpm run dev
   ```
   Server runs on: `http://localhost:5173`

## 🏭 Local Production Deployment

### Step 1: Build Frontend

```bash
cd frontend
pnpm run build
```

This creates a `dist/` directory with optimized production files.

### Step 2: Integrate with Backend

```bash
# Copy built frontend to Flask static directory
cp -r dist/* ../backend/src/static/
```

### Step 3: Start Integrated Server

```bash
cd ../backend
python3 src/main.py
```

The complete application runs on: `http://localhost:5000`

## ☁️ Cloud Deployment

### Platform Options

#### 1. Heroku Deployment

1. **Prepare for Heroku**
   ```bash
   # Create Procfile in backend directory
   echo "web: python src/main.py" > backend/Procfile
   
   # Create requirements.txt
   cd backend
   pip3 freeze > requirements.txt
   ```

2. **Deploy to Heroku**
   ```bash
   # Install Heroku CLI and login
   heroku login
   
   # Create Heroku app
   heroku create dscpl-spiritual-companion
   
   # Set environment variables
   heroku config:set GOOGLE_API_KEY="your-key"
   heroku config:set GROQ_API_KEY="your-key"
   
   # Deploy
   git subtree push --prefix=backend heroku main
   ```

#### 2. Vercel Deployment (Frontend Only)

1. **Build and Deploy Frontend**
   ```bash
   cd frontend
   pnpm run build
   
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Update API Base URL**
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```

#### 3. DigitalOcean App Platform

1. **Create App Spec** (`app.yaml`)
   ```yaml
   name: dscpl-spiritual-companion
   services:
   - name: backend
     source_dir: backend
     github:
       repo: your-username/dscpl-project
       branch: main
     run_command: python src/main.py
     environment_slug: python
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: GOOGLE_API_KEY
       value: your-google-api-key
     - key: GROQ_API_KEY
       value: your-groq-api-key
   ```

2. **Deploy via CLI**
   ```bash
   doctl apps create --spec app.yaml
   ```

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_API_KEY` | Google Gemini AI API key | `AIza...` |
| `GROQ_API_KEY` | Groq AI API key | `gsk_...` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `123...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `GOCSPX-...` |
| `GOOGLE_REDIRECT_URI` | OAuth redirect URI | `https://yourapp.com/api/calendar/callback` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FLASK_ENV` | Flask environment | `development` |
| `FLASK_DEBUG` | Debug mode | `True` |
| `PORT` | Server port | `5000` |

## 🔧 Configuration Files

### Frontend Configuration

**vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

**package.json Scripts**
```json
{
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### Backend Configuration

**Flask App Configuration**
```python
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
    GROQ_API_KEY = os.environ.get('GROQ_API_KEY')
    GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
    GOOGLE_REDIRECT_URI = os.environ.get('GOOGLE_REDIRECT_URI')
```

## 🚦 Health Checks

### Application Health Endpoints

Add health check endpoints to monitor deployment:

```python
@app.route('/health')
def health_check():
    return {
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    }

@app.route('/api/health')
def api_health_check():
    return {
        'api_status': 'healthy',
        'ai_providers': {
            'gemini': bool(os.getenv('GOOGLE_API_KEY')),
            'groq': bool(os.getenv('GROQ_API_KEY'))
        }
    }
```

### Monitoring Commands

```bash
# Check application health
curl http://localhost:5000/health

# Check API health
curl http://localhost:5000/api/health

# Test AI endpoints
curl -X POST http://localhost:5000/api/devotions \
  -H "Content-Type: application/json"
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**.github/workflows/deploy.yml**
```yaml
name: Deploy DSCPL

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
        
    - name: Setup Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.11'
        
    - name: Install dependencies
      run: |
        cd frontend && npm install
        cd ../backend && pip install -r requirements.txt
        
    - name: Build frontend
      run: |
        cd frontend && npm run build
        cp -r dist/* ../backend/src/static/
        
    - name: Deploy to production
      run: |
        # Add your deployment commands here
        echo "Deploying to production..."
```

## 🐳 Docker Deployment

### Dockerfile

**Frontend Dockerfile**
```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Dockerfile**
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["python", "src/main.py"]
```

### Docker Compose

**docker-compose.yml**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
      
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
      - GROQ_API_KEY=${GROQ_API_KEY}
    volumes:
      - ./backend:/app
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Flask-CORS is properly configured
   - Check allowed origins in CORS settings

2. **API Key Issues**
   - Verify environment variables are set
   - Check API key permissions and quotas

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js and Python versions

4. **Static File Issues**
   - Ensure frontend build is copied to backend static folder
   - Check Flask static folder configuration

### Debug Commands

```bash
# Check environment variables
env | grep -E "(GOOGLE|GROQ)"

# Test API endpoints
curl -X GET http://localhost:5000/api/devotions

# Check logs
tail -f backend/logs/app.log

# Verify build output
ls -la frontend/dist/
ls -la backend/src/static/
```

## 📊 Performance Optimization

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Bundle size analysis with webpack-bundle-analyzer
- Service worker for offline functionality

### Backend Optimization
- API response caching
- Database query optimization
- Rate limiting for AI API calls
- Async request handling

## 🔒 Security Considerations

### Production Security
- Use HTTPS in production
- Secure API key storage
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration for production domains

### Environment Security
```bash
# Use environment files for sensitive data
echo "GOOGLE_API_KEY=your-key" > .env
echo ".env" >> .gitignore
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Multiple backend instances
- Shared session storage
- CDN for static assets

### Vertical Scaling
- Resource monitoring
- Performance profiling
- Database optimization
- Caching strategies

---

This deployment guide provides comprehensive instructions for deploying DSCPL in various environments. Choose the deployment method that best fits your needs and infrastructure requirements.

