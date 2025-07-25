import React from 'react'
import { Button } from '@/components/ui/button'

interface CallTransferStepProps {
  callTransferNumber: string
  onCallTransferNumberChange: (value: string) => void
  coreServices: string[]
  onCoreServicesChange: (services: string[]) => void
  availableCoreServices: string[]
  newCoreService: string
  onNewCoreServiceChange: (value: string) => void
  isCoreServicesDropdownOpen: boolean
  onCoreServicesDropdownToggle: () => void
  onAddCoreService: () => void
  onRemoveCoreService: (service: string) => void
  onSelectCoreService: (service: string) => void
  clarifyingQuestions: string[]
  onClarifyingQuestionsChange: (questions: string[]) => void
}

export function CallTransferStep({
  callTransferNumber,
  onCallTransferNumberChange,
  coreServices,
  onCoreServicesChange,
  availableCoreServices,
  newCoreService,
  onNewCoreServiceChange,
  isCoreServicesDropdownOpen,
  onCoreServicesDropdownToggle,
  onAddCoreService,
  onRemoveCoreService,
  onSelectCoreService,
  clarifyingQuestions,
  onClarifyingQuestionsChange
}: CallTransferStepProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold font-manrope text-gray-900 mb-6">Choose Where AI Transfers Calls</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Call Transfer Number */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-bold font-manrope text-gray-700">
                Call Transfer Number
              </label>
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">i</span>
              </div>
            </div>
            <input
              value={callTransferNumber}
              onChange={(e) => onCallTransferNumberChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Core Services */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-sm font-bold font-manrope text-gray-700">
                Core Services
              </label>
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">i</span>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* Custom Input with Tags Inside */}
              <div className="relative flex-1 core-services-dropdown">
                <div className="w-full min-h-[44px] border border-gray-300 rounded-md bg-white p-2 flex items-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-[#4A48FF] focus-within:border-[#4A48FF]">
                  {/* Selected Service Tags */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {coreServices.map((service, index) => (
                      <div
                        key={index}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center space-x-1 text-sm"
                      >
                        <span className="font-manrope font-bold">{service}</span>
                        <button
                          onClick={() => onRemoveCoreService(service)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Dropdown Trigger with "Select service" placeholder */}
                  <button
                    onClick={onCoreServicesDropdownToggle}
                    className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none ml-2 min-w-[120px]"
                  >
                    <span className="text-sm">Select service</span>
                    <svg className={`w-4 h-4 ml-1 transition-transform ${isCoreServicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {/* Dropdown Menu */}
                {isCoreServicesDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="p-2 space-y-1">
                      {availableCoreServices
                        .filter(service => !coreServices.includes(service))
                        .map((service) => (
                          <div
                            key={service}
                            className="p-2 hover:bg-gray-50 rounded cursor-pointer text-sm text-gray-700"
                            onClick={() => onSelectCoreService(service)}
                          >
                            {service}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Add Button */}
              <Button
                onClick={onAddCoreService}
                disabled={!newCoreService.trim()}
                className="px-4 py-3 bg-[#4A48FF] text-white rounded-md hover:bg-[#3a38ef] font-manrope font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + Add
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Clarifying Questions */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <label className="text-sm font-bold font-manrope text-gray-700">
              Clarifying Questions
            </label>
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">i</span>
            </div>
          </div>
          <div className="space-y-3">
            {clarifyingQuestions.map((question, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  value={question}
                  onChange={(e) => {
                    const newQuestions = [...clarifyingQuestions]
                    newQuestions[index] = e.target.value
                    onClarifyingQuestionsChange(newQuestions)
                  }}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                  placeholder="What kind of repair do you need?"
                />
                {index === 0 && (
                  <Button
                    onClick={() => onClarifyingQuestionsChange([...clarifyingQuestions, ''])}
                    className="px-4 py-3 bg-[#4A48FF] text-white rounded-md hover:bg-[#3a38ef] font-manrope font-bold text-sm"
                  >
                    + Add
                  </Button>
                )}
                {index > 0 && (
                  <button
                    onClick={() => onClarifyingQuestionsChange(clarifyingQuestions.filter((_, i) => i !== index))}
                    className="px-3 py-3 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 