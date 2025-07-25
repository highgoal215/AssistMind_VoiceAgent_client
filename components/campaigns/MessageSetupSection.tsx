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
    <div className="space-y-6">
      {/* Campaign Setup Header */}
      <h2 className="text-3xl font-bold font-manrope text-gray-900">Campaign Setup</h2>
      
      {/* Top Row - Opening Message and Timing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opening Message Card */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-manrope">Opening Message</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 font-medium">
                {openingMessage}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timing Card */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-manrope">Timing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Scheduled:</span>
                <span className="text-gray-900 font-semibold">{scheduledTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Started:</span>
                <span className="text-gray-900 font-semibold">{startedTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Call Prompt */}
      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-manrope">Call Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              {callPrompt}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 