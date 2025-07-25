"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  SignupLayout,
  SignupHeader,
  SignupFormField,
  SignupActionButtons
} from "@/components/signup"

export default function BusinessDetailsPage() {
  const router = useRouter()
  const [businessName, setBusinessName] = useState("")
  const [website, setWebsite] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleNext = () => {
    router.push("/signup/meet-agent")
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <SignupLayout currentStep={1}>
      <SignupHeader
        title="Enter Your Business Details"
        subtitle="Let's manually set up your business details to connect your AI agent"
      />

      {/* Form Fields */}
      <div className="space-y-6 lg:space-y-10 lg:flex lg:flex-col">
        <SignupFormField
          id="business-name"
          label="Business Name"
          placeholder="Business name"
          value={businessName}
          onChange={setBusinessName}
          required
        />

        <SignupFormField
          id="website"
          label="Website"
          placeholder="https://yourbusiness.com"
          value={website}
          onChange={setWebsite}
        />

        <SignupFormField
          id="phone"
          label="Business Phone number"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </div>

      <SignupActionButtons
        onNext={handleNext}
        onBack={handleBack}
        nextText="Next"
        backText="Back"
        nextDisabled={!businessName}
      />
    </SignupLayout>
  )
}
