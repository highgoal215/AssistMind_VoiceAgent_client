import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Star, Clock } from "lucide-react"

interface BusinessResult {
  id: number
  name: string
  address: string
  rating: number
  reviews: number
  status: string
  tags: string[]
  image: string
}

interface SignupBusinessSearchProps {
  value: string
  onChange: (value: string) => void
  onSelect: (businessId: number) => void
  results: BusinessResult[]
  showResults: boolean
  onManualEntry: () => void
}

export function SignupBusinessSearch({
  value,
  onChange,
  onSelect,
  results,
  showResults,
  onManualEntry
}: SignupBusinessSearchProps) {
  return (
    <div className="relative flex flex-col gap-[14px] lg:gap-[14px]">
      <Label htmlFor="business-search" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
        Business Name Lookup
      </Label>
      
      <div className="relative">
        <Input
          id="business-search"
          placeholder="Start typing to find your business"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 lg:h-[56px] border border-gray-300 lg:border-gray-300 rounded-lg pr-10 font-manrope"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="mt-4 lg:absolute lg:z-10 lg:w-full lg:mt-1 bg-white border border-gray-200 rounded-lg lg:shadow-lg max-h-80 overflow-y-auto font-bold">
          {results.map((business) => (
            <div
              key={business.id}
              className="bg-white border border-gray-200 lg:border-b lg:border-gray-100 lg:last:border-b-0 rounded-lg lg:rounded-none p-4 lg:p-4 hover:bg-gray-50 cursor-pointer font-bold"
              onClick={() => onSelect(business.id)}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={business.image || "/placeholder.svg"}
                  alt={business.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-sm mb-1 lg:mb-0 lg:mt-0 font-manrope">
                    {business.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 lg:mb-1 lg:mt-1 font-manrope">
                    {business.address}
                  </p>
                  <div className="flex items-center space-x-4 mb-2 lg:mb-0 lg:mt-2">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1 font-manrope">
                        {business.rating}({business.reviews})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-600 ml-1 font-manrope">
                        {business.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 lg:mt-2">
                    {business.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-manrope">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual Entry Link */}
      <div className="text-start pt-[10px] lg:pt-[10px]">
        <button onClick={onManualEntry} className="text-sm font-semibold font-manrope">
          <span className="text-black">Can't find your business? </span>
          <span className="text-[#4A48FF] hover:text-[#4A48FF]">Enter it manually instead</span>
        </button>
      </div>
    </div>
  )
} 