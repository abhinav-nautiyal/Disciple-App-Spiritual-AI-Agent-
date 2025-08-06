import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, MessageCircle } from 'lucide-react'

const AccountabilityScreen = () => {
  const navigate = useNavigate()
  const [selectedArea, setSelectedArea] = useState(null)
  const [accountabilityContent, setAccountabilityContent] = useState(null)
  const [showSOS, setShowSOS] = useState(false)

  const areas = [
    { id: 1, title: "Pornography", category: "Purity", color: "bg-red-100 text-red-800", severity: "high" },
    { id: 2, title: "Alcohol", category: "Substance", color: "bg-orange-100 text-orange-800", severity: "medium" },
    { id: 3, title: "Drugs", category: "Substance", color: "bg-red-100 text-red-800", severity: "high" },
    { id: 4, title: "Sex", category: "Purity", color: "bg-pink-100 text-pink-800", severity: "medium" },
    { id: 5, title: "Addiction", category: "Dependency", color: "bg-purple-100 text-purple-800", severity: "high" },
    { id: 6, title: "Laziness", category: "Productivity", color: "bg-yellow-100 text-yellow-800", severity: "low" },
    { id: 7, title: "Something else...", category: "Custom", color: "bg-gray-100 text-gray-800", severity: "medium" }
  ]

  const generateAccountabilityContent = (area) => {
    const content = {
      "Pornography": {
        scripture: {
          verse: "1 Corinthians 6:18-20",
          text: "Flee from sexual immorality. All other sins a person commits are outside the body, but whoever sins sexually, sins against their own body. Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies."
        },
        truthDeclarations: [
          "I am not a slave to temptation; I am free in Christ.",
          "My body is a temple of the Holy Spirit.",
          "I choose purity because I am loved by God.",
          "God's grace is sufficient for my weakness."
        ],
        alternativeActions: [
          "Go for a walk or exercise",
          "Call a trusted friend or mentor",
          "Read scripture or pray",
          "Engage in a creative hobby",
          "Listen to worship music"
        ],
        encouragement: "Remember, you are not defined by your struggles. God sees you as His beloved child, and His mercy is new every morning."
      },
      "Alcohol": {
        scripture: {
          verse: "1 Corinthians 10:13",
          text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it."
        },
        truthDeclarations: [
          "I find my joy and peace in God, not in substances.",
          "I am strong in the Lord and in His mighty power.",
          "God provides a way out of every temptation.",
          "I choose life and health over temporary escape."
        ],
        alternativeActions: [
          "Drink water or herbal tea",
          "Call someone from your support network",
          "Practice deep breathing or meditation",
          "Go to a meeting or support group",
          "Engage in physical activity"
        ],
        encouragement: "Each moment of resistance is a victory. God is proud of your efforts to choose health and freedom."
      },
      "Laziness": {
        scripture: {
          verse: "Colossians 3:23",
          text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."
        },
        truthDeclarations: [
          "I am created for good works that God prepared in advance.",
          "I can do all things through Christ who strengthens me.",
          "My work has purpose and meaning in God's kingdom.",
          "I choose diligence over comfort."
        ],
        alternativeActions: [
          "Start with just 5 minutes of the task",
          "Break large tasks into smaller steps",
          "Set a timer and work in focused bursts",
          "Pray for motivation and energy",
          "Remember your 'why' and purpose"
        ],
        encouragement: "God has given you unique gifts and talents. Every small step forward is progress in His eyes."
      }
    }

    return content[area.title] || content["Laziness"]
  }

  const handleAreaSelect = (area) => {
    setSelectedArea(area)
    setAccountabilityContent(generateAccountabilityContent(area))
  }

  const handleSOSClick = () => {
    setShowSOS(true)
  }

  const completeAccountability = () => {
    // Save accountability session
    const session = {
      area: selectedArea,
      content: accountabilityContent,
      timestamp: new Date(),
      completed: true
    }
    
    const existingAccountability = JSON.parse(localStorage.getItem('accountability') || '[]')
    existingAccountability.push(session)
    localStorage.setItem('accountability', JSON.stringify(existingAccountability))
    
    navigate('/dashboard')
  }

  if (showSOS) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setShowSOS(false)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-300">
            <strong>Emergency Support Activated</strong> - You're not alone in this moment.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-300">
                Immediate Scripture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">Psalm 34:17-18</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "The righteous cry out, and the Lord hears them; he delivers them from all their troubles. The Lord is close to the brokenhearted and saves those who are crushed in spirit."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Emergency Prayer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                "Lord Jesus, I need You right now. I'm struggling and I feel overwhelmed. Please give me Your strength to resist this temptation. Help me to remember that I am Your beloved child, and that Your grace is sufficient for me. Show me the way out that You have promised. I trust in You. Amen."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-300">
                Immediate Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Take 10 deep breaths</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Remove yourself from the triggering environment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Call or text your accountability partner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Engage in physical activity (walk, exercise)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Listen to worship music or read scripture</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with AI Support
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowSOS(false)}
            >
              I'm Feeling Better
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (accountabilityContent) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              setAccountabilityContent(null)
              setSelectedArea(null)
            }}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Areas
          </Button>
          <Badge className={selectedArea?.color}>
            {selectedArea?.title}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* SOS Button */}
          <div className="text-center">
            <Button 
              onClick={handleSOSClick}
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 rounded-full shadow-lg"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              I Need Help Now!
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Click for immediate support and encouragement
            </p>
          </div>

          {/* Scripture for Strength */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 dark:text-blue-300">
                <Shield className="h-5 w-5 mr-2" />
                Scripture for Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{accountabilityContent.scripture.verse}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{accountabilityContent.scripture.text}"
              </p>
            </CardContent>
          </Card>

          {/* Truth Declarations */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Truth Declarations
              </CardTitle>
              <CardDescription>
                Speak these truths over yourself
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accountabilityContent.truthDeclarations.map((declaration, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      "{declaration}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alternative Actions */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-300">
                Alternative Actions
              </CardTitle>
              <CardDescription>
                Instead of giving in, try these healthy alternatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {accountabilityContent.alternativeActions.map((action, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700 dark:text-gray-300">{action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Encouragement */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-300">
                Encouragement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {accountabilityContent.encouragement}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={completeAccountability}
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
          Daily Accountability
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Strength through scripture and truth declarations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map((area) => (
          <Card 
            key={area.id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => handleAreaSelect(area)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {area.title}
                </CardTitle>
                {area.severity === 'high' && (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <Badge className={area.color}>
                {area.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {area.id === 7 
                  ? "Enter your own accountability area"
                  : "Scripture, truth declarations, and alternative actions"
                }
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AccountabilityScreen

