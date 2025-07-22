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
  Download,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Link from 'next/link'

export default function JsonConfigPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [jsonConfig, setJsonConfig] = useState(`{
  "flowId": "call-flow-001",
  "name": "Customer Service Flow",
  "description": "Main customer service call flow",
  "version": "1.0.0",
  "nodes": [
    {
      "id": "start-1",
      "type": "start",
      "title": "Start Call",
      "description": "Call starts here",
      "position": { "x": 400, "y": 100 },
      "config": {
        "greeting": "Welcome to AssistMind AI"
      }
    },
    {
      "id": "response-1",
      "type": "response",
      "title": "Response",
      "description": "AI delivers a message",
      "position": { "x": 200, "y": 250 },
      "config": {
        "message": "Hello! Welcome to AssistMind AI. How can I help you today?",
        "voice": "en-US-Neural2-F",
        "speed": 1.0
      }
    },
    {
      "id": "question-1",
      "type": "question",
      "title": "Ask Question",
      "description": "Ask & wait for caller's answer",
      "position": { "x": 600, "y": 250 },
      "config": {
        "question": "Are you calling to schedule an appointment or do you have a question about our services?",
        "options": ["appointment", "question", "other"],
        "timeout": 30
      }
    },
    {
      "id": "response-2",
      "type": "response",
      "title": "Response",
      "description": "AI delivers a message",
      "position": { "x": 400, "y": 400 },
      "config": {
        "message": "I understand you want to schedule an appointment. Let me help you with that.",
        "voice": "en-US-Neural2-F",
        "speed": 1.0
      }
    },
    {
      "id": "transfer-1",
      "type": "transfer",
      "title": "Transfer to Human",
      "description": "Transfers the call to a phone number",
      "position": { "x": 400, "y": 550 },
      "config": {
        "phoneNumber": "+1-555-0123",
        "message": "Transferring you to our scheduling team...",
        "fallback": "response-2"
      }
    }
  ],
  "connections": [
    {
      "from": "start-1",
      "to": "response-1",
      "condition": "always"
    },
    {
      "from": "start-1",
      "to": "question-1",
      "condition": "always"
    },
    {
      "from": "response-1",
      "to": "question-1",
      "condition": "always"
    },
    {
      "from": "question-1",
      "to": "response-2",
      "condition": "appointment"
    },
    {
      "from": "response-2",
      "to": "transfer-1",
      "condition": "always"
    }
  ],
  "settings": {
    "language": "en-US",
    "timeout": 30,
    "retryAttempts": 3,
    "fallbackMessage": "I'm sorry, I didn't catch that. Could you please repeat?"
  }
}`)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonConfig)
  }

  const downloadJson = () => {
    const blob = new Blob([jsonConfig], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'call-flow-config.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonConfig)
      setJsonConfig(JSON.stringify(parsed, null, 2))
    } catch (error) {
      console.error('Invalid JSON:', error)
    }
  }

  const validateJson = () => {
    try {
      JSON.parse(jsonConfig)
      return true
    } catch (error) {
      return false
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

        {/* JSON Config Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Call Flow - JSON Configuration</h1>
                <p className="text-sm text-gray-600 mt-1">Edit your call flow configuration in JSON format</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={formatJson}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Format JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadJson}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* JSON Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Flow Configuration</CardTitle>
                  <div className="flex items-center space-x-2">
                    {validateJson() ? (
                      <span className="text-green-600 text-sm font-medium">✓ Valid JSON</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">✗ Invalid JSON</span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jsonConfig}
                  onChange={(e) => setJsonConfig(e.target.value)}
                  className="font-mono text-sm h-96 resize-none"
                  placeholder="Enter your JSON configuration here..."
                />
              </CardContent>
            </Card>

            {/* Configuration Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configuration Schema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900">Node Types</h4>
                      <ul className="text-gray-600 mt-1 space-y-1">
                        <li>• <code className="bg-gray-100 px-1 rounded">start</code> - Call initiation point</li>
                        <li>• <code className="bg-gray-100 px-1 rounded">response</code> - AI message delivery</li>
                        <li>• <code className="bg-gray-100 px-1 rounded">question</code> - User input collection</li>
                        <li>• <code className="bg-gray-100 px-1 rounded">transfer</code> - Human handoff</li>
                        <li>• <code className="bg-gray-100 px-1 rounded">action</code> - External API calls</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Connection Types</h4>
                      <ul className="text-gray-600 mt-1 space-y-1">
                        <li>• <code className="bg-gray-100 px-1 rounded">always</code> - Always execute</li>
                        <li>• <code className="bg-gray-100 px-1 rounded">condition</code> - Conditional execution</li>
                        <li>• <code className="bg-gray-100 px-1 rounded">timeout</code> - Time-based fallback</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Flow Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Nodes:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Connections:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Duration:</span>
                      <span className="font-medium">2-3 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complexity Level:</span>
                      <span className="font-medium">Medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Modified:</span>
                      <span className="font-medium">Today, 2:30 PM</span>
                    </div>
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