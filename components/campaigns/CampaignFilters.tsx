import React from 'react'
import { Search, RefreshCw, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CampaignFilters as CampaignFiltersType } from './types'
import { STATUS_OPTIONS, DATE_RANGE_OPTIONS, SORT_OPTIONS } from './constants'

interface CampaignFiltersProps {
  filters: CampaignFiltersType
  onFiltersChange: (filters: CampaignFiltersType) => void
}

export default function CampaignFilters({ filters, onFiltersChange }: CampaignFiltersProps) {
  const handleFilterChange = (key: keyof CampaignFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 w-full bg-gray-50 border-gray-200 text-sm"
            />
          </div>
          <Button className="bg-[#4A48FF] hover:bg-[#8482bd] text-white px-4 py-2">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger className="w-32 bg-white border-gray-200 text-md font-bold font-manrope">
              <SelectValue placeholder="Completed" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
            <SelectTrigger className="w-32 bg-white border-gray-200 text-md font-bold font-manrope">
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger className="w-32 bg-white border-gray-200 text-md font-bold font-manrope">
              <SelectValue placeholder="Newest" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-md font-bold font-manrope">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-3 bg-white border-gray-200 text-md font-bold font-manrope">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  )
} 