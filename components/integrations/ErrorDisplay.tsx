import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorDisplayProps {
  error: string | null
  onClear: () => void
  className?: string
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error, 
  onClear, 
  className = '' 
}) => {
  if (!error) return null

  return (
    <Alert className={`bg-red-50 border-red-200 text-red-800 ${className}`}>
      <div className="flex items-center justify-between">
        <AlertDescription className="font-medium">
          {error}
        </AlertDescription>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
} 