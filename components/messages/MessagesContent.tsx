import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Message, MessageFilters } from './types'
import MessageSearch from './MessageSearch'
import MessageFiltersComponent from './MessageFilters'
import MessageCard from './MessageCard'

interface MessagesContentProps {
  messages: Message[]
  filters: MessageFilters
  onFiltersChange: (filters: MessageFilters) => void
  onSearch: (query: string) => void
  onViewMessage: (id: string) => void
  className?: string
}

export default function MessagesContent({
  messages,
  filters,
  onFiltersChange,
  onSearch,
  onViewMessage,
  className = ''
}: MessagesContentProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filter Section */}
      <Card className="rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <MessageSearch 
              placeholder="Search messages..." 
              onSearch={onSearch}
            />
            <MessageFiltersComponent 
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onView={onViewMessage}
          />
        ))}
      </div>
    </div>
  )
} 