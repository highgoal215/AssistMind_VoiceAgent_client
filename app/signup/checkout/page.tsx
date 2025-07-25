"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SignupProgress } from "@/components/signup-progress"
import {
  SignupFormField,
  SignupActionButtons
} from "@/components/signup"

const planPrices = {
  basic: 10,
  business: 50,
  enterprise: 99,
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "business"
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")
  const [country, setCountry] = useState("")

  const price = planPrices[planId as keyof typeof planPrices] || 50

  const handleBack = () => {
    router.back()
  }

  const handlePayment = () => {
    // Handle Stripe payment
    console.log("Processing payment...")
    // Redirect to success page or dashboard
    router.push("/ai-agent")
  }

  const handleApplePay = () => {
    // Handle Apple Pay
    console.log("Apple Pay selected")
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

          {/* Right Column - Checkout Form */}
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
                Stripe checkout
              </h1>
              <p className="text-gray-600">
                Securely complete your payment via Stripe. All major cards accepted.
              </p>
            </div>

            {/* Payment Form */}
            <div className="space-y-2">
              {/* Apple Pay Button */}
              <button
                onClick={handleApplePay}
                className="w-full border border-gray-300 bg-white text-black rounded-lg py-4 h-12 flex items-center justify-center space-x-2 hover:bg-[#4A48FF] transition-colors font-manrope"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="font-manrope font-bold text-3xl">Pay</span>
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-manrope font-bold text-lg">Or pay with a card</span>
                </div>
              </div>

              <SignupFormField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={setEmail}
              />

              {/* Card Number Field */}
              <div className="flex flex-col gap-2 lg:gap-2">
                <Label htmlFor="card-number" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                  Card number *
                </Label>
                <div className="relative">
                  <Input
                    id="card-number"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full h-12 lg:h-[56px] border-2 border-gray-300 lg:border-gray-300 rounded-lg pl-12 lg:pl-16 font-manrope font-semibold"
                  />
                  <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                    <div className="w-6 h-4 bg-orange-400 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <SignupFormField
                id="name-on-card"
                label="Name on card"
                placeholder="Enter name"
                value={nameOnCard}
                onChange={setNameOnCard}
              />

              {/* Country Field */}
              <div className="flex flex-col gap-[14px] lg:gap-[14px]">
                <Label htmlFor="country" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                  Country or Region
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full h-12 lg:h-[56px] border border-gray-300 lg:border-gray-300 rounded-lg font-manrope font-semibold">
                    <SelectValue placeholder="Select country" className="font-bold font-manrope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <SignupActionButtons
                onNext={handlePayment}
                onBack={handleBack}
                nextText={`Pay $${price}`}
                backText="Back"
                nextDisabled={!email || !cardNumber || !nameOnCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
