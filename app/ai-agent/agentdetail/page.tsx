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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

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

  // Controls State
  const [blockedNumbers, setBlockedNumbers] = useState(['+1 (555) 123-4567', '+1 (555) 123-4567', '+1 (555) 123-4567'])
  const [newBlockedNumber, setNewBlockedNumber] = useState('')
  const [maxCallDuration, setMaxCallDuration] = useState('5 Minutes')
  const [detectVoicemails, setDetectVoicemails] = useState(true)
  const [blockTollFree, setBlockTollFree] = useState(true)

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

  const addBlockedNumber = () => {
    if (newBlockedNumber && !blockedNumbers.includes(newBlockedNumber)) {
      setBlockedNumbers([...blockedNumbers, newBlockedNumber])
      setNewBlockedNumber('')
    }
  }

  const removeBlockedNumber = (numberToRemove: string) => {
    setBlockedNumbers(blockedNumbers.filter(number => number !== numberToRemove))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'agent-profile':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Identity & Voice */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
              {/* Header */}
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Identity & Voice</h3>

              {/* Agent Avatar and Name */}
              <div className="flex items-start space-x-4 mb-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={avatarImage || "/images/user-profile.jpg"} />
                  <AvatarFallback className="bg-blue-600 text-white">SM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                    Agent Name
                  </label>
                  <Input
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                    Voice Type
                  </label>
                  <Select value={voiceType} onValueChange={setVoiceType}>
                    <SelectTrigger className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional Female">Professional Female</SelectItem>
                      <SelectItem value="Professional Male">Professional Male</SelectItem>
                      <SelectItem value="Friendly Female">Friendly Female</SelectItem>
                      <SelectItem value="Friendly Male">Friendly Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>


              {/* Check Voice */}
              <div className="mb-6">
                <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                  Check Voice
                </label>
                <Button variant="outline" className="w-full font-manrope font-bold border-gray-300 text-[#4A48FF] hover:bg-gray-50">
                  <Play className="h-4 w-4 mr-2 text-[#4A48FF]" />
                  Voice Preview
                </Button>
              </div>

              {/* First Message */}
              <div>
                <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
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
                <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
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
                      <span className="text-xs text-red-600">i</span>
                    </div>
                    <span className="text-xs text-red-600 font-medium">2000-character limit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Business Details, Contact Notifications, Agent Availability */}
            <div className="space-y-6">
              {/* Business Details Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
                <h3 className="text-3xl font-manrope font-bold text-gray-900 mb-6">Business Details</h3>

                <div className="flex flex-col space-y-4">
                  {/* Business Name */}
                  <div className='flex flex-row space-x-4'>
                    <div className='flex-1'>
                      <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                        Business Name
                      </label>
                      <Input
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className='flex-1'>
                      <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
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
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
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
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
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
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
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
                  <div className='flex justify-between items-center space-x-4'>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      Alternative Appointment Link
                    </label>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${isAlternativeLinkEnabled ? 'bg-[#34C759]' : 'bg-gray-300'}`}
                        onClick={() => setIsAlternativeLinkEnabled(!isAlternativeLinkEnabled)}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isAlternativeLinkEnabled ? 'right-1' : 'left-1'}`}></div>
                      </div>
                      <span className="text-sm text-gray-600">Enable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Notifications Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Notifications</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      SMS Notifications
                    </label>
                    <Input
                      value={smsNotifications}
                      onChange={(e) => setSmsNotifications(e.target.value)}
                      className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      Email Notifications
                    </label>
                    <Input
                      value={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.value)}
                      className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      Call Transfer Number
                    </label>
                    <Input
                      value={callTransferNumber}
                      onChange={(e) => setCallTransferNumber(e.target.value)}
                      className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      Assigned Number
                    </label>
                    <Input
                      value={assignedNumber}
                      onChange={(e) => setAssignedNumber(e.target.value)}
                      className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Agent Availability Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Agent Availability</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      24/7 availability
                    </label>
                    <p className="text-sm text-gray-600 mb-4">Always available - Will answer call anytime, any day</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="block text-md font-manrope font-bold text-gray-700">
                      Custom hours
                    </label>
                    <div className="flex items-center space-x-2">
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
          </div>
        )

      case 'performance':
        return (
          <div className="space-y-6">
            {/* Key Performance Indicators (KPIs) Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Total Calls */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-top justify-between">
                  <div className='flex flex-col'>
                    <p className="text-md font-bold font-manrope text-gray-600">Total Calls</p>
                    <p className="text-4xl font-bold text-gray-900">247</p>
                  </div>
                  <div className="flex items-top text-green-600">
                    <span className="text-md font-semibold">+2.3%</span>
                    <span className="text-sm ml-1">^</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-top justify-between">
                  <div className='flex flex-col'>
                    <p className="text-md font-bold font-manrope text-gray-600">Avg Call Duration</p>
                    <p className="text-4xl font-bold text-gray-900">2m 11s</p>
                  </div>
                  <div className="flex items-top text-green-600">
                    <span className="text-md font-semibold">+2.3%</span>
                    <span className="text-sm ml-1">^</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-top justify-between">
                  <div className='flex flex-col'>
                    <p className="text-md font-bold font-manrope text-gray-600">Appointment Rate</p>
                    <p className="text-4xl font-bold text-gray-900">27%</p>
                  </div>
                  <div className="flex items-top text-red-600">
                    <span className="text-md font-semibold">+2.3%</span>
                    <span className="text-sm ml-1">v</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-top justify-between">
                  <div className='flex flex-col'>
                    <p className="text-md font-bold font-manrope text-gray-600">Unique Callers</p>
                    <p className="text-4xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="flex items-top text-red-600">
                    <span className="text-md font-semibold">+2.3%</span>
                    <span className="text-sm ml-1">v</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-top justify-between">
                  <div className='flex flex-col'>
                    <p className="text-md font-bold font-manrope text-gray-600">Conversion Rate</p>
                    <p className="text-4xl font-bold text-gray-900">18%</p>
                  </div>
                  <div className="flex items-top text-red-600">
                    <span className="text-md font-semibold">+2.3%</span>
                    <span className="text-sm ml-1">v</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Trends Graph Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold font-manrope text-gray-900">Performance Trends (Last 7 Days)</h3>
                <Button className="bg-[#4A48FF] hover:bg-[#3a38ef] text-white font-bold font-manrope">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                  View analytics
                </Button>
              </div>

              {/* Chart.js Graph Container */}
              <div className="h-64">
                <Line
                  data={{
                    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [
                      {
                        label: 'Total Call',
                        data: [25, 26, 32, 29, 31, 30, 27],
                        borderColor: '#10B981',
                        backgroundColor: '#10B981',
                        borderWidth: 2,
                        pointBackgroundColor: '#10B981',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.3,
                        fill: false,
                      },
                      {
                        label: 'Appointment',
                        data: [9, 16, 32, 15, 21, 20, 15],
                        borderColor: '#3B82F6',
                        backgroundColor: '#3B82F6',
                        borderWidth: 2,
                        pointBackgroundColor: '#3B82F6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.3,
                        fill: false,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#000000',
                        bodyColor: '#000000',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                          title: function (context) {
                            return context[0].label;
                          },
                          label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: true,
                          color: '#e5e7eb',
                        },
                        ticks: {
                          color: '#6b7280',
                          font: {
                            size: 16,
                            family: 'Manrope, sans-serif',
                          },
                        },
                      },
                      y: {
                        beginAtZero: true,
                        max: 35,
                        grid: {
                          display: true,
                          color: '#e5e7eb',
                        },
                        ticks: {
                          stepSize: 7,
                          color: '#6b7280',
                          font: {
                            size: 16,
                            family: 'Manrope, sans-serif',
                          },
                        },
                      },
                    },
                    interaction: {
                      intersect: false,
                      mode: 'index',
                    },
                    elements: {
                      point: {
                        hoverBackgroundColor: '#ffffff',
                        hoverBorderColor: '#10B981',
                        hoverBorderWidth: 2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )

      case 'controls':
        return (
          <div className="space-y-6">
            {/* Identity & Voice Section */}
            <div className="bg-white rounded-lg  p-6">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Identity & Voice</h3>
                <p className="text-gray-600">Configure call handling rules and behavior</p>
              </div>

              <div className="space-y-6  max-w-4xl">
                <div className='flex justify-between gap-2'>
                  {/* Blocked Numbers */}
                  <div className='flex w-2/3 flex-col'>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      Blocked Numbers
                    </label>
                    <div className="flex items-center space-x-2 mb-3">
                      <Input
                        value={newBlockedNumber}
                        onChange={(e) => setNewBlockedNumber(e.target.value)}
                        placeholder="Enter number to block"
                        className="flex-1 border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                      />
                    </div>

                  </div>
                  {/* Maximum Call Duration */}
                  <div className='flex w-1/3 flex-col'>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-2">
                      Maximum Call Duration
                    </label>
                    <Select value={maxCallDuration} onValueChange={setMaxCallDuration}>
                      <SelectTrigger className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5 Minutes">5 Minutes</SelectItem>
                        <SelectItem value="10 Minutes">10 Minutes</SelectItem>
                        <SelectItem value="15 Minutes">15 Minutes</SelectItem>
                        <SelectItem value="30 Minutes">30 Minutes</SelectItem>
                        <SelectItem value="No Limit">No Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Detect & Limit Voicemails */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-1">
                      Detect & Limit Voicemails
                    </label>
                    <p className="text-sm text-gray-600">End calls when a voicemail system is detected</p>
                  </div>
                  <Switch
                    checked={detectVoicemails}
                    onCheckedChange={setDetectVoicemails}
                  />
                </div>

                {/* Block Toll-Free Numbers */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-md font-manrope font-bold text-gray-700 mb-1">
                      Block Toll-Free Numbers
                    </label>
                    <p className="text-sm text-gray-600">Block calls from toll-free prefixes</p>
                  </div>
                  <Switch
                    checked={blockTollFree}
                    onCheckedChange={setBlockTollFree}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'setup-checklist':
        return (
          <div className="space-y-6">
            {/* Header with Title and Progress */}
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Setup Checklist</h3>
              <span className="text-gray-600">0 of 4 completed</span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-4">
              {/* Item 1: Customize Call Flow */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EDEDFF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4A48FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Customize Call Flow</h4>
                      <p className="text-gray-600">Design how your agent handles different conversation paths</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      Not Started
                    </Badge>
                    <Button className="bg-[#4A48FF] hover:bg-[#3a38ef] text-white flex items-center space-x-2">
                      <span>Build Flow</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Item 2: Upload Knowledge Base Docs */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EDEDFF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4A48FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Upload Knowledge Base Docs</h4>
                      <p className="text-gray-600">Add documents to help your agent answer questions accurately</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      Not Started
                    </Badge>
                    <Button className="bg-[#4A48FF] hover:bg-[#3a38ef] text-white flex items-center space-x-2">
                      <span>Upload Docs</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Item 3: Connect CRM/Calendar */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EDEDFF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4A48FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Connect CRM/Calendar</h4>
                      <p className="text-gray-600">Link with your existing tools for seamless workflow</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      Not Started
                    </Badge>
                    <Button className="bg-[#4A48FF] hover:bg-[#3a38ef] text-white flex items-center space-x-2">
                      <span>Go to Integrations</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Item 4: Test Agent Live */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#EDEDFF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4A48FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Test Agent Live</h4>
                      <p className="text-gray-600">Make a test call to ensure everything works perfectly</p>
                    </div>
                  </div>
                  <Button className="bg-[#4A48FF] hover:bg-[#3a38ef] text-white flex items-center space-x-2">
                    <span>Call Now</span>
                  </Button>
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

        {/* Agent Detail Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto">
            {/* Main White Card */}
            <Card className="">
              <CardContent className="p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col space-y-6">
                  {/* Title and Action Buttons */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <h1 className="text-2xl lg:text-3xl font-bold font-manrope text-gray-900">
                      Welcome back, Alex!
                    </h1>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <Button
                        variant={isAgentPaused ? "outline" : "default"}
                        onClick={() => setIsAgentPaused(!isAgentPaused)}
                        className={`flex items-center space-x-2 text-md font-manrope font-bold ${isAgentPaused
                          ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'bg-[#4A48FF] hover:[#4A48FF] text-white'
                          }`}
                      >
                        <Pause className="h-4 w-4" />
                        <span>{isAgentPaused ? 'Resume Agent' : 'Pause Agent'}</span>
                      </Button>
                      <Button className="bg-white border-gray-300 text-md font-manrope font-bold text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <PhoneIcon className="h-4 w-4" />
                        <span>Call my Agent</span>
                      </Button>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-1">
                    <nav className="flex space-x-8 ">
                      {[
                        { id: 'agent-profile', label: 'Agent Profile' },
                        { id: 'performance', label: 'Performance' },
                        { id: 'controls', label: 'Controls' },
                        { id: 'setup-checklist', label: 'Setup Checklist' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-2 px-4 rounded-md font-bold text-md font-manrope transition-all duration-200 ${activeTab === tab.id
                            ? 'bg-[#EDEDFF] text-[#4A48FF]'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
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