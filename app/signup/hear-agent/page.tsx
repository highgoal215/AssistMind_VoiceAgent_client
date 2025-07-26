"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  SignupPageLayout,
  SignupContentWrapper,
  SignupFormSection,
  SignupAudioPlayer,
  SignupActionButtons
} from "@/components/signup"

export default function HearAgentPage() {
  const router = useRouter()

  const handleNext = () => {
    router.push("/signup/create-account")
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={2}
        title="Hear Your AI Agent"
        subtitle="Listen to how your AI agent sounds. You can customize voice and tone anytime"
      >
        <SignupFormSection>
          <SignupAudioPlayer
            title="Agent Intro Sample"
            duration="1m 12s"
            progress={65}
            className="mb-8 lg:mb-0"
          />

          <SignupActionButtons
            onNext={handleNext}
            onBack={handleBack}
            nextText="Next"
            backText="Back"
          />
        </SignupFormSection>
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
