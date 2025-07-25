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
    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
      <div className="text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2">
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-full sm:w-auto h-9 px-3 bg-white border-gray-200 text-sm font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex w-full sm:w-auto space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 sm:flex-none h-9 px-3 bg-white border-gray-200 text-sm font-semibold font-manrope"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            <span className="sm:hidden">{isRefreshing ? '...' : 'Refresh'}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 sm:flex-none h-9 px-3 bg-white border-gray-200 text-sm font-semibold font-manrope"
            onClick={onExport}
            disabled={isExporting}
          >
            <Download className={`h-4 w-4 mr-2 ${isExporting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
            <span className="sm:hidden">{isExporting ? '...' : 'Export'}</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 