"use client"

import React from 'react'
import {
  Search,
  Bell,
  Moon,
  RefreshCw,
  Download,
  ChevronDown,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Menu
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import CallVolumeChart from '@/components/CallVolumeChart'
import CallIntentChart from '@/components/CallIntentChart'
import CallActivityChart from '@/components/CallActivityChart'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = React.useState('7days')
  const [callVolumeView, setCallVolumeView] = React.useState('weekly')
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

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

  const callRecords = [
    {
      callerId: '+617 4904 0137',
      dateTime: '15 May 2020 11:00 pm',
      duration: '4:32',
      status: 'Incoming',
      result: 'Missed',
      resultColor: 'text-red-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 5:00 pm',
      duration: '5:32',
      status: 'Ongoing',
      result: 'Completed',
      resultColor: 'text-green-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 7:00 pm',
      duration: '7:12',
      status: 'Ongoing',
      result: 'Voicemail',
      resultColor: 'text-orange-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 6:00 pm',
      duration: '4:32',
      status: 'Incoming',
      result: 'Missed',
      resultColor: 'text-red-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 9:00 pm',
      duration: '2:10',
      status: 'Ongoing',
      result: 'Completed',
      resultColor: 'text-green-500'
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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Analytics Dashboard Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>

              <div className="flex items-center space-x-2 ">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="h-9 px-3 bg-white border-gray-200 text-sm font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm font-semibold font-manrope">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm font-semibold font-manrope">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md font-manrope text-gray-600 bold">Minutes Used</CardTitle>
                    <div className="flex items-center space-x-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-manrope font-semibold">
                      <span>+2.3%</span>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="text-[36px] font-bold text-gray-900 font-manrope">18/30</div>
                    <div className="text-sm text-gray-500 font-semibold font-manrope">23% of quota used</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md font-manrope text-gray-600 font-bold">Total Calls</CardTitle>
                    <div className="flex items-center space-x-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-manrope font-semibold">
                      <span>+2.3%</span>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="text-[36px] font-manrope font-bold text-gray-900">145</div>
                    <div className="text-sm font-semibold text-gray-500">Voice interactions (inbound + outbound)</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md font-bold font-manrope text-gray-600">Answer Rate</CardTitle>
                    <div className="flex items-center space-x-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-manrope font-semibold">
                      <span>+2.3%</span>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="text-[36px] font-manrope font-bold text-gray-900">96.8%</div>
                    <div className="text-sm font-semibold text-gray-500">% of calls successfully answered</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md font-manrope text-gray-600">Booking Rate</CardTitle>
                    <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-manrope font-semibold">
                      <span>-2.3%</span>
                      <svg className="w-3 h-3 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="text-[36px] font-manrope font-bold text-gray-900">68.5%</div>
                    <div className="text-sm font-semibold text-gray-500">% of calls successfully answered</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Call Volume Over Time */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div>
                        <CardTitle className="text-3xl font-bold font-manrope">Call Volume Over Time</CardTitle>
                        <p className="text-md font-semibold font-manrope text-gray-500">Long-term trends in call volume</p>
                      </div>
                      <ToggleGroup type="single" value={callVolumeView} onValueChange={(value) => value && setCallVolumeView(value)} >
                        <ToggleGroupItem
                          value="weekly"
                          size="sm"
                          className="px-4 py-2 text-md font-semibold rounded-md transition-all data-[state]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50 "
                        >
                          Weekly View
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="monthly"
                          size="sm"
                          className="px-4 py-2 text-md font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                        >
                          Monthly View
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CallVolumeChart timeRange={timeRange} />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                {/* Call Intent Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-manrope font-bold">Call Intent Breakdown</CardTitle>
                    <p className="text-md font-semibold text-gray-500">Breakdown of common call reasons</p>
                  </CardHeader>
                  <CardContent>
                    <CallIntentChart />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Second Row Charts */}
            <div className="flex w-full">
              {/* Call Activity */}
              <Card className='flex flex-col w-full'>
                <CardHeader>
                  <CardTitle className="text-3xl font-manrope font-bold">Call Activity</CardTitle>
                  <p className="text-md font-semibold text-gray-500">Daily overview: call volume + avg. call duration</p>
                </CardHeader>
                <CardContent>
                  <CallActivityChart />
                </CardContent>
              </Card>
            </div>
            <div className='flex flex-col w-full'>
              {/* Call Records */}
              <Card className='flex flex-col'>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div>
                      <CardTitle className="text-3xl font-manrope font-bold">Call Records</CardTitle>
                      <p className="text-md font-semibold  text-gray-500">Latest call interactions</p>
                    </div>
                    <Button variant="outline" size="sm" className='font-bold text-md font-manrope'>View More</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col justify-between items-center overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 ">
                          <th className="text-left py-3 px-4 text-md font-bold font-manrope text-gray-700 uppercase tracking-wider">CALLER ID</th>
                          <th className="text-left py-3 px-4 text-md font-bold font-manrope text-gray-700 uppercase tracking-wider">DATE & TIME</th>
                          <th className="text-left py-3 px-4 text-md font-bold font-manrope text-gray-700 uppercase tracking-wider">DURATION</th>
                          <th className="text-left py-3 px-4 text-md font-bold font-manrope text-gray-700 uppercase tracking-wider">STATUS</th>
                          <th className="text-left py-3 px-4 text-md font-bold font-manrope text-gray-700 uppercase tracking-wider">RESULT</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {callRecords.map((record, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm font-bold font-manrope text-gray-900">{record.callerId}</td>
                            <td className="py-3 px-4 text-sm font-bold font-manrope text-gray-900">{record.dateTime}</td>
                            <td className="py-3 px-4 text-sm font-bold font-manrope text-gray-900">{record.duration}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="secondary"
                                className={`text-xs px-2 py-1 rounded-full ${record.status === 'Incoming'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-green-100 text-green-700'
                                  }`}
                              >
                                {record.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="secondary"
                                className={`text-xs px-2 py-1 rounded-full ${record.result === 'Missed'
                                    ? 'bg-red-100 text-red-700'
                                    : record.result === 'Completed'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-orange-100 text-orange-700'
                                  }`}
                              >
                                {record.result}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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