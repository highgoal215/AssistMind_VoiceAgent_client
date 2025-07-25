import { useState, useCallback } from 'react'
import { Message, MessageFilters, ChatMessage } from '@/components/messages/types'

// Sample data - in a real app, this would come from an API
const sampleMessages: Message[] = [
  {
    id: '1',
    contact: {
      id: '1',
      name: 'Julio Caesar',
      phone: '+1 (555) 123-4567',
      initials: 'JC',
      isOnline: false,
      lastActive: '1h ago'
    },
    preview: 'Lorem ipsum dolor sit amet consectetur. Quis ultrices praesent mauris quis sagittis neque urna amet. Pretium tri...',
    timestamp: '1h ago',
    priority: 'High',
    type: 'Appointment',
    tags: ['High Priority', 'Appointment'],
    isRead: false
  },
  {
    id: '2',
    contact: {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      initials: 'SJ',
      isOnline: true,
      lastActive: '5m ago'
    },
    preview: 'Hi, I have a question about my recent appointment. Can you help me with the scheduling?',
    timestamp: '5m ago',
    priority: 'Medium',
    type: 'Inquiry',
    tags: ['Inquiry', 'Medium Priority'],
    isRead: true
  },
  {
    id: '3',
    contact: {
      id: '3',
      name: 'Mike Wilson',
      phone: '+1 (555) 456-7890',
      initials: 'MW',
      isOnline: false,
      lastActive: '2h ago'
    },
    preview: 'I missed my call yesterday. Can we reschedule for tomorrow?',
    timestamp: '2h ago',
    priority: 'Low',
    type: 'Missed',
    tags: ['Missed', 'Low Priority'],
    isRead: false
  }
]

const sampleChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: 'Benny',
    initials: 'B',
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    timestamp: '10:30 AM',
    isUser: false
  },
  {
    id: 2,
    sender: 'Dev Kooper',
    initials: 'D',
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    timestamp: '10:32 AM',
    isUser: true
  },
  {
    id: 3,
    sender: 'Benny',
    initials: 'B',
    message: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: '10:35 AM',
    isUser: false
  },
  {
    id: 4,
    sender: 'Dev Kooper',
    initials: 'D',
    message: 'Okay',
    timestamp: '10:36 AM',
    isUser: true
  },
  {
    id: 5,
    sender: 'Benny',
    initials: 'B',
    message: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    timestamp: '10:38 AM',
    isUser: false
  }
]

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [filters, setFilters] = useState<MessageFilters>({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleFiltersChange = useCallback((newFilters: MessageFilters) => {
    setFilters(newFilters)
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleViewMessage = useCallback((id: string) => {
    // Navigate to message detail page
    window.location.href = `/messages/${id}`
  }, [])

  const handleSendMessage = useCallback((message: string) => {
    // In a real app, this would send the message to an API
    console.log('Sending message:', message)
    
    // Add the new message to the chat
    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: 'Dev Kooper',
      initials: 'D',
      message: message,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isUser: true
    }
    
    // In a real app, you'd update the chat messages state here
    console.log('New message added:', newMessage)
  }, [])

  const handleDownload = useCallback(() => {
    console.log('Downloading message')
    // In a real app, this would trigger a download
  }, [])

  const handlePlay = useCallback(() => {
    console.log('Playing message')
    // In a real app, this would play the message audio
  }, [])

  const handleViewMessageDetail = useCallback(() => {
    console.log('Viewing message detail')
    // In a real app, this would show additional message details
  }, [])

  // Filter messages based on current filters and search
  const filteredMessages = messages.filter(message => {
    // Search filter
    if (searchQuery && !message.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !message.preview.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Type filter
    if (filters.type && message.type !== filters.type) {
      return false
    }

    // Priority filter
    if (filters.priority && message.priority !== filters.priority) {
      return false
    }

    // Date filter
    if (filters.date) {
      // In a real app, you'd compare the message date with the filter date
      // For now, we'll just return true
      return true
    }

    return true
  })

  return {
    messages: filteredMessages,
    chatMessages: sampleChatMessages,
    filters,
    searchQuery,
    handleFiltersChange,
    handleSearch,
    handleViewMessage,
    handleSendMessage,
    handleDownload,
    handlePlay,
    handleViewMessageDetail
  }
} 