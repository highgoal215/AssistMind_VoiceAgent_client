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
  MessageSquare
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

export default function DashboardPage() {
  const [timeRange, setTimeRange] = React.useState('7days')
  const [callVolumeView, setCallVolumeView] = React.useState('weekly')
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

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
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Assist Mind AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>
              
              <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/user-profile.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Minutes Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">18/30</div>
                      <div className="text-sm text-gray-500">23% of quota used</div>
                    </div>
                    <div className="text-green-500 text-sm font-medium">+2.3%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">145</div>
                      <div className="text-sm text-gray-500">voice interactions</div>
                    </div>
                    <div className="text-green-500 text-sm font-medium">+2.3%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Answer Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">96.8%</div>
                      <div className="text-sm text-gray-500">calls successfully answered</div>
                    </div>
                    <div className="text-green-500 text-sm font-medium">+2.3%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Booking Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">68.5%</div>
                      <div className="text-sm text-gray-500">calls successfully answered</div>
                    </div>
                    <div className="text-green-500 text-sm font-medium">+2.3%</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Call Volume Over Time */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Call Volume Over Time</CardTitle>
                    <ToggleGroup type="single" value={callVolumeView} onValueChange={(value) => value && setCallVolumeView(value)}>
                      <ToggleGroupItem value="weekly" size="sm">Weekly View</ToggleGroupItem>
                      <ToggleGroupItem value="monthly" size="sm">Monthly View</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <p className="text-sm text-gray-500">Long-term trends in call volume</p>
                </CardHeader>
                <CardContent>
                  <CallVolumeChart timeRange={timeRange} />
                </CardContent>
              </Card>

              {/* Call Intent Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Call Intent Breakdown</CardTitle>
                  <p className="text-sm text-gray-500">Breakdown of common call reasons</p>
                </CardHeader>
                <CardContent>
                  <CallIntentChart />
                </CardContent>
              </Card>

              {/* Call Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Call Activity</CardTitle>
                  <p className="text-sm text-gray-500">Daily overview: call volume + avg. call duration</p>
                </CardHeader>
                <CardContent>
                  <CallActivityChart />
                </CardContent>
              </Card>

              {/* Call Records */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">Call Records</CardTitle>
                      <p className="text-sm text-gray-500">Latest call interactions</p>
                    </div>
                    <Button variant="outline" size="sm">View More</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {callRecords.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{record.callerId}</span>
                            <span className="text-xs text-gray-500">{record.dateTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{record.duration}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {record.status}
                          </Badge>
                          <span className={`text-sm font-medium ${record.resultColor}`}>
                            {record.result}
                          </span>
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