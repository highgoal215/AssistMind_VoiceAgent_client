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

  // Clarifying Questions State
  const [clarifyingQuestions, setClarifyingQuestions] = useState(['What kind of repair do you need?', 'What kind of repair do you need?', 'What kind of repair do you need?'])
  const [newQuestion, setNewQuestion] = useState('')

  // Agent Availability State
  const [is247Available, setIs247Available] = useState(true)
  const [customHours, setCustomHours] = useState(false)

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
            <div className="space-y-4 py-6 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold font-manrope text-gray-900">Business Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Enter your business name"
                  />
                </div>
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Enter website URL"
                  />
                </div>
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Business Address
                  </label>
                  <input
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Enter business address"
                  />
                </div>
              </div>
            </div>

            {/* Additional sections would go here - simplified for now */}
            <div className="text-center py-8">
              <p className="text-gray-600">Additional business setup sections would be implemented here...</p>
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