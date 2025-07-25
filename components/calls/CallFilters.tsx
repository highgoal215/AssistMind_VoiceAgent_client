import React from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { CallFilters as CallFiltersType } from './types'
import { CALL_TYPE_OPTIONS, STATUS_OPTIONS, DATE_RANGE_OPTIONS } from './constants'

interface CallFiltersProps {
  filters: CallFiltersType
  onFiltersChange: (filters: Partial<CallFiltersType>) => void
}

export default function CallFilters({ filters, onFiltersChange }: CallFiltersProps) {
  const activeFiltersCount = [filters.callType, filters.status, filters.dateRange].filter(v => v !== 'All').length

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <div className="flex flex-col w-full gap-4">
        <h2 className="text-3xl lg:text-3xl font-bold font-manrope text-gray-900">Call Log</h2>
        <div className="flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0 lg:space-x-2">
          <div className='flex items-center space-x-3'>
            <Input
              placeholder="Search..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
              className="w-full lg:w-64"
            />
            <Button size="sm" className="bg-[#4A48FF] hover:bg-[#3A38FF]">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className='font-bold font-manrope'>
                  Filter
                  <Image src="/images/call/mage_filter.svg" alt="filter" width={16} height={16} className='w-1/2 h-1/2' />
                  <ChevronDown className="w-4 h-4 ml-2" />
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Call</span>
                    {filters.callType !== 'All' && (
                      <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                        {filters.callType}
                      </Badge>
                    )}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {CALL_TYPE_OPTIONS.map(option => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => onFiltersChange({ callType: option.value })}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Status</span>
                    {filters.status !== 'All' && (
                      <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                        {filters.status}
                      </Badge>
                    )}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {STATUS_OPTIONS.map(option => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => onFiltersChange({ status: option.value })}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Date range</span>
                    {filters.dateRange !== 'All' && (
                      <Badge variant="outline" className="ml-2 h-5 px-1.5 text-xs">
                        {filters.dateRange}
                      </Badge>
                    )}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {DATE_RANGE_OPTIONS.map(option => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => onFiltersChange({ dateRange: option.value })}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
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
  )
} 