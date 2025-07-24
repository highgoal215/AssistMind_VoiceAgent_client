"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Calendar, ExternalLink } from 'lucide-react'

interface GoogleCalendarConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (config: GoogleCalendarConfig) => void
}

export interface GoogleCalendarConfig {
  selectedCalendar: string
  selectedDuration: string
  bufferTimeEnabled: boolean
  emailConfirmationsEnabled: boolean
}

export default function GoogleCalendarConfigModal({ 
  isOpen, 
  onClose, 
  onSave 
}: GoogleCalendarConfigModalProps) {
  const [selectedCalendar, setSelectedCalendar] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('30')
  const [bufferTimeEnabled, setBufferTimeEnabled] = useState(true)
  const [emailConfirmationsEnabled, setEmailConfirmationsEnabled] = useState(true)

  const handleSave = () => {
    const config: GoogleCalendarConfig = {
      selectedCalendar,
      selectedDuration,
      bufferTimeEnabled,
      emailConfirmationsEnabled
    }
    
    if (onSave) {
      onSave(config)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-lg p-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex  items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-[#4A48FF]" />
            <DialogTitle className="text-3xl font-semibold text-gray-900">
              Configure Google Calendar
            </DialogTitle>
          </div>

          <div className="space-y-6">
            {/* Authentication Required Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold font-manrope text-md text-gray-900 mb-2">Authentication Required</h3>
              <p className="text-sm font-semibold font-manrope text-gray-600 mb-4">You'll be redirected to Google to authorize access.</p>
              <Button className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white font-medium">
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4"/>
                  <span className='font-bold font-manrope'>Sign in with Google</span>
                </div>
              </Button>
            </div>

            {/* Default Calendar */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-2">Default calendar</h3>
              <Select value={selectedCalendar} onValueChange={setSelectedCalendar}>
                <SelectTrigger className="w-full bg-white border border-gray-300">
                  <SelectValue placeholder="Select calendar" className='font-manrope font-semibold' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary Calendar</SelectItem>
                  <SelectItem value="work">Work Calendar</SelectItem>
                  <SelectItem value="personal">Personal Calendar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Default Booking Duration */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-2">Default Booking Duration</h3>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-full bg-white border border-gray-300 font-manrope font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Buffer Time */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold font-manrope text-gray-900 mb-1">Buffer Time</h3>
                  <p className="text-sm font-manrope font-semibold text-gray-600">Add 15 minutes before/after appointments</p>
                </div>
                <Switch 
                  checked={bufferTimeEnabled} 
                  onCheckedChange={setBufferTimeEnabled}
                  className="data-[state=checked]:bg-[#4A48FF]"
                />
              </div>
            </div>

            {/* Email Confirmations */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold font-manrope text-gray-900 mb-1">Email Confirmations</h3>
                  <p className="text-sm font-manrope font-semibold text-gray-600">Send automatic confirmation emails</p>
                </div>
                <Switch 
                  checked={emailConfirmationsEnabled} 
                  onCheckedChange={setEmailConfirmationsEnabled}
                  className="data-[state=checked]:bg-[#4A48FF]"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex space-x-2 mt-8">
            <Button 
              variant="outline" 
              className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-[#4A48FF] hover:bg-[#4A48FF] text-white"
              onClick={handleSave}
            >
              Save settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 