"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  AIAgentLayout,
  AIAgentHeader,
  AIAgentNavigation,
  AgentProfileStep
} from '@/components/ai-agent'
import { Button } from '@/components/ui/button'

export default function AIAgentPage() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [agentName, setAgentName] = useState('Luna')
  const [roles, setRoles] = useState(['Receptionist', 'Appointment Booker'])
  const [welcomeMessage, setWelcomeMessage] = useState('Hi, I\'m {{agent_name}} from {{company_name}}. How can I help you today?')
  const [selectedVoice, setSelectedVoice] = useState('female-calm')
  const [language, setLanguage] = useState('English')
  const [agentprofileStep, setAgentProfileStep] = React.useState(1)
  const [avatarImage, setAvatarImage] = useState<string | null>(null)
  const [agentInstructions, setAgentInstructions] = useState('')

  // Business Details State
  const [businessName, setBusinessName] = useState('GreenTech Services')
  const [businessPhone, setBusinessPhone] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('www.greentech.ca')
  const [businessAddress, setBusinessAddress] = useState('123 King Street W, Toronto')
  const [businessHours, setBusinessHours] = useState('')
  const [businessDescription, setBusinessDescription] = useState('')

  // Booking Setup State
  const [calendarPlatform, setCalendarPlatform] = useState('')
  const [isAlternativeLinkEnabled, setIsAlternativeLinkEnabled] = useState(false)
  const [alternativeLink, setAlternativeLink] = useState('')
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false)
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])

  // Call Transfer State
  const [callTransferNumber, setCallTransferNumber] = useState('+1 (647) 444-')
  const [selectedServices, setSelectedServices] = useState(['AC Repair', 'Electrician', 'Carpenter'])
  const [availableServices] = useState(['AC Repair', 'Electrician', 'Carpenter', 'Plumber', 'HVAC', 'Roofing'])
  const [newService, setNewService] = useState('')

  // Core Services State
  const [coreServices, setCoreServices] = useState(['AC Repair', 'Electrician', 'Carpenter'])
  const [availableCoreServices] = useState(['AC Repair', 'Electrician', 'Carpenter', 'Plumber', 'HVAC', 'Roofing', 'Painting', 'Cleaning', 'Landscaping'])
  const [newCoreService, setNewCoreService] = useState('')
  const [isCoreServicesDropdownOpen, setIsCoreServicesDropdownOpen] = useState(false)

  // Clarifying Questions State
  const [clarifyingQuestions, setClarifyingQuestions] = useState(['What kind of repair do you need?', 'What kind of repair do you need?', 'What kind of repair do you need?'])
  const [newQuestion, setNewQuestion] = useState('')

  // Agent Availability State
  const [is247Available, setIs247Available] = useState(false)
  const [customHours, setCustomHours] = useState(true)

  // Custom Hours State
  const [dailyHours, setDailyHours] = useState({
    monday: { enabled: true, startTime: '09:00', endTime: '22:00' },
    tuesday: { enabled: true, startTime: '09:00', endTime: '22:00' },
    wednesday: { enabled: true, startTime: '09:00', endTime: '22:00' },
    thursday: { enabled: true, startTime: '09:00', endTime: '22:00' },
    friday: { enabled: true, startTime: '09:00', endTime: '22:00' },
    saturday: { enabled: true, startTime: '09:00', endTime: '22:00' },
    sunday: { enabled: true, startTime: '09:00', endTime: '22:00' }
  })

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  // Handle click outside to close calendar dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isCalendarDropdownOpen && !target.closest('.calendar-dropdown')) {
        setIsCalendarDropdownOpen(false)
      }
      if (isCoreServicesDropdownOpen && !target.closest('.core-services-dropdown')) {
        setIsCoreServicesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCalendarDropdownOpen, isCoreServicesDropdownOpen])

  const handleNext = () => {
    setAgentProfileStep(agentprofileStep + 1)
  }

  const handleBack = () => {
    setAgentProfileStep(agentprofileStep - 1)
  }

  const handleLaunch = () => {
    setShowLoading(true)
    setTimeout(() => {
      router.push('/ai-agent/agentdetail')
    }, 5000)
  }

  const handleTest = () => {
    // Handle test functionality
    console.log('Testing agent...')
  }

  const handleConnectPlatform = (platform: string) => {
    if (!connectedPlatforms.includes(platform)) {
      setConnectedPlatforms([...connectedPlatforms, platform])
      setCalendarPlatform(platform)
      setIsCalendarDropdownOpen(false)
    }
  }

  const handleAddCoreService = () => {
    if (newCoreService.trim() && !coreServices.includes(newCoreService.trim())) {
      setCoreServices([...coreServices, newCoreService.trim()])
      setNewCoreService('')
      setIsCoreServicesDropdownOpen(false)
    }
  }

  const handleRemoveCoreService = (service: string) => {
    setCoreServices(coreServices.filter(s => s !== service))
  }

  const handleSelectCoreService = (service: string) => {
    if (!coreServices.includes(service)) {
      setCoreServices([...coreServices, service])
    }
    setIsCoreServicesDropdownOpen(false)
  }

  // Show loading screen
  if (showLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">AssistMind</span>
                <span className="text-2xl font-bold text-purple-600 ml-1">AI</span>
              </div>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Background circle */}
            <div className="w-24 h-24 rounded-full border-4 border-gray-200"></div>
            
            {/* Progress circle */}
            <div 
              className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-purple-600 transition-all duration-300 ease-out animate-spin"
            ></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Setting up your AI agent...
            <br />
            <span className="text-gray-600 font-normal">please wait</span>
          </h2>

          {/* Steps */}
          <div className="space-y-3">
            {[
              "Loading your business details and preferences...",
              "Customizing call flow and conversation logic...",
              "Syncing with your calendar and integrations...",
              "Setting voice tone and personalization...",
              "Running final checks — your agent is almost ready!"
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (agentprofileStep) {
      case 1:
        return (
          <AgentProfileStep
            agentName={agentName}
            onAgentNameChange={setAgentName}
            roles={roles}
            onRolesChange={setRoles}
            welcomeMessage={welcomeMessage}
            onWelcomeMessageChange={setWelcomeMessage}
            selectedVoice={selectedVoice}
            onVoiceChange={setSelectedVoice}
            language={language}
            onLanguageChange={setLanguage}
            avatarImage={avatarImage}
            onAvatarChange={setAvatarImage}
          />
        )

      case 2:
        return (
          <div className="space-y-8 mt-8">
            {/* Business Details Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold font-manrope text-gray-900 mb-6">Business Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                    placeholder="Enter your business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                    placeholder="Enter website URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
                    Business Address
                  </label>
                  <input
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                    placeholder="Enter business address"
                  />
                </div>
              </div>
            </div>

            {/* Booking Setup Section */}
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
                      onClick={() => setIsCalendarDropdownOpen(!isCalendarDropdownOpen)}
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
                                onClick={() => handleConnectPlatform(platform.value)}
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
                        onChange={(e) => setIsAlternativeLinkEnabled(e.target.checked)}
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
                        onChange={(e) => setAlternativeLink(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                        placeholder="https://yourwebsite.com/contact"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Choose Where AI Transfers Calls Section */}
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
                      onChange={(e) => setCallTransferNumber(e.target.value)}
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
                                  onClick={() => handleRemoveCoreService(service)}
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
                            onClick={() => setIsCoreServicesDropdownOpen(!isCoreServicesDropdownOpen)}
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
                                    onClick={() => handleSelectCoreService(service)}
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
                        onClick={handleAddCoreService}
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
                            setClarifyingQuestions(newQuestions)
                          }}
                          className="flex-1 p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
                          placeholder="What kind of repair do you need?"
                        />
                        {index === 0 && (
                          <Button
                            onClick={() => setClarifyingQuestions([...clarifyingQuestions, ''])}
                            className="px-4 py-3 bg-[#4A48FF] text-white rounded-md hover:bg-[#3a38ef] font-manrope font-bold text-sm"
                          >
                            + Add
                          </Button>
                        )}
                        {index > 0 && (
                          <button
                            onClick={() => setClarifyingQuestions(clarifyingQuestions.filter((_, i) => i !== index))}
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

            {/* Agent Availability Section */}
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
                          onChange={(e) => setIs247Available(!e.target.checked)}
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
                                setDailyHours(newHours)
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
                                setDailyHours(newHours)
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
                                  setDailyHours(newHours)
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
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {/* Agent Behavior Header with Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mt-6">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl sm:text-2xl font-bold font-manrope text-gray-900">Agent Behavior</h3>
                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-600">i</span>
                </div>
              </div>
              
              {/* Test and Launch Buttons - Positioned opposite to Agent Behavior */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto bg-gray-100 text-gray-700 hover:bg-gray-200 font-manrope font-bold"
                  onClick={handleTest}
                >
                  Test my Agent
                </Button>
                <Button 
                  onClick={handleLaunch}
                  disabled={showLoading}
                  className="w-full sm:w-auto bg-[#4A48FF] hover:bg-[#4A48FF] text-white font-manrope font-bold"
                >
                  {showLoading ? 'Launching...' : 'Launch my Agent'}
                </Button>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Agent Instructions */}
            <div className="space-y-4">
              <h4 className="text-xl sm:text-2xl font-bold font-manrope text-gray-900">Agent Instructions</h4>
              <div className="relative">
                <textarea
                  value={agentInstructions || `${agentName}, ${roles.join(', ')}, ${selectedServices.join(', ')}, You are a helpful customer service representative. Be professional, friendly, and efficient. Always ask for clarification if you're unsure about what the customer needs.`}
                  onChange={(e) => setAgentInstructions(e.target.value)}
                  className="w-full min-h-[200px] border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  placeholder="Enter agent instructions..."
                  maxLength={2000}
                />
                <div className="absolute bottom-3 left-3 flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-xs text-red-600">i</span>
                  </div>
                  <span className="text-sm font-manrope font-bold text-gray-500">2000-character limit</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AIAgentLayout
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileClose={() => setIsMobileMenuOpen(false)}
      onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
    >
      {/* Header Section */}
      <AIAgentHeader currentStep={agentprofileStep} />

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation - Only show for steps 1 and 2 */}
      {agentprofileStep < 3 && (
        <AIAgentNavigation
          currentStep={agentprofileStep}
          onNext={handleNext}
          onBack={handleBack}
          onLaunch={handleLaunch}
          onTest={handleTest}
          isLoading={showLoading}
        />
      )}
    </AIAgentLayout>
  )
} 