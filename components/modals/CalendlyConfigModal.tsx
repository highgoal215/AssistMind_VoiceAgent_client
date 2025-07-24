"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Calendar } from 'lucide-react'

interface CalendlyConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (config: CalendlyConfig) => void
}

export interface CalendlyConfig {
  bookingLink: string
  eventTypes: {
    discoveryCall: boolean
    consultation: boolean
    strategySession: boolean
  }
  emailConfirmations: boolean
}

export default function CalendlyConfigModal({ 
  isOpen, 
  onClose, 
  onSave 
}: CalendlyConfigModalProps) {
  const [bookingLink, setBookingLink] = useState('https://calendly.com/satyajeet/maurya')
  const [discoveryCall, setDiscoveryCall] = useState(true)
  const [consultation, setConsultation] = useState(true)
  const [strategySession, setStrategySession] = useState(true)
  const [emailConfirmations, setEmailConfirmations] = useState(true)

  const handleSave = () => {
    const config: CalendlyConfig = {
      bookingLink,
      eventTypes: {
        discoveryCall,
        consultation,
        strategySession
      },
      emailConfirmations
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
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-[#4A48FF]" />
            <DialogTitle className="text-3xl font-semibold text-gray-900">
              Configure Calendly
            </DialogTitle>
          </div>

          <div className="space-y-6">
            {/* Calendly Booking Link */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-2">Calendly Booking Link</h3>
              <Input
                value={bookingLink}
                onChange={(e) => setBookingLink(e.target.value)}
                className="w-full bg-white border border-gray-300 font-manrope font-semibold"
                placeholder="Enter your Calendly link"
              />
            </div>

            {/* Available Event Types */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-4">Available Event Types</h3>
              <div className="space-y-3">
                {/* 15-minute Discovery Call */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-manrope font-semibold text-gray-700">15-minute Discovery Call</span>
                  <Switch 
                    checked={discoveryCall} 
                    onCheckedChange={setDiscoveryCall}
                    className="data-[state=checked]:bg-[#4A48FF]"
                  />
                </div>

                {/* 30-minute Consultation */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-manrope font-semibold text-gray-700">30-minute Consultation</span>
                  <Switch 
                    checked={consultation} 
                    onCheckedChange={setConsultation}
                    className="data-[state=checked]:bg-[#4A48FF]"
                  />
                </div>

                {/* 60-minute Strategy Session */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-manrope font-semibold text-gray-700">60-minute Strategy Session</span>
                  <Switch 
                    checked={strategySession} 
                    onCheckedChange={setStrategySession}
                    className="data-[state=checked]:bg-[#4A48FF]"
                  />
                </div>
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
                  checked={emailConfirmations} 
                  onCheckedChange={setEmailConfirmations}
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
              Save connection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 