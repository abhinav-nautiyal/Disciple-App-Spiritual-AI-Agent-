// API utilities for DSCPL app
// Handles communication with the Flask backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-railway-backend-url.railway.app/api'

class APIClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Chat endpoints
  async sendMessage(message, context = '') {
    return this.request('/chat/send', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    })
  }

  async getChatHistory() {
    return this.request('/chat/history')
  }

  // Spiritual programs endpoints
  async getSpiritualPrograms() {
    return this.request('/spiritual-programs')
  }

  async getProgramDetails(programId) {
    return this.request(`/spiritual-programs/${programId}`)
  }

  // Calendar integration endpoints
  async getCalendarEvents() {
    return this.request('/calendar/events')
  }

  async addCalendarEvent(event) {
    return this.request('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(event),
    })
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/user/profile')
  }

  async updateUserProfile(profile) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    })
  }
}

export default new APIClient()

