"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Clock } from "lucide-react"
import { SignupProgress } from "@/components/signup-progress"
import {
  SignupFormField,
  SignupButton
} from "@/components/signup"

const businessResults = [
  {
    id: 1,
    name: "Canadian Renovator & Technical Services Inc.",
    address: "63 Thorncliffe Park Dr #307, Toronto, ON M4H 1L4",
    rating: 5,
    reviews: 201,
    status: "Closed",
    tags: ["Plumber", "Electrician", "+4 more"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Canadian Renovator & Technical Services Inc.",
    address: "63 Thorncliffe Park Dr #307, Toronto, ON M4H 1L4",
    rating: 5,
    reviews: 201,
    status: "Closed",
    tags: ["Plumber", "Electrician", "+4 more"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Canadian Renovator & Technical Services Inc.",
    address: "63 Thorncliffe Park Dr #307, Toronto, ON M4H 1L4",
    rating: 5,
    reviews: 201,
    status: "Closed",
    tags: ["Plumber", "Electrician", "+4 more"],
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function MeetAgentPage() {
  const router = useRouter()
  const [agentName, setAgentName] = useState("")
  const [voiceTone, setVoiceTone] = useState("")
  const [businessSearch, setBusinessSearch] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null)

  const handleBusinessSearch = (value: string) => {
    setBusinessSearch(value)
    setShowResults(value.length > 2)
  }

  const handleBusinessSelect = (businessId: number) => {
    setSelectedBusiness(businessId)
    const business = businessResults.find((b) => b.id === businessId)
    if (business) {
      setBusinessSearch(business.name)
      setShowResults(false)
    }
  }

  const handleNext = () => {
    router.push("/signup/hear-agent")
  }

  const handleManualEntry = () => {
    router.push("/signup/business-details")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1400px] h-[880px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-full">
          {/* Left Column - Video Background */}
          <div className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden">
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/bg-video.mp4" type="video/mp4" />
            </video>

            {/* Content Overlay */}
            <div className="relative z-10 p-12 flex flex-col w-full">
              {/* Logo */}
              <div className="flex items-center mb-24">
                <Image
                  src="/images/AssistMind AI Logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-auto h-12"
                />
              </div>

              {/* Slogan */}
              <div className="flex flex-col justify-center mb-10 items-center text-start text-white h-full">
                <p className="text-5xl font-bold leading-tight mb-4">
                  Never Miss a Call. Never Lose a Lead. Powered <br />
                  by AI.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Meet Agent Form */}
          <div className="w-full h-full lg:w-1/2 p-8 lg:p-12">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mt-16 mb-16 lg:hidden">
              <div className="flex items-center">
                <div>
                  <Image
                    src="/images/logo2.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-auto h-12"
                  />
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <SignupProgress currentStep={1} />
            </div>

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Meet Your AI Agent
              </h1>
              <p className="text-gray-600">
                Pick a name, voice and connect your business
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Agent Name Field */}
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
                  <SelectTrigger className="w-full h-12 lg:h-[56px] border border-gray-300 lg:border-gray-300 rounded-lg font-manrope font-semibold">
                    <SelectValue placeholder="Female - Calm & Professional" />
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
                  <div className="mt-4 lg:absolute lg:z-10 lg:w-full lg:mt-1 bg-white border border-gray-200 rounded-lg lg:shadow-lg max-h-80 overflow-y-auto font-bold">
                    {businessResults.map((business) => (
                      <div
                        key={business.id}
                        className="bg-white border border-gray-200 lg:border-b lg:border-gray-100 lg:last:border-b-0 rounded-lg lg:rounded-none p-4 lg:p-4 hover:bg-gray-50 cursor-pointer font-bold"
                        onClick={() => handleBusinessSelect(business.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={business.image || "/placeholder.svg"}
                            alt={business.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className=" text-gray-900 text-sm mb-1 lg:mb-0 lg:mt-0 font-manrope">{business.name}</h3>
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

              {/* Manual Entry Link */}
              <div className="text-start pt-[10px] lg:pt-[10px]">
                <button onClick={handleManualEntry} className="text-sm font-semibold font-manrope">
                  <span className="text-black">Can't find your business? </span>
                  <span className="text-[#4A48FF] hover:text-[#4A48FF]">Enter it manually instead</span>
                </button>
              </div>

              {/* Action Button */}
              <div className="flex justify-center items-center w-full pt-[40px] lg:pt-[40px]">
                <SignupButton
                  onClick={handleNext}
                  disabled={!agentName || !businessSearch}
                  fullWidth={false}
                  className="lg:w-[193px]"
                >
                  Next
                </SignupButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
