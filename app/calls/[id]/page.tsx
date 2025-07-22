"use client"

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Bell,
  Moon,
  Phone,
  Clock,
  Play,
  Pause,
  Volume2,
  Archive,
  Trash2,
  ThumbsDown,
  User,
  Save,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Link from 'next/link'

interface CallDetail {
  id: string
  caller: string
  number: string
  dateTime: string
  duration: string
  type: 'incoming' | 'outgoing'
  status: 'answered' | 'missed' | 'voicemail'
  sentiment: 'positive' | 'negative' | 'neutral'
  isFlagged: boolean
  audioUrl?: string
  transcript: Message[]
}

interface Message {
  id: string
  speaker: 'ai' | 'caller'
  content: string
  timestamp: string
}

const mockCallDetail: CallDetail = {
  id: '1',
  caller: 'Dev Kooper',
  number: '(647) 1255 125',
  dateTime: '15 May 2025, 12:00pm',
  duration: '1m 12s',
  type: 'incoming',
  status: 'answered',
  sentiment: 'negative',
  isFlagged: false,
  transcript: [
    {
      id: '1',
      speaker: 'ai',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      timestamp: '00:05'
    },
    {
      id: '2',
      speaker: 'caller',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      timestamp: '00:15'
    },
    {
      id: '3',
      speaker: 'ai',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      timestamp: '00:25'
    },
    {
      id: '4',
      speaker: 'caller',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepteur sint occaecat cupidatat non proident.',
      timestamp: '00:35'
    },
    {
      id: '5',
      speaker: 'ai',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      timestamp: '00:45'
    },
    {
      id: '6',
      speaker: 'caller',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut enim ad minim veniam, quis nostrud exercitation.',
      timestamp: '00:55'
    }
  ]
}

export default function CallDetailPage() {
  const params = useParams()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTab, setCurrentTab] = useState('transcript')
  const [callerName, setCallerName] = useState('Dev Kapoor')
  const [phoneNumber, setPhoneNumber] = useState('123456789')

  const call = mockCallDetail // In a real app, fetch based on params.id

  const getStatusColor = (status: string) => {
    const colors = {
      answered: 'bg-green-100 text-green-800',
      missed: 'bg-red-100 text-red-800',
      voicemail: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSaveToContacts = () => {
    // Handle saving to contacts
    console.log('Saving to contacts:', { callerName, phoneNumber })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  1
                </span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Section - Call Details and Caller Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Call Details Card */}
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/images/user-profile.jpg" />
                      <AvatarFallback className="text-lg">{call.caller.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-2">
                        <Badge className="bg-purple-100 text-purple-800">
                          {call.type.charAt(0).toUpperCase() + call.type.slice(1)}
                        </Badge>
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{call.caller}</h1>
                      <p className="text-gray-600 mb-4">{call.dateTime} • {call.duration}</p>
                      
                      {/* Audio Player */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-4">
                          <Button
                            onClick={handlePlayPause}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <div className="flex-1">
                            <Slider
                              defaultValue={[30]}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                          <Button variant="ghost" size="sm">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Audio
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-blue-50 border-blue-200 text-blue-700"
                        >
                          Transcript
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Caller Information Card */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Caller information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <Badge className={getStatusColor(call.status)}>
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <Input
                        value={callerName}
                        onChange={(e) => setCallerName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                      <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transcript/Summary Section */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-0">
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                  <div className="border-b border-gray-200">
                    <TabsList className="bg-transparent h-12">
                      <TabsTrigger 
                        value="transcript" 
                        className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700"
                      >
                        Transcript
                      </TabsTrigger>
                      <TabsTrigger 
                        value="summary"
                        className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700"
                      >
                        Summary
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="transcript" className="p-6">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {call.transcript.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start space-x-3 ${
                            message.speaker === 'caller' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-sm bg-pink-100 text-pink-600">
                              {message.speaker === 'ai' ? 'B' : 'D'}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.speaker === 'ai'
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.speaker === 'ai' ? 'text-gray-500' : 'text-blue-100'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="summary" className="p-6">
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold mb-4">Call Summary</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 