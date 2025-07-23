"use client"

import React from 'react'
import {
  Search,
  Bell,
  Moon,
  ChevronDown,
  Phone,
  CheckCircle,
  Users,
  TrendingUp,
  Clock,
  RefreshCw,
  Download,
  Menu,
  MoreVertical,
  Play,
  Pause,
  Upload,
  Plus,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import Link from 'next/link'
import Header from '@/components/header/header'
export default function CampaignsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('campaigns')
  const [campaignStep, setCampaignStep] = React.useState(1)
  const [uploadMethod, setUploadMethod] = React.useState('file-upload')
  const [recipients, setRecipients] = React.useState([
    { id: 1, name: '', phoneNumber: '' }
  ])
  const [timingOption, setTimingOption] = React.useState('send-now')

  // Handle body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'new-campaign', label: 'New Campaign' }
  ]

  const metricCards = [
    {
      title: 'Total Campaigns',
      value: '24',
      subtitle: '+2 from last month',
      icon: Phone,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Active Campaigns',
      value: '12',
      subtitle: 'Currently running',
      icon: TrendingUp,
      iconBg: 'bg-[#EDEDFF]',
      iconColor: 'text-[#4A48FF]'
    },
    {
      title: 'Total Recipients',
      value: '1,247',
      subtitle: 'Across all campaigns',
      icon: Users,
      iconBg: 'bg-[#EDEDFF]',
      iconColor: 'text-[#4A48FF]'
    },
    {
      title: 'Success Rate',
      value: '78.5%',
      badge: 'Good',
      subtitle: '+2.1% from last month',
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ]

  const callMetrics = [
    {
      title: 'Total Calls', value: '365', icon: Phone, iconBg: 'bg-[#EDEDFF]', iconColor: 'text-[#4A48FF]'
    },
    { title: 'Completed', value: '365', icon: CheckCircle, iconBg: 'bg-[#EDEDFF]', iconColor: 'text-[#4A48FF]' },
    { title: 'Completion Rate', value: '100%', icon: RefreshCw, iconBg: 'bg-[#EDEDFF]', iconColor: 'text-[#4A48FF]' },
    { title: 'Success Rate', value: '73.2%', icon: CheckCircle, iconBg: 'bg-[#EDEDFF]', iconColor: 'text-[#4A48FF]' },
    { title: 'Total Call Duration', value: '48h 23m', icon: Phone, iconBg: 'bg-[#EDEDFF]', iconColor: 'text-[#4A48FF]' },
    { title: 'Total Recipients', value: '740', icon: Users, iconBg: 'bg-[#EDEDFF]', iconColor: 'text-[#4A48FF]' }
  ]

  const campaignStatusData = [
    { label: 'Scheduled', percentage: 45, color: 'bg-blue-500' },
    { label: 'In Progress', percentage: 15, color: 'bg-green-500' },
    { label: 'Completed', percentage: 30, color: 'bg-orange-500' },
    { label: 'Failed', percentage: 8, color: 'bg-red-500' },
    { label: 'Paused', percentage: 2, color: 'bg-gray-500' }
  ]

  const campaignsData = [
    {
      id: 1,
      title: 'Campaign - Jun 25',
      type: 'Promo',
      typeColor: 'bg-purple-500 text-white',
      createdDate: 'Jun 25, 2025, 2:22 PM',
      description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
      recipients: 150,
      completed: 78,
      progress: 30,
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-800',
      timeRemaining: '2h 15m'
    },
    {
      id: 2,
      title: 'Campaign - Jun 24',
      type: 'Survey',
      typeColor: 'bg-green-100 text-green-700',
      createdDate: 'Jun 24, 2025, 1:45 PM',
      description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
      recipients: 79,
      completed: 65,
      progress: 100,
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700',
      timeRemaining: '1h 43m'
    },
    {
      id: 3,
      title: 'Campaign - Jun 23',
      type: 'Reminder',
      typeColor: 'bg-orange-100 text-orange-700',
      createdDate: 'Jun 23, 2025, 3:15 PM',
      description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
      recipients: 170,
      completed: 80,
      progress: 70,
      status: 'Paused',
      statusColor: 'bg-gray-100 text-gray-700',
      timeRemaining: '45m'
    },
    {
      id: 4,
      title: 'Campaign - Jun 25',
      type: 'Promo',
      typeColor: 'bg-purple-500 text-white',
      createdDate: 'Jun 25, 2025, 2:22 PM',
      description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
      recipients: 150,
      completed: 78,
      progress: 30,
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-800',
      timeRemaining: '2h 15m'
    },
    {
      id: 5,
      title: 'Campaign - Jun 24',
      type: 'Survey',
      typeColor: 'bg-green-100 text-green-700',
      createdDate: 'Jun 24, 2025, 1:45 PM',
      description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
      recipients: 79,
      completed: 65,
      progress: 100,
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700',
      timeRemaining: '1h 43m'
    },
    {
      id: 6,
      title: 'Campaign - Jun 23',
      type: 'Reminder',
      typeColor: 'bg-orange-100 text-orange-700',
      createdDate: 'Jun 23, 2025, 3:15 PM',
      description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
      recipients: 170,
      completed: 80,
      progress: 70,
      status: 'Paused',
      statusColor: 'bg-gray-100 text-gray-700',
      timeRemaining: '45m'
    }
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

        {/* Campaigns Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Navigation Tabs */}
            <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm w-[564px] justify-between">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                      ? "bg-[#EDEDFF] text-blue-700"
                      : "text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <>
                {/* Key Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {metricCards.map((card, index) => (
                    <Card key={index} className="rounded-lg shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                              {card.badge && (
                                <Badge className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-full">
                                  {card.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                          </div>
                          <div className={`p-3 rounded-lg ${card.iconBg}`}>
                            <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Bottom Row - Campaign Status and Call Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
                  {/* Campaign Status Breakdown */}
                  <Card className="rounded-lg shadow-sm lg:col-span-3">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">Campaign Status Breakdown</CardTitle>
                      <p className="text-sm text-gray-500">Breakdown of common call reasons</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-8">
                        {/* Donut Chart */}
                        <div className="relative w-32 h-32">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="4"
                            />
                            {/* Chart segments */}
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="4"
                              strokeDasharray={`${45 * 0.88} ${100 - 45 * 0.88}`}
                              strokeDashoffset="0"
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="4"
                              strokeDasharray={`${15 * 0.88} ${100 - 15 * 0.88}`}
                              strokeDashoffset={`-${45 * 0.88}`}
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="#f97316"
                              strokeWidth="4"
                              strokeDasharray={`${30 * 0.88} ${100 - 30 * 0.88}`}
                              strokeDashoffset={`-${(45 + 15) * 0.88}`}
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="4"
                              strokeDasharray={`${8 * 0.88} ${100 - 8 * 0.88}`}
                              strokeDashoffset={`-${(45 + 15 + 30) * 0.88}`}
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="#6b7280"
                              strokeWidth="4"
                              strokeDasharray={`${2 * 0.88} ${100 - 2 * 0.88}`}
                              strokeDashoffset={`-${(45 + 15 + 30 + 8) * 0.88}`}
                            />
                          </svg>
                        </div>

                        {/* Legend */}
                        <div className="flex-1 space-y-3">
                          {campaignStatusData.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                              <span className="text-sm text-gray-700">{item.label}</span>
                              <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Call Metrics */}
                  <Card className="rounded-lg shadow-sm lg:col-span-5">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">Call Metrics</CardTitle>
                      <p className="text-sm text-gray-500">Overall calling performance</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        {callMetrics.map((metric, index) => (
                          <div key={index} className="flex justify-between items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm text-gray-600">{metric.title}</p>
                              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                            </div>
                            <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                              <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Campaigns List View */}
            {activeTab === 'campaigns' && (
              <>
                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-3 flex-1 max-w-md">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search campaigns..."
                          className="pl-10 w-full bg-gray-50 border-gray-200 text-sm"
                        />
                      </div>
                      <Button className="bg-[#4A48FF] hover:bg-[#8482bd] text-white px-4 py-2">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Select>
                        <SelectTrigger className="w-32 bg-white border-gray-200 text-sm">
                          <SelectValue placeholder="Completed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="completed">Schdule</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="in-progress">Failed</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="w-32 bg-white border-gray-200 text-sm">
                          <SelectValue placeholder="Last 7 days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">All Dates</SelectItem>
                          <SelectItem value="7days">Last 7 Days</SelectItem>
                          <SelectItem value="30days">Last 30 days</SelectItem>
                          <SelectItem value="7days">Last 6 Month</SelectItem>
                          <SelectItem value="30days">Last 1 Year</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="w-32 bg-white border-gray-200 text-sm">
                          <SelectValue placeholder="Newest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                          <SelectItem value="name">A To Z</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Campaigns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaignsData.map((campaign) => (
                    <Card key={campaign.id} className="rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                              <p className="text-sm text-gray-500">Created: {campaign.createdDate}</p>
                            </div>
                            <Badge className={`text-xs px-2 py-1 rounded-full ${campaign.typeColor}`}>
                              {campaign.type}
                            </Badge>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>

                          {/* Metrics */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <div>
                                <span className="text-gray-500">Recipients:</span>
                                <span className="font-semibold text-gray-900 ml-1">{campaign.recipients}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Completed:</span>
                                <span className="font-semibold text-gray-900 ml-1">{campaign.completed}</span>
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Progress</span>
                              <span className="font-semibold text-gray-900">{campaign.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#4A48FF] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${campaign.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Status and Time */}
                          <div className="flex items-center justify-between">
                            <Badge className={`text-xs px-2 py-1 rounded-full ${campaign.statusColor}`}>
                              {campaign.status}
                            </Badge>
                            <span className="text-sm text-gray-500">{campaign.timeRemaining}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 pt-2 ">
                            <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                              <Button className="w-full bg-[#4A48FF] hover:bg-[#9392eb] text-white text-sm">
                                View Details
                              </Button>
                            </Link>
                            <Button variant="outline" size="icon" className="h-9 w-9">
                              {campaign.status === 'Paused' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* New Campaign View */}
            {activeTab === 'new-campaign' && (
              <div className="bg-white rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
                {/* Campaign Information Header */}
                <div className="flex flex-col justify-start mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {campaignStep === 1 ? 'Campaign Information' : campaignStep === 2 ? 'Recipient Upload' : 'Campaign Timing'}
                  </h2>
                  <p className="text-gray-500">
                    {campaignStep === 1 ? 'Set up your campaign details and messaging' : 
                     campaignStep === 2 ? 'Add recipients via file upload or manual entry' : 
                     'Choose when to start your campaign'}
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-starter items-center mb-8">
                  <div className="flex items-center">
                    {/* Step 1 */}
                    <div className="relative">
                      <div className={`w-12 h-12 ${campaignStep >= 1 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
                        <div className={`w-10 h-10 ${campaignStep >= 1 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-bold`}>
                          1
                        </div>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>

                    {/* Step 2 */}
                    <div className="relative">
                      <div className={`w-12 h-12 ${campaignStep >= 2 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
                        <div className={`w-10 h-10 ${campaignStep >= 2 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-bold`}>
                          2
                        </div>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>

                    {/* Step 3 */}
                    <div className="relative">
                      <div className={`w-12 h-12 ${campaignStep >= 3 ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
                        <div className={`w-10 h-10 ${campaignStep >= 3 ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-bold`}>
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 1 Content - Campaign Information */}
                {campaignStep === 1 && (
                  <>
                    {/* Campaign Name */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Campaign Name
                      </label>
                      <Input
                        defaultValue="Campaign - Jul 8"
                        className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
                      />
                    </div>

                    {/* Opening Message */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Message
                      </label>
                      <Input
                        defaultValue="Hi [[name]], this is call from..."
                        className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] mb-2"
                      />
                      <p className="text-sm text-gray-500 mb-3">Use merge tags for personalization</p>

                      {/* Quick Insert Buttons */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Quick Insert:</p>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
                          >
                            name
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
                          >
                            phone_number
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
                          >
                            appointment_date
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Caller Instructions */}
                    <div className="mb-8">
                      <div className="flex items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Caller Instructions
                        </label>
                        <div className="ml-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">i</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Textarea
                          placeholder="Define the AI agents personality..."
                          className="w-full h-32 border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] resize-none pr-12"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                          0/5000
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Include: Tone, Personality, Environment, Goal, Guardrails</p>

                      {/* Quick Insert Buttons for Caller Instructions */}
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Quick Insert:</p>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
                          >
                            name
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
                          >
                            phone_number
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
                          >
                            language
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
                          >
                            appointment_date
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2 Content - Recipient Upload */}
                {campaignStep === 2 && (
                  <>
                    {/* Upload Method Selection */}
                    <div className="sm:flex  justify-between mb-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Button
                          onClick={() => setUploadMethod('file-upload')}
                          className={`px-6 py-3 rounded-lg text-sm font-medium ${uploadMethod === 'file-upload'
                              ? 'bg-[#4A48FF] text-white'
                              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          File Upload
                        </Button>
                        <Button
                          onClick={() => setUploadMethod('manual-input')}
                          className={`px-6 py-3 rounded-lg text-sm font-medium ${uploadMethod === 'manual-input'
                              ? 'bg-[#4A48FF] text-white'
                              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          Manual Input
                        </Button>
                      </div>
                      <div className='flex'>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const newRecipient = {
                              id: Date.now(),
                              name: '',
                              phoneNumber: ''
                            }
                            setRecipients([...recipients, newRecipient])
                          }}
                          className="px-4 py-3 rounded-lg  border-gray-300 text-gray-900 hover:bg-gray-50 text-sm font-medium"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Recipient
                        </Button>
                      </div>
                    </div>

                    {/* File Upload Area */}
                    {uploadMethod === 'file-upload' && (
                      <>
                        <div className="mb-6">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Upload recipient file</h3>
                            <p className="text-gray-600 mb-4">Drag and drop your CSV or Excel file here, or click to browse</p>
                            <Button
                              variant="outline"
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              Choose File
                            </Button>
                            <p className="text-sm text-gray-500 mt-2">csv, .xlsx (max 25MB)</p>
                          </div>
                        </div>

                        {/* Template Information */}
                        <div className="mb-8">
                          <p className="text-gray-700">Template includes: name, phone_number</p>
                        </div>
                      </>
                    )}

                    {/* Manual Input Area */}
                    {uploadMethod === 'manual-input' && (
                      <>
                        {/* Manual Input Fields */}
                        <div className="mb-6">
                          {recipients.map((recipient, index) => (
                            <div key={recipient.id} className="flex items-end space-x-4 mb-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                  Name
                                </label>
                                <Input
                                  placeholder="Enter Name"
                                  value={recipient.name}
                                  onChange={(e) => {
                                    const newRecipients = [...recipients]
                                    newRecipients[index].name = e.target.value
                                    setRecipients(newRecipients)
                                  }}
                                  className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                  Phone Number
                                </label>
                                <Input
                                  placeholder="Enter number"
                                  value={recipient.phoneNumber}
                                  onChange={(e) => {
                                    const newRecipients = [...recipients]
                                    newRecipients[index].phoneNumber = e.target.value
                                    setRecipients(newRecipients)
                                  }}
                                  className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                                />
                              </div>
                              {recipients.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const newRecipients = recipients.filter((_, i) => i !== index)
                                    setRecipients(newRecipients)
                                  }}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Summary Section */}
                        <div className="mb-8">
                          <div className="bg-[#EDEDFF] rounded-lg p-4">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Summary</h3>
                            <div className="flex space-x-6 text-sm text-gray-900">
                              <span>Recipient Count: {recipients.length}</span>
                              <span>Input Method: Manual</span>
                              <span>Status: Draft</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Step 3 Content - Campaign Timing */}
                {campaignStep === 3 && (
                  <>
                    {/* Timing Options Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Timing Options</h3>
                      <RadioGroup
                        value={timingOption}
                        onValueChange={setTimingOption}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="send-now" id="send-now" />
                          <Label htmlFor="send-now" className="text-gray-900 font-medium">
                            Send Now
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="schedule-later" id="schedule-later" />
                          <Label htmlFor="schedule-later" className="text-gray-900 font-medium">
                            Schedule for Later
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Information Message for Send Now */}
                    {timingOption === 'send-now' && (
                      <div className="mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 text-sm">
                            Campaign will start immediately after launch
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Scheduling Options for Schedule Later */}
                    {timingOption === 'schedule-later' && (
                      <div className="mb-8">
                        <div className="space-y-6">
                          {/* Date and Time Selection */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                Start Date
                              </label>
                              <Input
                                type="date"
                                className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                Start Time
                              </label>
                              <Input
                                type="time"
                                className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Time Zone Selection */}
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              Time Zone
                            </label>
                            <Select>
                              <SelectTrigger className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg">
                                <SelectValue placeholder="Select time zone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                                <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                                <SelectItem value="cet">CET (Central European Time)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Information Message for Scheduled Campaign */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-800 text-sm">
                              Campaign will be scheduled to start at the specified date and time
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  {campaignStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setCampaignStep(campaignStep - 1)}
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
                                    {campaignStep < 3 ? (
                    <Button 
                      onClick={() => setCampaignStep(campaignStep + 1)}
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
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 