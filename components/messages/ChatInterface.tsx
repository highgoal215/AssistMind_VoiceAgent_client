import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChatInterfaceProps } from './types'
import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'

export default function ChatInterface({ 
  messages, 
  onSendMessage, 
  className = '' 
}: ChatInterfaceProps) {
  return (
    <Card className={`h-full rounded-lg shadow-sm ${className}`}>
      <CardContent className="p-6 h-full flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        {/* Message Input */}
        <MessageInput onSend={onSendMessage} />
      </CardContent>
    </Card>
  )
} 