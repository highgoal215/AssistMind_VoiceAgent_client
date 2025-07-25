export interface Message {
  id: string
  contact: Contact
  preview: string
  timestamp: string
  priority: 'High' | 'Medium' | 'Low'
  type: 'Appointment' | 'Inquiry' | 'Missed'
  tags: string[]
  isRead: boolean
}

export interface Contact {
  id: string
  name: string
  phone: string
  initials: string
  avatar?: string
  isOnline: boolean
  lastActive: string
}

export interface ChatMessage {
  id: number
  sender: string
  initials: string
  message: string
  timestamp: string
  isUser: boolean
}

export interface MessageFilters {
  type?: string
  priority?: string
  date?: Date | null
  search?: string
}

export interface MessageSearchProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export interface MessageFiltersProps {
  filters: MessageFilters
  onFiltersChange: (filters: MessageFilters) => void
  className?: string
}

export interface MessageCardProps {
  message: Message
  onView: (id: string) => void
  className?: string
}

export interface ContactCardProps {
  contact: Contact
  tags?: string[]
  actions?: React.ReactNode
  className?: string
}

export interface ChatInterfaceProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  className?: string
}

export interface ChatMessageProps {
  message: ChatMessage
  className?: string
}

export interface MessageInputProps {
  onSend: (message: string) => void
  placeholder?: string
  className?: string
}

export interface MessageTagsProps {
  tags: string[]
  className?: string
}

export interface MessageActionsProps {
  onDownload?: () => void
  onPlay?: () => void
  onView?: () => void
  className?: string
} 