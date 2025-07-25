import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface CallRecord {
  callerId: string
  dateTime: string
  duration: string
  status: string
  result: string
  resultColor: string
}

interface CallRecordsTableProps {
  records: CallRecord[]
  onViewMore: () => void
}

type SortField = 'callerId' | 'dateTime' | 'duration' | 'status' | 'result'
type SortDirection = 'asc' | 'desc'

export function CallRecordsTable({ records, onViewMore }: CallRecordsTableProps) {
  const [sortField, setSortField] = useState<SortField>('dateTime')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedRecords = [...records].sort((a, b) => {
    let aValue: string | number = a[sortField]
    let bValue: string | number = b[sortField]

    // Handle date sorting
    if (sortField === 'dateTime') {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    }

    // Handle duration sorting (convert to seconds)
    if (sortField === 'duration') {
      const aSeconds = (aValue as string).split(':').reduce((acc, time) => 60 * acc + parseInt(time), 0)
      const bSeconds = (bValue as string).split(':').reduce((acc, time) => 60 * acc + parseInt(time), 0)
      aValue = aSeconds
      bValue = bSeconds
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const getStatusBadgeClass = (status: string) => {
    return status === 'Incoming' 
      ? 'bg-purple-100 text-purple-700'
      : 'bg-green-100 text-green-700'
  }

  const getResultBadgeClass = (result: string) => {
    switch (result) {
      case 'Missed':
        return 'bg-red-100 text-red-700'
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'Voicemail':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
      : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
  }

  return (
    <div className='flex flex-col w-full'>
      <Card className='flex flex-col'>
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="text-center lg:text-left">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-manrope font-bold">Call Records</CardTitle>
              <p className="text-sm sm:text-md font-semibold text-gray-500 mt-1">Latest call interactions</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className='font-bold text-sm sm:text-md font-manrope w-full sm:w-auto'
              onClick={onViewMore}
            >
              View More
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50">
                  <th 
                    className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-md font-bold font-manrope text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('callerId')}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="hidden sm:inline">CALLER ID</span>
                      <span className="sm:hidden">CALLER</span>
                      <SortIcon field="callerId" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-md font-bold font-manrope text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('dateTime')}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="hidden lg:inline">DATE & TIME</span>
                      <span className="hidden sm:inline lg:hidden">DATE</span>
                      <span className="sm:hidden">TIME</span>
                      <SortIcon field="dateTime" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-md font-bold font-manrope text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('duration')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>DUR</span>
                      <SortIcon field="duration" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-md font-bold font-manrope text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>STATUS</span>
                      <SortIcon field="status" />
                    </div>
                  </th>
                  <th 
                    className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-md font-bold font-manrope text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('result')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>RESULT</span>
                      <SortIcon field="result" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold font-manrope text-gray-900">
                      <span className="hidden sm:inline">{record.callerId}</span>
                      <span className="sm:hidden">{record.callerId.split(' ').pop()}</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold font-manrope text-gray-900">
                      <span className="hidden lg:inline">{record.dateTime}</span>
                      <span className="hidden sm:inline lg:hidden">{record.dateTime.split(' ')[0]}</span>
                      <span className="sm:hidden">{record.dateTime.split(' ').slice(-2).join(' ')}</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold font-manrope text-gray-900">
                      {record.duration}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <Badge
                        variant="secondary"
                        className={`text-xs px-1 sm:px-2 py-1 rounded-full ${getStatusBadgeClass(record.status)}`}
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <Badge
                        variant="secondary"
                        className={`text-xs px-1 sm:px-2 py-1 rounded-full ${getResultBadgeClass(record.result)}`}
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
  )
} 