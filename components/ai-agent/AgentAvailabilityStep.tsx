import React from 'react'

interface DailyHours {
  enabled: boolean
  startTime: string
  endTime: string
}

interface AgentAvailabilityStepProps {
  is247Available: boolean
  on247AvailableChange: (enabled: boolean) => void
  dailyHours: Record<string, DailyHours>
  // onDailyHoursChange: (hours: Record<string, DailyHours>) => void
}

export function AgentAvailabilityStep({
  is247Available,
  on247AvailableChange,
  dailyHours,
  // onDailyHoursChange
}: AgentAvailabilityStepProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold font-manrope text-gray-900 mb-6">Agent Availability</h3>
      <div className="space-y-6">
        {/* 24/7 Availability Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold font-manrope text-gray-700">24/7 availability</p>
              <p className="text-sm text-gray-500">Always available - Will answer call anytime, any day</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold font-manrope text-gray-700">Custom hours</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!is247Available}
                  onChange={(e) => on247AvailableChange(!e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A48FF]"></div>
              </label>
              <span className="text-sm font-bold font-manrope text-gray-700">24/7</span>
            </div>
          </div>
        </div>

        {/* Daily Hours Table - Only show when Custom hours is enabled */}
        {!is247Available && (
          <div className="space-y-3">
            {Object.entries(dailyHours).map(([day, hours]) => (
              <div key={day} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm font-manrope font-bold text-gray-700 capitalize w-24">{day}</span>
                <div className="flex items-center space-x-6">
                  {/* Start Time Input */}
                  <div className="relative">
                    <input
                      type="time"
                      value={hours.startTime}
                      onChange={(e) => {
                        const newHours = { ...dailyHours }
                        newHours[day as keyof typeof dailyHours] = {
                          ...newHours[day as keyof typeof dailyHours],
                          startTime: e.target.value
                        }
                        // onDailyHoursChange(newHours)
                      }}
                      className="p-2 border border-gray-300 rounded focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm pr-8 w-28 bg-white"
                    />
                    <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* End Time Input */}
                  <div className="relative">
                    <input
                      type="time"
                      value={hours.endTime}
                      onChange={(e) => {
                        const newHours = { ...dailyHours }
                        newHours[day as keyof typeof dailyHours] = {
                          ...newHours[day as keyof typeof dailyHours],
                          endTime: e.target.value
                        }
                        // onDailyHoursChange(newHours)
                      }}
                      className="p-2 border border-gray-300 rounded focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm pr-8 w-28 bg-white"
                    />
                    <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Status and Toggle */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-manrope font-bold text-gray-700">
                      {hours.enabled ? 'Opened' : 'Closed'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hours.enabled}
                        onChange={(e) => {
                          const newHours = { ...dailyHours }
                          newHours[day as keyof typeof dailyHours] = {
                            ...newHours[day as keyof typeof dailyHours],
                            enabled: e.target.checked
                          }
                          // onDailyHoursChange(newHours)
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A48FF]"></div>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 