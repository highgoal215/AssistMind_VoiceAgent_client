import React from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RefreshCw, Download } from 'lucide-react'

interface DashboardHeaderProps {
  timeRange: string
  onTimeRangeChange: (value: string) => void
  onRefresh: () => void
  onExport: () => void
  isRefreshing?: boolean
  isExporting?: boolean
}

export function DashboardHeader({ 
  timeRange, 
  onTimeRangeChange, 
  onRefresh, 
  onExport,
  isRefreshing = false,
  isExporting = false
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>

      <div className="flex items-center space-x-2">
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="h-9 px-3 bg-white border-gray-200 text-sm font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 px-3 bg-white border-gray-200 text-sm font-semibold font-manrope"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 px-3 bg-white border-gray-200 text-sm font-semibold font-manrope"
          onClick={onExport}
          disabled={isExporting}
        >
          <Download className={`h-4 w-4 mr-2 ${isExporting ? 'animate-spin' : ''}`} />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </div>
    </div>
  )
} 