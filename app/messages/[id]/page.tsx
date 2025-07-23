"use client"

import React from 'react'
import {
  Search,
  Bell,
  Moon,
  ChevronDown,
  Phone,
  CheckCircle,
  Users,
  TrendingUp,
  Clock,
  RefreshCw,
  Download,
  Menu,
  MoreVertical,
  Play,
  Pause,
  Upload,
  Plus,
  Trash2,
  Filter,
  Eye,
  Calendar,
  Check,
  Send
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import DashboardSidebar from '../../../components/dashboard/DashboardSidebar'
import Image from 'next/image'

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')

  // Handle body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  // Sample chat messages
  const chatMessages = [
    {
      id: 1,
      sender: 'Benny',
      initials: 'B',
      message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      timestamp: '10:30 AM',
      isUser: false
    },
    {
      id: 2,
      sender: 'Dev Kooper',
      initials: 'D',
      message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
      timestamp: '10:32 AM',
      isUser: true
    },
    {
      id: 3,
      sender: 'Benny',
      initials: 'B',
      message: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      timestamp: '10:35 AM',
      isUser: false
    },
    {
      id: 4,
      sender: 'Dev Kooper',
      initials: 'D',
      message: 'Okay',
      timestamp: '10:36 AM',
      isUser: true
    },
    {
      id: 5,
      sender: 'Benny',
      initials: 'B',
      message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      timestamp: '10:38 AM',
      isUser: false
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-end">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Dark Mode Button - Hidden on mobile */}
              <Button variant="outline" className="hidden lg:flex bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  2
                </span>
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-600 hidden lg:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Messages Content */}
        <main className="flex-1 overflow-hidden p-4 lg:p-6">
          <div className="flex h-full space-x-6">
            {/* Left Column - Contact Card */}
            <div className="w-80 flex-shrink-0">
              <Card className="h-full rounded-lg shadow-sm">
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Contact Information */}
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-16 w-16 bg-pink-500 flex-shrink-0">
                      <AvatarFallback className="text-white font-semibold text-lg">
                        JC
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Julio Caesar
                      </h3>
                      <p className="text-base text-gray-600 mb-1">
                        +1 (555) 123-4567
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-500">
                          Last active: 1h ago
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                      High Priority
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                      <Calendar className="h-3 w-3 mr-1" />
                      Appointment
                    </Badge>
                  </div>

                  {/* View Message Button */}
                  <div className="mt-auto">
                    <Button className="w-full bg-[#4A48FF] hover:bg-[#3a38ef] text-white">
                      View message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Chat Interface */}
            <div className="flex-1">
              <Card className="h-full rounded-lg shadow-sm">
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 bg-pink-500 flex-shrink-0">
                        <AvatarFallback className="text-white font-semibold">
                          JC
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Julio Caesar
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          +1 (555) 123-4567
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            High Priority
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            <Calendar className="h-3 w-3 mr-1" />
                            Appointment
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Call Transcript Label */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Call Transcript</h4>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${msg.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className={`h-8 w-8 bg-pink-500 flex-shrink-0 ${msg.isUser ? 'ml-3' : 'mr-3'}`}>
                            <AvatarFallback className="text-white font-semibold text-sm">
                              {msg.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
                            <div className={`px-4 py-2 rounded-lg ${
                              msg.isUser 
                                ? 'bg-purple-100 text-gray-900' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{msg.message}</p>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <Input
                      placeholder="Type your response here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-12 py-3"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSendMessage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-purple-600 hover:text-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 