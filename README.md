# DSCPL - AI Spiritual Companion

A modern, intuitive, and accessible web application that serves as an AI-powered spiritual companion. The DSCPL app is designed to help users cultivate daily spiritual discipline and emotional wellness through personalized, interactive tools.

## Table of Content
- [Project Vision](#Project_Vision)
- [Core Features](#Core_Features)
- [UI/UX Philosophy](#UI/UX_Philosophy)
- [Technology Stack](#Technology_Stack)
- [Getting Started](#Getting_Started)
- [Project Structure](#Project_Structure)
- [API Endpoints](#API_Endpoints)
- [Data Storage](#Data_Storage)
- [Key Features Implementation](#Key_Features_Implementation)
- [Security & Privacy](#Security_&_Privacy)
- [Deployment Options](#Deployment_Options)
- [Contributing](#Contributing)
- [License](#License)
- [Acknowledgments](#Acknowledgments)

## Project_Vision
To develop a comprehensive spiritual companion that combines modern technology with timeless spiritual practices, providing users with:
- Personalized AI-powered guidance
- Structured spiritual programs
- Progress tracking and accountability
- Seamless calendar integration
- Emergency spiritual support

## Core_Features
### 🤖 AI-Powered Chat
- **Dual AI Integration**: Switch between Google Gemini for nuanced conversations and Groq API for high-speed responses
- **Context-Aware Guidance**: Theologically grounded and contextually relevant spiritual support
- **Quick Response Options**: Pre-defined spiritual guidance prompts
- **Scripture Integration**: AI-powered scripture recommendations based on topics

### 📖 Guided Spiritual Programs
- **Daily Devotion**: 5-minute Bible reading with prayer and reflection
- **Prayer**: Structured prayer using various models (ACTS, etc.)
- **Meditation**: Scripture-focused meditation with breathing guides
- **Accountability**: Weekly spiritual check-ins and progress tracking

### 📅 Google Calendar Integration
- **Seamless Scheduling**: Schedule spiritual programs directly to Google Calendar
- **Automatic Reminders**: Set up daily, weekly, or custom spiritual routines
- **Progress Sync**: Track completion and maintain consistency

### 📊 Visual Progress Dashboard
- **Activity Tracking**: Monitor completed devotions, prayers, meditations, and accountability sessions
- **Streak Tracking**: Current and longest spiritual discipline streaks
- **Weekly Goals**: Set and track weekly spiritual goals
- **Visual Analytics**: Charts and graphs showing spiritual growth over time

### 🆘 Emergency SOS Support
- **Instant Access**: Quick spiritual support during moments of distress
- **Pre-defined Content**: Curated scripture, prayers, and encouragement
- **Crisis Resources**: Immediate spiritual guidance for difficult situations

## UI/UX_Philosophy
### Design Aesthetic
- **Spiritual + Modern Theme**: Calming color palettes with contemporary layouts
- **Responsive Design**: Mobile-first approach ensuring flawless experience across all devices
- **Micro-interactions**: Subtle animations and smooth transitions for fluid user experience
- **Accessibility**: Screen reader support and keyboard-only navigation
- **Theming**: Light and Dark mode support

### Color Palette
- **Primary**: Spiritual purple (#8B5CF6)
- **Secondary**: Calming blue (#3B82F6)
- **Accent**: Warm gold (#F59E0B)
- **Success**: Peaceful green (#10B981)
- **Warning**: Gentle orange (#F97316)

## Technology_Stack
### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM

### Backend
- **Framework**: Python Flask
- **AI Engine**: LangChain with multiple LLM providers
- **APIs**: Google Gemini, Groq API
- **External Integration**: Google Calendar API
- **CORS**: Flask-CORS for cross-origin requests

### Database & Storage
- **Primary Storage**: LocalStorage for offline-first experience
- **Session Storage**: Temporary data and chat sessions
- **Data Management**: Custom storage utilities with export/import capabilities

### Development Tools
- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Development Server**: Flask development server
- **Environment**: Node.js 20.18.0, Python 3.11

## Getting_Started
### Prerequisites
- Node.js 20.18.0 or higher
- Python 3.11 or higher
- pnpm package manager

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/abhinav-nautiyal/Disciple-App-Spiritual-AI-Agent-.git
   cd dscpl_project
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   pnpm install
   ```

3. **Setup Backend**
   ```bash
   cd ../backend
   pip3 install -r requirements.txt
   ```

4. **Environment Configuration**
   Create `.env` files for both frontend and backend:
   
   Frontend `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=DSCPL - AI Spiritual Companion
   VITE_APP_VERSION=1.0.0
   ```
   
   Backend environment variables:
   ```
   GOOGLE_API_KEY=your-google-api-key
   GROQ_API_KEY=your-groq-api-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### Running the Application

#### Development Mode (Separate Servers)
1. **Start Backend Server**
   ```bash
   cd backend
   python3 src/main.py
   ```
   Backend will run on `http://localhost:5000`

2. **Start Frontend Server**
   ```bash
   cd frontend
   pnpm run dev
   ```
   Frontend will run on `http://localhost:5173`

#### Production Mode (Integrated Server)
1. **Build Frontend**
   ```bash
   cd frontend
   pnpm run build
   ```

2. **Copy Build to Backend**
   ```bash
   cp -r dist/* ../backend/src/static/
   ```

3. **Start Integrated Server**
   ```bash
   cd ../backend
   python3 src/main.py
   ```
   Full application will run on `http://localhost:5000`

## Project_Structure
```bash
dscpl_project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Reusable UI components
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
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useStorage.js
│   │   ├── utils/          # Utility functions
│   │   │   ├── api.js      # API client
│   │   │   └── storage.js  # Storage management
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Static assets
│   ├── dist/              # Built application (after build)
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── backend/                # Flask backend application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   │   ├── ai_chat.py
│   │   │   ├── spiritual_programs.py
│   │   │   ├── calendar_integration.py
│   │   │   └── user.py
│   │   ├── models/        # Data models
│   │   │   └── user.py
│   │   ├── static/        # Static files (built frontend)
│   │   └── main.py        # Flask application entry point
│   └── requirements.txt   # Backend dependencies
└── README.md             # Project documentation
```

## API_Endpoints
### AI Chat
- `POST /api/chat` - Send message to AI
- `POST /api/chat/stream` - Streaming chat responses
- `GET /api/chat/quick-responses` - Get quick response options
- `POST /api/chat/scripture` - Get scripture guidance for topics

### Spiritual Programs
- `GET /api/devotions` - Get available devotion topics
- `GET /api/devotions/{id}` - Get specific devotion content
- `GET /api/prayers` - Get available prayer topics
- `GET /api/prayers/{id}` - Get specific prayer content
- `GET /api/meditations` - Get available meditation topics
- `GET /api/meditations/{id}` - Get specific meditation content
- `GET /api/accountability` - Get accountability areas
- `GET /api/accountability/{id}` - Get specific accountability content
- `POST /api/complete` - Mark activity as completed
- `POST /api/schedule` - Schedule spiritual program
- `GET /api/inspiration` - Get daily inspiration content

### Calendar Integration
- `GET /api/calendar/status` - Check calendar connection status
- `GET /api/calendar/auth/google` - Initiate Google OAuth
- `POST /api/calendar/disconnect` - Disconnect calendar
- `POST /api/calendar/events` - Create calendar events
- `GET /api/calendar/events` - Get calendar events
- `DELETE /api/calendar/events/{id}` - Delete calendar event
- `POST /api/calendar/sync` - Sync programs with calendar
- `GET /api/calendar/preferences` - Get calendar preferences
- `POST /api/calendar/preferences` - Update calendar preferences

## Data_Storage
### LocalStorage Structure
- `dscpl_devotions` - Completed devotion activities
- `dscpl_prayers` - Completed prayer activities
- `dscpl_meditations` - Completed meditation activities
- `dscpl_accountability` - Completed accountability sessions
- `dscpl_chat_history` - Chat conversation history
- `dscpl_scheduled_programs` - Scheduled spiritual programs
- `dscpl_progress_stats` - Progress tracking statistics
- `dscpl_user_settings` - User preferences and settings
- `dscpl_theme` - Current theme (light/dark)
- `dscpl_ai_provider` - Selected AI provider
- `dscpl_calendar_connected` - Calendar connection status

### Data Export/Import
- **Export**: Download all user data as JSON backup
- **Import**: Restore data from JSON backup file
- **Clear**: Remove all stored data (with confirmation)

## Key_Features_Implementation
### Spiritual Activities Tracking
Each spiritual activity (devotion, prayer, meditation, accountability) is tracked with:
- Unique ID and timestamp
- Activity type and topic
- Duration and completion status
- User notes and ratings
- Progress towards goals

### AI Integration
- **LangChain Framework**: Manages multiple AI providers
- **Context Awareness**: Maintains conversation context
- **Spiritual Focus**: System prompts ensure biblical guidance
- **Provider Switching**: Seamless switching between Gemini and Groq

### Progress Analytics
- **Streak Calculation**: Current and longest streaks
- **Weekly Goals**: Customizable spiritual goals
- **Activity Distribution**: Visual breakdown of spiritual practices
- **Historical Data**: Long-term progress tracking

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Touch Support**: Touch-friendly interactions
- **Adaptive Layout**: Adjusts to different screen sizes
- **Performance**: Optimized loading and interactions

## Security_&_Privacy
### Data Protection
- **Local Storage**: All personal data stored locally on user's device
- **No Server Storage**: Spiritual activities and progress not stored on servers
- **API Security**: Secure API key management
- **CORS Protection**: Configured cross-origin request handling

### Privacy Features
- **Offline Capability**: Core features work without internet
- **Data Export**: Users can export their data anytime
- **Clear Data**: Option to completely clear all stored data
- **No Tracking**: No user tracking or identification

## Deployment_Options
### Local Development
- Run frontend and backend separately for development
- Hot reloading and debugging capabilities
- Full development tools access

### Local Production
- Integrated Flask server serving React build
- Single server deployment
- Production-optimized build

### Cloud Deployment
- Ready for deployment to cloud platforms
- Environment variable configuration
- Scalable architecture

## Contributing
### Development Guidelines
1. Follow React best practices for frontend development
2. Use Flask blueprints for backend organization
3. Maintain consistent code formatting
4. Write descriptive commit messages
5. Test features thoroughly before committing

### Code Style
- **Frontend**: ESLint + Prettier configuration
- **Backend**: PEP 8 Python style guide
- **Components**: Functional components with hooks
- **API**: RESTful endpoint design

## License
This project is developed as part of a technical assignment and follows the requirements specified in the original assignment documentation.

## Acknowledgments
- **Assignment Provider**: Original requirements and vision
- **UI/UX Inspiration**: Modern spiritual app design patterns
- **Technology Stack**: React, Flask, LangChain, and supporting libraries
- **AI Providers**: Google Gemini and Groq for spiritual guidance capabilities

---

**Built with ❤️ and faith for spiritual growth and daily discipline**

