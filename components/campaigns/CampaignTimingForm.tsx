import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TIME_ZONE_OPTIONS } from './constants'

interface CampaignTimingFormProps {
  timingOption: 'send-now' | 'schedule-later'
  scheduledDate?: string
  scheduledTime?: string
  timeZone?: string
  onTimingOptionChange: (option: 'send-now' | 'schedule-later') => void
  onScheduledDateChange: (date: string) => void
  onScheduledTimeChange: (time: string) => void
  onTimeZoneChange: (timeZone: string) => void
}

export default function CampaignTimingForm({
  timingOption,
  scheduledDate,
  scheduledTime,
  timeZone,
  onTimingOptionChange,
  onScheduledDateChange,
  onScheduledTimeChange,
  onTimeZoneChange
}: CampaignTimingFormProps) {
  return (
    <>
      {/* Timing Options Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Timing Options</h3>
        <RadioGroup
          value={timingOption}
          onValueChange={(value: 'send-now' | 'schedule-later') => onTimingOptionChange(value)}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="send-now" id="send-now" />
            <Label htmlFor="send-now" className="text-gray-900 font-medium">
              Send Now
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="schedule-later" id="schedule-later" />
            <Label htmlFor="schedule-later" className="text-gray-900 font-medium">
              Schedule for Later
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Information Message for Send Now */}
      {timingOption === 'send-now' && (
        <div className="mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              Campaign will start immediately after launch
            </p>
          </div>
        </div>
      )}

      {/* Scheduling Options for Schedule Later */}
      {timingOption === 'schedule-later' && (
        <div className="mb-8">
          <div className="space-y-6">
            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-md font-bold font-manrope text-gray-900 mb-2">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => onScheduledDateChange(e.target.value)}
                  className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-md font-bold font-manrope text-gray-900 mb-2">
                  Start Time
                </label>
                <Input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => onScheduledTimeChange(e.target.value)}
                  className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                />
              </div>
            </div>

            {/* Time Zone Selection */}
            <div>
              <label className="block text-md font-bold font-manrope text-gray-900 mb-2">
                Time Zone
              </label>
              <Select value={timeZone} onValueChange={onTimeZoneChange}>
                <SelectTrigger className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_ZONE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Information Message for Scheduled Campaign */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                Campaign will be scheduled to start at the specified date and time
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 