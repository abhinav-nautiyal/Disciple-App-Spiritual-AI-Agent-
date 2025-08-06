import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Heart, MessageCircle, Calendar, BarChart3, AlertTriangle, Sparkles, Sun, Moon } from 'lucide-react'
import './App.css'

// Import components (we'll create these)
import WelcomeScreen from './components/WelcomeScreen'
import DevotionScreen from './components/DevotionScreen'
import PrayerScreen from './components/PrayerScreen'
import MeditationScreen from './components/MeditationScreen'
import AccountabilityScreen from './components/AccountabilityScreen'
import ChatScreen from './components/ChatScreen'
import CalendarScreen from './components/CalendarScreen'
import DashboardScreen from './components/DashboardScreen'
import SOSScreen from './components/SOSScreen'
import InspirationScreen from './components/InspirationScreen'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Router>
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 min-h-screen">
          {/* Header with theme toggle */}
          <header className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">DSCPL</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </header>

          {/* Main content */}
          <main className="container mx-auto px-4 pb-8">
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/devotion" element={<DevotionScreen />} />
              <Route path="/prayer" element={<PrayerScreen />} />
              <Route path="/meditation" element={<MeditationScreen />} />
              <Route path="/accountability" element={<AccountabilityScreen />} />
              <Route path="/chat" element={<ChatScreen />} />
              <Route path="/calendar" element={<CalendarScreen />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/sos" element={<SOSScreen />} />
              <Route path="/inspiration" element={<InspirationScreen />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  )
}

export default App

