"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Clock } from "lucide-react"
import {
  SignupLayout,
  SignupHeader,
  SignupFormField,
  SignupButton
} from "@/components/signup"

interface Business {
  id: string
  name: string
  address: string
  image?: string
  rating: number
  reviews: number
  status: string
  tags: string[]
}

export default function MeetAgentFinalPage() {
  const router = useRouter()
  const [agentName, setAgentName] = useState("")
  const [voiceTone, setVoiceTone] = useState("female-calm")
  const [businessSearch, setBusinessSearch] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [businessResults, setBusinessResults] = useState<Business[]>([])

  const handleBusinessSearch = (value: string) => {
    setBusinessSearch(value)
    if (value.length > 2) {
      // Mock business search results
      const mockResults: Business[] = [
        {
          id: "1",
          name: "Sample Business 1",
          address: "123 Main St, City, State",
          image: "/placeholder.svg",
          rating: 4.5,
          reviews: 120,
          status: "Open",
          tags: ["Restaurant", "Italian"]
        },
        {
          id: "2",
          name: "Sample Business 2",
          address: "456 Oak Ave, City, State",
          image: "/placeholder.svg",
          rating: 4.2,
          reviews: 85,
          status: "Open",
          tags: ["Retail", "Electronics"]
        }
      ]
      setBusinessResults(mockResults)
      setShowResults(true)
    } else {
      setShowResults(false)
      setBusinessResults([])
    }
  }

  const handleBusinessSelect = (businessId: string) => {
    const selectedBusiness = businessResults.find(business => business.id === businessId)
    if (selectedBusiness) {
      setBusinessSearch(selectedBusiness.name)
      setShowResults(false)
    }
  }

  const handleNext = () => {
    router.push("/signup/hear-agent")
  }

  return (
    <SignupLayout currentStep={1}>
      <SignupHeader
        title="Meet Your AI Agent"
        subtitle="Pick a name, voice and connect your business"
      />

      {/* Form Fields */}
      <div className="space-y-6 lg:space-y-10 lg:flex lg:flex-col">
        <SignupFormField
          id="agent-name"
          label="Agent Name"
          placeholder="Agent name"
          value={agentName}
          onChange={setAgentName}
        />

        {/* Voice & Tone Field */}
        <div className="flex flex-col gap-[14px] lg:gap-[14px]">
          <Label htmlFor="voice-tone" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
            Voice & Tone
          </Label>
          <Select value={voiceTone} onValueChange={setVoiceTone}>
            <SelectTrigger className="w-full h-12 lg:h-[56px] border border-gray-300 lg:border-gray-300 rounded-lg font-manrope">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female-calm">Female - Calm & Professional</SelectItem>
              <SelectItem value="female-energetic">Female - Energetic & Friendly</SelectItem>
              <SelectItem value="male-professional">Male - Professional & Confident</SelectItem>
              <SelectItem value="male-warm">Male - Warm & Approachable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Business Search Field */}
        <div className="relative flex flex-col gap-[14px] lg:gap-[14px]">
          <Label htmlFor="business-search" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
            Business Name Lookup
          </Label>
          <div className="relative">
            <Input
              id="business-search"
              placeholder="Start typing to find your business"
              value={businessSearch}
              onChange={(e) => handleBusinessSearch(e.target.value)}
              className="w-full h-12 lg:h-[56px] border border-gray-300 lg:border-gray-300 rounded-lg pr-10 font-manrope"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Search Results */}
          {showResults && (
            <div className="mt-4 lg:absolute lg:z-10 lg:w-full lg:mt-1 bg-white border border-gray-200 rounded-lg lg:shadow-lg max-h-80 overflow-y-auto">
              {businessResults.map((business) => (
                <div
                  key={business.id}
                  className="bg-white border border-gray-200 lg:border-b lg:border-gray-100 lg:last:border-b-0 rounded-lg lg:rounded-none p-4 lg:p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleBusinessSelect(business.id)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-manrope text-gray-900 text-sm mb-1 lg:mb-0 lg:mt-0 font-manrope">{business.name}</h3>
                      <p className="text-xs text-gray-500 mb-2 lg:mb-1 lg:mt-1 font-manrope">{business.address}</p>
                      <div className="flex items-center space-x-4 mb-2 lg:mb-0 lg:mt-2">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1 font-manrope">
                            {business.rating}({business.reviews})
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-red-500" />
                          <span className="text-xs text-red-600 ml-1 font-manrope">{business.status}</span>
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
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center items-center w-full pt-[40px] lg:pt-[40px]">
        <SignupButton
          onClick={handleNext}
          disabled={!agentName}
          fullWidth={false}
          className="lg:w-[193px]"
        >
          Next
        </SignupButton>
      </div>
    </SignupLayout>
  )
}
