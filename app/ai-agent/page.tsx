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
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'
import { SignupProgress } from '@/components/signup-progress'

export default function AIAgentPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [agentName, setAgentName] = useState('Luna')
  const [roles, setRoles] = useState(['Receptionist', 'Appointment Booker'])
  const [welcomeMessage, setWelcomeMessage] = useState('Hi, I\'m {{agent_name}} from {{company_name}}. How can I help you today?')
  const [selectedVoice, setSelectedVoice] = useState('female-calm')
  const [language, setLanguage] = useState('English')
  const [agentprofileStep, setAgentProfileStep] = React.useState(1)

  // Business Details State
  const [businessName, setBusinessName] = useState('')
  const [businessPhone, setBusinessPhone] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessWebsite, setBusinessWebsite] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessHours, setBusinessHours] = useState('')
  const [businessDescription, setBusinessDescription] = useState('')

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

  const removeRole = (roleToRemove: string) => {
    setRoles(roles.filter(role => role !== roleToRemove))
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
                      <AvatarImage src="/images/user-profile.jpg" />
                      <AvatarFallback className="bg-blue-600 text-white text-lg">A</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button variant="outline" className="font-bold border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Upload className="h-4 w-4 mr-2 " />
                    Upload
                  </Button>
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
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
                  Role
                </label>
                <div className="flex flex-wrap gap-2 mb-2 border border-gray-300 h-10">
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  placeholder="Enter your business name"
                />
              </div>

              {/* Business Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Phone
                </label>
                <Input
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  placeholder="Enter business phone number"
                />
              </div>

              {/* Business Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email
                </label>
                <Input
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  placeholder="Enter business email"
                />
              </div>

              {/* Business Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Website
                </label>
                <Input
                  value={businessWebsite}
                  onChange={(e) => setBusinessWebsite(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  placeholder="Enter website URL"
                />
              </div>

              {/* Business Address */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address
                </label>
                <Textarea
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  placeholder="Enter complete business address"
                  rows={3}
                />
              </div>

              {/* Business Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Hours
                </label>
                <Input
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                />
              </div>

              {/* Business Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <Textarea
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  placeholder="Describe your business and services"
                  rows={4}
                />
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </div>
            </div>

            {/* Launch Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
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
                          <span className="text-sm font-medium text-gray-900 text-center absolute md:-bottom-6 -bottom-10 md:whitespace-nowrap whitespace-pre-wrap">Agent Profile</span>
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
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto px-6 py-2 rounded-lg bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
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