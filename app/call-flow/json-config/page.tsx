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
  Upload,
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
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Link from 'next/link'

export default function JsonConfigPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [jsonConfig, setJsonConfig] = useState(`{
  "nodes": [],
  "connections": [],
  "metadata": {
    "version": "1.0",
    "createdAt": "2025-07-11T09:21:44.687Z",
    "totalNodes": 0,
    "totalConnections": 0
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

  const handleViewModeChange = (mode: string) => {
    if (mode === 'visual') {
      window.location.href = '/call-flow'
    } else if (mode === 'text') {
      window.location.href = '/call-flow/text-preview'
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

        {/* JSON Config Content */}
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

          {/* JSON Config Workspace */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Controls */}
            <div className="bg-white px-6 py-3">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-gray-900">Flow Configuration (JSON)</h1>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setJsonConfig(`{
  "nodes": [],
  "connections": [],
  "metadata": {
    "version": "1.0",
    "createdAt": "2025-07-11T09:21:44.687Z",
    "totalNodes": 0,
    "totalConnections": 0
  }
}`)}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Link href="/call-flow">
                    <Button
                      size="sm"
                      className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* JSON Content Area */}
            <div className="flex-1 bg-gray-900 relative overflow-auto p-6">
              <Textarea
                value={jsonConfig}
                onChange={(e) => setJsonConfig(e.target.value)}
                className="font-mono text-sm h-full w-full resize-none bg-gray-900 text-green-400 border-gray-700 focus:border-gray-600"
                placeholder="Enter your JSON configuration here..."
              />
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

                <ToggleGroup type="single" value="json" onValueChange={(value) => value && handleViewModeChange(value)}>
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