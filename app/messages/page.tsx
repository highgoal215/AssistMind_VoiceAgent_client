"use client"

import React from 'react'
import { MessagesLayout, MessagesContent } from '@/components/messages'
import { useMessages } from '@/hooks/useMessages'

export default function MessagesPage() {
  const {
    messages,
    filters,
    handleFiltersChange,
    handleSearch,
    handleViewMessage
  } = useMessages()

  return (
    <MessagesLayout>
      <MessagesContent
        messages={messages}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
        onViewMessage={handleViewMessage}
      />
    </MessagesLayout>
  )
} 