"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SignupProgress } from "@/components/signup-progress"
import { GradientBackground } from "@/components/gradient-background"
import { Search, Star, Clock } from "lucide-react"
import Image from "next/image"

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
    <div className="min-h-screen bg-white lg:bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-[1440px] max-h-[983px] overflow-hidden">
        {/* Mobile Header - Only visible on mobile */}
        <div className="lg:hidden flex items-center justify-center mb-8 px-6 pt-12">
          <div className="flex items-center pb-[44px]">
            <Image
              src="/images/logo2.svg"
              alt="logo"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Main Content Container */}
        <GradientBackground>
          <div className="px-6 lg:px-0  lg:pt-[70px] pt-[50px] pb-6 lg:pb-0 h-full overflow-y-auto lg:flex-1 lg:flex lg:flex-col lg:pl-[52px]">
            {/* Modal-style container for desktop */}
            <div className="lg:flex lg:items-center lg:justify-center lg:h-full lg:pr-[52px] lg:pt-0">
              <div className="lg:bg-white lg:rounded-2xl lg:shadow-2xl lg:p-8 lg:w-full lg:max-w-lg lg:border lg:border-gray-100 lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                {/* Progress indicator inside modal */}
                <div className="lg:mb-6">
                  <SignupProgress currentStep={1} />
                </div>

                <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:pt-[40px]">
                  {/* Header Section */}
                  <div className="flex flex-col justify-center items-center pt-[20px] lg:pt-0 lg:items-start">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope text-center lg:text-left">Meet Your AI Agent</h2>
                    <p className="text-gray-600 mb-8 lg:mb-8 font-manrope lg:text-[18px] text-center lg:text-left">Pick a name, voice and connect your business</p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6 lg:space-y-10 lg:flex lg:flex-col">
                    {/* Agent Name Field */}
                    <div className="flex flex-col gap-[14px] lg:gap-[14px]">
                      <Label htmlFor="agent-name" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                        Agent Name
                      </Label>
                      <Input
                        id="agent-name"
                        placeholder="Agent name"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        className="w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg font-manrope"
                      />
                    </div>

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
                    <Button
                      onClick={handleNext}
                      className="w-full lg:w-[193px] h-12 lg:h-[56px] bg-blue-600 hover:bg-blue-700 text-white py-3 lg:py-0 rounded-lg lg:rounded-none text-base font-manrope font-manrope"
                      disabled={!agentName}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  )
}
