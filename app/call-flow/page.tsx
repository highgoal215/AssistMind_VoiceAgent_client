"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCallFlow } from '@/hooks/useCallFlow'
import {
  CallFlowLayout,
  CanvasControls,
  ViewModeToggle,
  FlowCanvas,
  NodeEditDialog,
  FlowNode
} from '@/components/call-flow'

export default function CallFlowBuilderPage() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEditingNode, setIsEditingNode] = useState(false)
  const [editingNode, setEditingNode] = useState<FlowNode | null>(null)

  const {
    nodes,
    connections,
    selectedNode,
    zoom,
    viewMode,
    draggedNode,
    setSelectedNode,
    setViewMode,
    addNode,
    updateNode,
    deleteNode,
    clearFlow,
    saveFlow,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleNodeMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
    handleCanvasDrop,
    handleDragStart
  } = useCallFlow()

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

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode as any)
    if (mode === 'text') {
      router.push('/call-flow/text-preview')
    } else if (mode === 'json') {
      router.push('/call-flow/json-config')
    }
  }

  const handleCanvasClick = () => {
    setSelectedNode(null)
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId)
  }

  const handleEditNode = () => {
    if (!selectedNode) return

    const node = nodes.find(n => n.id === selectedNode)
    if (node) {
      setEditingNode(node)
      setIsEditingNode(true)
    }
  }

  const handleSaveNodeEdit = (nodeId: string, content: string) => {
    updateNode(nodeId, { content })
  }

  const handleDeleteSelectedNode = () => {
    if (!selectedNode) return
    deleteNode(selectedNode)
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
    addNode(customNode)
  }

  const handleSaveFlow = () => {
    saveFlow()
    
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

  return (
    <CallFlowLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
      nodePaletteProps={{
        onDragStart: handleDragStart,
        onCreateCustomNode: createCustomNode,
        isReadOnly: false
      }}
    >
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Controls */}
        <CanvasControls
          selectedNode={selectedNode}
          onEditNode={handleEditNode}
          onDeleteNode={handleDeleteSelectedNode}
          onClearCanvas={clearFlow}
          onSaveFlow={handleSaveFlow}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
          zoom={zoom}
        />

        {/* Flow Canvas */}
        <FlowCanvas
          nodes={nodes}
          connections={connections}
          zoom={zoom}
          selectedNode={selectedNode}
          draggedNode={draggedNode}
          onCanvasDrop={handleCanvasDrop}
          onCanvasDragOver={(e) => e.preventDefault()}
          onCanvasMouseMove={handleCanvasMouseMove}
          onCanvasMouseUp={handleCanvasMouseUp}
          onCanvasClick={handleCanvasClick}
          onNodeClick={handleNodeClick}
          onNodeMouseDown={handleNodeMouseDown}
        />

        {/* Bottom Controls */}
        <div className="bg-white border-t border-gray-200 px-4 lg:px-6 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
            </div>

            <ViewModeToggle
              currentMode={viewMode}
              onModeChange={handleViewModeChange}
            />
          </div>
        </div>
      </div>

      {/* Edit Node Dialog */}
      <NodeEditDialog
        isOpen={isEditingNode}
        onOpenChange={setIsEditingNode}
        node={editingNode}
        onSave={handleSaveNodeEdit}
      />
    </CallFlowLayout>
  )
} 