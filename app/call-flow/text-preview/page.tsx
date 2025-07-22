"use client"

import React, { useState } from 'react'
import {
  Bell,
  Moon,
  X,
  Save,
  Eye,
  FileText,
  Code,
  ArrowLeft,
  Edit,
  Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Link from 'next/link'

export default function TextPreviewPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const flowSteps = [
    {
      id: '1',
      type: 'Start Call',
      description: 'Call starts here',
      content: 'Incoming call received'
    },
    {
      id: '2',
      type: 'Response',
      description: 'AI delivers a message',
      content: 'Hello! Welcome to AssistMind AI. How can I help you today?'
    },
    {
      id: '3',
      type: 'Ask Question',
      description: 'Ask & wait for caller\'s answer',
      content: 'Are you calling to schedule an appointment or do you have a question about our services?'
    },
    {
      id: '4',
      type: 'Response',
      description: 'AI delivers a message',
      content: 'I understand you want to schedule an appointment. Let me help you with that.'
    },
    {
      id: '5',
      type: 'Transfer to Human',
      description: 'Transfers the call to a phone number',
      content: 'Transferring you to our scheduling team...'
    }
  ]

  const copyToClipboard = () => {
    const text = flowSteps.map(step => 
      `${step.type}: ${step.content}`
    ).join('\n\n')
    navigator.clipboard.writeText(text)
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/call-flow">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Visual Editor
                </Button>
              </Link>
              <Button
                onClick={() => {}}
                className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Flow
              </Button>
            </div>

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

        {/* Text Preview Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Call Flow - Text Preview</h1>
                <p className="text-sm text-gray-600 mt-1">Review your call flow in text format</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Flow
                </Button>
              </div>
            </div>

            {/* Flow Steps */}
            <div className="space-y-4">
              {flowSteps.map((step, index) => (
                <Card key={step.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold">{step.type}</CardTitle>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 leading-relaxed">{step.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Flow Summary */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Flow Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 font-medium">Total Steps</p>
                    <p className="text-blue-900 text-lg font-bold">{flowSteps.length}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Estimated Duration</p>
                    <p className="text-blue-900 text-lg font-bold">2-3 minutes</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">AI Responses</p>
                    <p className="text-blue-900 text-lg font-bold">2</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Human Transfers</p>
                    <p className="text-blue-900 text-lg font-bold">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 