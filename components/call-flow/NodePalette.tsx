import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NodeType } from './types'
import { NODE_TYPES } from './constants'

interface NodePaletteProps {
  onDragStart?: (e: React.DragEvent, nodeType: NodeType) => void
  onCreateCustomNode?: () => void
  isReadOnly?: boolean
}

export default function NodePalette({ onDragStart, onCreateCustomNode, isReadOnly = false }: NodePaletteProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-2">Node Palette</h2>
        <p className="text-md font-semibold font-manrope text-gray-600">Drag blocks to canvas</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold font-manrope text-gray-700 mb-3">Logic Blocks</h3>
          <div className="space-y-3">
            {NODE_TYPES.map((nodeType) => (
              <div
                key={nodeType.type}
                draggable={!isReadOnly && !!onDragStart}
                onDragStart={!isReadOnly && onDragStart ? (e) => onDragStart(e, nodeType) : undefined}
                className={`p-4 border border-gray-200 rounded-lg ${!isReadOnly && onDragStart ? 'cursor-move hover:border-gray-300 transition-colors hover:shadow-sm' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${nodeType.color} rounded-lg flex items-center justify-center text-white`}>
                    {nodeType.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-manrope font-bold text-gray-900">{nodeType.title}</h4>
                    <p className="text-sm font-manrope font-semibold text-gray-600">{nodeType.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-bold font-manrope"
            onClick={onCreateCustomNode}
            disabled={isReadOnly}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Node
          </Button>
        </div>
      </div>
    </div>
  )
} 