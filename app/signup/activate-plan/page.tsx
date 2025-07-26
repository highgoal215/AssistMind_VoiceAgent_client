"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  SignupPageLayout,
  SignupContentWrapper,
  SignupFormSection,
  SignupPlanCard,
  PLANS
} from "@/components/signup"

export default function ActivatePlanPage() {
  const router = useRouter()

  const handleGetStarted = (planId: string) => {
    router.push(`/signup/checkout?plan=${planId}`)
  }

  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={4}
        title="Activate Your Plan"
        subtitle="Start enjoying premium features — activate your plan now."
      >
        <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-6 lg:max-w-4xl lg:h-1/4">
          {PLANS.map((plan) => (
            <SignupPlanCard
              key={plan.id}
              {...plan}
              onSelect={handleGetStarted}
            />
          ))}
        </div>
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
