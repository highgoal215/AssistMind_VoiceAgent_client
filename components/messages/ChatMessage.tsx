import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ChatMessageProps } from './types'

export default function ChatMessage({ message, className = '' }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} ${className}`}>
      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <Avatar className={`h-8 w-8 bg-pink-500 flex-shrink-0 ${message.isUser ? 'ml-3' : 'mr-3'}`}>
          <AvatarFallback className="text-white font-semibold text-sm">
            {message.initials}
          </AvatarFallback>
        </Avatar>
        <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-2 rounded-lg ${
            message.isUser 
              ? 'bg-purple-100 text-gray-900' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            <p className="text-sm">{message.message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
        </div>
      </div>
    </div>
  )
} 