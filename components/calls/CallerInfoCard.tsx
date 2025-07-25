import React from 'react'
import { Save, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CallDetail } from './types'
import { STATUS_COLORS } from './constants'

interface CallerInfoCardProps {
  call: CallDetail
  callerName: string
  phoneNumber: string
  onCallerNameChange: (name: string) => void
  onPhoneNumberChange: (number: string) => void
  onSaveToContacts: () => void
}

export default function CallerInfoCard({
  call,
  callerName,
  phoneNumber,
  onCallerNameChange,
  onPhoneNumberChange,
  onSaveToContacts
}: CallerInfoCardProps) {
  return (
    <Card className="bg-white shadow-sm lg:col-span-7">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-manrope">Caller information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-md font-bold font-manrope text-gray-700">Status</span>
          <Badge className={STATUS_COLORS[call.status]}>
            {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-md font-bold font-manrope text-gray-700">Call sentiment</span>
          <Badge className="bg-purple-100 text-purple-800">
            <ThumbsDown className="w-3 h-3 mr-1" />
            {call.sentiment.charAt(0).toUpperCase() + call.sentiment.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-manrope text-gray-700 mb-1 font-bold">Name</label>
            <Input
              value={callerName}
              onChange={(e) => onCallerNameChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-manrope text-gray-700 mb-1 font-bold">Phone number</label>
            <Input
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button 
            onClick={onSaveToContacts}
            className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white font-bold font-manrope"
          >
            <Save className="w-4 h-4 mr-2" />
            Save to contacts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 