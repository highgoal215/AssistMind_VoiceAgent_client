import React from 'react'
import { Phone, MessageSquare, HelpCircle, ArrowRight, Zap } from 'lucide-react'

interface CallFlowNodeProps {
  id: string
  type: 'start' | 'response' | 'question' | 'transfer' | 'action'
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

const nodeIcons = {
  start: <Phone className="w-5 h-5" />,
  response: <MessageSquare className="w-5 h-5" />,
  question: <HelpCircle className="w-5 h-5" />,
  transfer: <ArrowRight className="w-5 h-5" />,
  action: <Zap className="w-5 h-5" />
}

export default function CallFlowNode({
  id,
  type,
  title,
  description,
  color,
  x,
  y,
  content,
  isSelected = false,
  isDragging = false,
  onClick,
  onMouseDown
}: CallFlowNodeProps) {
  return (
    <div
      className={`absolute cursor-move transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${isDragging ? 'z-50' : 'z-10'}`}
      style={{ left: x, top: y }}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      <div className={`p-4 rounded-lg border-2 min-w-[200px] max-w-[300px] ${color} text-white shadow-lg hover:shadow-xl transition-shadow`}>
        <div className="flex items-center space-x-2 mb-2">
          {nodeIcons[type]}
          <span className="font-medium">{title}</span>
        </div>
        {content && (
          <p className="text-sm opacity-90 mt-2 line-clamp-3">{content}</p>
        )}
        <div className="w-3 h-3 bg-white rounded-full mt-3 mx-auto shadow-sm"></div>
      </div>
    </div>
  )
} 