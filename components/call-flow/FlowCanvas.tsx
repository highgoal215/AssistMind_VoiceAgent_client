import React from 'react'
import { Bot } from 'lucide-react'
import CallFlowNode from './CallFlowNode'
import { FlowNode, Connection } from './types'

interface FlowCanvasProps {
  nodes: FlowNode[]
  connections: Connection[]
  zoom: number
  selectedNode: string | null
  draggedNode: string | null
  onCanvasDrop: (e: React.DragEvent) => void
  onCanvasDragOver: (e: React.DragEvent) => void
  onCanvasMouseMove: (e: React.MouseEvent) => void
  onCanvasMouseUp: () => void
  onCanvasClick: () => void
  onNodeClick: (nodeId: string) => void
  onNodeMouseDown: (e: React.MouseEvent, nodeId: string) => void
}

export default function FlowCanvas({
  nodes,
  connections,
  zoom,
  selectedNode,
  draggedNode,
  onCanvasDrop,
  onCanvasDragOver,
  onCanvasMouseMove,
  onCanvasMouseUp,
  onCanvasClick,
  onNodeClick,
  onNodeMouseDown
}: FlowCanvasProps) {
  return (
    <div
      className="flex-1 bg-white relative overflow-auto"
      onDrop={onCanvasDrop}
      onDragOver={onCanvasDragOver}
      onMouseMove={onCanvasMouseMove}
      onMouseUp={onCanvasMouseUp}
      onMouseLeave={onCanvasMouseUp}
      onClick={onCanvasClick}
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
            {/* Render nodes */}
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
                onClick={() => onNodeClick(node.id)}
                onMouseDown={(e: React.MouseEvent) => onNodeMouseDown(e, node.id)}
                isSelected={selectedNode === node.id}
                isDragging={draggedNode === node.id}
              />
            ))}

            {/* Render connection lines */}
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
  )
} 