"use client"

import React, { useState, useRef, useEffect } from 'react'
import {
  Bell,
  Moon,
  Phone,
  Clock,
  User,
  Search,
  Filter,
  ChevronDown,
  Eye,
  MoreVertical,
  Flag,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  Play,
  Trash2,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Link from 'next/link'
import Image from 'next/image'
interface Call {
  id: string
  caller: string
  number: string
  dateTime: string
  duration: string
  type: 'incoming' | 'outgoing'
  status: 'booked' | 'unqualified' | 'flagged' | 'lead' | 'follow-up' | 'spam'
  isFlagged: boolean
}

const mockCalls: Call[] = [
  {
    id: '1',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '15 May 2025 9:30 AM',
    duration: '1m 12s',
    type: 'incoming',
    status: 'booked',
    isFlagged: false
  },
  {
    id: '2',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '15 May 2025 8:45 AM',
    duration: '1m 12s',
    type: 'outgoing',
    status: 'unqualified',
    isFlagged: true
  },
  {
    id: '3',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '15 May 2025 8:15 AM',
    duration: '1m 12s',
    type: 'incoming',
    status: 'flagged',
    isFlagged: true
  },
  {
    id: '4',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '14 May 2025 3:20 PM',
    duration: '1m 12s',
    type: 'outgoing',
    status: 'lead',
    isFlagged: false
  },
  {
    id: '5',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '14 May 2025 2:10 PM',
    duration: '1m 12s',
    type: 'incoming',
    status: 'follow-up',
    isFlagged: false
  },
  {
    id: '6',
    caller: 'Dev Kooper',
    number: '(647) 1255 125',
    dateTime: '14 May 2025 1:30 PM',
    duration: '1m 12s',
    type: 'outgoing',
    status: 'spam',
    isFlagged: false
  }
]

const getStatusColor = (status: string) => {
  const colors = {
    booked: 'bg-green-100 text-green-800',
    unqualified: 'bg-orange-100 text-orange-800',
    flagged: 'bg-red-100 text-red-800',
    lead: 'bg-purple-100 text-purple-800',
    'follow-up': 'bg-blue-100 text-blue-800',
    spam: 'bg-pink-100 text-pink-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getTypeColor = (type: string) => {
  return type === 'incoming'
    ? 'bg-purple-100 text-purple-800'
    : 'bg-gray-100 text-gray-800'
}

export default function CallsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCallType, setSelectedCallType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedDateRange, setSelectedDateRange] = useState('All')
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)
  const [noteMenuOpen, setNoteMenuOpen] = useState<string | null>(null)

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

  const filteredCalls = mockCalls.filter(call =>
    call.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.number.includes(searchTerm)
  )

  const totalCalls = mockCalls.length
  const averageDuration = '2m 9s'
  const uniqueCallers = 2

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
                  1
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

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-[#4A48FF]" />
                    </div>
                    <div>
                      <p className="text-sm font-manrope text-gray-600">Total Calls</p>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalCalls}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-[#4A48FF]" />
                    </div>
                    <div>
                      <p className="text-sm font-manrope text-gray-600">Average Duration</p>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">{averageDuration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm sm:col-span-2 lg:col-span-1">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 lg:w-6 lg:h-6 text-[#4A48FF]" />
                    </div>
                    <div>
                      <p className="text-sm font-manrope text-gray-600">Unique Callers</p>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">{uniqueCallers.toString().padStart(2, '0')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call Log */}
            <Card className="bg-white shadow-sm">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                  <div className="flex flex-col w-full gap-4">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Call Log</h2>
                    <div className="flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:space-x-2">
                      <div className='flex items-center space-x-3'>
                        <Input
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full lg:w-64"
                        />
                        <Button size="sm" className="bg-[#4A48FF] hover:bg-[#3A38FF]">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Filter
                              <Image src="/images/call/mage_filter.svg" alt="filter" width={16} height={16} className='w-1/2 h-1/2' />
                              <ChevronDown className="w-4 h-4 ml-2" />
                              {(selectedCallType !== 'All' || selectedStatus !== 'All' || selectedDateRange !== 'All') && (
                                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                                  {[selectedCallType, selectedStatus, selectedDateRange].filter(v => v !== 'All').length}
                                </Badge>
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-48">
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <span>Call</span>
                                {selectedCallType !== 'All' && (
                                  <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                                    {selectedCallType}
                                  </Badge>
                                )}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setSelectedCallType('All')}>
                                  All
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedCallType('Incoming')}>
                                  Incoming
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedCallType('Outgoing')}>
                                  Outgoing
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <span>Status</span>
                                {selectedStatus !== 'All' && (
                                  <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                                    {selectedStatus}
                                  </Badge>
                                )}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setSelectedStatus('Completed')}>
                                  Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedStatus('Missed')}>
                                  Missed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedStatus('Transferred')}>
                                  Transferred
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedStatus('Failed')}>
                                  Failed
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <span>Date range</span>
                                {selectedDateRange !== 'All' && (
                                  <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                                    {selectedDateRange}
                                  </Badge>
                                )}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setSelectedDateRange('Today')}>
                                  Today
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedDateRange('7 days')}>
                                  7 days
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedDateRange('30 days')}>
                                  30 days
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedDateRange('custom')}>
                                  custom
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="sm">
                          Export
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-manrope">CALLER</TableHead>
                      <TableHead className="font-manrope">NUMBER</TableHead>
                      <TableHead className="font-manrope">DATE & TIME</TableHead>
                      <TableHead className="font-manrope">
                        <div className="flex items-center space-x-1">
                          <span>DURATION</span>
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-manrope">TYPE</TableHead>
                      <TableHead className="font-manrope">
                        <div className="flex items-center space-x-1">
                          <span>STATUS</span>
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-manrope">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCalls.map((call) => (
                      <TableRow
                        key={call.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => window.location.href = `/calls/${call.id}`}
                      >
                        <TableCell className="font-manrope">{call.caller}</TableCell>
                        <TableCell>{call.number}</TableCell>
                        <TableCell>{call.dateTime}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(call.type)}>
                            {call.type.charAt(0).toUpperCase() + call.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(call.status)}>
                            {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                            <Link href={`/calls/${call.id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>

                            {/* Action Menu Dropdown */}
                            <DropdownMenu open={actionMenuOpen === call.id} onOpenChange={(open) => setActionMenuOpen(open ? call.id : null)}>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer">
                                  <Play className="w-4 h-4" />
                                  <span className="text-sm font-manrope">Play audio</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer">
                                  <Trash2 className="w-4 h-4" />
                                  <span className="text-sm font-manrope">Delete Record</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Note Menu Dropdown */}
                            <DropdownMenu open={noteMenuOpen === call.id} onOpenChange={(open) => setNoteMenuOpen(open ? call.id : null)}>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-8 w-8 p-0 ${call.isFlagged ? 'text-red-500' : 'text-gray-400'}`}
                                >
                                  <Flag className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                                <div className="relative">
                                  <div className="text-sm text-gray-700 leading-relaxed">
                                    <p className="font-semibold mb-2">Note:</p>
                                    <p>This is your AI agent's</p>
                                    <p>default behavior — automatically</p>
                                    <p>generated based on your setup.</p>
                                    <p>You can tweak it below or launch</p>
                                    <p>your agent as is.</p>
                                  </div>
                                  <div className="absolute -bottom-2 -right-2">
                                    <Avatar className="h-8 w-8 border-2 border-yellow-400">
                                      <AvatarImage src="/images/user-profile.jpg" />
                                      <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                  </div>
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="p-4 lg:p-6 border-t border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} className="w-full lg:w-auto">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-[#4A48FF] hover:bg-purple-700 text-white"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <span className="text-gray-500">...</span>
                    <Button variant="outline" size="sm">8</Button>
                    <Button variant="outline" size="sm">9</Button>
                    <Button variant="outline" size="sm">10</Button>
                  </div>

                  <Button variant="outline" size="sm" className="w-full lg:w-auto">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 