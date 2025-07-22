"use client"

import React, { useState } from 'react'
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
  ArrowUpDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Link from 'next/link'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

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
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  1
                </span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 ">
          <div className="border border-red-500 mx-auto space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Calls</p>
                      <p className="text-2xl font-bold text-gray-900">{totalCalls}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Duration</p>
                      <p className="text-2xl font-bold text-gray-900">{averageDuration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Unique Callers</p>
                      <p className="text-2xl font-bold text-gray-900">{uniqueCallers.toString().padStart(2, '0')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call Log */}
            <Card className="bg-white shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Call Log</h2>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Export
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">CALLER</TableHead>
                      <TableHead className="font-medium">NUMBER</TableHead>
                      <TableHead className="font-medium">DATE & TIME</TableHead>
                      <TableHead className="font-medium">
                        <div className="flex items-center space-x-1">
                          <span>DURATION</span>
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-medium">TYPE</TableHead>
                      <TableHead className="font-medium">
                        <div className="flex items-center space-x-1">
                          <span>STATUS</span>
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-medium">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCalls.map((call) => (
                      <TableRow key={call.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{call.caller}</TableCell>
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
                          <div className="flex items-center space-x-2">
                            <Link href={`/calls/${call.id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`h-8 w-8 p-0 ${call.isFlagged ? 'text-red-500' : 'text-gray-400'}`}
                            >
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" disabled={currentPage === 1}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
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

                  <Button variant="outline" size="sm">
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