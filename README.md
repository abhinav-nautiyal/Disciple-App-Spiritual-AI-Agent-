# DSCPL - AI Spiritual Companion

DSCPL is a modern, full-stack web application that serves as an AI-powered spiritual companion. Built with React.js frontend and Flask backend, it provides personalized spiritual guidance, daily devotionals, prayer assistance, meditation guidance, and progress tracking. The application integrates with Google Gemini and Groq AI for intelligent spiritual conversations and guidance.

## Table of Content
- [Project Structure](#Project_Structure)
- [Prerequisites & Installation](#Prerequisites_and_Installation)
- [Usage](#Usage)
- [Technical Details](#Technical_Details)
- [API Endpoints](#API_Endpoints)
- [Features](#Features)

## Project_Structure
```bash
dscpl_project/
├── backend/                    # Flask backend application
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   │   ├── ai_chat.py     # AI conversation endpoints
│   │   │   ├── spiritual_programs.py # Spiritual content API
│   │   │   ├── calendar_integration.py # Google Calendar API
│   │   │   └── user.py        # User management
│   │   ├── models/            # Database models
│   │   │   └── user.py        # User model
│   │   ├── static/            # Built frontend files
│   │   └── main.py            # Flask application entry point
│   └── requirements.txt       # Python dependencies
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Reusable UI components (50+ components)
│   │   │   ├── WelcomeScreen.jsx
│   │   │   ├── ChatScreen.jsx
│   │   │   ├── DevotionScreen.jsx
│   │   │   ├── PrayerScreen.jsx
│   │   │   ├── MeditationScreen.jsx
│   │   │   ├── AccountabilityScreen.jsx
│   │   │   ├── CalendarScreen.jsx
│   │   │   ├── DashboardScreen.jsx
│   │   │   ├── SOSScreen.jsx
│   │   │   └── InspirationScreen.jsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useStorage.js # Storage management hooks
│   │   ├── utils/            # Utility functions
│   │   │   ├── api.js        # API client
│   │   │   └── storage.js    # Storage management
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Application entry point
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── pnpm-lock.yaml        # Dependency lock file
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
├── FEATURES.md              # Detailed features documentation
└── DEPLOYMENT_GUIDE.md      # Deployment instructions
```

## Prerequisites_and_Installation
### Prerequisites
- **Node.js**: Version 20.18.0 or higher
- **Python**: Version 3.11 or higher
- **pnpm**: Package manager for Node.js
- **pip**: Python package manager

### Installation
1. **Clone the repository:**
```bash
git clone https://github.com/your-username/dscpl_project.git
cd dscpl_project
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env file with your API keys
```

3. **Install frontend dependencies:**
```bash
cd frontend
pnpm install
```

4. **Install backend dependencies:**
```bash
cd ../backend
pip install -r requirements.txt
```

5. **Build frontend for production:**
```bash
cd ../frontend
pnpm run build
cp -r dist/* ../backend/src/static/
```

## Usage
### Development Mode
1. **Start backend server:**
```bash
cd backend
python3.11 src/main.py
```
Backend runs on: `http://localhost:5001`

2. **Start frontend development server:**
```bash
cd frontend
pnpm run dev
```
Frontend runs on: `http://localhost:5173`

### Production Mode
1. **Build and serve integrated application:**
```bash
cd frontend && pnpm run build
cp -r dist/* ../backend/src/static/
cd ../backend && python3.11 src/main.py
```
Full application runs on: `http://localhost:5001`

### Web Interface
Access the application:
```bash
# Development
http://localhost:5173

# Production
http://localhost:5001
```

## Technical_Details
### Frontend Technology Stack
- **Framework**: React.js 19.1.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM 7.6.1
- **Package Manager**: pnpm

### Backend Technology Stack
- **Framework**: Flask 3.1.1
- **AI Engine**: LangChain 0.3.27
- **AI Providers**: Google Gemini, Groq API
- **Database**: SQLAlchemy with SQLite
- **CORS**: Flask-CORS for cross-origin requests
- **External APIs**: Google Calendar API

### Data Management
- **Storage**: LocalStorage for offline-first experience
- **Session Management**: Browser session storage
- **Data Export/Import**: JSON backup and restore
- **Privacy**: All data stored locally, no server storage

### AI Integration
- **Dual AI Providers**: Seamless switching between Gemini and Groq
- **Spiritual Focus**: Biblically grounded system prompts
- **Context Awareness**: Conversation memory and continuity
- **Quick Responses**: Pre-defined spiritual guidance options

## API_Endpoints
### AI Chat
```http
POST /api/chat
{
    "message": "I need spiritual guidance",
    "provider": "gemini|groq",
    "context": "previous conversation context"
}
```

### Spiritual Programs
```http
GET /api/devotions                    # Get available devotion topics
GET /api/devotions/{id}              # Get specific devotion content
GET /api/prayers                     # Get available prayer topics
GET /api/prayers/{id}                # Get specific prayer content
GET /api/meditations                 # Get available meditation topics
GET /api/meditations/{id}            # Get specific meditation content
GET /api/accountability              # Get accountability areas
GET /api/accountability/{id}         # Get specific accountability content
POST /api/complete                   # Mark activity as completed
POST /api/schedule                   # Schedule spiritual program
GET /api/inspiration                 # Get daily inspiration content
```

### Calendar Integration
```http
GET /api/calendar/status             # Check calendar connection status
GET /api/calendar/auth/google        # Initiate Google OAuth
POST /api/calendar/disconnect        # Disconnect calendar
POST /api/calendar/events            # Create calendar events
GET /api/calendar/events             # Get calendar events
DELETE /api/calendar/events/{id}     # Delete calendar event
POST /api/calendar/sync              # Sync programs with calendar
GET /api/calendar/preferences        # Get calendar preferences
POST /api/calendar/preferences       # Update calendar preferences
```

### Quick Responses
```http
GET /api/chat/quick-responses        # Get predefined spiritual guidance options
POST /api/chat/scripture             # Get scripture-based guidance for topics
```

## Features
### Core Functionality
- ✅ **AI-Powered Chat**: Dual AI integration (Gemini & Groq)
- ✅ **Daily Devotion**: 7 spiritual topics with Bible readings
- ✅ **Daily Prayer**: ACTS model and structured prayer guidance
- ✅ **Daily Meditation**: Scripture-focused meditation practices
- ✅ **Daily Accountability**: Spiritual discipline tracking
- ✅ **Progress Dashboard**: Visual analytics and streak tracking
- ✅ **Calendar Integration**: Google Calendar scheduling
- ✅ **Emergency SOS**: Crisis spiritual support
- ✅ **Inspiration Feed**: Daily uplifting content

### Technical Features
- ✅ **Responsive Design**: Mobile-first, cross-device compatibility
- ✅ **Dark/Light Theme**: Complete theme system
- ✅ **Offline Support**: Core features work without internet
- ✅ **Data Export/Import**: Complete backup and restore
- ✅ **Real-time Chat**: Streaming AI responses
- ✅ **Session Management**: Persistent user sessions
- ✅ **Error Handling**: Graceful failure management
- ✅ **Accessibility**: Screen reader and keyboard navigation

### AI & Spiritual Features
- ✅ **Context-Aware Conversations**: Memory of previous discussions
- ✅ **Scripture Integration**: Bible verse recommendations
- ✅ **Spiritual Guidance**: Biblically grounded responses
- ✅ **Provider Switching**: Real-time AI model selection
- ✅ **Quick Response System**: Pre-defined spiritual prompts
- ✅ **Personalized Content**: Adaptive spiritual recommendations

### Security & Privacy
- ✅ **Local Data Storage**: No personal data on servers
- ✅ **API Key Security**: Secure environment variable management
- ✅ **CORS Protection**: Proper cross-origin request handling
- ✅ **Input Validation**: XSS protection and sanitization
- ✅ **Privacy-First**: Anonymous usage, no tracking

### User Experience
- ✅ **Modern UI**: Clean, spiritual-themed interface
- ✅ **Micro-interactions**: Smooth animations and transitions
- ✅ **Touch Optimization**: Mobile-friendly interactions
- ✅ **Performance**: Optimized loading and caching
- ✅ **Progressive Web App**: Installable web application

