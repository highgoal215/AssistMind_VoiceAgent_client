"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  AIAgentLayout,
  AIAgentHeader,
  AIAgentNavigation,
  AgentProfileStep,
  BusinessDetailsStep,
  BookingSetupStep,
  CallTransferStep,
  AgentAvailabilityStep,
  AgentBehaviorStep
} from '@/components/ai-agent'

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
  const [businessAddress, setBusinessAddress] = useState('123 King Street W, Toronto')

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

  // Handle click outside to close dropdowns
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
            <div className="w-24 h-24 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-purple-600 transition-all duration-300 ease-out animate-spin"></div>
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
            <BusinessDetailsStep
              businessName={businessName}
              onBusinessNameChange={setBusinessName}
              businessPhone={businessPhone}
              onBusinessPhoneChange={setBusinessPhone}
              businessEmail={businessEmail}
              onBusinessEmailChange={setBusinessEmail}
              businessAddress={businessAddress}
              onBusinessAddressChange={setBusinessAddress}
            />

            <BookingSetupStep
              calendarPlatform={calendarPlatform}
              onCalendarPlatformChange={setCalendarPlatform}
              isCalendarDropdownOpen={isCalendarDropdownOpen}
              onCalendarDropdownToggle={() => setIsCalendarDropdownOpen(!isCalendarDropdownOpen)}
              connectedPlatforms={connectedPlatforms}
              onConnectPlatform={handleConnectPlatform}
              isAlternativeLinkEnabled={isAlternativeLinkEnabled}
              onAlternativeLinkToggle={setIsAlternativeLinkEnabled}
              alternativeLink={alternativeLink}
              onAlternativeLinkChange={setAlternativeLink}
            />

            <CallTransferStep
              callTransferNumber={callTransferNumber}
              onCallTransferNumberChange={setCallTransferNumber}
              coreServices={coreServices}
              onCoreServicesChange={setCoreServices}
              availableCoreServices={availableCoreServices}
              newCoreService={newCoreService}
              onNewCoreServiceChange={setNewCoreService}
              isCoreServicesDropdownOpen={isCoreServicesDropdownOpen}
              onCoreServicesDropdownToggle={() => setIsCoreServicesDropdownOpen(!isCoreServicesDropdownOpen)}
              onAddCoreService={handleAddCoreService}
              onRemoveCoreService={handleRemoveCoreService}
              onSelectCoreService={handleSelectCoreService}
              clarifyingQuestions={clarifyingQuestions}
              onClarifyingQuestionsChange={setClarifyingQuestions}
            />

            <AgentAvailabilityStep
              is247Available={is247Available}
              on247AvailableChange={setIs247Available}
              dailyHours={dailyHours}
              onDailyHoursChange={setDailyHours}
            />
          </div>
        )

      case 3:
        return (
          <AgentBehaviorStep
            agentName={agentName}
            roles={roles}
            selectedServices={selectedServices}
            agentInstructions={agentInstructions}
            onAgentInstructionsChange={setAgentInstructions}
            onTest={handleTest}
            onLaunch={handleLaunch}
            showLoading={showLoading}
          />
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