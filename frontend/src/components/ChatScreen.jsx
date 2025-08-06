import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ArrowLeft, Send, Bot, User, Zap, Brain } from 'lucide-react'

const ChatScreen = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your spiritual companion. I'm here to provide guidance, support, and encouragement on your faith journey. How can I help you today?",
      timestamp: new Date(),
      provider: 'gemini'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('gemini')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate API call to backend
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateResponse(inputMessage, selectedProvider),
        timestamp: new Date(),
        provider: selectedProvider
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateResponse = (message, provider) => {
    // Simulate different responses based on provider
    const responses = {
      gemini: [
        "I understand you're seeking guidance. Let me share some wisdom from scripture that might help...",
        "That's a thoughtful question. In times like these, I often find comfort in Psalm 23...",
        "Thank you for sharing that with me. God's love for you is unchanging, and He walks with you through every season.",
        "I hear your heart in this message. Remember that 'God is our refuge and strength, an ever-present help in trouble.' (Psalm 46:1)"
      ],
      groq: [
        "Quick insight: This situation calls for prayer and patience. Here's what I suggest...",
        "Fast response: The Bible says 'Cast all your anxiety on Him because He cares for you.' (1 Peter 5:7)",
        "Immediate guidance: Trust in the Lord's timing. He has good plans for you.",
        "Swift wisdom: Remember that God's strength is made perfect in our weakness."
      ]
    }
    
    const providerResponses = responses[provider] || responses.gemini
    return providerResponses[Math.floor(Math.random() * providerResponses.length)]
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Spiritual Chat
          </h1>
        </div>
        
        {/* AI Provider Selector */}
        <div className="flex gap-2">
          <Button
            variant={selectedProvider === 'gemini' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedProvider('gemini')}
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            Gemini
          </Button>
          <Button
            variant={selectedProvider === 'groq' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedProvider('groq')}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Groq
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            AI-Powered Spiritual Guidance
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Switch between Gemini for nuanced conversations and Groq for quick responses
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && (
                      <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{formatTime(message.timestamp)}</span>
                        {message.provider && (
                          <Badge variant="secondary" className="text-xs">
                            {message.provider}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your heart..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInputMessage("I'm feeling anxious today. Can you help me?")}
        >
          I need peace
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInputMessage("Can you share a Bible verse about strength?")}
        >
          Need strength
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInputMessage("I'm struggling with forgiveness. What does the Bible say?")}
        >
          About forgiveness
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInputMessage("How can I grow closer to God?")}
        >
          Spiritual growth
        </Button>
      </div>
    </div>
  )
}

export default ChatScreen

