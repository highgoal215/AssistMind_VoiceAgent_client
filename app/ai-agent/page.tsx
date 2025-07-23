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
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* AI Agent Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto ">
            {/* Main White Card */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 lg:p-8">
                {/* Header Section */}
                <div className=" flex flex-col ">
                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    Let's Finalize Your Agent Setup!
                  </h1>

                  {/* Progress Steps */}
                  <div className="w-full mb-8">
                    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:p-6">
                                             <div className="relative flex items-center justify-between md:justify-center md:space-x-8 lg:space-x-24">
                         {/* Step 1 */}
                         <div className="flex flex-col items-center flex-1 md:flex-none">
                           <div className={`w-10 h-10 md:w-12 md:h-12 ${agentprofileStep >= 1 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center mb-2 relative`}>
                             <div className={`w-8 h-8 md:w-10 md:h-10 ${agentprofileStep >= 1 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-xs md:text-sm font-bold relative z-10`}>
                               1
                             </div>
                           </div>
                           <span className={`text-xs md:text-sm font-medium ${agentprofileStep === 1 ? 'text-gray-900 font-bold' : 'text-gray-900'} text-center`}>Agent Profile</span>
                         </div>

                         {/* Step 2 */}
                         <div className="flex flex-col items-center flex-1 md:flex-none">
                           <div className={`w-10 h-10 md:w-12 md:h-12 ${agentprofileStep >= 2 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center mb-2 relative`}>
                             <div className={`w-8 h-8 md:w-10 md:h-10 ${agentprofileStep >= 2 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-xs md:text-sm font-bold relative z-10`}>
                               2
                             </div>
                           </div>
                           <span className={`text-xs md:text-sm font-medium ${agentprofileStep === 2 ? 'text-gray-900 font-bold' : 'text-gray-900'} text-center`}>Business Details</span>
                         </div>

                         {/* Step 3 */}
                         <div className="flex flex-col items-center flex-1 md:flex-none">
                           <div className={`w-10 h-10 md:w-12 md:h-12 ${agentprofileStep >= 3 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center mb-2 relative`}>
                             <div className={`w-8 h-8 md:w-10 md:h-10 ${agentprofileStep >= 3 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-xs md:text-sm font-bold relative z-10`}>
                               3
                             </div>
                           </div>
                           <span className={`text-xs md:text-sm font-medium ${agentprofileStep === 3 ? 'text-gray-900 font-bold' : 'text-gray-900'} text-center`}>Final Review & Launch</span>
                         </div>

                        {/* Connecting Lines - Responsive positioning */}
                        <div className="hidden md:block absolute top-5 md:top-6 left-[calc(33.33%+16px)] md:left-[calc(33.33%+24px)] w-[calc(33.33%-32px)] md:w-[calc(33.33%-48px)] h-0.5 bg-gray-200"></div>
                        <div className="hidden md:block absolute top-5 md:top-6 right-[calc(33.33%+16px)] md:right-[calc(33.33%+24px)] w-[calc(33.33%-32px)] md:w-[calc(33.33%-48px)] h-0.5 bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Left Column - Agent Profile */}
                  <div className="space-y-6">
                    {/* Agent Avatar */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Agent Avatar
                      </label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src="/images/user-profile.jpg" />
                            <AvatarFallback className="bg-blue-600 text-white text-lg">A</AvatarFallback>
                          </Avatar>
                          {/* Purple line overlay */}
                          <div className="absolute inset-0 w-1 bg-[#4A48FF] rounded-l-full"></div>
                        </div>
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto">
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
                        className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] min-h-[100px]"
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
                                             <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                         <Button
                           size="icon"
                           className="w-12 h-12 bg-[#4A48FF] hover:bg-[#3a39e8] rounded-full"
                         >
                           <Play className="h-5 w-5 text-white ml-0.5" />
                         </Button>
                         <div className="flex-1 w-full sm:w-auto">
                           <div className="w-full bg-gray-200 rounded-full h-2">
                             <div className="bg-[#4A48FF] h-2 rounded-full" style={{ width: '30%' }}></div>
                           </div>
                         </div>
                         <span className="text-sm text-gray-500 self-start sm:self-auto">1m 12s</span>
                       </div>
                    </div>
                  </div>
                </div>

                                 {/* Next Button */}
                 <div className="flex justify-end mt-8">
                   {/* Action Buttons */}
                   <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
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