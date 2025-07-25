import { useState, useEffect } from 'react'
import { CallDetail, Message } from '@/components/calls/types'

const mockCallDetail: CallDetail = {
  id: '1',
  caller: 'Dev Kooper',
  number: '(647) 1255 125',
  dateTime: '15 May 2025, 12:00pm',
  duration: '1m 12s',
  type: 'incoming',
  status: 'answered',
  sentiment: 'negative',
  isFlagged: false,
  transcript: [
    {
      id: '1',
      speaker: 'ai',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      timestamp: '00:05'
    },
    {
      id: '2',
      speaker: 'caller',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      timestamp: '00:15'
    },
    {
      id: '3',
      speaker: 'ai',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      timestamp: '00:25'
    },
    {
      id: '4',
      speaker: 'caller',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepteur sint occaecat cupidatat non proident.',
      timestamp: '00:35'
    },
    {
      id: '5',
      speaker: 'ai',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      timestamp: '00:45'
    },
    {
      id: '6',
      speaker: 'caller',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut enim ad minim veniam, quis nostrud exercitation.',
      timestamp: '00:55'
    }
  ]
}

export function useCallDetail(callId: string) {
  const [call, setCall] = useState<CallDetail | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTab, setCurrentTab] = useState('transcript')
  const [callerName, setCallerName] = useState('Dev Kapoor')
  const [phoneNumber, setPhoneNumber] = useState('123456789')

  useEffect(() => {
    // In a real app, this would fetch the call detail based on callId
    setCall(mockCallDetail)
  }, [callId])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSaveToContacts = () => {
    console.log('Saving to contacts:', { callerName, phoneNumber })
  }

  const updateCallerInfo = (name: string, number: string) => {
    setCallerName(name)
    setPhoneNumber(number)
  }

  return {
    call,
    isPlaying,
    currentTab,
    callerName,
    phoneNumber,
    handlePlayPause,
    handleSaveToContacts,
    updateCallerInfo,
    setCurrentTab
  }
} 