export interface Call {
  id: string
  caller: string
  number: string
  dateTime: string
  duration: string
  type: 'incoming' | 'outgoing'
  status: 'booked' | 'unqualified' | 'flagged' | 'lead' | 'follow-up' | 'spam' | 'answered' | 'missed' | 'voicemail'
  isFlagged: boolean
}

export interface CallDetail extends Call {
  sentiment: 'positive' | 'negative' | 'neutral'
  audioUrl?: string
  transcript: Message[]
}

export interface Message {
  id: string
  speaker: 'ai' | 'caller'
  content: string
  timestamp: string
}

export interface CallFilters {
  searchTerm: string
  callType: string
  status: string
  dateRange: string
}

export interface CallStats {
  totalCalls: number
  averageDuration: string
  uniqueCallers: number
}

export interface PaginationState {
  currentPage: number
  totalPages: number
  itemsPerPage: number
} 