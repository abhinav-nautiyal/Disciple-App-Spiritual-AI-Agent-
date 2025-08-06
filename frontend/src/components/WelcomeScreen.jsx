import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  BookOpen, 
  Heart, 
  Brain, 
  Shield, 
  MessageCircle, 
  Calendar, 
  BarChart3, 
  AlertTriangle, 
  Sparkles 
} from 'lucide-react'

const WelcomeScreen = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: BookOpen,
      title: "Daily Devotion",
      description: "5-minute Bible reading with prayer and faith declarations",
      path: "/devotion",
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Heart,
      title: "Daily Prayer",
      description: "Structured prayer using the ACTS model",
      path: "/prayer",
      color: "bg-pink-500 hover:bg-pink-600",
      textColor: "text-pink-600 dark:text-pink-400"
    },
    {
      icon: Brain,
      title: "Daily Meditation",
      description: "Scripture focus with reflection and breathing guides",
      path: "/meditation",
      color: "bg-green-500 hover:bg-green-600",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Shield,
      title: "Daily Accountability",
      description: "Strength through scripture and truth declarations",
      path: "/accountability",
      color: "bg-orange-500 hover:bg-orange-600",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: MessageCircle,
      title: "Just Chat",
      description: "AI-powered spiritual conversation and guidance",
      path: "/chat",
      color: "bg-purple-500 hover:bg-purple-600",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Calendar,
      title: "Calendar Sync",
      description: "Schedule and manage your spiritual routines",
      path: "/calendar",
      color: "bg-indigo-500 hover:bg-indigo-600",
      textColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      icon: BarChart3,
      title: "Dashboard",
      description: "Track your spiritual progress and consistency",
      path: "/dashboard",
      color: "bg-teal-500 hover:bg-teal-600",
      textColor: "text-teal-600 dark:text-teal-400"
    },
    {
      icon: AlertTriangle,
      title: "SOS Support",
      description: "Immediate spiritual support when you need it most",
      path: "/sos",
      color: "bg-red-500 hover:bg-red-600",
      textColor: "text-red-600 dark:text-red-400"
    },
    {
      icon: Sparkles,
      title: "Inspiration Feed",
      description: "Daily inspiration and uplifting content",
      path: "/inspiration",
      color: "bg-yellow-500 hover:bg-yellow-600",
      textColor: "text-yellow-600 dark:text-yellow-400"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          What do you need today?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your personal spiritual assistant, guiding you daily through devotionals, prayer, meditation, and accountability.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              onClick={() => navigate(feature.path)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className={`text-xl font-semibold ${feature.textColor} group-hover:text-gray-800 dark:group-hover:text-white transition-colors`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Ready to begin your spiritual journey?
        </p>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => navigate('/chat')}
        >
          Start Your Journey
        </Button>
      </div>
    </div>
  )
}

export default WelcomeScreen

