import { useState, useEffect, useCallback } from 'react'
import { FlowNode, Connection, FlowData, ViewMode } from '@/components/call-flow/types'
import { STORAGE_KEY, DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from '@/components/call-flow/constants'

export function useCallFlow() {
  const [nodes, setNodes] = useState<FlowNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [viewMode, setViewMode] = useState<ViewMode>('visual')
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Load saved flow from localStorage on component mount
  useEffect(() => {
    loadFlow()
  }, [])

  const loadFlow = useCallback(() => {
    try {
      const savedFlow = localStorage.getItem(STORAGE_KEY)
      if (savedFlow) {
        const { nodes: savedNodes, connections: savedConnections } = JSON.parse(savedFlow)
        setNodes(savedNodes || [])
        setConnections(savedConnections || [])
      }
    } catch (error) {
      console.error('Error loading saved flow:', error)
    }
  }, [])

  const saveFlow = useCallback(() => {
    const flowData: FlowData = {
      nodes,
      connections,
      metadata: {
        version: "1.0",
        createdAt: new Date().toISOString(),
        totalNodes: nodes.length,
        totalConnections: connections.length
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(flowData))
  }, [nodes, connections])

  const addNode = useCallback((node: FlowNode) => {
    setNodes(prev => [...prev, node])
  }, [])

  const updateNode = useCallback((nodeId: string, updates: Partial<FlowNode>) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, ...updates } : node
    ))
  }, [])

  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setConnections(prev => prev.filter(conn => conn.from !== nodeId && conn.to !== nodeId))
    if (selectedNode === nodeId) {
      setSelectedNode(null)
    }
  }, [selectedNode])

  const addConnection = useCallback((connection: Connection) => {
    setConnections(prev => [...prev, connection])
  }, [])

  const deleteConnection = useCallback((connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId))
  }, [])

  const clearFlow = useCallback(() => {
    setNodes([])
    setConnections([])
    setSelectedNode(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM))
  }, [])

  const handleZoomReset = useCallback(() => {
    setZoom(DEFAULT_ZOOM)
  }, [])

  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
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
  }, [nodes])

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
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
  }, [draggedNode, dragOffset, zoom])

  const handleCanvasMouseUp = useCallback(() => {
    setDraggedNode(null)
    setDragOffset({ x: 0, y: 0 })
  }, [])

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
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

    addNode(newNode)
  }, [zoom, addNode])

  const handleDragStart = useCallback((e: React.DragEvent, nodeType: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(nodeType))
  }, [])

  return {
    // State
    nodes,
    connections,
    selectedNode,
    zoom,
    viewMode,
    draggedNode,
    dragOffset,
    
    // Setters
    setNodes,
    setConnections,
    setSelectedNode,
    setZoom,
    setViewMode,
    
    // Actions
    addNode,
    updateNode,
    deleteNode,
    addConnection,
    deleteConnection,
    clearFlow,
    saveFlow,
    loadFlow,
    
    // Event handlers
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleNodeMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
    handleCanvasDrop,
    handleDragStart
  }
} 