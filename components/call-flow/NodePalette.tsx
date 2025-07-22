import React from 'react'
import { Phone, MessageSquare, HelpCircle, ArrowRight, Zap, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NodeType {
  type: 'start' | 'response' | 'question' | 'transfer' | 'action'
  title: string
  description: string
  color: string
  icon: React.ReactNode
}

interface NodePaletteProps {
  onDragStart: (e: React.DragEvent, nodeType: NodeType) => void
  onCreateCustomNode?: () => void
}

const nodeTypes: NodeType[] = [
  {
    type: 'start',
    title: 'Start Call',
    description: 'Call starts here',
    color: 'bg-green-500',
    icon: <Phone className="w-5 h-5" />
  },
  {
    type: 'response',
    title: 'Response',
    description: 'AI delivers a message',
    color: 'bg-blue-500',
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    type: 'question',
    title: 'Ask Question',
    description: 'Ask & wait for caller\'s answer',
    color: 'bg-yellow-500',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    type: 'transfer',
    title: 'Transfer to Human',
    description: 'Transfers the call to a phone number',
    color: 'bg-purple-500',
    icon: <ArrowRight className="w-5 h-5" />
  },
  {
    type: 'action',
    title: 'Trigger Action',
    description: 'Executes external actions',
    color: 'bg-red-500',
    icon: <Zap className="w-5 h-5" />
  }
]

export default function NodePalette({ onDragStart, onCreateCustomNode }: NodePaletteProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Node Palette</h2>
        <p className="text-sm text-gray-600">Drag blocks to canvas</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Logic Blocks</h3>
          <div className="space-y-3">
            {nodeTypes.map((nodeType) => (
              <div
                key={nodeType.type}
                draggable
                onDragStart={(e) => onDragStart(e, nodeType)}
                className="p-4 border border-gray-200 rounded-lg cursor-move hover:border-gray-300 transition-colors hover:shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${nodeType.color} rounded-lg flex items-center justify-center text-white`}>
                    {nodeType.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{nodeType.title}</h4>
                    <p className="text-sm text-gray-600">{nodeType.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={onCreateCustomNode}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Node
          </Button>
        </div>
      </div>
    </div>
  )
} 