import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MessageSetupSectionProps {
  openingMessage: string
  scheduledTime: string
  startedTime: string
  callPrompt: string
}

export default function MessageSetupSection({
  openingMessage,
  scheduledTime,
  startedTime,
  callPrompt
}: MessageSetupSectionProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Campaign Setup Header */}
      <h2 className="text-xl sm:text-3xl font-bold font-manrope text-gray-900">Campaign Setup</h2>
      
      {/* Top Row - Opening Message and Timing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Opening Message Card */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold font-manrope">Opening Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                {openingMessage}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timing Card */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold font-manrope">Timing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Scheduled:</span>
                <span className="text-sm sm:text-base text-gray-900 font-semibold break-words">{scheduledTime}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Started:</span>
                <span className="text-sm sm:text-base text-gray-900 font-semibold break-words">{startedTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Call Prompt */}
      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-bold font-manrope">Call Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {callPrompt}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 