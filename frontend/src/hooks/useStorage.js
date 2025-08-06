// React hooks for storage management
import { useState, useEffect, useCallback } from 'react'
import storage from '../utils/storage'

// Hook for managing spiritual activities
export const useSpiritualActivities = () => {
  const [activities, setActivities] = useState({
    devotions: [],
    prayers: [],
    meditations: [],
    accountability: []
  })
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = useCallback(() => {
    setLoading(true)
    try {
      const devotions = storage.getDevotionActivities()
      const prayers = storage.getPrayerActivities()
      const meditations = storage.getMeditationActivities()
      const accountability = storage.getAccountabilityActivities()

      setActivities({
        devotions,
        prayers,
        meditations,
        accountability
      })
    } catch (error) {
      console.error('Error loading activities:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveDevotionActivity = useCallback((activity) => {
    const success = storage.saveDevotionActivity(activity)
    if (success) {
      loadActivities()
    }
    return success
  }, [loadActivities])

  const savePrayerActivity = useCallback((activity) => {
    const success = storage.savePrayerActivity(activity)
    if (success) {
      loadActivities()
    }
    return success
  }, [loadActivities])

  const saveMeditationActivity = useCallback((activity) => {
    const success = storage.saveMeditationActivity(activity)
    if (success) {
      loadActivities()
    }
    return success
  }, [loadActivities])

  const saveAccountabilityActivity = useCallback((activity) => {
    const success = storage.saveAccountabilityActivity(activity)
    if (success) {
      loadActivities()
    }
    return success
  }, [loadActivities])

  return {
    activities,
    loading,
    saveDevotionActivity,
    savePrayerActivity,
    saveMeditationActivity,
    saveAccountabilityActivity,
    refreshActivities: loadActivities
  }
}

// Hook for managing chat history
export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChatHistory()
  }, [])

  const loadChatHistory = useCallback(() => {
    setLoading(true)
    try {
      const history = storage.getChatHistory()
      setChatHistory(history)
    } catch (error) {
      console.error('Error loading chat history:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveChatMessage = useCallback((message) => {
    const success = storage.saveChatMessage(message)
    if (success) {
      loadChatHistory()
    }
    return success
  }, [loadChatHistory])

  const clearHistory = useCallback(() => {
    const success = storage.clearChatHistory()
    if (success) {
      setChatHistory([])
    }
    return success
  }, [])

  return {
    chatHistory,
    loading,
    saveChatMessage,
    clearHistory,
    refreshHistory: loadChatHistory
  }
}

// Hook for managing scheduled programs
export const useScheduledPrograms = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = useCallback(() => {
    setLoading(true)
    try {
      const scheduledPrograms = storage.getScheduledPrograms()
      setPrograms(scheduledPrograms)
    } catch (error) {
      console.error('Error loading scheduled programs:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const saveProgram = useCallback((program) => {
    const success = storage.saveScheduledProgram(program)
    if (success) {
      loadPrograms()
    }
    return success
  }, [loadPrograms])

  const updateProgram = useCallback((programId, updates) => {
    const success = storage.updateScheduledProgram(programId, updates)
    if (success) {
      loadPrograms()
    }
    return success
  }, [loadPrograms])

  const deleteProgram = useCallback((programId) => {
    const success = storage.deleteScheduledProgram(programId)
    if (success) {
      loadPrograms()
    }
    return success
  }, [loadPrograms])

  return {
    programs,
    loading,
    saveProgram,
    updateProgram,
    deleteProgram,
    refreshPrograms: loadPrograms
  }
}

// Hook for managing progress stats
export const useProgressStats = () => {
  const [stats, setStats] = useState({
    devotions: 0,
    prayers: 0,
    meditations: 0,
    accountability: 0,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = useCallback(() => {
    setLoading(true)
    try {
      const progressStats = storage.getProgressStats()
      setStats(progressStats)
    } catch (error) {
      console.error('Error loading progress stats:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateStats = useCallback(() => {
    try {
      const updatedStats = storage.updateProgressStats()
      setStats(updatedStats)
      return updatedStats
    } catch (error) {
      console.error('Error updating progress stats:', error)
      return null
    }
  }, [])

  return {
    stats,
    loading,
    updateStats,
    refreshStats: loadStats
  }
}

// Hook for managing user settings
export const useUserSettings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    aiProvider: 'gemini',
    notifications: true,
    reminderTime: '07:00',
    autoSync: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = useCallback(() => {
    setLoading(true)
    try {
      const userSettings = storage.getUserSettings()
      setSettings(userSettings)
    } catch (error) {
      console.error('Error loading user settings:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSettings = useCallback((newSettings) => {
    const success = storage.saveUserSettings(newSettings)
    if (success) {
      setSettings(prev => ({ ...prev, ...newSettings }))
    }
    return success
  }, [])

  const updateSetting = useCallback((key, value) => {
    return updateSettings({ [key]: value })
  }, [updateSettings])

  return {
    settings,
    loading,
    updateSettings,
    updateSetting,
    refreshSettings: loadSettings
  }
}

// Hook for managing theme
export const useTheme = () => {
  const [theme, setThemeState] = useState('light')

  useEffect(() => {
    const savedTheme = storage.getTheme()
    setThemeState(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const setTheme = useCallback((newTheme) => {
    storage.setTheme(newTheme)
    setThemeState(newTheme)
    applyTheme(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [theme, setTheme])

  const applyTheme = (themeName) => {
    if (themeName === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    theme,
    setTheme,
    toggleTheme
  }
}

// Hook for managing AI provider
export const useAIProvider = () => {
  const [provider, setProviderState] = useState('gemini')

  useEffect(() => {
    const savedProvider = storage.getAIProvider()
    setProviderState(savedProvider)
  }, [])

  const setProvider = useCallback((newProvider) => {
    storage.setAIProvider(newProvider)
    setProviderState(newProvider)
  }, [])

  return {
    provider,
    setProvider
  }
}

// Hook for managing calendar connection
export const useCalendarConnection = () => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const connected = storage.isCalendarConnected()
    setIsConnected(connected)
  }, [])

  const setConnected = useCallback((connected) => {
    storage.setCalendarConnected(connected)
    setIsConnected(connected)
  }, [])

  return {
    isConnected,
    setConnected
  }
}

// Hook for data export/import
export const useDataManagement = () => {
  const exportData = useCallback(() => {
    try {
      const data = storage.exportData()
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `dscpl-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      return true
    } catch (error) {
      console.error('Error exporting data:', error)
      return false
    }
  }, [])

  const importData = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          const success = storage.importData(data)
          resolve(success)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }, [])

  const clearAllData = useCallback(() => {
    return storage.clearAllData()
  }, [])

  return {
    exportData,
    importData,
    clearAllData
  }
}

// Hook for offline status
export const useOfflineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

