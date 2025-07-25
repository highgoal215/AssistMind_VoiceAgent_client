import React from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FilterState } from './types'
import { FILTER_OPTIONS } from './constants'

interface SearchAndFilterProps {
  filterState: FilterState
  onSearchChange: (query: string) => void
  onFilterChange: (filter: string) => void
}

export default function SearchAndFilter({
  filterState,
  onSearchChange,
  onFilterChange
}: SearchAndFilterProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Search Row */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={filterState.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          {filterState.searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => onSearchChange('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button size="icon" className="bg-[#4A48FF] hover:bg-blue-700 flex-shrink-0">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Filter Row */}
      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((filter) => (
          <Button
            key={filter}
            variant={filterState.selectedFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(filter)}
            className={`text-xs sm:text-sm ${filterState.selectedFilter === filter ? 'bg-[#4A48FF] hover:bg-blue-700' : ''}`}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  )
} 