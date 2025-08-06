import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { ArrowLeft, Heart, Star, Gift, HandHeart } from 'lucide-react'

const PrayerScreen = () => {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [prayerResponses, setPrayerResponses] = useState({
    adoration: '',
    confession: '',
    thanksgiving: '',
    supplication: ''
  })

  const topics = [
    { id: 1, title: "Personal Growth", category: "Self", color: "bg-blue-100 text-blue-800" },
    { id: 2, title: "Healing", category: "Health", color: "bg-green-100 text-green-800" },
    { id: 3, title: "Family/Friends", category: "Relationships", color: "bg-pink-100 text-pink-800" },
    { id: 4, title: "Forgiveness", category: "Heart", color: "bg-purple-100 text-purple-800" },
    { id: 5, title: "Finances", category: "Provision", color: "bg-yellow-100 text-yellow-800" },
    { id: 6, title: "Work/Career", category: "Purpose", color: "bg-indigo-100 text-indigo-800" },
    { id: 7, title: "Something else...", category: "Custom", color: "bg-gray-100 text-gray-800" }
  ]

  const actsSteps = [
    {
      title: "Adoration",
      subtitle: "Praise God",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      prompt: "Take a moment to praise God for who He is. What attributes of God do you want to worship Him for today?",
      placeholder: "Lord, I praise You because You are...",
      key: 'adoration'
    },
    {
      title: "Confession",
      subtitle: "Repentance",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      prompt: "Confess any sins or shortcomings to God. He is faithful and just to forgive.",
      placeholder: "Father, I confess that I have...",
      key: 'confession'
    },
    {
      title: "Thanksgiving",
      subtitle: "Gratitude",
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      prompt: "Thank God for His blessings, both big and small, in your life.",
      placeholder: "Thank You, God, for...",
      key: 'thanksgiving'
    },
    {
      title: "Supplication",
      subtitle: "Requests",
      icon: HandHeart,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      prompt: `Bring your requests to God, especially regarding ${selectedTopic?.title || 'your chosen topic'}.`,
      placeholder: "Lord, I ask that You would...",
      key: 'supplication'
    }
  ]

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
    setCurrentStep(0)
  }

  const handleResponseChange = (key, value) => {
    setPrayerResponses(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < actsSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completePrayer = () => {
    // Save prayer to localStorage or send to backend
    const prayerSession = {
      topic: selectedTopic,
      responses: prayerResponses,
      timestamp: new Date(),
      completed: true
    }
    
    // Store in localStorage for now
    const existingPrayers = JSON.parse(localStorage.getItem('prayers') || '[]')
    existingPrayers.push(prayerSession)
    localStorage.setItem('prayers', JSON.stringify(existingPrayers))
    
    navigate('/dashboard')
  }

  if (selectedTopic && currentStep < actsSteps.length) {
    const step = actsSteps[currentStep]
    const IconComponent = step.icon

    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedTopic(null)
              setCurrentStep(0)
              setPrayerResponses({ adoration: '', confession: '', thanksgiving: '', supplication: '' })
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

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Step {currentStep + 1} of {actsSteps.length}
            </span>
            <span className="text-sm text-gray-500">
              ACTS Prayer Model
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / actsSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        <Card className={`${step.bgColor} border-0`}>
          <CardHeader className="text-center">
            <div className={`w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <IconComponent className={`h-8 w-8 ${step.color}`} />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              {step.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              {step.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
              {step.prompt}
            </p>
            
            <Textarea
              value={prayerResponses[step.key]}
              onChange={(e) => handleResponseChange(step.key, e.target.value)}
              placeholder={step.placeholder}
              className="min-h-[120px] text-lg"
            />

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep === actsSteps.length - 1 ? (
                <Button
                  onClick={completePrayer}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={!prayerResponses[step.key].trim()}
                >
                  Complete Prayer
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={!prayerResponses[step.key].trim()}
                >
                  Next Step
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Daily Prayer Focus */}
        <Card className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-indigo-800 dark:text-indigo-300">
              Today's Prayer Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              "Pray for someone who has hurt you, and ask God to bless them with His love and grace."
            </p>
          </CardContent>
        </Card>
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
          Daily Prayer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Structured prayer using the ACTS model
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Adoration • Confession • Thanksgiving • Supplication
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
                {topic.id === 7 
                  ? "Enter your own prayer topic"
                  : "Guided prayer using the ACTS model"
                }
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PrayerScreen

