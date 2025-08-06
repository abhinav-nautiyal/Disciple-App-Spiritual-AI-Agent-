// API utilities for DSCPL app
// Handles communication with the Flask backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      } else {
        return await response.text()
      }
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // AI Chat endpoints
  async sendChatMessage(message, provider = 'gemini', context = '') {
    return this.post('/chat', {
      message,
      provider,
      context
    })
  }

  async getQuickResponses() {
    return this.get('/chat/quick-responses')
  }

  async getScriptureGuidance(topic) {
    return this.post('/chat/scripture', { topic })
  }

  // Spiritual Programs endpoints
  async getDevotions() {
    return this.get('/devotions')
  }

  async getDevotionById(id) {
    return this.get(`/devotions/${id}`)
  }

  async getPrayers() {
    return this.get('/prayers')
  }

  async getPrayerById(id) {
    return this.get(`/prayers/${id}`)
  }

  async getMeditations() {
    return this.get('/meditations')
  }

  async getMeditationById(id) {
    return this.get(`/meditations/${id}`)
  }

  async getAccountabilityAreas() {
    return this.get('/accountability')
  }

  async getAccountabilityAreaById(id) {
    return this.get(`/accountability/${id}`)
  }

  async completeActivity(activityData) {
    return this.post('/complete', activityData)
  }

  async scheduleProgram(programData) {
    return this.post('/schedule', programData)
  }

  async getInspiration() {
    return this.get('/inspiration')
  }

  // Calendar Integration endpoints
  async getCalendarStatus() {
    return this.get('/calendar/status')
  }

  async initiateGoogleAuth() {
    return this.get('/calendar/auth/google')
  }

  async disconnectCalendar() {
    return this.post('/calendar/disconnect')
  }

  async createCalendarEvents(eventData) {
    return this.post('/calendar/events', eventData)
  }

  async getCalendarEvents(startDate, endDate) {
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    
    return this.get(`/calendar/events?${params.toString()}`)
  }

  async deleteCalendarEvent(eventId) {
    return this.delete(`/calendar/events/${eventId}`)
  }

  async syncCalendar(programs) {
    return this.post('/calendar/sync', { programs })
  }

  async getCalendarPreferences() {
    return this.get('/calendar/preferences')
  }

  async updateCalendarPreferences(preferences) {
    return this.post('/calendar/preferences', preferences)
  }
}

// Error handling wrapper
class APIError extends Error {
  constructor(message, status, response) {
    super(message)
    this.name = 'APIError'
    this.status = status
    this.response = response
  }
}

// Enhanced API client with error handling and retry logic
class EnhancedAPIClient extends APIClient {
  constructor() {
    super()
    this.retryAttempts = 3
    this.retryDelay = 1000
  }

  async requestWithRetry(endpoint, options = {}, attempt = 1) {
    try {
      return await this.request(endpoint, options)
    } catch (error) {
      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        console.warn(`API request failed, retrying... (${attempt}/${this.retryAttempts})`)
        await this.delay(this.retryDelay * attempt)
        return this.requestWithRetry(endpoint, options, attempt + 1)
      }
      
      throw new APIError(
        error.message || 'API request failed',
        error.status || 500,
        error.response
      )
    }
  }

  shouldRetry(error) {
    // Retry on network errors or 5xx server errors
    return !error.status || error.status >= 500
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Override parent methods to use retry logic
  async get(endpoint) {
    return this.requestWithRetry(endpoint, { method: 'GET' })
  }

  async post(endpoint, data) {
    return this.requestWithRetry(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put(endpoint, data) {
    return this.requestWithRetry(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint) {
    return this.requestWithRetry(endpoint, { method: 'DELETE' })
  }
}

// Offline support
class OfflineAPIClient extends EnhancedAPIClient {
  constructor() {
    super()
    this.isOnline = navigator.onLine
    this.pendingRequests = []
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true
      this.processPendingRequests()
    })
    
    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  async request(endpoint, options = {}) {
    if (!this.isOnline && options.method !== 'GET') {
      // Queue non-GET requests for when we're back online
      return this.queueRequest(endpoint, options)
    }

    try {
      return await super.request(endpoint, options)
    } catch (error) {
      if (!this.isOnline) {
        throw new APIError('No internet connection', 0, null)
      }
      throw error
    }
  }

  queueRequest(endpoint, options) {
    return new Promise((resolve, reject) => {
      this.pendingRequests.push({
        endpoint,
        options,
        resolve,
        reject,
        timestamp: Date.now()
      })
    })
  }

  async processPendingRequests() {
    const requests = [...this.pendingRequests]
    this.pendingRequests = []

    for (const request of requests) {
      try {
        const result = await super.request(request.endpoint, request.options)
        request.resolve(result)
      } catch (error) {
        request.reject(error)
      }
    }
  }
}

// Create singleton instance
const api = new OfflineAPIClient()

export default api
export { APIClient, EnhancedAPIClient, OfflineAPIClient, APIError }

