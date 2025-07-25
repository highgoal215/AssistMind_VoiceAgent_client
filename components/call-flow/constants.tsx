import React from 'react'
import { Phone, MessageSquare, HelpCircle, ArrowRight, Zap } from 'lucide-react'
import { NodeType } from './types'

export const NODE_TYPES: NodeType[] = [
  {
    type: 'start',
    title: 'Start Call',
    description: 'Call starts here',
    color: 'bg-green-500',
    icon: <Phone className="w-5 h-5" />
  },
  {
    type: 'response',
    title: 'Response',
    description: 'AI delivers a message',
    color: 'bg-blue-500',
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    type: 'question',
    title: 'Ask Question',
    description: 'Ask & wait for caller\'s answer',
    color: 'bg-yellow-500',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    type: 'transfer',
    title: 'Transfer to Human',
    description: 'Transfers the call to a phone number',
    color: 'bg-purple-500',
    icon: <ArrowRight className="w-5 h-5" />
  },
  {
    type: 'action',
    title: 'Trigger Action',
    description: 'Executes external actions',
    color: 'bg-red-500',
    icon: <Zap className="w-5 h-5" />
  }
]

export const NODE_TYPE_DISPLAY_NAMES: Record<string, string> = {
  start: 'Start Call',
  response: 'Response',
  question: 'Ask Question',
  transfer: 'Transfer to Human',
  action: 'Trigger Action'
}

export const NODE_COLORS: Record<string, string> = {
  start: 'bg-green-500',
  response: 'bg-blue-500',
  question: 'bg-yellow-500',
  transfer: 'bg-purple-500',
  action: 'bg-red-500'
}

export const NODE_ICONS = {
  start: <Phone className="w-5 h-5" />,
  response: <MessageSquare className="w-5 h-5" />,
  question: <HelpCircle className="w-5 h-5" />,
  transfer: <ArrowRight className="w-5 h-5" />,
  action: <Zap className="w-5 h-5" />
}

export const STORAGE_KEY = 'callFlow'
export const DEFAULT_ZOOM = 1
export const MIN_ZOOM = 0.5
export const MAX_ZOOM = 2
export const ZOOM_STEP = 0.1 