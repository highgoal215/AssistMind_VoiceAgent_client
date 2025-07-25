import React from 'react'
import { Button } from '@/components/ui/button'

interface BookingSetupStepProps {
  calendarPlatform: string
  onCalendarPlatformChange: (value: string) => void
  isCalendarDropdownOpen: boolean
  onCalendarDropdownToggle: () => void
  connectedPlatforms: string[]
  onConnectPlatform: (platform: string) => void
  isAlternativeLinkEnabled: boolean
  onAlternativeLinkToggle: (enabled: boolean) => void
  alternativeLink: string
  onAlternativeLinkChange: (value: string) => void
}

export function BookingSetupStep({
  calendarPlatform,
  onCalendarPlatformChange,
  isCalendarDropdownOpen,
  onCalendarDropdownToggle,
  connectedPlatforms,
  onConnectPlatform,
  isAlternativeLinkEnabled,
  onAlternativeLinkToggle,
  alternativeLink,
  onAlternativeLinkChange
}: BookingSetupStepProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold font-manrope text-gray-900 mb-6">Booking Setup</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Select Calendar Platform */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <label className="text-sm font-bold font-manrope text-gray-700">
              Select Calendar Platform
            </label>
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">i</span>
            </div>
          </div>
          
          {/* Calendar Platform Dropdown */}
          <div className="relative calendar-dropdown">
            <button
              onClick={onCalendarDropdownToggle}
              className="w-full p-3 border border-gray-300 rounded-md bg-white text-left text-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A48FF] focus:border-[#4A48FF]"
            >
              <span className={calendarPlatform ? 'text-gray-900' : 'text-gray-500'}>
                {calendarPlatform || 'Select platform'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isCalendarDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isCalendarDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="p-2 space-y-2">
                  {[
                    { name: 'Google Calendar', value: 'google-calendar' },
                    { name: 'Calendly', value: 'calendly' },
                    { name: 'GoHighLevel', value: 'gohighlevel' }
                  ].map((platform) => (
                    <div key={platform.value} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{platform.name}</span>
                      <button
                        onClick={() => onConnectPlatform(platform.value)}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          connectedPlatforms.includes(platform.value)
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-[#4A48FF] text-white hover:bg-[#3a38ef]'
                        }`}
                        disabled={connectedPlatforms.includes(platform.value)}
                      >
                        {connectedPlatforms.includes(platform.value) ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Connection Status */}
          <div className="flex items-center mt-2 space-x-2">
            {connectedPlatforms.length > 0 ? (
              <>
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-manrope font-bold text-green-600">
                  {connectedPlatforms[0]} connected
                </span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-manrope font-bold text-red-600">
                  Not connected
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Alternative Appointment Link */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <label className="text-sm font-bold font-manrope text-gray-700">
              Alternative Appointment Link
            </label>
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">i</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-sm text-gray-600">Enable</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAlternativeLinkEnabled}
                onChange={(e) => onAlternativeLinkToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A48FF]"></div>
            </label>
          </div>
          {isAlternativeLinkEnabled && (
            <div>
              <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
                Booking URL
              </label>
              <input
                value={alternativeLink}
                onChange={(e) => onAlternativeLinkChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                placeholder="https://yourwebsite.com/contact"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 