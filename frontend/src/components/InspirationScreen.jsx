import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ArrowLeft, Sparkles, Heart, Share, Bookmark, RefreshCw } from 'lucide-react'

const InspirationScreen = () => {
  const navigate = useNavigate()
  const [inspirationFeed, setInspirationFeed] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadInspirationFeed()
  }, [])

  const loadInspirationFeed = () => {
    setLoading(true)
    // Simulate API call - in real implementation, this would fetch from backend
    setTimeout(() => {
      const sampleFeed = [
        {
          id: 1,
          type: 'verse',
          title: 'God\'s Unfailing Love',
          content: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
          reference: 'Zephaniah 3:17',
          category: 'Love',
          image: '🌅',
          likes: 42,
          saved: false
        },
        {
          id: 2,
          type: 'quote',
          title: 'Faith Over Fear',
          content: 'Faith is not the absence of fear, but the decision that something else is more important than fear.',
          author: 'Unknown',
          category: 'Courage',
          image: '⛰️',
          likes: 38,
          saved: true
        },
        {
          id: 3,
          type: 'verse',
          title: 'Strength in Weakness',
          content: 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness." Therefore I will boast all the more gladly about my weaknesses, so that Christ\'s power may rest on me.',
          reference: '2 Corinthians 12:9',
          category: 'Strength',
          image: '💪',
          likes: 56,
          saved: false
        },
        {
          id: 4,
          type: 'prayer',
          title: 'Morning Prayer',
          content: 'Lord, as I begin this new day, I surrender my plans to You. Guide my steps, guard my heart, and help me to be a light in this world. May Your will be done in my life today.',
          category: 'Prayer',
          image: '🌄',
          likes: 29,
          saved: false
        },
        {
          id: 5,
          type: 'verse',
          title: 'Peace in Storms',
          content: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
          reference: 'John 14:27',
          category: 'Peace',
          image: '🕊️',
          likes: 67,
          saved: true
        },
        {
          id: 6,
          type: 'quote',
          title: 'God\'s Timing',
          content: 'God\'s timing is perfect. He\'s never early, never late, but always right on time.',
          author: 'Unknown',
          category: 'Trust',
          image: '⏰',
          likes: 45,
          saved: false
        }
      ]
      setInspirationFeed(sampleFeed)
      setLoading(false)
    }, 1000)
  }

  const toggleSave = (id) => {
    setInspirationFeed(prev => 
      prev.map(item => 
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    )
  }

  const toggleLike = (id) => {
    setInspirationFeed(prev => 
      prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              liked: !item.liked 
            } 
          : item
      )
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Love': 'bg-pink-100 text-pink-800',
      'Courage': 'bg-orange-100 text-orange-800',
      'Strength': 'bg-red-100 text-red-800',
      'Prayer': 'bg-purple-100 text-purple-800',
      'Peace': 'bg-blue-100 text-blue-800',
      'Trust': 'bg-green-100 text-green-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'verse':
        return '📖'
      case 'quote':
        return '💭'
      case 'prayer':
        return '🙏'
      default:
        return '✨'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Inspiration Feed
          </h1>
        </div>
        <Button 
          onClick={loadInspirationFeed}
          disabled={loading}
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Daily inspiration and uplifting content to encourage your faith journey
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading inspiration...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {inspirationFeed.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm">{getTypeIcon(item.type)}</span>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSave(item.id)}
                    className={item.saved ? 'text-yellow-600' : 'text-gray-400'}
                  >
                    <Bookmark className={`h-4 w-4 ${item.saved ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic mb-4 border-l-4 border-purple-300 pl-4">
                  "{item.content}"
                </blockquote>
                
                {item.reference && (
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
                    — {item.reference}
                  </p>
                )}
                
                {item.author && (
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                    — {item.author}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(item.id)}
                      className={`flex items-center space-x-1 ${item.liked ? 'text-red-600' : 'text-gray-500'}`}
                    >
                      <Heart className={`h-4 w-4 ${item.liked ? 'fill-current' : ''}`} />
                      <span>{item.likes}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                    >
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/chat')}
                    >
                      Discuss
                    </Button>
                    {item.type === 'verse' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/meditation')}
                      >
                        Meditate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="text-center p-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Want to dive deeper?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start your spiritual journey with guided devotions, prayers, and meditations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/devotion')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Devotion
            </Button>
            <Button 
              onClick={() => navigate('/prayer')}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              Begin Prayer
            </Button>
            <Button 
              onClick={() => navigate('/meditation')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Meditate Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InspirationScreen

