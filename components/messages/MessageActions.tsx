import React from 'react'
import { Download, Play, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MessageActionsProps } from './types'

export default function MessageActions({ 
  onDownload, 
  onPlay, 
  onView, 
  className = '' 
}: MessageActionsProps) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {onDownload && (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDownload}>
          <Download className="h-4 w-4" />
        </Button>
      )}
      {onPlay && (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPlay}>
          <Play className="h-4 w-4" />
        </Button>
      )}
      {onView && (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onView}>
          <Eye className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 