import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ArrowLeft, Play, Pause, RotateCcw, Brain, Lightbulb } from 'lucide-react'

const MeditationScreen = () => {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [meditationContent, setMeditationContent] = useState(null)
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState('inhale') // inhale, hold, exhale
  const [breathingTimer, setBreathingTimer] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [reflectionAnswers, setReflectionAnswers] = useState({})

  const topics = [
    { id: 1, title: "Peace", category: "Tranquility", color: "bg-blue-100 text-blue-800" },
    { id: 2, title: "God's Presence", category: "Spiritual", color: "bg-purple-100 text-purple-800" },
    { id: 3, title: "Strength", category: "Power", color: "bg-red-100 text-red-800" },
    { id: 4, title: "Wisdom", category: "Knowledge", color: "bg-yellow-100 text-yellow-800" },
    { id: 5, title: "Faith", category: "Trust", color: "bg-green-100 text-green-800" },
    { id: 6, title: "Something else...", category: "Custom", color: "bg-gray-100 text-gray-800" }
  ]

  const breathingPhases = {
    inhale: { duration: 4, next: 'hold', instruction: 'Breathe In', color: 'bg-blue-500' },
    hold: { duration: 4, next: 'exhale', instruction: 'Hold', color: 'bg-yellow-500' },
    exhale: { duration: 4, next: 'inhale', instruction: 'Breathe Out', color: 'bg-green-500' }
  }

  useEffect(() => {
    let interval
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          const currentPhase = breathingPhases[breathingPhase]
          if (prev >= currentPhase.duration) {
            setBreathingPhase(currentPhase.next)
            return 0
          }
          return prev + 0.1
        })
        setTotalTime(prev => prev + 0.1)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isBreathing, breathingPhase])

  const generateMeditation = (topic) => {
    const meditations = {
      "Peace": {
        scripture: {
          verse: "Psalm 46:10",
          text: "Be still and know that I am God."
        },
        prompts: [
          "What does it mean to 'be still' in your current circumstances?",
          "How can you experience God's peace in the midst of chaos?",
          "What areas of your life need God's calming presence?"
        ]
      },
      "God's Presence": {
        scripture: {
          verse: "Psalm 139:7-8",
          text: "Where can I go from your Spirit? Where can I flee from your presence? If I go up to the heavens, you are there; if I make my bed in the depths, you are there."
        },
        prompts: [
          "How do you sense God's presence in your daily life?",
          "What does it mean to you that God is always with you?",
          "How can you cultivate awareness of God's presence?"
        ]
      },
      "Strength": {
        scripture: {
          verse: "Isaiah 40:31",
          text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
        },
        prompts: [
          "Where do you need God's strength in your life right now?",
          "How has God shown His strength through your weakness?",
          "What does it mean to 'hope in the Lord'?"
        ]
      }
    }

    return meditations[topic.title] || meditations["Peace"]
  }

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
    setMeditationContent(generateMeditation(topic))
    setReflectionAnswers({})
  }

  const startBreathing = () => {
    setIsBreathing(true)
    setBreathingTimer(0)
    setTotalTime(0)
    setBreathingPhase('inhale')
  }

  const stopBreathing = () => {
    setIsBreathing(false)
  }

  const resetBreathing = () => {
    setIsBreathing(false)
    setBreathingTimer(0)
    setTotalTime(0)
    setBreathingPhase('inhale')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentPhase = breathingPhases[breathingPhase]
  const progress = (breathingTimer / currentPhase.duration) * 100

  if (meditationContent) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              setMeditationContent(null)
              setSelectedTopic(null)
              resetBreathing()
            }}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Topics
          </Button>
          <Badge className={selectedTopic?.color}>
            {selectedTopic?.title}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Scripture Focus */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 dark:text-blue-300">
                <Brain className="h-5 w-5 mr-2" />
                Scripture Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{meditationContent.scripture.verse}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic">
                "{meditationContent.scripture.text}"
              </p>
            </CardContent>
          </Card>

          {/* Breathing Guide */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Breathing Guide (4-4-4 Pattern)
              </CardTitle>
              <CardDescription>
                Inhale 4s → Hold 4s → Exhale 4s
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Breathing Circle */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-600"></div>
                  <div 
                    className={`absolute inset-0 rounded-full border-4 ${currentPhase.color} transition-all duration-100`}
                    style={{
                      transform: `scale(${0.8 + (progress / 100) * 0.4})`,
                      opacity: 0.7 + (progress / 100) * 0.3
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {currentPhase.instruction}
                      </p>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {Math.ceil(currentPhase.duration - breathingTimer)}s
                      </p>
                    </div>
                  </div>
                </div>

                <Progress value={progress} className="w-48" />
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Total Time: {formatTime(totalTime)}
                  </p>
                  <div className="flex gap-2">
                    {!isBreathing ? (
                      <Button onClick={startBreathing} className="bg-green-600 hover:bg-green-700">
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button onClick={stopBreathing} variant="outline">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={resetBreathing} variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meditation Prompts */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800 dark:text-purple-300">
                <Lightbulb className="h-5 w-5 mr-2" />
                Reflection Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {meditationContent.prompts.map((prompt, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {index + 1}. {prompt}
                  </p>
                  <textarea
                    className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none"
                    rows="3"
                    placeholder="Reflect on this question..."
                    value={reflectionAnswers[index] || ''}
                    onChange={(e) => setReflectionAnswers(prev => ({
                      ...prev,
                      [index]: e.target.value
                    }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                // Save meditation session
                const session = {
                  topic: selectedTopic,
                  scripture: meditationContent.scripture,
                  reflections: reflectionAnswers,
                  breathingTime: totalTime,
                  timestamp: new Date(),
                  completed: true
                }
                
                const existingMeditations = JSON.parse(localStorage.getItem('meditations') || '[]')
                existingMeditations.push(session)
                localStorage.setItem('meditations', JSON.stringify(existingMeditations))
                
                navigate('/dashboard')
              }}
            >
              Complete Meditation
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/chat')}
            >
              Discuss Insights
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/calendar')}
            >
              Schedule Daily
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Daily Meditation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Scripture focus with reflection and breathing guides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Card 
            key={topic.id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => handleTopicSelect(topic)}
          >
            <CardHeader>
              <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {topic.title}
              </CardTitle>
              <Badge className={topic.color}>
                {topic.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {topic.id === 6 
                  ? "Enter your own meditation focus"
                  : "Scripture meditation with breathing guide"
                }
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MeditationScreen

