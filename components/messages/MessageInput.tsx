import React from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageInputProps } from './types'

export default function MessageInput({ 
  onSend, 
  placeholder = "Type your response here", 
  className = '' 
}: MessageInputProps) {
  const [message, setMessage] = React.useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Input
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pr-12 py-3"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSend}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-purple-600 hover:text-purple-700"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
} 