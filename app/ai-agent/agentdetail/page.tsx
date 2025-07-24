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
  MapPin,
  Pause,
  Phone as PhoneIcon
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
import Image from 'next/image'

export default function AgentDetailPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('agent-profile')
  const [isAgentPaused, setIsAgentPaused] = useState(false)

  // Agent Profile State
  const [agentName, setAgentName] = useState('Satyajeet Maurya')
  const [voiceType, setVoiceType] = useState('Professional Female')
  const [firstMessage, setFirstMessage] = useState('Hello! I\'m Satya, your AI assistant. How can I help you today?')
  const [aiPrompt, setAiPrompt] = useState('You are a helpful customer service representative. Be professional, friendly, and efficient. Always ask for clarification if you\'re unsure about what the customer needs.')
  const [avatarImage, setAvatarImage] = useState<string | null>(null)

  // Business Details State
  const [businessName, setBusinessName] = useState('AI Voice')
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567')
  const [address, setAddress] = useState('123 Main St, City, State 12345')
  const [selectedServices, setSelectedServices] = useState(['AC Repair', 'Electrician', 'Carpenter'])
  const [availableServices] = useState(['AC Repair', 'Electrician', 'Carpenter', 'Plumber', 'HVAC', 'Roofing'])
  const [newService, setNewService] = useState('')
  const [clarifyingQuestions, setClarifyingQuestions] = useState(['What kind of repair do you need?', 'What kind of repair do you need?', 'What kind of repair do you need?'])
  const [newQuestion, setNewQuestion] = useState('')
  const [calendarPlatform, setCalendarPlatform] = useState('https://youragency.gohighlevel.com/...')
  const [isAlternativeLinkEnabled, setIsAlternativeLinkEnabled] = useState(false)
  const [isGoHighLevelConnected, setIsGoHighLevelConnected] = useState(true)

  // Contact Notifications State
  const [smsNotifications, setSmsNotifications] = useState('+1 (555) 123-4567')
  const [emailNotifications, setEmailNotifications] = useState('admin@acmecorp.com')
  const [callTransferNumber, setCallTransferNumber] = useState('+1 (555) 123-4567')
  const [assignedNumber, setAssignedNumber] = useState('+1 (555) 123-4567')

  // Agent Availability State
  const [is247Available, setIs247Available] = useState(true)
  const [customHours, setCustomHours] = useState(true)

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'agent-profile':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Identity & Voice */}
            <div className="space-y-6">
              {/* Agent Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Agent Name
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="flex-1 border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  />
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={avatarImage || "/images/user-profile.jpg"} />
                    <AvatarFallback className="bg-blue-600 text-white">SM</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Voice Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Voice Type
                </label>
                <Input
                  value={voiceType}
                  onChange={(e) => setVoiceType(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                />
              </div>

              {/* Check Voice */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Check Voice
                </label>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Play className="h-4 w-4 mr-2" />
                  Voice Preview
                </Button>
              </div>

              {/* First Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  First Message
                </label>
                <Textarea
                  value={firstMessage}
                  onChange={(e) => setFirstMessage(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] min-h-[100px] resize-none"
                />
              </div>

              {/* AI Prompt */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  AI Prompt
                </label>
                <div className="relative">
                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] min-h-[120px] resize-none"
                    maxLength={2000}
                  />
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                    <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-red-600">!</span>
                    </div>
                    <span className="text-xs text-gray-500">2000-character limit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Business Details */}
            <div className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Business Name
                </label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                />
              </div>

              {/* Core Services */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Core Services
                </label>
                <div className="flex items-center space-x-2 mb-2">
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
                  <Button onClick={addService} className="bg-[#4A48FF] hover:bg-[#3a38ef] text-white px-3 py-2 rounded">
                    + Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
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

              {/* Clarifying Questions */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Clarifying Questions
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                      placeholder="What kind of repair do you need?"
                    />
                    <Button onClick={addQuestion} className="bg-[#4A48FF] hover:bg-[#3a38ef] text-white px-3 py-2 rounded">
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

              {/* Select Calendar Platform */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Select Calendar Platform
                </label>
                <Input
                  value={calendarPlatform}
                  onChange={(e) => setCalendarPlatform(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] mb-2"
                />
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">Connected to GoHighLevel</span>
                  </div>
                </div>
              </div>

              {/* Alternative Appointment Link */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Alternative Appointment Link
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Enable</span>
                  <Switch
                    checked={isAlternativeLinkEnabled}
                    onCheckedChange={setIsAlternativeLinkEnabled}
                  />
                </div>
              </div>

              {/* Contact Notifications */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">Contact Notifications</h4>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    SMS Notifications
                  </label>
                  <Input
                    value={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.value)}
                    className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Notifications
                  </label>
                  <Input
                    value={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.value)}
                    className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Call Transfer Number
                  </label>
                  <Input
                    value={callTransferNumber}
                    onChange={(e) => setCallTransferNumber(e.target.value)}
                    className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Assigned Number
                  </label>
                  <Input
                    value={assignedNumber}
                    onChange={(e) => setAssignedNumber(e.target.value)}
                    className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  />
                </div>
              </div>

              {/* Agent Availability */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">Agent Availability</h4>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-bold text-gray-900">24/7 availability</h5>
                    <p className="text-sm text-gray-600">Always available - Will answer call anytime, any day</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Custom hours</span>
                    <Switch
                      checked={customHours}
                      onCheckedChange={setCustomHours}
                    />
                    <span className="text-sm text-gray-600">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'performance':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Performance Analytics</h3>
            <p className="text-gray-600">Performance metrics and analytics will be displayed here.</p>
          </div>
        )

      case 'controls':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Agent Controls</h3>
            <p className="text-gray-600">Agent control settings will be displayed here.</p>
          </div>
        )

      case 'setup-checklist':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Setup Checklist</h3>
            <p className="text-gray-600">Setup checklist and completion status will be displayed here.</p>
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

        {/* Agent Detail Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto">
            {/* Main White Card */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col space-y-6">
                  {/* Title and Action Buttons */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      Welcome back, Alex!
                    </h1>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <Button
                        variant={isAgentPaused ? "outline" : "default"}
                        onClick={() => setIsAgentPaused(!isAgentPaused)}
                        className={`flex items-center space-x-2 ${
                          isAgentPaused 
                            ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' 
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        <Pause className="h-4 w-4" />
                        <span>{isAgentPaused ? 'Resume Agent' : 'Pause Agent'}</span>
                      </Button>
                      <Button className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <PhoneIcon className="h-4 w-4" />
                        <span>Call my Agent</span>
                      </Button>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                      {[
                        { id: 'agent-profile', label: 'Agent Profile' },
                        { id: 'performance', label: 'Performance' },
                        { id: 'controls', label: 'Controls' },
                        { id: 'setup-checklist', label: 'Setup Checklist' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === tab.id
                              ? 'border-purple-500 text-purple-600 bg-purple-50'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-8">
                  {renderTabContent()}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 