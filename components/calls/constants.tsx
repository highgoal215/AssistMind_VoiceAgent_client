import React from 'react'
import { Call } from './types'

export const MOCK_CALLS: Call[] = [
  {
    id: '1',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '15 May 2025 9:30 AM',
    duration: '1m 12s',
    type: 'incoming',
    status: 'booked',
    isFlagged: false
  },
  {
    id: '2',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '15 May 2025 8:45 AM',
    duration: '1m 12s',
    type: 'outgoing',
    status: 'unqualified',
    isFlagged: true
  },
  {
    id: '3',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '15 May 2025 8:15 AM',
    duration: '1m 12s',
    type: 'incoming',
    status: 'flagged',
    isFlagged: true
  },
  {
    id: '4',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '14 May 2025 3:20 PM',
    duration: '1m 12s',
    type: 'outgoing',
    status: 'lead',
    isFlagged: false
  },
  {
    id: '5',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '14 May 2025 2:10 PM',
    duration: '1m 12s',
    type: 'incoming',
    status: 'follow-up',
    isFlagged: false
  },
  {
    id: '6',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '14 May 2025 1:30 PM',
    duration: '1m 12s',
    type: 'outgoing',
    status: 'spam',
    isFlagged: false
  }
]

export const STATUS_COLORS: Record<string, string> = {
  booked: 'bg-green-100 text-green-800',
  unqualified: 'bg-orange-100 text-orange-800',
  flagged: 'bg-red-100 text-red-800',
  lead: 'bg-purple-100 text-purple-800',
  'follow-up': 'bg-blue-100 text-blue-800',
  spam: 'bg-pink-100 text-pink-800',
  answered: 'bg-green-100 text-green-800',
  missed: 'bg-red-100 text-red-800',
  voicemail: 'bg-yellow-100 text-yellow-800'
}

export const TYPE_COLORS: Record<string, string> = {
  incoming: 'bg-purple-100 text-purple-800',
  outgoing: 'bg-gray-100 text-gray-800'
}

export const CALL_TYPE_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Incoming', label: 'Incoming' },
  { value: 'Outgoing', label: 'Outgoing' }
]

export const STATUS_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Missed', label: 'Missed' },
  { value: 'Transferred', label: 'Transferred' },
  { value: 'Failed', label: 'Failed' }
]

export const DATE_RANGE_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Today', label: 'Today' },
  { value: '7 days', label: '7 days' },
  { value: '30 days', label: '30 days' },
  { value: 'custom', label: 'Custom' }
]

export const ITEMS_PER_PAGE = 10 