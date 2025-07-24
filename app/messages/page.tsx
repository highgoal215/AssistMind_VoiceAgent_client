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
  Trash2,
  Filter,
  Eye,
  Calendar,
  Check
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header/header'
export default function MessagesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null)
  const [selectedType, setSelectedType] = React.useState('')
  const [selectedPriority, setSelectedPriority] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

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

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      days.push({ date: currentDate, isCurrentMonth: true })
    }
    
    // Add days from next month to fill the grid
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({ date: nextDate, isCurrentMonth: false })
    }
    
    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear()
  }

  const daysInMonth = getDaysInMonth(currentMonth)

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

        {/* Messages Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className=" space-y-6">
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
                  <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm">
                        <Image src="/images/call/mage_filter.svg" alt="filter" width={20} height={20} />
                        Filter
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0" align="start">
                      <div className="p-2">
                        {/* Type Filter */}
                        <Popover open={activeFilter === 'type'} onOpenChange={(open) => setActiveFilter(open ? 'type' : null)}>
                          <PopoverTrigger asChild>
                            <div 
                              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                activeFilter === 'type' ? 'border border-purple-300 bg-purple-50' : 'hover:bg-gray-50'
                              }`}
                              onMouseEnter={() => setActiveFilter('type')}
                              onMouseLeave={() => setActiveFilter(null)}
                            >
                              <span className="font-medium text-gray-900">Type</span>
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-48 p-0" 
                            align="start"
                            onMouseEnter={() => setActiveFilter('type')}
                            onMouseLeave={() => setActiveFilter(null)}
                          >
                            <div className="p-2">
                              {['Appointment', 'Inquiry', 'Missed'].map((type) => (
                                <div
                                  key={type}
                                  onClick={() => {
                                    setSelectedType(type)
                                    setActiveFilter(null)
                                  }}
                                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedType === type ? 'bg-purple-50' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="text-gray-900">{type}</span>
                                  {selectedType === type && <Check className="h-4 w-4 text-purple-600" />}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>

                        {/* Date Range Filter */}
                        <Popover open={activeFilter === 'date'} onOpenChange={(open) => setActiveFilter(open ? 'date' : null)}>
                          <PopoverTrigger asChild>
                            <div 
                              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                activeFilter === 'date' ? 'border border-purple-300 bg-purple-50' : 'hover:bg-gray-50'
                              }`}
                              onMouseEnter={() => setActiveFilter('date')}
                              onMouseLeave={() => setActiveFilter(null)}
                            >
                              <span className="font-medium text-gray-900">Date Range</span>
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-80 p-4" 
                            align="start"
                            onMouseEnter={() => setActiveFilter('date')}
                            onMouseLeave={() => setActiveFilter(null)}
                          >
                            <div className="space-y-4">
                              {/* Calendar Header */}
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </h3>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                  >
                                    &lt;
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                  >
                                    &gt;
                                  </Button>
                                </div>
                              </div>

                              {/* Date Input and Today Button */}
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  {selectedDate ? formatDate(selectedDate) : 'No date selected'}
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedDate(new Date())}>
                                  Today
                                </Button>
                              </div>

                              {/* Days of Week */}
                              <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                                  <div key={day} className="text-xs text-gray-500 text-center py-1">
                                    {day}
                                  </div>
                                ))}
                              </div>

                              {/* Calendar Grid */}
                              <div className="grid grid-cols-7 gap-1">
                                {daysInMonth.map((day, index) => (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (day.isCurrentMonth) {
                                        setSelectedDate(day.date)
                                      }
                                    }}
                                    className={`p-2 text-sm rounded-lg transition-colors ${
                                      !day.isCurrentMonth
                                        ? 'text-gray-300 cursor-default'
                                        : isSameDay(day.date, selectedDate || new Date())
                                        ? 'bg-purple-600 text-white'
                                        : 'hover:bg-gray-100 text-gray-900'
                                    }`}
                                  >
                                    {day.date.getDate()}
                                  </button>
                                ))}
                              </div>

                              {/* Footer Buttons */}
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => setActiveFilter(null)}>
                                  Cancel
                                </Button>
                                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => setActiveFilter(null)}>
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>

                        {/* Priority Filter */}
                        <Popover open={activeFilter === 'priority'} onOpenChange={(open) => setActiveFilter(open ? 'priority' : null)}>
                          <PopoverTrigger asChild>
                            <div className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                              activeFilter === 'priority' ? 'border border-purple-300 bg-purple-50' : 'hover:bg-gray-50'
                            }`}>
                              <span className="font-medium text-gray-900">Priority</span>
                              {selectedPriority && <Check className="h-4 w-4 text-purple-600" />}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-0" align="start">
                            <div className="p-2">
                              {['High', 'Medium', 'Low'].map((priority) => (
                                <div
                                  key={priority}
                                  onClick={() => {
                                    setSelectedPriority(priority)
                                    setActiveFilter(null)
                                  }}
                                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedPriority === priority ? 'bg-purple-50' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="text-gray-900">{priority}</span>
                                  {selectedPriority === priority && <Check className="h-4 w-4 text-purple-600" />}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>

            {/* Single Contact Card */}
            <div className="mx-auto ">
              <Card className="rounded-lg shadow-sm">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row w-full items-start space-y-4 lg:space-y-0">
                    {/* Left Section - Contact Information */}
                    <div className="flex w-full lg:w-1/3 items-start space-x-4">
                      {/* Avatar */}
                      <Avatar className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-pink-500 flex-shrink-0">
                        <AvatarFallback className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                          JC
                        </AvatarFallback>
                      </Avatar>

                      {/* Contact Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                          Julio Caesar
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">
                          +1 (555) 123-4567
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-gray-500">
                            Last active: 1h ago
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Separator Line - Hidden on mobile */}
                    <div className="hidden lg:block w-px h-24 bg-gray-200 mx-4 lg:mx-8"></div>

                    {/* Right Section - Message Details and Actions */}
                    <div className="flex w-full lg:flex-1 flex-col space-y-3 lg:space-y-4 lg:pl-8">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-red-100 text-red-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                          High Priority
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                          <Calendar className="h-3 w-3 mr-1" />
                          Appointment
                        </Badge>
                      </div>

                      {/* Message Preview and View Button */}
                      <div className="flex w-full justify-between items-start space-x-3">
                        {/* Message Preview */}
                        <p className="text-xs sm:text-sm text-gray-600 flex-1 min-w-0">
                          Lorem ipsum dolor sit amet consectetur. Quis ultrices praesent mauris quis sagittis neque urna amet. Pretium tri...
                        </p>

                        {/* View Button */}
                        <Link href="/messages/1">
                          <Button variant="outline" size="icon" className="h-8 w-8 border-gray-300 hover:bg-gray-50 flex-shrink-0">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                        </Link>
                      </div>
                    </div>
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