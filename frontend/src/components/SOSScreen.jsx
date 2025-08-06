import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { ArrowLeft, AlertTriangle, Heart, Phone, MessageCircle, Shield, Lightbulb } from 'lucide-react'

const SOSScreen = () => {
  const navigate = useNavigate()
  const [selectedSupport, setSelectedSupport] = useState(null)

  const supportOptions = [
    {
      id: 'immediate',
      title: 'Immediate Scripture & Prayer',
      description: 'Get instant spiritual support and encouragement',
      icon: Shield,
      color: 'bg-blue-600 hover:bg-blue-700',
      content: {
        scripture: {
          verse: "Psalm 34:17-18",
          text: "The righteous cry out, and the Lord hears them; he delivers them from all their troubles. The Lord is close to the brokenhearted and saves those who are crushed in spirit."
        },
        prayer: "Lord Jesus, I need You right now. I'm struggling and I feel overwhelmed. Please give me Your strength to resist this temptation. Help me to remember that I am Your beloved child, and that Your grace is sufficient for me. Show me the way out that You have promised. I trust in You. Amen.",
        actions: [
          "Take 10 deep breaths",
          "Remove yourself from the triggering environment",
          "Call or text your accountability partner",
          "Engage in physical activity (walk, exercise)",
          "Listen to worship music or read scripture"
        ]
      }
    },
    {
      id: 'chat',
      title: 'Chat with AI Support',
      description: 'Talk through your struggles with our AI spiritual companion',
      icon: MessageCircle,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'crisis',
      title: 'Crisis Resources',
      description: 'Professional help and crisis hotlines',
      icon: Phone,
      color: 'bg-red-600 hover:bg-red-700',
      content: {
        resources: [
          {
            name: "National Suicide Prevention Lifeline",
            number: "988",
            description: "24/7 crisis support"
          },
          {
            name: "Crisis Text Line",
            number: "Text HOME to 741741",
            description: "24/7 text-based crisis support"
          },
          {
            name: "SAMHSA National Helpline",
            number: "1-800-662-4357",
            description: "Substance abuse and mental health services"
          },
          {
            name: "National Domestic Violence Hotline",
            number: "1-800-799-7233",
            description: "24/7 domestic violence support"
          }
        ]
      }
    },
    {
      id: 'coping',
      title: 'Coping Strategies',
      description: 'Practical tools for managing difficult moments',
      icon: Lightbulb,
      color: 'bg-green-600 hover:bg-green-700',
      content: {
        strategies: [
          {
            title: "5-4-3-2-1 Grounding Technique",
            description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste"
          },
          {
            title: "Box Breathing",
            description: "Breathe in for 4, hold for 4, breathe out for 4, hold for 4. Repeat."
          },
          {
            title: "Progressive Muscle Relaxation",
            description: "Tense and release each muscle group from toes to head"
          },
          {
            title: "Positive Self-Talk",
            description: "Replace negative thoughts with biblical truths about your identity"
          },
          {
            title: "Call Someone",
            description: "Reach out to a trusted friend, family member, or spiritual mentor"
          },
          {
            title: "Change Your Environment",
            description: "Go to a different room, step outside, or visit a peaceful place"
          }
        ]
      }
    }
  ]

  const handleSupportSelect = (option) => {
    if (option.id === 'chat') {
      navigate('/chat')
      return
    }
    setSelectedSupport(option)
  }

  if (selectedSupport) {
    const IconComponent = selectedSupport.icon

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedSupport(null)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to SOS Options
          </Button>
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-300">
            <strong>Emergency Support Active</strong> - You're taking the right step by seeking help.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 ${selectedSupport.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{selectedSupport.title}</CardTitle>
          </CardHeader>
        </Card>

        {selectedSupport.id === 'immediate' && (
          <div className="space-y-6">
            {/* Scripture */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-300">
                  Immediate Scripture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{selectedSupport.content.scripture.verse}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{selectedSupport.content.scripture.text}"
                </p>
              </CardContent>
            </Card>

            {/* Prayer */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-300">
                  Emergency Prayer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{selectedSupport.content.prayer}"
                </p>
              </CardContent>
            </Card>

            {/* Action Plan */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardHeader>
                <CardTitle className="text-purple-800 dark:text-purple-300">
                  Immediate Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedSupport.content.actions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedSupport.id === 'crisis' && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-300">
                  Crisis Resources
                </CardTitle>
                <CardDescription>
                  Professional help is available 24/7. You don't have to face this alone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSupport.content.resources.map((resource, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                      <h3 className="font-semibold text-lg mb-1">{resource.name}</h3>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                        {resource.number}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">{resource.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedSupport.id === 'coping' && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-300">
                  Coping Strategies
                </CardTitle>
                <CardDescription>
                  Practical tools to help you through this difficult moment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSupport.content.strategies.map((strategy, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                      <h3 className="font-semibold text-lg mb-2">{strategy.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{strategy.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate('/chat')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Continue with AI Support
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/dashboard')}
          >
            I'm Feeling Better
          </Button>
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
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          SOS Support
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Immediate spiritual support when you need it most
        </p>
      </div>

      <Alert className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/20">
        <Heart className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800 dark:text-red-300">
          <strong>You are not alone.</strong> God loves you deeply, and help is available. Choose the support you need right now.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportOptions.map((option) => {
          const IconComponent = option.icon
          return (
            <Card 
              key={option.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => handleSupportSelect(option)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {option.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Emergency Notice */}
      <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-2 text-yellow-800 dark:text-yellow-300">
            In Case of Emergency
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            If you're having thoughts of self-harm or suicide, please reach out for immediate help:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.open('tel:988')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 988 (Suicide Prevention)
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('sms:741741?body=HOME')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Text HOME to 741741
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SOSScreen

