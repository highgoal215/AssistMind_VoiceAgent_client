import React from 'react'
import { Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Document } from './types'

interface DocumentActionsProps {
  document: Document
  onView: (doc: Document) => void
  onDelete: (id: number) => void
}

export default function DocumentActions({ document, onView, onDelete }: DocumentActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onView(document)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-red-600 hover:text-red-700"
        onClick={() => onDelete(document.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
} 