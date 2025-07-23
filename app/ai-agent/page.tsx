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
  Menu
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export default function AIAgentPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [agentName, setAgentName] = useState('Luna')
  const [roles, setRoles] = useState(['Receptionist', 'Appointment Booker'])
  const [welcomeMessage, setWelcomeMessage] = useState('Hi, I\'m {{agent_name}} from {{company_name}}. How can I help you today?')
  const [selectedVoice, setSelectedVoice] = useState('female-calm')
  const [language, setLanguage] = useState('English')
  const [agentprofileStep, setAgentProfileStep] = React.useState(1)
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
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search Bar */}
            <div className="flex items-center flex-1 max-w-sm lg:max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 w-full bg-gray-100 border-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Dark Mode Button - Hidden on mobile */}
              <Button variant="outline" className="hidden lg:flex bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  2
                </span>
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-600 hidden lg:block" />
              </div>
            </div>
          </div>
        </header>

        {/* AI Agent Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-6xl">
            {/* Main White Card */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 lg:p-8">
                {/* Header Section */}
                <div className="mb-8">
                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Let's Finalize Your Agent Setup!
                  </h1>

                  {/* Progress Steps */}
                  <div className="flex justify-between items-center shadow-lg border border-gray-200">
                    <div className="flex items-center  ">
                      {/* Step 1 */}
                      <div className="relative">
                        <div className={`w-12 h-12 ${agentprofileStep >= 1 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
                          <div className={`w-10 h-10 ${agentprofileStep >= 1 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-bold`}>
                            1
                          </div>
                        </div>
                      </div>

                      {/* Connecting Line */}
                      <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>

                      {/* Step 2 */}
                      <div className="relative">
                        <div className={`w-12 h-12 ${agentprofileStep >= 2 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
                          <div className={`w-10 h-10 ${agentprofileStep >= 2 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-bold`}>
                            2
                          </div>
                        </div>
                      </div>

                      {/* Connecting Line */}
                      <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>

                      {/* Step 3 */}
                      <div className="relative">
                        <div className={`w-12 h-12 ${agentprofileStep >= 3 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
                          <div className={`w-10 h-10 ${agentprofileStep >= 3 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-bold`}>
                            3
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Agent Profile */}
                  <div className="space-y-6">
                    {/* Agent Avatar */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Agent Avatar
                      </label>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="/images/user-profile.jpg" />
                          <AvatarFallback className="bg-blue-600 text-white text-lg">A</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    {/* Agent Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {roles.map((role, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center space-x-1"
                          >
                            <span>{role}</span>
                            <button
                              onClick={() => removeRole(role)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="text-gray-500 border-gray-300">
                        <ChevronDownIcon className="h-4 w-4 mr-1" />
                        Add more roles
                      </Button>
                    </div>

                    {/* Welcome Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Welcome Message
                      </label>
                      <Textarea
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        className="border-[#4A48FF] focus:border-[#4A48FF] focus:ring-[#4A48FF] min-h-[100px]"
                        placeholder="Enter your welcome message..."
                      />
                    </div>
                  </div>

                  {/* Right Column - Voice and Language */}
                  <div className="space-y-6">
                    {/* Voice Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choose your agent's voice
                      </label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]">
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <Input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="border-gray-300 bg-gray-50 cursor-not-allowed"
                        disabled
                      />
                    </div>

                    {/* Preview Voice */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Preview Voice
                      </label>
                      <div className="flex items-center space-x-4">
                        <Button
                          size="icon"
                          className="w-12 h-12 bg-[#4A48FF] hover:bg-[#3a39e8] rounded-full"
                        >
                          <Play className="h-5 w-5 text-white ml-0.5" />
                        </Button>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[#4A48FF] h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">1m 12s</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-8">
                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    {agentprofileStep > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => setAgentProfileStep(agentprofileStep - 1)}
                        className="px-6 py-2 rounded-lg bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-lg bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    {agentprofileStep < 3 ? (
                      <Button
                        onClick={() => setAgentProfileStep(agentprofileStep + 1)}
                        className="px-6 py-2 rounded-lg bg-[#4A48FF] hover:bg-[#3a38ef] text-white"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        className="px-6 py-2 rounded-lg bg-[#4A48FF] hover:bg-[#3a38ef] text-white"
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