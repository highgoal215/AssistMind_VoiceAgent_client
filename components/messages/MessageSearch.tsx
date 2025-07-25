import React from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSearchProps } from './types'

export default function MessageSearch({ 
  placeholder = "Search messages...", 
  onSearch, 
  className = '' 
}: MessageSearchProps) {
  const [query, setQuery] = React.useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`flex items-center space-x-3 flex-1 max-w-md ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 w-full bg-gray-50 border-gray-200 text-sm"
        />
      </div>
      <Button 
        className="bg-[#4A48FF] hover:bg-[#8482bd] text-white px-4 py-2"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
} 