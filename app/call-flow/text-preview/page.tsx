"use client"

import React, { useState, useEffect } from 'react'
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
  Minus,
  Maximize,
  Download,
  Plus,
  Phone,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import NodePalette from '@/components/call-flow/NodePalette'
import Link from 'next/link'

interface FlowNode {
  id: string
  type: 'start' | 'response' | 'question' | 'transfer' | 'action'
  title: string
  description: string
  color: string
  x: number
  y: number
  content?: string
}

interface FlowData {
  nodes: FlowNode[]
  connections: any[]
  metadata?: any
}

export default function TextPreviewPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [flowData, setFlowData] = useState<FlowData>({ nodes: [], connections: [] })
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved flow data on component mount
  useEffect(() => {
    const savedFlow = localStorage.getItem('callFlow')
    if (savedFlow) {
      try {
        const parsed = JSON.parse(savedFlow)
        setFlowData(parsed)
      } catch (error) {
        console.error('Error loading saved flow:', error)
      }
    }
  }, [])

  const getNodeTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      start: 'Start Call',
      response: 'Response',
      question: 'Ask Question',
      transfer: 'Transfer to Human',
      action: 'Trigger Action'
    }
    return typeMap[type] || type
  }

  const getNodeIcon = (type: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      start: <Phone className="w-5 h-5" />,
      response: <MessageSquare className="w-5 h-5" />,
      question: <HelpCircle className="w-5 h-5" />,
      transfer: <ArrowRight className="w-5 h-5" />,
      action: <Zap className="w-5 h-5" />
    }
    return iconMap[type] || <MessageSquare className="w-5 h-5" />
  }

  const getNodeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      start: 'bg-green-500',
      response: 'bg-blue-500',
      question: 'bg-yellow-500',
      transfer: 'bg-purple-500',
      action: 'bg-red-500'
    }
    return colorMap[type] || 'bg-gray-500'
  }

  const copyToClipboard = () => {
    const text = flowData.nodes.map((node, index) =>
      `${index + 1}. ${getNodeTypeDisplay(node.type)}: ${node.content || 'No content specified'}`
    ).join('\n\n')
    navigator.clipboard.writeText(text)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const downloadText = () => {
    const text = flowData.nodes.map((node, index) =>
      `${index + 1}. ${getNodeTypeDisplay(node.type)}: ${node.content || 'No content specified'}`
    ).join('\n\n')

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'call-flow-preview.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
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
          <NodePalette
            isReadOnly={true}
          />

          {/* Text Preview Workspace */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Controls */}
            <div className="bg-white px-6 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {showSuccess && (
                    <div className="text-green-600 text-sm font-manrope">
                      ✓ Copied to clipboard!
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
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
                    variant="outline"
                    size="sm"
                    onClick={downloadText}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Link href="/call-flow">
                    <Button
                      size="sm"
                      className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Flow
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Text Content Area */}
            <div className="flex-1 bg-white relative overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {flowData.nodes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <FileText className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-manrope text-gray-900 mb-2">No flow configured</h3>
                    <p className="text-sm text-gray-600">Create a flow in the visual editor to see the text preview</p>
                    <Link href="/call-flow">
                      <Button className="mt-4 bg-[#4A48FF] hover:bg-[#3A38FF] text-white font-bold font-manrope">
                        <Eye className="h-4 w-4 mr-2" />
                        Go to Visual Editor
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* Flow Steps */}
                    <div className="space-y-4">
                      {flowData.nodes.map((node, index) => (
                        <Card key={node.id} className="border-l-4 border-l-blue-500">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-manrope">
                                  {index + 1}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-6 h-6 ${getNodeColor(node.type)} rounded flex items-center justify-center text-white`}>
                                    {getNodeIcon(node.type)}
                                  </div>
                                  <div>
                                    <CardTitle className="text-lg font-semibold">{getNodeTypeDisplay(node.type)}</CardTitle>
                                    <p className="text-sm text-gray-600">{node.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-900 leading-relaxed">
                                {node.content || 'No content specified for this node'}
                              </p>
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
                            <p className="text-blue-700 font-manrope">Total Steps</p>
                            <p className="text-blue-900 text-lg font-bold">{flowData.nodes.length}</p>
                          </div>
                          <div>
                            <p className="text-blue-700 font-manrope">Estimated Duration</p>
                            <p className="text-blue-900 text-lg font-bold">{Math.max(1, Math.ceil(flowData.nodes.length * 0.5))} min</p>
                          </div>
                          <div>
                            <p className="text-blue-700 font-manrope">AI Responses</p>
                            <p className="text-blue-900 text-lg font-bold">{flowData.nodes.filter(n => n.type === 'response').length}</p>
                          </div>
                          <div>
                            <p className="text-blue-700 font-manrope">Human Transfers</p>
                            <p className="text-blue-900 text-lg font-bold">{flowData.nodes.filter(n => n.type === 'transfer').length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
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
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50 font-bold font-manrope"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visual Editor
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="text"
                    size="sm"
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50 font-bold font-manrope"
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