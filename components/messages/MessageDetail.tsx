import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Contact, ChatMessage } from './types'
import ContactCard from './ContactCard'
import ChatInterface from './ChatInterface'
import MessageActions from './MessageActions'

interface MessageDetailProps {
  contact: Contact
  messages: ChatMessage[]
  tags?: string[]
  onSendMessage: (message: string) => void
  onDownload?: () => void
  onPlay?: () => void
  onViewMessage?: () => void
  className?: string
}

export default function MessageDetail({
  contact,
  messages,
  tags = [],
  onSendMessage,
  onDownload,
  onPlay,
  onViewMessage,
  className = ''
}: MessageDetailProps) {
  return (
    <div className={`flex h-full space-x-6 ${className}`}>
      {/* Left Column - Contact Card */}
      <div className="w-80 flex-shrink-0">
        <Card className="h-full rounded-lg shadow-sm">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Contact Information */}
            <ContactCard 
              contact={contact}
              tags={tags}
            />

            {/* View Message Button */}
            <div className="mt-auto">
              <Button 
                className="w-full bg-[#4A48FF] hover:bg-[#3a38ef] text-white font-manrope font-bold"
                onClick={onViewMessage}
              >
                View message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Chat Interface */}
      <div className="flex-1">
        <Card className="h-full rounded-lg shadow-sm">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Chat Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <ContactCard 
                  contact={contact}
                  tags={tags}
                />
              </div>
              <MessageActions 
                onDownload={onDownload}
                onPlay={onPlay}
              />
            </div>

            {/* Call Transcript Label */}
            <div className="mb-4">
              <h4 className="text-2xl font-manrope font-bold text-gray-900">Call Transcript</h4>
            </div>

            {/* Chat Interface */}
            <ChatInterface 
              messages={messages}
              onSendMessage={onSendMessage}
              className="flex-1"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 