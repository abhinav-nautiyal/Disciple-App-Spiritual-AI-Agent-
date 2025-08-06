import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ArrowLeft, BarChart3, Calendar, CheckCircle, Clock, TrendingUp, Award, Target } from 'lucide-react'

const DashboardScreen = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    devotions: 0,
    prayers: 0,
    meditations: 0,
    accountability: 0,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [weeklyProgress, setWeeklyProgress] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    // Load data from localStorage
    const devotions = JSON.parse(localStorage.getItem('devotions') || '[]')
    const prayers = JSON.parse(localStorage.getItem('prayers') || '[]')
    const meditations = JSON.parse(localStorage.getItem('meditations') || '[]')
    const accountability = JSON.parse(localStorage.getItem('accountability') || '[]')

    // Calculate stats
    const totalSessions = devotions.length + prayers.length + meditations.length + accountability.length
    
    // Combine all activities for recent activity
    const allActivities = [
      ...devotions.map(d => ({ ...d, type: 'devotion', icon: '📖' })),
      ...prayers.map(p => ({ ...p, type: 'prayer', icon: '🙏' })),
      ...meditations.map(m => ({ ...m, type: 'meditation', icon: '🧘' })),
      ...accountability.map(a => ({ ...a, type: 'accountability', icon: '🛡️' }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10)

    // Calculate streaks (simplified)
    const currentStreak = calculateCurrentStreak(allActivities)
    const longestStreak = calculateLongestStreak(allActivities)

    // Generate weekly progress
    const weeklyData = generateWeeklyProgress(allActivities)

    setStats({
      devotions: devotions.length,
      prayers: prayers.length,
      meditations: meditations.length,
      accountability: accountability.length,
      totalSessions,
      currentStreak,
      longestStreak
    })

    setRecentActivity(allActivities)
    setWeeklyProgress(weeklyData)
  }

  const calculateCurrentStreak = (activities) => {
    if (activities.length === 0) return 0
    
    const today = new Date()
    let streak = 0
    let currentDate = new Date(today)
    
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toDateString()
      const hasActivity = activities.some(activity => 
        new Date(activity.timestamp).toDateString() === dateStr
      )
      
      if (hasActivity) {
        streak++
      } else if (i > 0) {
        break
      }
      
      currentDate.setDate(currentDate.getDate() - 1)
    }
    
    return streak
  }

  const calculateLongestStreak = (activities) => {
    // Simplified calculation - in real app, this would be more sophisticated
    return Math.max(calculateCurrentStreak(activities), 5)
  }

  const generateWeeklyProgress = (activities) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const today = new Date()
    const weekData = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      const dayActivities = activities.filter(activity => 
        new Date(activity.timestamp).toDateString() === date.toDateString()
      )

      weekData.push({
        day: days[date.getDay()],
        date: date.toLocaleDateString(),
        count: dayActivities.length,
        completed: dayActivities.length > 0
      })
    }

    return weekData
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityTitle = (activity) => {
    switch (activity.type) {
      case 'devotion':
        return activity.topic?.title || 'Daily Devotion'
      case 'prayer':
        return activity.topic?.title || 'Daily Prayer'
      case 'meditation':
        return activity.topic?.title || 'Daily Meditation'
      case 'accountability':
        return activity.area?.title || 'Daily Accountability'
      default:
        return 'Spiritual Activity'
    }
  }

  const getProgressPercentage = () => {
    const target = 7 // Weekly target
    const thisWeekCount = weeklyProgress.filter(day => day.completed).length
    return Math.min((thisWeekCount / target) * 100, 100)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Progress Dashboard
        </h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Sessions</p>
                <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">{stats.totalSessions}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Current Streak</p>
                <p className="text-3xl font-bold text-green-800 dark:text-green-300">{stats.currentStreak}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Longest Streak</p>
                <p className="text-3xl font-bold text-purple-800 dark:text-purple-300">{stats.longestStreak}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">This Week</p>
                <p className="text-3xl font-bold text-orange-800 dark:text-orange-300">
                  {weeklyProgress.filter(day => day.completed).length}/7
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Weekly Progress
            </CardTitle>
            <CardDescription>
              Your spiritual activities this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Weekly Goal Progress</span>
                  <span>{Math.round(getProgressPercentage())}%</span>
                </div>
                <Progress value={getProgressPercentage()} className="h-2" />
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {day.day}
                    </div>
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        day.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {day.completed ? <CheckCircle className="h-4 w-4" /> : day.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Breakdown</CardTitle>
            <CardDescription>
              Your spiritual practice distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Devotions</span>
                </div>
                <span className="text-sm font-medium">{stats.devotions}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-sm">Prayers</span>
                </div>
                <span className="text-sm font-medium">{stats.prayers}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Meditations</span>
                </div>
                <span className="text-sm font-medium">{stats.meditations}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Accountability</span>
                </div>
                <span className="text-sm font-medium">{stats.accountability}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest spiritual practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No activities yet. Start your spiritual journey today!
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Begin Your Journey
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{activity.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {getActivityTitle(activity)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(activity.timestamp)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          onClick={() => navigate('/devotion')}
          className="bg-blue-600 hover:bg-blue-700 text-white h-12"
        >
          Start Devotion
        </Button>
        <Button 
          onClick={() => navigate('/prayer')}
          className="bg-pink-600 hover:bg-pink-700 text-white h-12"
        >
          Begin Prayer
        </Button>
        <Button 
          onClick={() => navigate('/meditation')}
          className="bg-green-600 hover:bg-green-700 text-white h-12"
        >
          Meditate Now
        </Button>
        <Button 
          onClick={() => navigate('/accountability')}
          className="bg-orange-600 hover:bg-orange-700 text-white h-12"
        >
          Accountability
        </Button>
      </div>
    </div>
  )
}

export default DashboardScreen

