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
  Menu
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'

export default function CampaignsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('dashboard')

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
      title: 'Total Calls', value: '365', icon: Phone, iconBg: 'bg-[#EDEDFF]', iconColor: 'text-[#4A48FF]' },
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
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                    ? "bg-[#EDEDFF] text-blue-700"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

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
          </div>
        </main>
      </div>
    </div>
  )
} 