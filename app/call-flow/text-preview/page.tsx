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
  Copy,
  Phone,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Zap,
  Plus,
  Minus,
  Maximize
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
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

  const handleViewModeChange = (mode: string) => {
    if (mode === 'visual') {
      window.location.href = '/call-flow'
    } else if (mode === 'json') {
      window.location.href = '/call-flow/json-config'
    }
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

        {/* Text Preview Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Node Palette */}
          <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Node Palette</h2>
              <p className="text-sm text-gray-600">Drag blocks to canvas</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Logic Blocks</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Start Call</h4>
                        <p className="text-sm text-gray-600">Call starts here</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Response</h4>
                        <p className="text-sm text-gray-600">AI delivers a message</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Ask Question</h4>
                        <p className="text-sm text-gray-600">Ask & wait for caller's answer</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Transfer to Human</h4>
                        <p className="text-sm text-gray-600">Transfers the call to a phone number</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Trigger Action</h4>
                        <p className="text-sm text-gray-600">Executes external actions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Node
                </Button>
              </div>
            </div>
          </div>

          {/* Text Preview Workspace */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Controls */}
            <div className="bg-white px-6 py-3">
              <div className="flex justify-end items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
                <Button
                  size="sm"
                  className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Flow
                </Button>
              </div>
            </div>

            {/* Text Content Area */}
            <div className="flex-1 bg-white relative overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
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
            </div>

            {/* Bottom Controls */}
            <div className="bg-white border-t border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                <ToggleGroup type="single" value="text" onValueChange={(value) => value && handleViewModeChange(value)}>
                  <ToggleGroupItem
                    value="visual"
                    size="sm"
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visual Editor
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="text"
                    size="sm"
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Text Preview
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="json"
                    size="sm"
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    JSON Config
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 