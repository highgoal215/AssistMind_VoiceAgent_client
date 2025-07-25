"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SignupProgress } from "@/components/signup-progress"

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

          {/* Right Column - Activate Plan Form */}
          <div className="w-full h-full lg:w-1/2 p-8 lg:p-12">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mt-16 mb-8 lg:hidden">
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
            <div className="mt-10 mb-16">
              <SignupProgress currentStep={4} />
            </div>

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Activate Your Plan
              </h1>
              <p className="text-gray-600">
                Start enjoying premium features — activate your plan now.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-6 lg:max-w-4xl lg:h-min-screen">
              {/* Basic Plan */}
              <div className="relative bg-white rounded-2xl border border-gray-200 p-6 lg:px-6 lg:py-1">
                <div className="absolute top-6 right-6">
                  <span className="bg-[#a3a3cf] text-[#4A48FF] text-md px-3 py-1 rounded-full font-manrope font-semibold">Popular</span>
                </div>

                <div className="mb-2">
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
                  <span className="bg-white text-[#4A48FF] text-md px-3 py-1 rounded-full font-manrope font-semibold">Most popular</span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4 font-manrope">Business plan</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold font-manrope">$50</span>
                    <span className="text-blue-100 ml-2 font-manrope">per month</span>
                  </div>
                  <Button
                    onClick={() => handleGetStarted("business")}
                    className="w-full bg-white text-[#4A48FF] hover:bg-gray-50 py-3 h-12 rounded-xl font-manrope font-bold"
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
                    className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-3 h-12 rounded-xl font-manrope font-bold"
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
