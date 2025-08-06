import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { ArrowLeft, Calendar, Clock, Plus, CheckCircle, AlertCircle } from 'lucide-react'

const CalendarScreen = () => {
  const navigate = useNavigate()
  const [isConnected, setIsConnected] = useState(false)
  const [scheduledPrograms, setScheduledPrograms] = useState([])
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [newProgram, setNewProgram] = useState({
    type: '',
    topic: '',
    time: '',
    duration: '7',
    startDate: ''
  })

  const programTypes = [
    { value: 'devotion', label: 'Daily Devotion', color: 'bg-blue-100 text-blue-800' },
    { value: 'prayer', label: 'Daily Prayer', color: 'bg-pink-100 text-pink-800' },
    { value: 'meditation', label: 'Daily Meditation', color: 'bg-green-100 text-green-800' },
    { value: 'accountability', label: 'Daily Accountability', color: 'bg-orange-100 text-orange-800' }
  ]

  const handleGoogleConnect = () => {
    // Simulate Google Calendar OAuth flow
    setTimeout(() => {
      setIsConnected(true)
      // Load existing scheduled programs
      const existing = JSON.parse(localStorage.getItem('scheduledPrograms') || '[]')
      setScheduledPrograms(existing)
    }, 1500)
  }

  const handleScheduleProgram = () => {
    if (!newProgram.type || !newProgram.time || !newProgram.startDate) return

    const program = {
      id: Date.now(),
      ...newProgram,
      createdAt: new Date(),
      status: 'active'
    }

    const updated = [...scheduledPrograms, program]
    setScheduledPrograms(updated)
    localStorage.setItem('scheduledPrograms', JSON.stringify(updated))
    
    setShowScheduleForm(false)
    setNewProgram({
      type: '',
      topic: '',
      time: '',
      duration: '7',
      startDate: ''
    })
  }

  const toggleProgramStatus = (id) => {
    const updated = scheduledPrograms.map(program => 
      program.id === id 
        ? { ...program, status: program.status === 'active' ? 'paused' : 'active' }
        : program
    )
    setScheduledPrograms(updated)
    localStorage.setItem('scheduledPrograms', JSON.stringify(updated))
  }

  const deleteProgram = (id) => {
    const updated = scheduledPrograms.filter(program => program.id !== id)
    setScheduledPrograms(updated)
    localStorage.setItem('scheduledPrograms', JSON.stringify(updated))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getProgramTypeInfo = (type) => {
    return programTypes.find(p => p.value === type) || programTypes[0]
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Calendar Sync
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect your Google Calendar to schedule spiritual programs
          </p>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-blue-800 dark:text-blue-300">
              Connect to Google Calendar
            </CardTitle>
            <CardDescription className="text-lg">
              Sync your spiritual programs with your calendar for daily reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Schedule daily devotions, prayers, and meditations
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Receive timely reminders for your spiritual practices
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Track your consistency and build lasting habits
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Customize program length (7, 14, or 30 days)
                </span>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button 
                onClick={handleGoogleConnect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Connect Google Calendar
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                We'll redirect you to Google to authorize calendar access
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Calendar Management
          </h1>
        </div>
        <Button 
          onClick={() => setShowScheduleForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Program
        </Button>
      </div>

      {/* Connection Status */}
      <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 dark:text-green-300 font-medium">
              Connected to Google Calendar
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsConnected(false)}
          >
            Disconnect
          </Button>
        </CardContent>
      </Card>

      {/* Schedule New Program Form */}
      {showScheduleForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Schedule New Program</CardTitle>
            <CardDescription>
              Set up a daily spiritual program with calendar reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Program Type</label>
                <Select value={newProgram.type} onValueChange={(value) => setNewProgram(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    {programTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Topic (Optional)</label>
                <Input
                  value={newProgram.topic}
                  onChange={(e) => setNewProgram(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="e.g., Dealing with Stress"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Daily Time</label>
                <Input
                  type="time"
                  value={newProgram.time}
                  onChange={(e) => setNewProgram(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration (Days)</label>
                <Select value={newProgram.duration} onValueChange={(value) => setNewProgram(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={newProgram.startDate}
                  onChange={(e) => setNewProgram(prev => ({ ...prev, startDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowScheduleForm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleScheduleProgram}
                disabled={!newProgram.type || !newProgram.time || !newProgram.startDate}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Schedule Program
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scheduled Programs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Scheduled Programs
        </h2>

        {scheduledPrograms.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No programs scheduled yet
              </p>
              <Button 
                onClick={() => setShowScheduleForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Schedule Your First Program
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduledPrograms.map((program) => {
              const typeInfo = getProgramTypeInfo(program.type)
              return (
                <Card key={program.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {typeInfo.label}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={typeInfo.color}>
                          {program.duration} days
                        </Badge>
                        {program.status === 'active' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                    </div>
                    {program.topic && (
                      <CardDescription>
                        Topic: {program.topic}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Daily at {program.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Starts {formatDate(program.startDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleProgramStatus(program.id)}
                        className="flex-1"
                      >
                        {program.status === 'active' ? 'Pause' : 'Resume'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProgram(program.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarScreen

