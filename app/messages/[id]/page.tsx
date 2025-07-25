"use client"

import React from 'react'
import { MessagesLayout } from '@/components/messages'
import { useMessages } from '@/hooks/useMessages'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Download, Play, Send, Calendar } from 'lucide-react'

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const {
    chatMessages,
    handleSendMessage,
    handleDownload,
    handlePlay,
    handleViewMessageDetail
  } = useMessages()

  // In a real app, you'd fetch the specific message and contact data based on params.id
  const contact = {
    id: '1',
    name: 'Julio Caesar',
    phone: '+1 (555) 123-4567',
    initials: 'JC',
    isOnline: false,
    lastActive: '1h ago'
  }

  const tags = ['High Priority', 'Appointment']

  return (
    <MessagesLayout>
      <div className="flex h-full space-x-6">
        {/* Left Panel - Message Preview */}
        <div className="w-80 flex-shrink-0">
          <Card className="h-full rounded-lg shadow-sm">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Contact Information */}
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="h-16 w-16 bg-pink-500 flex-shrink-0">
                  <AvatarFallback className="text-white font-semibold text-lg">
                    {contact.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 font-manrope">
                    {contact.name}
                  </h3>
                  <p className="text-base text-gray-600 mb-1 font-bold">
                    {contact.phone}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-500 font-bold font-manrope">
                      Last active: {contact.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-manrope font-semibold">
                  High Priority
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-manrope font-semibold">
                  <Calendar className="h-3 w-3 mr-1" />
                  Appointment
                </Badge>
              </div>

              {/* Message Preview */}
              <div className="flex-1 mb-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Quis ultrices praesent mauris quis sagittis neque urna amet. Pretium tristique arcu pulvinar felis consequat quis ut. Sed felis ut platea ut. Dolor pellentesque aliquam ac auctor ipsum eget.
                </p>
              </div>

              {/* View Message Button */}
              <div className="mt-auto">
                <Button 
                  className="w-full bg-[#4A48FF] hover:bg-[#3a38ef] text-white font-manrope font-bold"
                  onClick={handleViewMessageDetail}
                >
                  View message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Chat Interface */}
        <div className="flex-1">
          <Card className="h-full rounded-lg shadow-sm">
            <CardContent className="p-6 h-full flex flex-col">
              {/* Chat Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 bg-pink-500 flex-shrink-0">
                    <AvatarFallback className="text-white font-semibold">
                      {contact.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 font-manrope">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 font-bold font-manrope">
                      {contact.phone}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-manrope font-bold">
                        High Priority
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-manrope font-bold">
                        <Calendar className="h-3 w-3 mr-1" />
                        Appointment
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePlay}>
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Call Transcript Label */}
              <div className="mb-4">
                <h4 className="text-2xl font-manrope font-bold text-gray-900">Call Transcript</h4>
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
                <input
                  placeholder="Type your response here"
                  className="w-full pr-12 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('New message')}
                />
                <Button
                  size="icon"
                  onClick={() => handleSendMessage('New message')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MessagesLayout>
  )
} 