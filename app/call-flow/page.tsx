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
  Plus,
  Minus,
  Maximize,
  Bot,
  Trash2,
  Edit,
  Search,
  Menu,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import NodePalette from '@/components/call-flow/NodePalette'
import CallFlowNode from '@/components/call-flow/CallFlowNode'
import Header from '@/components/header/header'
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

interface Connection {
  id: string
  from: string
  to: string
}

export default function CallFlowBuilderPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState('visual')
  const [nodes, setNodes] = useState<FlowNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isEditingNode, setIsEditingNode] = useState(false)
  const [editingNode, setEditingNode] = useState<FlowNode | null>(null)
  const [editContent, setEditContent] = useState('')

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  // Load saved flow from localStorage on component mount
  useEffect(() => {
    const savedFlow = localStorage.getItem('callFlow')
    if (savedFlow) {
      try {
        const { nodes: savedNodes, connections: savedConnections } = JSON.parse(savedFlow)
        setNodes(savedNodes || [])
        setConnections(savedConnections || [])
      } catch (error) {
        console.error('Error loading saved flow:', error)
      }
    }
  }, [])

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
    const x = (e.clientX - rect.left) / zoom
    const y = (e.clientY - rect.top) / zoom

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

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault()
    e.stopPropagation()
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return

    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    setDraggedNode(nodeId)
    setDragOffset({ x: offsetX, y: offsetY })
    setSelectedNode(nodeId)
  }

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!draggedNode) return

    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left - dragOffset.x) / zoom
    const y = (e.clientY - rect.top - dragOffset.y) / zoom

    setNodes(prev => prev.map(node =>
      node.id === draggedNode
        ? { ...node, x: Math.max(0, x), y: Math.max(0, y) }
        : node
    ))
  }

  const handleCanvasMouseUp = () => {
    setDraggedNode(null)
    setDragOffset({ x: 0, y: 0 })
  }

  const handleCanvasClick = () => {
    setSelectedNode(null)
  }

  const clearCanvas = () => {
    setNodes([])
    setConnections([])
    setSelectedNode(null)
    localStorage.removeItem('callFlow')
  }

  const saveFlow = () => {
    const flowData = {
      nodes,
      connections,
      metadata: {
        version: "1.0",
        createdAt: new Date().toISOString(),
        totalNodes: nodes.length,
        totalConnections: connections.length
      }
    }

    localStorage.setItem('callFlow', JSON.stringify(flowData))

    // Show success feedback
    const saveButton = document.querySelector('[data-save-button]') as HTMLButtonElement
    if (saveButton) {
      const originalText = saveButton.innerHTML
      saveButton.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Saved!'
      setTimeout(() => {
        saveButton.innerHTML = originalText
      }, 2000)
    }
  }

  const deleteSelectedNode = () => {
    if (!selectedNode) return

    setNodes(prev => prev.filter(node => node.id !== selectedNode))
    setConnections(prev => prev.filter(conn => conn.from !== selectedNode && conn.to !== selectedNode))
    setSelectedNode(null)
  }

  const editSelectedNode = () => {
    if (!selectedNode) return

    const node = nodes.find(n => n.id === selectedNode)
    if (node) {
      setEditingNode(node)
      setEditContent(node.content || '')
      setIsEditingNode(true)
    }
  }

  const saveNodeEdit = () => {
    if (!editingNode) return

    setNodes(prev => prev.map(node =>
      node.id === editingNode.id
        ? { ...node, content: editContent }
        : node
    ))
    setIsEditingNode(false)
    setEditingNode(null)
    setEditContent('')
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5))
  }

  const handleZoomReset = () => {
    setZoom(1)
  }

  const createCustomNode = () => {
    const customNode: FlowNode = {
      id: Date.now().toString(),
      type: 'response',
      title: 'Custom Node',
      description: 'Custom node description',
      color: 'bg-purple-500',
      icon: null,
      x: 400,
      y: 200,
      content: 'Custom node content'
    }
    setNodes(prev => [...prev, customNode])
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
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* Call Flow Builder Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Node Palette */}
          <NodePalette
            onDragStart={handleDragStart}
            onCreateCustomNode={createCustomNode}
          />

          {/* Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Controls */}
            <div className="bg-white px-4 lg:px-6 py-3">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
                <div className="flex items-center space-x-2 lg:space-x-4">
                  {selectedNode && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={editSelectedNode}
                        className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-8 lg:h-9 px-3 lg:px-4 text-sm font-bold font-manrope"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={deleteSelectedNode}
                        className="bg-white border-red-200 text-red-700 hover:bg-red-50 h-8 lg:h-9 px-3 lg:px-4 text-sm font-bold font-manrope"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCanvas}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-8 lg:h-9 px-3 lg:px-4 text-sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveFlow}
                    data-save-button
                    className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-8 lg:h-9 px-3 lg:px-4 text-sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Flow
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="flex-1 bg-white relative overflow-auto"
              onDrop={handleCanvasDrop}
              onDragOver={handleDragOver}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              onClick={handleCanvasClick}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left'
                }}
              >
                {nodes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Bot className="w-12 h-12 lg:w-16 lg:h-16 mb-4 text-gray-300" />
                    <h3 className="text-base lg:text-lg font-manrope mb-2">No flow configured</h3>
                    <p className="text-sm text-center px-4">Add nodes to the canvas to see the flow sequence</p>
                  </div>
                ) : (
                  <>
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
                        onClick={() => setSelectedNode(node.id)}
                        onMouseDown={(e: React.MouseEvent) => handleNodeMouseDown(e, node.id)}
                        isSelected={selectedNode === node.id}
                        isDragging={draggedNode === node.id}
                      />
                    ))}

                    {/* Connection lines */}
                    {connections.length > 0 && (
                      <svg className="absolute inset-0 pointer-events-none" style={{ transform: `scale(${zoom})` }}>
                        {connections.map((connection) => {
                          const fromNode = nodes.find(n => n.id === connection.from)
                          const toNode = nodes.find(n => n.id === connection.to)

                          if (!fromNode || !toNode) return null

                          return (
                            <line
                              key={connection.id}
                              x1={fromNode.x + 100}
                              y1={fromNode.y + 80}
                              x2={toNode.x + 100}
                              y2={toNode.y}
                              stroke="#4A48FF"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                            />
                          )
                        })}
                      </svg>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="bg-white border-t border-gray-200 px-4 lg:px-6 py-3">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={handleZoomIn}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={handleZoomOut}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={handleZoomReset}>
                    <Maximize className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600 ml-2">{Math.round(zoom * 100)}%</span>
                </div>

                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && handleViewModeChange(value)}>
                  <ToggleGroupItem
                    value="visual"
                    size="sm"
                    className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Visual Editor</span>
                    <span className="lg:hidden">Visual</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="text"
                    size="sm"
                    className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Text Preview</span>
                    <span className="lg:hidden">Text</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="json"
                    size="sm"
                    className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">JSON Config</span>
                    <span className="lg:hidden">JSON</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Node Dialog */}
      <Dialog open={isEditingNode} onOpenChange={setIsEditingNode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Node Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-manrope text-gray-700">Content</label>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Enter node content..."
                className="mt-1"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditingNode(false)}>
                Cancel
              </Button>
              <Button onClick={saveNodeEdit}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 