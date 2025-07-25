export interface FlowNode {
  id: string
  type: 'start' | 'response' | 'question' | 'transfer' | 'action'
  title: string
  description: string
  color: string
  icon?: React.ReactNode
  x: number
  y: number
  content?: string
}

export interface Connection {
  id: string
  from: string
  to: string
}

export interface FlowData {
  nodes: FlowNode[]
  connections: Connection[]
  metadata?: {
    version: string
    createdAt: string
    totalNodes: number
    totalConnections: number
  }
}

export interface NodeType {
  type: FlowNode['type']
  title: string
  description: string
  color: string
  icon: React.ReactNode
}

export type ViewMode = 'visual' | 'text' | 'json'

export interface CallFlowContextType {
  nodes: FlowNode[]
  connections: Connection[]
  selectedNode: string | null
  zoom: number
  viewMode: ViewMode
  setNodes: (nodes: FlowNode[]) => void
  setConnections: (connections: Connection[]) => void
  setSelectedNode: (nodeId: string | null) => void
  setZoom: (zoom: number) => void
  setViewMode: (mode: ViewMode) => void
  addNode: (node: FlowNode) => void
  updateNode: (nodeId: string, updates: Partial<FlowNode>) => void
  deleteNode: (nodeId: string) => void
  addConnection: (connection: Connection) => void
  deleteConnection: (connectionId: string) => void
  clearFlow: () => void
  saveFlow: () => void
  loadFlow: () => void
}

export interface CallFlowNodeProps {
  id: string
  type: FlowNode['type']
  title: string
  description: string
  color: string
  x: number
  y: number
  content?: string
  isSelected?: boolean
  isDragging?: boolean
  onClick?: () => void
  onMouseDown?: (e: React.MouseEvent) => void
} 