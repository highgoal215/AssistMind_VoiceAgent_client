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
  Plus,
  Minus,
  Maximize,
  Bot
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import NodePalette from '@/components/call-flow/NodePalette'
import CallFlowNode from '@/components/call-flow/CallFlowNode'

interface FlowNode {
  id: string
  type: 'start' | 'response' | 'question' | 'transfer' | 'action'
  title: string
  description: string
  color: string
  icon: React.ReactNode
  x: number
  y: number
  content?: string
}



export default function CallFlowBuilderPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState('visual')
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: '1',
      type: 'start',
      title: 'Start Call',
      description: 'Call starts here',
      color: 'bg-green-500',
      icon: null,
      x: 400,
      y: 100
    },
    {
      id: '2',
      type: 'response',
      title: 'Response',
      description: 'AI delivers a message',
      color: 'bg-blue-500',
      icon: null,
      x: 200,
      y: 250,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut...'
    },
    {
      id: '3',
      type: 'question',
      title: 'Ask Question',
      description: 'Ask & wait for caller\'s answer',
      color: 'bg-yellow-500',
      icon: null,
      x: 600,
      y: 250,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut...'
    }
  ])

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode)
    if (mode === 'text') {
      window.location.href = '/call-flow/text-preview'
    } else if (mode === 'json') {
      window.location.href = '/call-flow/json-config'
    }
  }

  const handleDragStart = (e: React.DragEvent, nodeType: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(nodeType))
  }

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const nodeData = JSON.parse(e.dataTransfer.getData('application/json'))
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newNode: FlowNode = {
      id: Date.now().toString(),
      type: nodeData.type,
      title: nodeData.title,
      description: nodeData.description,
      color: nodeData.color,
      icon: null,
      x,
      y
    }

    setNodes(prev => [...prev, newNode])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const clearCanvas = () => {
    setNodes([])
  }

  const saveFlow = () => {
    // TODO: Implement save functionality
    console.log('Saving flow:', nodes)
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

        {/* Call Flow Builder Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Node Palette */}
          <NodePalette 
            onDragStart={handleDragStart}
            onCreateCustomNode={() => console.log('Create custom node')}
          />

          {/* Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Controls */}
            <div className="bg-white  px-6 py-3 ">
              <div className="flex justify-end items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCanvas}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={saveFlow}
                  className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Flow
                </Button>
              </div>
            </div>

            <div
              className="flex-1 bg-white relative overflow-auto"
              onDrop={handleCanvasDrop}
              onDragOver={handleDragOver}
            >
              {nodes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bot className="w-16 h-16 mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No flow configured</h3>
                  <p className="text-sm">Add nodes to the canvas to see the flow sequence</p>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {nodes.map((node) => (
                    <CallFlowNode
                      key={node.id}
                      id={node.id}
                      type={node.type}
                      title={node.title}
                      description={node.description}
                      color={node.color}
                      x={node.x}
                      y={node.y}
                      content={node.content}
                      onClick={() => console.log('Node clicked:', node.id)}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  {nodes.length > 1 && (
                    <svg className="absolute inset-0 pointer-events-none">
                      {nodes.slice(1).map((node, index) => (
                        <line
                          key={`line-${index}`}
                          x1={nodes[0].x + 100}
                          y1={nodes[0].y + 80}
                          x2={node.x + 100}
                          y2={node.y}
                          stroke="#4A48FF"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                      ))}
                    </svg>
                  )}
                </div>
              )}
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

                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && handleViewModeChange(value)}>
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