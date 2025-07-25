import React from 'react'
import { CallFlowNodeProps } from './types'
import { NODE_ICONS } from './constants'

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
      className={`absolute cursor-move transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        } ${isDragging ? 'z-50' : 'z-10'}`}
      style={{ left: x, top: y }}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      <div className={`p-4 rounded-lg border-2 min-w-[200px] max-w-[300px] ${color} text-white shadow-lg hover:shadow-xl transition-shadow ${isSelected ? 'shadow-2xl' : ''
        }`}>
        <div className="flex items-center space-x-2 mb-2">
          {NODE_ICONS[type]}
          <span className="font-manrope">{title}</span>
        </div>
        {content && (
          <p className="text-sm opacity-90 mt-2 line-clamp-3">{content}</p>
        )}
        <div className="w-3 h-3 bg-white rounded-full mt-3 mx-auto shadow-sm"></div>
      </div>
    </div>
  )
} 