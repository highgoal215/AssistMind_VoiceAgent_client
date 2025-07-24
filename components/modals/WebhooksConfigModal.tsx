"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar, Eye, EyeOff } from 'lucide-react'

interface WebhooksConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (config: WebhooksConfig) => void
  onTest?: (config: WebhooksConfig) => void
}

export interface WebhooksConfig {
  webhookUrls: string
  eventTypes: {
    leadGeneration: boolean
    appointmentScheduled: boolean
    callSummary: boolean
  }
  authenticationToken: string
}

export default function WebhooksConfigModal({ 
  isOpen, 
  onClose, 
  onSave,
  onTest
}: WebhooksConfigModalProps) {
  const [webhookUrls, setWebhookUrls] = useState('www.domain.com/Webhooks')
  const [leadGeneration, setLeadGeneration] = useState(true)
  const [appointmentScheduled, setAppointmentScheduled] = useState(true)
  const [callSummary, setCallSummary] = useState(false)
  const [authenticationToken, setAuthenticationToken] = useState('')
  const [showToken, setShowToken] = useState(false)

  const handleSave = () => {
    const config: WebhooksConfig = {
      webhookUrls,
      eventTypes: {
        leadGeneration,
        appointmentScheduled,
        callSummary
      },
      authenticationToken
    }
    
    if (onSave) {
      onSave(config)
    }
    onClose()
  }

  const handleTest = () => {
    const config: WebhooksConfig = {
      webhookUrls,
      eventTypes: {
        leadGeneration,
        appointmentScheduled,
        callSummary
      },
      authenticationToken
    }
    
    if (onTest) {
      onTest(config)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-lg p-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-[#4A48FF]" />
            <DialogTitle className="text-3xl font-semibold text-gray-900">
              Configure Webhooks
            </DialogTitle>
          </div>

          <div className="space-y-6">
            {/* Webhook URLs */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-2">Webhook URLs</h3>
              <Input
                value={webhookUrls}
                onChange={(e) => setWebhookUrls(e.target.value)}
                className="w-full bg-white border border-gray-300 font-manrope font-semibold"
                placeholder="www.domain.com/Webhooks"
              />
            </div>

            {/* Event Types */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-3">
                {/* Lead Generation */}
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={leadGeneration} 
                    onCheckedChange={(checked) => setLeadGeneration(checked === true)}
                    className="data-[state=checked]:bg-[#4A48FF] data-[state=checked]:border-[#4A48FF]"
                  />
                  <label className="text-sm font-manrope font-semibold text-gray-700">
                    Lead Generation - When a new lead is captured
                  </label>
                </div>

                {/* Appointment Scheduled */}
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={appointmentScheduled} 
                    onCheckedChange={(checked) => setAppointmentScheduled(checked === true)}
                    className="data-[state=checked]:bg-[#4A48FF] data-[state=checked]:border-[#4A48FF]"
                  />
                  <label className="text-sm font-manrope font-semibold text-gray-700">
                    Appointment Scheduled - When a meeting is booked
                  </label>
                </div>

                {/* Call Summary */}
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={callSummary} 
                    onCheckedChange={(checked) => setCallSummary(checked === true)}
                    className="data-[state=checked]:bg-[#4A48FF] data-[state=checked]:border-[#4A48FF]"
                  />
                  <label className="text-sm font-manrope font-semibold text-gray-700">
                    Call Summary - When a call ends with transcript
                  </label>
                </div>
              </div>
            </div>

            {/* Authentication Token */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-2">Authentication Token (Optional)</h3>
              <div className="relative">
                <Input
                  type={showToken ? "text" : "password"}
                  value={authenticationToken}
                  onChange={(e) => setAuthenticationToken(e.target.value)}
                  className="w-full bg-white border border-gray-300 font-manrope font-semibold pr-10"
                  placeholder="Enter your Authentication Token"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-2 mt-8">
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={handleTest}
            >
              Test Integration
            </Button>
            <Button 
              variant="outline" 
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white"
              onClick={handleSave}
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 