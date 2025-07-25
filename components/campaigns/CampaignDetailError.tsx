import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CampaignDetailErrorProps {
  error?: Error
  onRetry?: () => void
}

export default function CampaignDetailError({ error, onRetry }: CampaignDetailErrorProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              {error?.message || 'We encountered an error while loading the campaign details. Please try again.'}
            </p>
            <div className="space-y-3">
              {onRetry && (
                <Button 
                  onClick={onRetry}
                  className="w-full bg-[#4A48FF] hover:bg-[#9392eb] text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 