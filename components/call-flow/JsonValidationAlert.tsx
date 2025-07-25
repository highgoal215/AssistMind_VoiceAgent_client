import React from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface JsonValidationAlertProps {
  isValid: boolean
  message: string
}

export default function JsonValidationAlert({ isValid, message }: JsonValidationAlertProps) {
  if (!message) return null

  return (
    <div className="px-6 py-2">
      <Alert className={isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        {isValid ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-600" />
        )}
        <AlertDescription className={isValid ? "text-green-800" : "text-red-800"}>
          {message}
        </AlertDescription>
      </Alert>
    </div>
  )
} 