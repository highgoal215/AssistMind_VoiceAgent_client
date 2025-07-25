import React from 'react'
import { ChevronDown, Check, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MessageFiltersProps } from './types'
import Image from 'next/image'

export default function MessageFilters({ 
  filters, 
  onFiltersChange, 
  className = '' 
}: MessageFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

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

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const handleRefresh = () => {
    onFiltersChange({})
  }

  return (
    <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 ${className}`}>
      <div className="flex items-center space-x-3">
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
                          handleFilterChange('type', type)
                          setActiveFilter(null)
                        }}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          filters.type === type ? 'bg-purple-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-gray-900">{type}</span>
                        {filters.type === type && <Check className="h-4 w-4 text-purple-600" />}
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
                        {filters.date ? formatDate(filters.date) : 'No date selected'}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleFilterChange('date', new Date())}>
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
                              handleFilterChange('date', day.date)
                            }
                          }}
                          className={`p-2 text-sm rounded-lg transition-colors ${
                            !day.isCurrentMonth
                              ? 'text-gray-300 cursor-default'
                              : filters.date && isSameDay(day.date, filters.date)
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
                    {filters.priority && <Check className="h-4 w-4 text-purple-600" />}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-0" align="start">
                  <div className="p-2">
                    {['High', 'Medium', 'Low'].map((priority) => (
                      <div
                        key={priority}
                        onClick={() => {
                          handleFilterChange('priority', priority)
                          setActiveFilter(null)
                        }}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          filters.priority === priority ? 'bg-purple-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-gray-900">{priority}</span>
                        {filters.priority === priority && <Check className="h-4 w-4 text-purple-600" />}
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
        <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  )
} 