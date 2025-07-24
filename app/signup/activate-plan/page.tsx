"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SignupProgress } from "@/components/signup-progress"
import { GradientBackground } from "@/components/gradient-background"
import Image from "next/image"

const plans = [
  {
    id: "basic",
    name: "Basic plan",
    price: 10,
    popular: true,
    features: ["AI-powered call handling", "Basic voice customization", "Up to 100 calls/month", "Email support"],
  },
  {
    id: "business",
    name: "Business plan",
    price: 50,
    mostPopular: true,
    features: [
      "Everything in Basic",
      "Advanced voice & tone options",
      "Up to 1,000 calls/month",
      "Priority support",
      "Custom integrations",
      "Analytics dashboard",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise plan",
    price: 99,
    features: [
      "Everything in Business",
      "Unlimited calls",
      "White-label solution",
      "Dedicated account manager",
      "Custom AI training",
      "API access",
    ],
  },
]

export default function ActivatePlanPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("business")

  const handleGetStarted = (planId: string) => {
    setSelectedPlan(planId)
    router.push(`/signup/checkout?plan=${planId}`)
  }

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-[1440px] max-h-[983px] overflow-auto">
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
            <SignupProgress currentStep={4} />

            <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:pt-10 lg:h-full">
              {/* Header Section */}
              <div className="flex flex-col justify-center items-center pt-10 lg:pt-12 lg:items-start">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope text-center lg:text-left">Activate Your Plan</h2>
                <p className="text-gray-600 mb-8 lg:mb-8 font-manrope lg:text-[18px] text-center lg:text-left font-semibold">Start enjoying premium features — activate your plan now.</p>
              </div>

              {/* Plans Grid */}
              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-6 lg:max-w-4xl lg:h-full">
                {/* Basic Plan */}
                <div className="relative bg-white rounded-2xl border border-gray-200 p-6 lg:px-6 lg:py-2">
                  <div className="absolute top-6 right-6">
                    <span className="bg-[#a3a3cf] text-[#4A48FF] text-md  px-3 py-1 rounded-full font-manrope font-semibold">Popular</span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 font-manrope">Basic plan</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-gray-900 font-manrope">$10</span>
                      <span className="text-gray-500 ml-2 font-manrope">per month</span>
                    </div>
                    <Button
                      onClick={() => handleGetStarted("basic")}
                      className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-3 h-12 rounded-xl font-manrope font-bold"
                    >
                      Get started
                    </Button>
                  </div>
                </div>

                {/* Business Plan */}
                <div className="relative bg-gradient-to-r from-[#4A48FF] to-[#4A48FF] rounded-2xl p-6 lg:px-6 lg:py-2 text-white">
                  <div className="absolute top-6 right-6">
                    <span className="bg-white text-[#4A48FF] text-md  px-3 py-1 rounded-full font-manrope font-semibold">Most popular</span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-4 font-manrope">Business plan</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold font-manrope">$50</span>
                      <span className="text-blue-100 ml-2 font-manrope">per month</span>
                    </div>
                    <Button
                      onClick={() => handleGetStarted("business")}
                      className="w-full bg-white text-[#4A48FF] hover:bg-gray-50 py-3 h-12 rounded-xl  font-manrope font-bold"
                    >
                      Get started
                    </Button>
                  </div>
                </div>

                {/* Enterprise Plan */}
                <div className="relative bg-white rounded-2xl border border-gray-200 p-6 lg:px-6 lg:py-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 font-manrope">Enterprise plan</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-gray-900 font-manrope">$99</span>
                      <span className="text-gray-500 ml-2 font-manrope">per month</span>
                    </div>
                    <Button
                      onClick={() => handleGetStarted("enterprise")}
                      className="w-full bg-[#4A48FF]   hover:bg-[#4A48FF] text-white py-3 h-12 rounded-xl font-manrope font-bold"
                    >
                      Get started
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
