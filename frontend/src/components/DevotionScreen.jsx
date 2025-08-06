import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ArrowLeft, BookOpen, Play, Clock, Heart } from 'lucide-react'

const DevotionScreen = () => {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [devotionContent, setDevotionContent] = useState(null)
  const [loading, setLoading] = useState(false)

  const topics = [
    { id: 1, title: "Dealing with Stress", category: "Mental Health", color: "bg-blue-100 text-blue-800" },
    { id: 2, title: "Overcoming Fear", category: "Courage", color: "bg-green-100 text-green-800" },
    { id: 3, title: "Conquering Depression", category: "Mental Health", color: "bg-purple-100 text-purple-800" },
    { id: 4, title: "Relationships", category: "Love", color: "bg-pink-100 text-pink-800" },
    { id: 5, title: "Healing", category: "Health", color: "bg-yellow-100 text-yellow-800" },
    { id: 6, title: "Purpose & Calling", category: "Life Direction", color: "bg-indigo-100 text-indigo-800" },
    { id: 7, title: "Anxiety", category: "Mental Health", color: "bg-red-100 text-red-800" },
    { id: 8, title: "Something else...", category: "Custom", color: "bg-gray-100 text-gray-800" }
  ]

  const generateDevotion = async (topic) => {
    setLoading(true)
    // Simulate API call - in real implementation, this would call the backend
    setTimeout(() => {
      const sampleDevotion = {
        scripture: {
          verse: "Philippians 4:6-7",
          text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
        },
        prayer: `Lord, help me release my anxieties about ${topic.title.toLowerCase()} and trust in You. Grant me Your peace that surpasses all understanding.`,
        declaration: "God is my refuge and strength, and I will not be shaken by life's challenges.",
        videoTitle: `Overcoming ${topic.title} with God's Promises`,
        reflection: `Today's devotion reminds us that God cares about every aspect of our lives, including our struggles with ${topic.title.toLowerCase()}. When we bring our concerns to Him in prayer, He promises to give us peace that goes beyond human understanding.`
      }
      setDevotionContent(sampleDevotion)
      setLoading(false)
    }, 1500)
  }

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
    generateDevotion(topic)
  }

  if (devotionContent) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              setDevotionContent(null)
              setSelectedTopic(null)
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
          {/* Scripture Reading */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 dark:text-blue-300">
                <BookOpen className="h-5 w-5 mr-2" />
                5-Minute Bible Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{devotionContent.scripture.verse}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{devotionContent.scripture.text}"
              </p>
            </CardContent>
          </Card>

          {/* Prayer */}
          <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-pink-800 dark:text-pink-300">
                <Heart className="h-5 w-5 mr-2" />
                Short Prayer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "{devotionContent.prayer}"
              </p>
            </CardContent>
          </Card>

          {/* Faith Declaration */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Faith Declaration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                "{devotionContent.declaration}"
              </p>
            </CardContent>
          </Card>

          {/* Recommended Video */}
          <Card className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800 dark:text-purple-300">
                <Play className="h-5 w-5 mr-2" />
                Recommended Video
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-8 text-center">
                <Play className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="font-semibold mb-2">{devotionContent.videoTitle}</h3>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Watch on YouTube
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reflection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">
                Reflection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {devotionContent.reflection}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                // Mark as complete and save progress
                navigate('/dashboard')
              }}
            >
              Mark as Complete
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/chat')}
            >
              Discuss This
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
          Daily Devotion
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Choose a topic for your 5-minute spiritual journey
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Preparing your devotion...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card 
              key={topic.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleTopicSelect(topic)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {topic.title}
                  </CardTitle>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <Badge className={topic.color}>
                  {topic.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {topic.id === 8 
                    ? "Enter your own topic for a personalized devotion"
                    : "5-minute Bible reading with prayer and reflection"
                  }
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default DevotionScreen

