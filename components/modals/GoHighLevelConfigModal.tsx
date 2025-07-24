"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
interface GoHighLevelConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (config: GoHighLevelConfig) => void
  onTest?: (config: GoHighLevelConfig) => void
}

export interface GoHighLevelConfig {
  apiKey: string
  location: string
  fieldMapping: {
    nameField: string
    phoneField: string
    emailField: string
  }
}

export default function GoHighLevelConfigModal({ 
  isOpen, 
  onClose, 
  onSave,
  onTest
}: GoHighLevelConfigModalProps) {
  const [apiKey, setApiKey] = useState('')
  const [location, setLocation] = useState('')
  const [nameField, setNameField] = useState('Full_name')
  const [phoneField, setPhoneField] = useState('Phone_number')
  const [emailField, setEmailField] = useState('Email_address')

  const handleSave = () => {
    const config: GoHighLevelConfig = {
      apiKey,
      location,
      fieldMapping: {
        nameField,
        phoneField,
        emailField
      }
    }
    
    if (onSave) {
      onSave(config)
    }
    onClose()
  }

  const handleTest = () => {
    const config: GoHighLevelConfig = {
      apiKey,
      location,
      fieldMapping: {
        nameField,
        phoneField,
        emailField
      }
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
            <Image src="images/integration/modal_canlendar.svg" alt='calendar'width={40} height={40} className='w-10 h-10' />
            <DialogTitle className="text-3xl font-semibold text-gray-900">
              Configure GoHighLevel
            </DialogTitle>
          </div>

          <div className="space-y-6">
            {/* GHL API Key */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-2">GHL API Key</h3>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-white border border-gray-300 font-manrope font-semibold"
                placeholder="Enter your GoHighLevel API Key"
              />
            </div>

            {/* GHL Location */}
            <div>
              <h3 className="font-bold font-manrope text-gray-900 mb-2">GHL Location</h3>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full bg-white border border-gray-300 font-manrope font-semibold">
                  <SelectValue placeholder="Select your GHL Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location1">Main Office</SelectItem>
                  <SelectItem value="location2">Branch Office</SelectItem>
                  <SelectItem value="location3">Remote Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Field Mapping */}
            <div>
              <h3 className="font-bold font-manrope text-2xl text-gray-900 mb-4">Field Mapping</h3>
              <div className="space-y-3">
                {/* Name Field */}
                <div>
                  <label className="text-md font-bold font-manrope  text-gray-700 mb-1 block">Name field</label>
                  <Input
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                    className="w-full bg-white border border-gray-300 font-manrope font-semibold"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="text-md font-bold font-manrope text-gray-700 mb-1 block">Phone Field</label>
                  <Input
                    value={phoneField}
                    onChange={(e) => setPhoneField(e.target.value)}
                    className="w-full bg-white border border-gray-300 font-manrope font-semibold"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-md font-bold font-manrope text-gray-700 mb-1 block">Email field</label>
                  <Input
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                    className="w-full bg-white border border-gray-300 font-manrope font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between space-x-2 mt-8">
            <Button 
              className="bg-[#D07321] hover:bg-[#D07321] text-white font-bold font-manrope"
              onClick={handleTest}
            >
              Test Integration
            </Button>
            <div className='flex justify-end space-x-2'>
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 font-bold font-manrope"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white font-bold font-manrope"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 