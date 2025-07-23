"use client"

import React from 'react'
import { useParams } from 'next/navigation'
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
  Trash2,
  Info,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DashboardSidebar from '../../../components/dashboard/DashboardSidebar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function CampaignDetailPage() {
  const params = useParams()
  const campaignId = params.id
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('call-records')
  const [showTooltip, setShowTooltip] = React.useState(true)

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
    { id: 'call-records', label: 'Call Records' },
    { id: 'recipients', label: 'Recipients' },
    { id: 'message-setup', label: 'Message Setup' },
    { id: 'insights', label: 'Insights' }
  ]

  const metricCards = [
    { title: 'Created', value: 'Jun 25, 2025', icon: Clock, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
    { title: 'Progress', value: '30%', icon: TrendingUp, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Success Rate', value: '72%', icon: CheckCircle, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { title: 'Total Calls', value: '150', icon: Phone, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { title: 'Avg Duration', value: '2:45', icon: Clock, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { title: 'Recipients', value: '2', icon: Users, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' }
  ]

  const callRecords = [
    {
      id: 1,
      name: 'Jerome Bell',
      number: '(702) 555-0122',
      status: 'Failed',
      statusColor: 'bg-red-100 text-red-700',
      duration: '4:32',
      hasRecording: true
    },
    {
      id: 2,
      name: 'Cameron Williamson',
      number: '(229) 555-0109',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700',
      duration: '5:32',
      hasRecording: true
    },
    {
      id: 3,
      name: 'Bessie Cooper',
      number: '(252) 555-0126',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700',
      duration: '7:12',
      hasRecording: true
    },
    {
      id: 4,
      name: 'Leslie Alexander',
      number: '(308) 555-0121',
      status: 'Missed',
      statusColor: 'bg-orange-100 text-orange-700',
      duration: '4:32',
      hasRecording: false
    },
    {
      id: 5,
      name: 'Annette Black',
      number: '(405) 555-0128',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700',
      duration: '2:10',
      hasRecording: true
    }
  ]

  const recipientsData = [
    {
      id: 1,
      name: 'Jerome Bell',
      number: '(702) 555-0122',
      language: 'English',
      status: 'Failed',
      statusColor: 'bg-red-100 text-red-700'
    },
    {
      id: 2,
      name: 'Cameron Williamson',
      number: '(229) 555-0109',
      language: 'Hindi',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 3,
      name: 'Bessie Cooper',
      number: '(252) 555-0126',
      language: 'Spanish',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 4,
      name: 'Leslie Alexander',
      number: '(308) 555-0121',
      language: 'English',
      status: 'Missed',
      statusColor: 'bg-red-100 text-red-700'
    },
    {
      id: 5,
      name: 'Annette Black',
      number: '(405) 555-0128',
      language: 'Hindi',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700'
    }
  ]

  // Chart data and options
  const timeLabels = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  const barLabels = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']

  const timeMetricsData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Success',
        data: [32, 28, 25, 30, 22, 18, 20, 15, 12],
        borderColor: '#1e40af',
        backgroundColor: '#1e40af',
        borderWidth: 2,
        pointBackgroundColor: '#1e40af',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.1,
      },
      {
        label: 'Failed',
        data: [8, 12, 10, 15, 6, 4, 7, 5, 3],
        borderColor: '#a855f7',
        backgroundColor: '#a855f7',
        borderWidth: 2,
        pointBackgroundColor: '#a855f7',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.1,
      },
    ],
  }

  const callResultsData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Success',
        data: [25, 30, 28, 35, 22, 18, 20],
        backgroundColor: '#1e40af',
        borderColor: '#1e40af',
        borderWidth: 1,
      },
      {
        label: 'Failed',
        data: [8, 12, 10, 15, 6, 4, 7],
        backgroundColor: '#a855f7',
        borderColor: '#a855f7',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
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
          title: function(context: any) {
            return context[0].label
          },
          label: function(context: any) {
            const label = context.dataset.label || ''
            const value = context.parsed.y
            return `${label}: ${value}`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        grid: {
          color: '#e5e7eb',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
    },
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

        {/* Campaign Detail Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Campaign Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">Campaign - Jun 25</h1>
                <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                  In Progress
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <Button className="bg-[#4A48FF] hover:bg-[#9392eb] text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Result
                </Button>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {metricCards.map((card, index) => (
                <Card key={index} className="rounded-3xl shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-manrope text-gray-600 mb-1">{card.title}</h3>
                        <span className="text-3xl font-bold text-gray-900">{card.value}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm w-fit h-12">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={` rounded-lg px-4 py-2 text-lg font-manrope transition-colors ${
                    activeTab === tab.id
                    ? "bg-[#EDEDFF] text-[#4A48FF]"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Call Records Content */}
            {activeTab === 'call-records' && (
              <div className="relative">
                {/* Status Tooltip */}
                {showTooltip && (
                  <div className="absolute top-0 right-0 z-10 bg-white rounded-lg shadow-lg p-4 w-80 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Call Status</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setShowTooltip(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-blue-600 font-medium">Completed:</span>
                        <span className="text-gray-600 ml-1">Call reached the recipient and was successfully delivered</span>
                      </div>
                      <div>
                        <span className="text-red-600 font-medium">Missed:</span>
                        <span className="text-gray-600 ml-1">Call rang but wasn't answered</span>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">Failed:</span>
                        <span className="text-gray-600 ml-1">Call was not initiated due to error (e.g. number invalid, integration failure)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Call Records Table */}
                <Card className="rounded-lg shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-3xl font-bold font-manrope">Call Records</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setShowTooltip(!showTooltip)}
                        >
                          <Info className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NAME</th>
                            <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NUMBER</th>
                            <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">STATUS</th>
                            <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">DURATION</th>
                            <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {callRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm text-gray-900 font-medium">{record.name}</td>
                              <td className="py-3 px-4 text-sm text-gray-900">{record.number}</td>
                              <td className="py-3 px-4">
                                <Badge className={`text-xs px-2 py-1 rounded-full ${record.statusColor}`}>
                                  {record.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">{record.duration}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    disabled={!record.hasRecording}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    disabled={!record.hasRecording}
                                  >
                                    <Play className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recipients Content */}
            {activeTab === 'recipients' && (
              <Card className="rounded-lg shadow-sm">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-manrope">Call Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NAME</th>
                          <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NUMBER</th>
                          <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">LANGUAGE</th>
                          <th className="text-left py-3 px-4 text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recipientsData.map((recipient) => (
                          <tr key={recipient.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-900 font-medium">{recipient.name}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{recipient.number}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{recipient.language}</td>
                            <td className="py-3 px-4">
                              <Badge className={`text-xs px-2 py-1 rounded-full ${recipient.statusColor}`}>
                                {recipient.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Message Setup Content */}
            {activeTab === 'message-setup' && (
              <div className="space-y-6">
                {/* Campaign Setup Header */}
                <h2 className="text-3xl font-bold font-manrope text-gray-900">Campaign Setup</h2>
                
                {/* Top Row - Opening Message and Timing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Opening Message Card */}
                  <Card className="rounded-lg shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold font-manrope">Opening Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-gray-700 font-medium">
                          Hi {'{name}'}, this is about your upcoming appointment on {'{appointment_date}'}.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Timing Card */}
                  <Card className="rounded-lg shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold font-manrope">Timing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Scheduled:</span>
                          <span className="text-gray-900 font-semibold">Jun 25, 2025, 8:30:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Started:</span>
                          <span className="text-gray-900 font-semibold">Jun 25, 2025, 8:30:15 PM</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom Row - Call Prompt */}
                <Card className="rounded-lg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-manrope">Call Prompt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        Be friendly and professional. Confirm appointment details. Ask about any questions they might have. Do not promise discounts or make commitments beyond appointment confirmation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Insights Content */}
            {activeTab === 'insights' && (
              <div className="space-y-6">
                {/* Time Metrics Chart */}
                <Card className="rounded-lg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-manrope">Time Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 rounded-lg p-4 border border-gray-200 relative">
                      <Line data={timeMetricsData} options={chartOptions} />
                      {/* Date label overlay */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-gray-50 px-2">
                        06/25
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Call Results Chart */}
                <Card className="rounded-lg shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-manrope">Call Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 rounded-lg p-4 border border-gray-200 relative">
                      <Bar data={callResultsData} options={chartOptions} />
                      {/* Date label overlay */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-gray-50 px-2">
                        06/25
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 