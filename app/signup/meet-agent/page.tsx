"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  SignupPageLayout,
  SignupContentWrapper,
  SignupFormSection,
  SignupFormField,
  SignupButton,
  SignupBusinessSearch,
  BUSINESS_RESULTS
} from "@/components/signup"

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
    const business = BUSINESS_RESULTS.find((b) => b.id === businessId)
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
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={1}
        title="Meet Your AI Agent"
        subtitle="Pick a name, voice and connect your business"
      >
        <SignupFormSection>
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

          {/* Business Search */}
          <SignupBusinessSearch
            value={businessSearch}
            onChange={handleBusinessSearch}
            onSelect={handleBusinessSelect}
            results={BUSINESS_RESULTS}
            showResults={showResults}
            onManualEntry={handleManualEntry}
          />

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
        </SignupFormSection>
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
