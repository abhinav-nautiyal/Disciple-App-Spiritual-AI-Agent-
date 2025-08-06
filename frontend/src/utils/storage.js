// Storage utilities for DSCPL app
// Handles localStorage and sessionStorage operations

const STORAGE_KEYS = {
  // User preferences
  THEME: 'dscpl_theme',
  AI_PROVIDER: 'dscpl_ai_provider',
  
  // Spiritual activities
  DEVOTIONS: 'dscpl_devotions',
  PRAYERS: 'dscpl_prayers',
  MEDITATIONS: 'dscpl_meditations',
  ACCOUNTABILITY: 'dscpl_accountability',
  
  // Calendar and scheduling
  SCHEDULED_PROGRAMS: 'dscpl_scheduled_programs',
  CALENDAR_CONNECTED: 'dscpl_calendar_connected',
  
  // Chat history
  CHAT_HISTORY: 'dscpl_chat_history',
  
  // Progress tracking
  PROGRESS_STATS: 'dscpl_progress_stats',
  DAILY_STREAKS: 'dscpl_daily_streaks',
  
  // User settings
  USER_SETTINGS: 'dscpl_user_settings'
}

class StorageManager {
  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability()
    this.isSessionStorageAvailable = this.checkSessionStorageAvailability()
  }

  checkLocalStorageAvailability() {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  checkSessionStorageAvailability() {
    try {
      const test = '__sessionStorage_test__'
      sessionStorage.setItem(test, test)
      sessionStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  // Generic storage methods
  setItem(key, value, useSession = false) {
    try {
      const storage = useSession ? sessionStorage : localStorage
      const available = useSession ? this.isSessionStorageAvailable : this.isLocalStorageAvailable
      
      if (!available) {
        console.warn('Storage not available, using memory fallback')
        return false
      }

      storage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error setting storage item:', error)
      return false
    }
  }

  getItem(key, defaultValue = null, useSession = false) {
    try {
      const storage = useSession ? sessionStorage : localStorage
      const available = useSession ? this.isSessionStorageAvailable : this.isLocalStorageAvailable
      
      if (!available) {
        return defaultValue
      }

      const item = storage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error getting storage item:', error)
      return defaultValue
    }
  }

  removeItem(key, useSession = false) {
    try {
      const storage = useSession ? sessionStorage : localStorage
      const available = useSession ? this.isSessionStorageAvailable : this.isLocalStorageAvailable
      
      if (!available) {
        return false
      }

      storage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing storage item:', error)
      return false
    }
  }

  clear(useSession = false) {
    try {
      const storage = useSession ? sessionStorage : localStorage
      const available = useSession ? this.isSessionStorageAvailable : this.isLocalStorageAvailable
      
      if (!available) {
        return false
      }

      storage.clear()
      return true
    } catch (error) {
      console.error('Error clearing storage:', error)
      return false
    }
  }

  // Spiritual activities methods
  saveDevotionActivity(activity) {
    const devotions = this.getItem(STORAGE_KEYS.DEVOTIONS, [])
    const newActivity = {
      id: `devotion_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...activity
    }
    devotions.push(newActivity)
    return this.setItem(STORAGE_KEYS.DEVOTIONS, devotions)
  }

  getDevotionActivities() {
    return this.getItem(STORAGE_KEYS.DEVOTIONS, [])
  }

  savePrayerActivity(activity) {
    const prayers = this.getItem(STORAGE_KEYS.PRAYERS, [])
    const newActivity = {
      id: `prayer_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...activity
    }
    prayers.push(newActivity)
    return this.setItem(STORAGE_KEYS.PRAYERS, prayers)
  }

  getPrayerActivities() {
    return this.getItem(STORAGE_KEYS.PRAYERS, [])
  }

  saveMeditationActivity(activity) {
    const meditations = this.getItem(STORAGE_KEYS.MEDITATIONS, [])
    const newActivity = {
      id: `meditation_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...activity
    }
    meditations.push(newActivity)
    return this.setItem(STORAGE_KEYS.MEDITATIONS, meditations)
  }

  getMeditationActivities() {
    return this.getItem(STORAGE_KEYS.MEDITATIONS, [])
  }

  saveAccountabilityActivity(activity) {
    const accountability = this.getItem(STORAGE_KEYS.ACCOUNTABILITY, [])
    const newActivity = {
      id: `accountability_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...activity
    }
    accountability.push(newActivity)
    return this.setItem(STORAGE_KEYS.ACCOUNTABILITY, accountability)
  }

  getAccountabilityActivities() {
    return this.getItem(STORAGE_KEYS.ACCOUNTABILITY, [])
  }

  // Chat history methods
  saveChatMessage(message) {
    const chatHistory = this.getItem(STORAGE_KEYS.CHAT_HISTORY, [])
    const newMessage = {
      id: `chat_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...message
    }
    chatHistory.push(newMessage)
    
    // Keep only last 100 messages to prevent storage overflow
    if (chatHistory.length > 100) {
      chatHistory.splice(0, chatHistory.length - 100)
    }
    
    return this.setItem(STORAGE_KEYS.CHAT_HISTORY, chatHistory)
  }

  getChatHistory() {
    return this.getItem(STORAGE_KEYS.CHAT_HISTORY, [])
  }

  clearChatHistory() {
    return this.setItem(STORAGE_KEYS.CHAT_HISTORY, [])
  }

  // Scheduled programs methods
  saveScheduledProgram(program) {
    const programs = this.getItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, [])
    const newProgram = {
      id: `program_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active',
      ...program
    }
    programs.push(newProgram)
    return this.setItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, programs)
  }

  getScheduledPrograms() {
    return this.getItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, [])
  }

  updateScheduledProgram(programId, updates) {
    const programs = this.getItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, [])
    const index = programs.findIndex(p => p.id === programId)
    
    if (index !== -1) {
      programs[index] = { ...programs[index], ...updates }
      return this.setItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, programs)
    }
    
    return false
  }

  deleteScheduledProgram(programId) {
    const programs = this.getItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, [])
    const filtered = programs.filter(p => p.id !== programId)
    return this.setItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, filtered)
  }

  // Progress tracking methods
  updateProgressStats() {
    const devotions = this.getDevotionActivities()
    const prayers = this.getPrayerActivities()
    const meditations = this.getMeditationActivities()
    const accountability = this.getAccountabilityActivities()

    const stats = {
      devotions: devotions.length,
      prayers: prayers.length,
      meditations: meditations.length,
      accountability: accountability.length,
      totalSessions: devotions.length + prayers.length + meditations.length + accountability.length,
      lastUpdated: new Date().toISOString()
    }

    // Calculate streaks
    const allActivities = [
      ...devotions.map(d => ({ ...d, type: 'devotion' })),
      ...prayers.map(p => ({ ...p, type: 'prayer' })),
      ...meditations.map(m => ({ ...m, type: 'meditation' })),
      ...accountability.map(a => ({ ...a, type: 'accountability' }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    stats.currentStreak = this.calculateCurrentStreak(allActivities)
    stats.longestStreak = this.calculateLongestStreak(allActivities)

    this.setItem(STORAGE_KEYS.PROGRESS_STATS, stats)
    return stats
  }

  getProgressStats() {
    return this.getItem(STORAGE_KEYS.PROGRESS_STATS, {
      devotions: 0,
      prayers: 0,
      meditations: 0,
      accountability: 0,
      totalSessions: 0,
      currentStreak: 0,
      longestStreak: 0
    })
  }

  calculateCurrentStreak(activities) {
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

  calculateLongestStreak(activities) {
    if (activities.length === 0) return 0
    
    // Group activities by date
    const activityDates = activities.map(activity => 
      new Date(activity.timestamp).toDateString()
    )
    
    const uniqueDates = [...new Set(activityDates)].sort((a, b) => 
      new Date(a) - new Date(b)
    )
    
    let longestStreak = 0
    let currentStreak = 1
    
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1])
      const currentDate = new Date(uniqueDates[i])
      const dayDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24)
      
      if (dayDiff === 1) {
        currentStreak++
      } else {
        longestStreak = Math.max(longestStreak, currentStreak)
        currentStreak = 1
      }
    }
    
    return Math.max(longestStreak, currentStreak)
  }

  // User settings methods
  saveUserSettings(settings) {
    const currentSettings = this.getUserSettings()
    const updatedSettings = { ...currentSettings, ...settings }
    return this.setItem(STORAGE_KEYS.USER_SETTINGS, updatedSettings)
  }

  getUserSettings() {
    return this.getItem(STORAGE_KEYS.USER_SETTINGS, {
      theme: 'light',
      aiProvider: 'gemini',
      notifications: true,
      reminderTime: '07:00',
      autoSync: false
    })
  }

  // Theme methods
  setTheme(theme) {
    return this.setItem(STORAGE_KEYS.THEME, theme)
  }

  getTheme() {
    return this.getItem(STORAGE_KEYS.THEME, 'light')
  }

  // AI provider methods
  setAIProvider(provider) {
    return this.setItem(STORAGE_KEYS.AI_PROVIDER, provider)
  }

  getAIProvider() {
    return this.getItem(STORAGE_KEYS.AI_PROVIDER, 'gemini')
  }

  // Calendar connection status
  setCalendarConnected(connected) {
    return this.setItem(STORAGE_KEYS.CALENDAR_CONNECTED, connected)
  }

  isCalendarConnected() {
    return this.getItem(STORAGE_KEYS.CALENDAR_CONNECTED, false)
  }

  // Export/Import data
  exportData() {
    const data = {
      devotions: this.getDevotionActivities(),
      prayers: this.getPrayerActivities(),
      meditations: this.getMeditationActivities(),
      accountability: this.getAccountabilityActivities(),
      chatHistory: this.getChatHistory(),
      scheduledPrograms: this.getScheduledPrograms(),
      progressStats: this.getProgressStats(),
      userSettings: this.getUserSettings(),
      exportDate: new Date().toISOString()
    }
    
    return data
  }

  importData(data) {
    try {
      if (data.devotions) this.setItem(STORAGE_KEYS.DEVOTIONS, data.devotions)
      if (data.prayers) this.setItem(STORAGE_KEYS.PRAYERS, data.prayers)
      if (data.meditations) this.setItem(STORAGE_KEYS.MEDITATIONS, data.meditations)
      if (data.accountability) this.setItem(STORAGE_KEYS.ACCOUNTABILITY, data.accountability)
      if (data.chatHistory) this.setItem(STORAGE_KEYS.CHAT_HISTORY, data.chatHistory)
      if (data.scheduledPrograms) this.setItem(STORAGE_KEYS.SCHEDULED_PROGRAMS, data.scheduledPrograms)
      if (data.progressStats) this.setItem(STORAGE_KEYS.PROGRESS_STATS, data.progressStats)
      if (data.userSettings) this.setItem(STORAGE_KEYS.USER_SETTINGS, data.userSettings)
      
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  // Clear all app data
  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      this.removeItem(key)
    })
    return true
  }
}

// Create singleton instance
const storage = new StorageManager()

export default storage
export { STORAGE_KEYS }

