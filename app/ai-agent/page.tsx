"use client"

import React, { useState, useEffect } from 'react'
import {
  Bell,
  Moon,
  ChevronDown,
  Upload,
  Play,
  X,
  ChevronDown as ChevronDownIcon,
  Search,
  Menu,
  Check,
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'
import { SignupProgress } from '@/components/signup-progress'
import Image from 'next/image'
export default function AIAgentPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [agentName, setAgentName] = useState('Luna')
  const [roles, setRoles] = useState(['Receptionist', 'Appointment Booker'])
  const [welcomeMessage, setWelcomeMessage] = useState('Hi, I\'m {{agent_name}} from {{company_name}}. How can I help you today?')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [availableRoles] = useState([
    'Receptionist',
    'Appointment Booker',
    'Lead Qualifier',
    'Customer Support',
    'Sales Representative',
    'Technical Support',
    'Booking Agent',
    'Information Desk'
  ])
  const [selectedVoice, setSelectedVoice] = useState('female-calm')
  const [language, setLanguage] = useState('English')
  const [agentprofileStep, setAgentProfileStep] = React.useState(1)
  const [avatarImage, setAvatarImage] = useState<string | null>(null)

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
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'not-connected'>('not-connected')

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

  // Handle click outside to close role dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isRoleDropdownOpen && !target.closest('.role-dropdown')) {
        setIsRoleDropdownOpen(false)
      }
      if (isCalendarDropdownOpen && !target.closest('.calendar-dropdown')) {
        setIsCalendarDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isRoleDropdownOpen, isCalendarDropdownOpen])

  const removeRole = (roleToRemove: string) => {
    setRoles(roles.filter(role => role !== roleToRemove))
  }

  const handleRoleSelect = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter(r => r !== role))
    } else {
      setRoles([...roles, role])
    }
  }

  const handleCalendarPlatformSelect = (platform: string) => {
    setCalendarPlatform(platform)
    setIsCalendarDropdownOpen(false)
  }

  const handleConnectPlatform = (platform: string) => {
    // Simulate connection process
    setTimeout(() => {
      if (!connectedPlatforms.includes(platform)) {
        setConnectedPlatforms([...connectedPlatforms, platform])
        setConnectionStatus('connected')
      } else {
        setConnectedPlatforms(connectedPlatforms.filter(p => p !== platform))
        if (connectedPlatforms.length === 1) {
          setConnectionStatus('not-connected')
        }
      }
    }, 1000)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Helper functions for new sections
  const addService = () => {
    if (newService && !selectedServices.includes(newService)) {
      setSelectedServices([...selectedServices, newService])
      setNewService('')
    }
  }

  const removeService = (serviceToRemove: string) => {
    setSelectedServices(selectedServices.filter(service => service !== serviceToRemove))
  }

  const addQuestion = () => {
    if (newQuestion && !clarifyingQuestions.includes(newQuestion)) {
      setClarifyingQuestions([...clarifyingQuestions, newQuestion])
      setNewQuestion('')
    }
  }

  const removeQuestion = (index: number) => {
    setClarifyingQuestions(clarifyingQuestions.filter((_, i) => i !== index))
  }

  // Helper functions for custom hours
  const updateDailyHours = (day: string, field: 'enabled' | 'startTime' | 'endTime', value: boolean | string) => {
    setDailyHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const formatTimeForDisplay = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour.toString().padStart(2, '0')}.${minutes} ${ampm}`
  }

  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        options.push({
          value: timeString,
          label: formatTimeForDisplay(timeString)
        })
      }
    }
    return options
  }

  const voiceOptions = [
    { value: 'female-calm', label: 'Female - Calm and Professional' },
    { value: 'female-energetic', label: 'Female - Energetic and Friendly' },
    { value: 'male-calm', label: 'Male - Calm and Professional' },
    { value: 'male-energetic', label: 'Male - Energetic and Friendly' }
  ]

  const renderStepContent = () => {
    switch (agentprofileStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10  ">
            {/* Left Column - Agent Profile */}
            <div className="flex-1 space-y-6">
              {/* Agent Avatar */}
              <div>
                <label className="block text-md font-bold text-gray-700 mb-4">
                  Agent Vatar
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={avatarImage || "/images/user-profile.jpg"} />
                      <AvatarFallback className="bg-blue-600 text-white text-lg">A</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload">
                      <Button
                        variant="outline"
                        className="font-bold border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        asChild
                      >
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              {/* Agent Name */}
              <div>
                <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
                  What's your agent's name?
                </label>
                <Input
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className=" border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                />
              </div>

              {/* Role */}
              <div className="role-dropdown ">
                <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  {/* Role Dropdown Button */}
                  <button
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A48FF] focus:border-[#4A48FF]"
                  >
                    <span className="text-gray-700">Select roles</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Role Dropdown Menu */}
                  {isRoleDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {availableRoles.map((role) => (
                        <div
                          key={role}
                          onClick={() => handleRoleSelect(role)}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${roles.includes(role)
                            ? 'bg-[#4A48FF] border-[#4A48FF]'
                            : 'border-gray-300'
                            }`}>
                            {roles.includes(role) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className="text-gray-700">{role}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selected Roles Display */}
                  {roles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {roles.map((role, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center space-x-1 hover:bg-gray-200"
                        >
                          <span>{role}</span>
                          <button
                            onClick={() => removeRole(role)}
                            className="ml-1 hover:text-red-500 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Welcome Message */}
              <div>
                <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
                  Welcome Message
                </label>
                <Textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] min-h-[100px] resize-none"
                  placeholder="Enter your welcome message..."
                />
              </div>
            </div>

            {/* Right Column - Voice and Language */}
            <div className="flex-1 space-y-6">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-bold font-manrope text-gray-700 mb-6">
                  Choose your agent's voice
                </label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] font-semibold font-manrope">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Language */}
              <div className='flex flex-col pt-6'>
                <label className="block text-sm font-bold font-manrope text-gray-700 mb-1">
                  Language
                </label>
                <Input
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border-gray-300 bg-gray-50 cursor-not-allowed text-gray-500"
                  disabled
                />
              </div>

              {/* Preview Voice */}
              <div className='flex flex-col'>
                <label className="block text-sm font-manrope font-bold text-gray-700 mb-2 ">
                  Preview Voice
                </label>
                <div className="flex items-center space-x-4 border border-gray-300 shadow-lg h-10 rounded-md">
                  <Button
                    size="icon"
                    className="w-8 h-8 bg-[#4A48FF] hover:bg-[#3a39e8] rounded-full"
                  >
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </Button>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#4A48FF] h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-manrope font-semibold text-gray-500 whitespace-nowrap">1m 12s</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8  mt-8">
            {/* Business Details Section */}
            <div className="space-y-4  py-6  shadow-lg">
              <h3 className="text-2xl font-bold font-manrope text-gray-900">Business Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Business Name
                  </label>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="font-semibold border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Enter your business name"
                  />
                </div>
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Website
                  </label>
                  <Input
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    className="font-semibold  border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Enter website URL"
                  />
                </div>
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    className="font-semibold border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
                    Business Address
                  </label>
                  <Input
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className=" font-semibold border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="Enter business address"
                  />
                </div>
              </div>
            </div>

            {/* Booking Setup Section */}
            <h3 className="text-2xl font-bold font-manrope text-gray-900">Booking Setup</h3>
            <div className="flex space-x-6">
              {/* Left Column - Select Calendar Platform */}
              <div className='flex flex-col w-1/2 gap-2 calendar-dropdown'>
                <div className='flex items-center justify-start gap-1'>
                  <label className="block text-md font-bold font-manrope text-gray-700 ">
                    Select Calendar Platform
                  </label>
                  <Image src="/images/agent/tooltip.svg" alt='check' width={30} height={30} className='w-4 h-4' />
                </div>
                
                {/* Calendar Platform Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsCalendarDropdownOpen(!isCalendarDropdownOpen)}
                    className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A48FF] focus:border-[#4A48FF]"
                  >
                    <span className="text-gray-700">
                      {calendarPlatform ? calendarPlatform : "Select platform"}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isCalendarDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Calendar Platform Dropdown Menu */}
                  {isCalendarDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <div
                        onClick={() => handleCalendarPlatformSelect('Google Calendar')}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <span className="text-gray-700">Google Calendar</span>
                      </div>
                      <div
                        onClick={() => handleCalendarPlatformSelect('Calendly')}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <span className="text-gray-700">Calendly</span>
                      </div>
                      <div
                        onClick={() => handleCalendarPlatformSelect('GoHighLevel')}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <span className="text-gray-700">GoHighLevel</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Platform List */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Google Calendar</span>
                    <Button 
                      onClick={() => handleConnectPlatform('Google Calendar')}
                      className={`px-4 py-1 text-sm ${
                        connectedPlatforms.includes('Google Calendar') 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-[#4A48FF] hover:bg-[#3a38ef] text-white'
                      }`}
                    >
                      {connectedPlatforms.includes('Google Calendar') ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Calendly</span>
                    <Button 
                      onClick={() => handleConnectPlatform('Calendly')}
                      className={`px-4 py-1 text-sm ${
                        connectedPlatforms.includes('Calendly') 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-[#4A48FF] hover:bg-[#3a38ef] text-white'
                      }`}
                    >
                      {connectedPlatforms.includes('Calendly') ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">GoHighLevel</span>
                    <Button 
                      onClick={() => handleConnectPlatform('GoHighLevel')}
                      className={`px-4 py-1 text-sm ${
                        connectedPlatforms.includes('GoHighLevel') 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-[#4A48FF] hover:bg-[#3a38ef] text-white'
                      }`}
                    >
                      {connectedPlatforms.includes('GoHighLevel') ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center mt-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                    connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {connectionStatus === 'connected' ? (
                      <Check className="h-3 w-3 text-white" />
                    ) : (
                      <X className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {connectionStatus === 'connected' ? 'Platform connected' : 'Not connected'}
                  </span>
                </div>
              </div>

              {/* Right Column - Alternative Appointment Link */}
              <div className="flex flex-col w-1/2 gap-2">
                <label className="text-md font-bold font-manrope text-gray-700">
                  Alternative Appointment Link
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold font-manrope text-gray-500">Enable</span>
                  <div
                    className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${isAlternativeLinkEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                    onClick={() => setIsAlternativeLinkEnabled(!isAlternativeLinkEnabled)}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isAlternativeLinkEnabled ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
                
                {/* Booking URL Input - Only show when enabled */}
                {isAlternativeLinkEnabled && (
                  <div className="mt-2">
                    <label className="block text-sm font-manrope text-gray-700 mb-1">
                      Booking URL
                    </label>
                    <Input
                      value={alternativeLink}
                      onChange={(e) => setAlternativeLink(e.target.value)}
                      className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                      placeholder="https://yourwebsite.com/contact"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Choose Where AI Transfers Calls Section */}
            <h3 className="text-2xl font-bold font-manrope text-gray-900">Choose Where AI Transfers Calls</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="w-full space-y-4 ">
                <div className='flex  flex-col gap-2'>
                  <div className='flex items-center justify-start gap-1'>
                    <label className="block text-md font-bold font-manrope text-gray-700 ">
                      Call Transfer Number
                    </label>
                    <Image src="/images/agent/tooltip.svg" alt='check' width={30} height={30} className='w-4 h-4' />
                  </div>
                  <Input
                    value={callTransferNumber}
                    onChange={(e) => setCallTransferNumber(e.target.value)}
                    className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    placeholder="+1 (647) 444-"
                  />
                </div>
                <div className='flex  flex-col gap-2'>
                  <div className='flex items-center justify-start gap-1'>
                    <label className="block text-md font-bold font-manrope text-gray-700 ">
                      Core Services
                    </label>
                    <Image src="/images/agent/tooltip.svg" alt='check' width={30} height={30} className='w-4 h-4' />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Select value={newService} onValueChange={setNewService}>
                        <SelectTrigger className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableServices.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={addService} className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-3 py-2 rounded">
                        + Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedServices.map((service, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center space-x-1">
                          <span>{service}</span>
                          <button
                            onClick={() => removeService(service)}
                            className="ml-1 hover:text-red-500 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clarifying Questions Section */}
              <div className="space-y-2">
                <div className='flex items-center justify-start gap-1'>
                  <label className="block text-md font-bold font-manrope text-gray-700 ">
                    Clarifying Questions
                  </label>
                  <Image src="/images/agent/tooltip.svg" alt='check' width={30} height={30} className='w-4 h-4' />
                </div>
              
                <div className="space-y-2 ">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                      placeholder="What kind of repair do you need?"
                    />
                    <Button onClick={addQuestion} className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-3 py-2 rounded">
                      + Add
                    </Button>
                  </div>
                  {clarifyingQuestions.map((question, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={question}
                        onChange={(e) => {
                          const newQuestions = [...clarifyingQuestions]
                          newQuestions[index] = e.target.value
                          setClarifyingQuestions(newQuestions)
                        }}
                        className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                        placeholder="What kind of repair do you need?"
                      />
                      <button
                        onClick={() => removeQuestion(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent Availability Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-manrope text-gray-900">Agent Availability</h3>
              <div className="space-y-4">

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-md font-manrope text-gray-900">24/7 availability</h4>
                    <p className="text-sm font-bold font-manrope text-gray-600">Always available - Will answer call anytime, any day</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold font-manrope  text-gray-600">Custom hours</span>
                    <div
                      className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${customHours ? 'bg-green-500' : 'bg-gray-300'}`}
                      onClick={() => setCustomHours(!customHours)}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${customHours ? 'right-1' : 'left-1'}`}></div>
                    </div>
                    <span className="text-sm font-bold font-manrope text-gray-600">24/7</span>
                  </div>
                </div>

                {/* Custom Hours List */}
                {customHours && (
                  <div className="space-y-3">
                    {Object.entries(dailyHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4 flex-1">
                          <span className="font-medium text-gray-900 capitalize min-w-[80px]">
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </span>

                          <Select
                            value={hours.startTime}
                            onValueChange={(value) => updateDailyHours(day, 'startTime', value)}
                          >
                            <SelectTrigger className="w-32 border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {generateTimeOptions().map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <span className="text-gray-500">to</span>

                          <Select
                            value={hours.endTime}
                            onValueChange={(value) => updateDailyHours(day, 'endTime', value)}
                          >
                            <SelectTrigger className="w-32 border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {generateTimeOptions().map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`text-sm ${hours.enabled ? 'text-green-600' : 'text-red-600'}`}>
                            {hours.enabled ? 'Opened' : 'Closed'}
                          </span>
                          <div
                            className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${hours.enabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => updateDailyHours(day, 'enabled', !hours.enabled)}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${hours.enabled ? 'right-1' : 'left-1'}`}></div>
                          </div>
                          <span className={`text-sm ${hours.enabled ? 'text-green-600' : 'text-red-600'}`}>
                            {hours.enabled ? 'Opened' : 'Closed'}
                          </span>
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
            {/* Review Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Agent Setup</h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agent Profile Summary */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Agent Profile
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Name:</span> {agentName}</p>
                    <p><span className="font-medium">Roles:</span> {roles.join(', ')}</p>
                    <p><span className="font-medium">Voice:</span> {voiceOptions.find(v => v.value === selectedVoice)?.label}</p>
                    <p><span className="font-medium">Language:</span> {language}</p>
                  </div>
                </div>

                {/* Business Details Summary */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Business Details
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Business:</span> {businessName || 'Not provided'}</p>
                    <p><span className="font-medium">Phone:</span> {businessPhone || 'Not provided'}</p>
                    <p><span className="font-medium">Email:</span> {businessEmail || 'Not provided'}</p>
                    <p><span className="font-medium">Website:</span> {businessWebsite || 'Not provided'}</p>
                  </div>
                </div>

                {/* Agent Availability Summary */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Agent Availability
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Mode:</span> {customHours ? 'Custom Hours' : '24/7 Available'}</p>
                    {customHours && (
                      <div className="mt-2">
                        <p className="font-medium mb-1">Daily Schedule:</p>
                        {Object.entries(dailyHours).map(([day, hours]) => (
                          <p key={day} className="ml-2">
                            <span className="capitalize">{day}:</span> {hours.enabled ?
                              `${formatTimeForDisplay(hours.startTime)} - ${formatTimeForDisplay(hours.endTime)}` :
                              'Closed'
                            }
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-md font-bold font-manrope text-blue-800">
                    Ready to Launch
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Your AI agent is configured and ready to start handling calls.
                      Click "Launch Campaign" to activate your agent and begin receiving calls.
                    </p>
                  </div>
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* AI Agent Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto">
            {/* Main White Card */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col space-y-8">
                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Let's Finalize Your Agent Setup!
                  </h1>

                  {/* Progress Steps */}
                  <div className="mb-16">
                    <div className="flex flex-col  justify-center items-center  border border-gray-300 h-32 shadow-md rounded-2xl">
                      {/* Desktop Version */}
                      <div className='flex items-center justify-center w-full'>
                        {/* Step 1 */}
                        <div className="flex flex-col items-center relative">
                          <div className={`md:w-14 md:h-14 w-12 h-12 rounded-full flex justify-center items-center ${agentprofileStep >= 1 ? 'bg-[#E5ECFD]' : 'bg-gray-200'}`}>
                            <div className={`md:w-10 md:h-10 w-8 h-8 ${agentprofileStep >= 1 ? 'bg-[#4A48FF]' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                              <span className={`text-sm font-semibold ${agentprofileStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
                                1
                              </span>
                            </div>
                          </div>
                          <span className="text-md font-bold font-manrope text-gray-900 text-center absolute md:-bottom-6 -bottom-10 md:whitespace-nowrap whitespace-pre-wrap">Agent Profile</span>
                        </div>

                        {/* Connecting Line 1-2 */}
                        <div className={`w-80 h-0.5 mx-1 self-center ${agentprofileStep >= 2 ? 'bg-[#4A48FF]' : 'bg-gray-200'}`}></div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center relative">
                          <div className={`md:w-14 md:h-14 w-12 h-12 rounded-full flex justify-center items-center ${agentprofileStep >= 2 ? 'bg-[#E5ECFD]' : 'bg-[#F5F5F5]'}`}>
                            <div className={`md:w-10 md:h-10 w-8 h-8 ${agentprofileStep >= 2 ? 'bg-[#4A48FF]' : 'bg-[#D9D9D9]'} rounded-full flex items-center justify-center`}>
                              <span className={`text-sm font-semibold ${agentprofileStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
                                2
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 text-center absolute md:-bottom-6 -bottom-10 md:whitespace-nowrap whitespace-pre-wrap">Business Details</span>
                        </div>

                        {/* Connecting Line 2-3 */}
                        <div className={`w-80 h-0.5 mx-1 self-center ${agentprofileStep >= 3 ? 'bg-[#4A48FF]' : 'bg-gray-200'}`}></div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center relative">
                          <div className={`md:w-14 md:h-14 w-12 h-12 rounded-full flex justify-center items-center ${agentprofileStep >= 3 ? 'bg-[#E5ECFD]' : 'bg-[#F5F5F5]'}`}>
                            <div className={`md:w-10 md:h-10 w-8 h-8 ${agentprofileStep >= 3 ? 'bg-[#4A48FF]' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                              <span className={`text-sm font-semibold ${agentprofileStep >= 3 ? 'text-white' : 'text-gray-500'}`}>
                                3
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 text-center absolute md:-bottom-6 -bottom-10 md:whitespace-nowrap md:w-auto w-20">Final Review & Launch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                {renderStepContent()}

                {/* Next Button */}
                <div className="flex justify-end mt-8">
                  {/* Action Buttons */}
                  <div className="flex flex-row justify-end space-x-4 w-auto">
                    {agentprofileStep > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => setAgentProfileStep(agentprofileStep - 1)}
                        className="w-full sm:w-auto px-6 py-2 rounded-lg bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                      >
                        Back
                      </Button>
                    )}

                    {agentprofileStep < 3 ? (
                      <Button
                        onClick={() => setAgentProfileStep(agentprofileStep + 1)}
                        className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#4A48FF] hover:bg-[#3a38ef] text-white"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#4A48FF] hover:bg-[#3a38ef] text-white"
                      >
                        Launch Campaign
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 