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
          <div className="mx-auto">
            {/* Main White Card */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 lg:p-8">
                {/* Header Section */}
                <div className="mb-6 lg:mb-8">
                  {/* Title */}
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                    Let's Finalize Your Agent Setup!
                  </h1>

                  {/* Progress Steps */}
                  <div className="flex justify-center mb-6 lg:mb-8">
                    <div className="relative flex items-center w-full max-w-md">
                      {/* Main horizontal line */}
                      <div className="w-full h-[2px] bg-gray-300 rounded-full" />

                      {/* Progress circles positioned above the line */}
                      <div className="absolute flex justify-between w-full">
                        {/* Step 1: Agent Profile (Active) */}
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm font-bold relative bg-[#4A48FF] text-white">
                            <div className="absolute inset-0 bg-[#4A48FF] rounded-full scale-150 opacity-30" />
                            <span className="relative z-10">1</span>
                          </div>
                          <span className="mt-2 lg:mt-3 text-xs lg:text-sm font-manrope text-gray-900">Agent Profile</span>
                        </div>

                        {/* Step 2: Business Details (Inactive) */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm font-bold relative bg-gray-300 text-gray-600">
                            <span className="relative z-10">2</span>
                          </div>
                          <span className="mt-2 lg:mt-3 text-xs lg:text-sm font-manrope text-gray-900">Business Details</span>
                        </div>

                        {/* Step 3: Final Review & Launch (Inactive) */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm font-bold relative bg-gray-300 text-gray-600">
                            <span className="relative z-10">3</span>
                          </div>
                          <span className="mt-2 lg:mt-3 text-xs lg:text-sm font-manrope text-gray-900">Final Review & Launch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Left Column - Agent Profile */}
                  <div className="space-y-4 lg:space-y-6">
                    {/* Agent Avatar */}
                    <div>
                      <label className="block text-sm font-manrope text-gray-700 mb-3 lg:mb-4">
                        Agent Avatar
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                            <AvatarImage src="/images/user-profile.jpg" />
                            <AvatarFallback className="bg-blue-600 text-white text-lg">A</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                        </div>
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    {/* Agent Name */}
                    <div>
                      <label className="block text-sm font-manrope text-gray-700 mb-2">
                        What's your agent's name?
                      </label>
                      <Input
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        className="border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-manrope text-gray-700 mb-2">
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
                      <Button variant="outline" size="sm" className="text-gray-500">
                        <ChevronDownIcon className="h-4 w-4 mr-1" />
                        Add more roles
                      </Button>
                    </div>

                    {/* Welcome Message */}
                    <div>
                      <label className="block text-sm font-manrope text-gray-700 mb-2">
                        Welcome Message
                      </label>
                      <Textarea
                        value={welcomeMessage}
                        onChange={(e) => setWelcomeMessage(e.target.value)}
                        className="border-purple-600 focus:border-purple-600 focus:ring-purple-600 min-h-[100px]"
                        placeholder="Enter your welcome message..."
                      />
                    </div>
                  </div>

                  {/* Right Column - Voice and Language */}
                  <div className="space-y-4 lg:space-y-6">
                    {/* Voice Selection */}
                    <div>
                      <label className="block text-sm font-manrope text-gray-700 mb-2">
                        Choose your agent's voice
                      </label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger className="border-gray-300 focus:border-purple-600 focus:ring-purple-600">
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
                      <label className="block text-sm font-manrope text-gray-700 mb-2">
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
                      <label className="block text-sm font-manrope text-gray-700 mb-3 lg:mb-4">
                        Preview Voice
                      </label>
                      <div className="flex items-center space-x-4">
                        <Button
                          size="icon"
                          className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 hover:bg-blue-700 rounded-full"
                        >
                          <Play className="h-4 w-4 lg:h-5 lg:w-5 text-white ml-0.5" />
                        </Button>
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">1m 12s</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-6 lg:mt-8">
                  <Button className="bg-[#4A48FF] hover:bg-purple-700 text-white px-6 lg:px-8 py-2 lg:py-3 text-base lg:text-lg font-manrope rounded-lg">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 