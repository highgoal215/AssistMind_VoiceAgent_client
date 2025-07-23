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
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import Image from 'next/image'
export default function MessagesPage() {
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
          <div className="flex items-center justify-end">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>



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
                  <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm">
                    <Image src="/images/call/mage_filter.svg" alt="filter" width={20} height={20} />
                    Filter
                  </Button>
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
                        <Button variant="outline" size="icon" className="h-8 w-8 border-gray-300 hover:bg-gray-50 flex-shrink-0">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
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