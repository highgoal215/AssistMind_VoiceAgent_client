import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuccessNotificationProps {
  message: string | null
  onClear: () => void
  className?: string
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({ 
  message, 
  onClear, 
  className = '' 
}) => {
  if (!message) return null

  return (
    <Alert className={`bg-green-50 border-green-200 text-green-800 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="font-medium">
            {message}
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-6 w-6 p-0 text-green-600 hover:text-green-800 hover:bg-green-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
} 