"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SignupProgress } from "@/components/signup-progress"
import { GradientBackground } from "@/components/gradient-background"
import Image from "next/image"

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
    router.push("/dashboard")
  }

  const handleApplePay = () => {
    // Handle Apple Pay
    console.log("Apple Pay selected")
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
          <div className="px-6 lg:px-0  lg:pt-[70px] pt-[50px] pb-6 lg:pb-0 h-full overflow-y-auto lg:flex-1 lg:flex lg:flex-col lg:pl-[52px] overflow-auto">
            {/* Modal-style container for desktop */}
            <div className="lg:flex lg:items-center lg:justify-center lg:h-full lg:pr-[52px] lg:pt-0">
              <div className="lg:bg-white lg:rounded-2xl lg:shadow-2xl lg:p-8 lg:w-full lg:max-w-lg lg:border lg:border-gray-100 lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                {/* Progress indicator inside modal */}
                <div className="lg:mb-6">
                  <SignupProgress currentStep={4} />
                </div>

                <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:pt-14">
                  {/* Header Section */}
                  <div className="flex flex-col justify-center items-center pt-6 lg:pt-12 lg:items-start">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope text-center lg:text-left">Stripe checkout</h2>
                    <p className="text-gray-600 mb-8 lg:mb-8 font-manrope lg:text-lg text-center lg:text-left font-semibold">Securely complete your payment via Stripe. All major cards accepted.</p>
                  </div>

                  {/* Payment Form */}
                  <div className="space-y-6 lg:space-y-2 lg:flex lg:flex-col">
                    {/* Apple Pay Button */}
                    <button
                      onClick={handleApplePay}
                      className="w-full border  border-gray-300 bg-white text-black rounded-lg py-4 h-12 flex items-center justify-center space-x-2 hover:bg-[#4A48FF] transition-colors font-manrope"
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

                    {/* Email Field */}
                    <div className="flex flex-col gap-[14px] lg:gap-[14px]">
                      <Label htmlFor="email" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope ">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 lg:h-[56px] border-2 border-gray-300 lg:border-gray-300 rounded-lg font-manrope font-semibold"
                      />
                    </div>

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

                    {/* Name on Card Field */}
                    <div className="flex flex-col gap-[14px] lg:gap-[14px]">
                      <Label htmlFor="name-on-card" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                        Name on card
                      </Label>
                      <Input
                        id="name-on-card"
                        placeholder="Enter name"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        className="w-full h-12 lg:h-[56px] border-2 border-gray-300 lg:border-gray-300 rounded-lg font-manrope font-semibold"
                      />
                    </div>

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
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 lg:space-y-0 lg:pt-[40px]">
                    {/* Mobile: Side by side buttons */}
                    <div className="lg:hidden flex space-x-4 pt-4">
                      <Button onClick={handleBack} variant="outline" className="flex-1 py-3 h-12 bg-transparent font-manrope rounded-lg font-bold text-md">
                        Back
                      </Button>
                      <Button
                        onClick={handlePayment}
                        className="flex-1 bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-3 h-12 font-manrope rounded-lg "
                        disabled={!email || !cardNumber || !nameOnCard}
                      >
                        Pay ${price}
                      </Button>
                    </div>

                    {/* Desktop: Side by side buttons */}
                    <div className="hidden lg:flex justify-between items-center w-full space-x-4">
                      <Button onClick={handleBack} variant="outline" className="w-[193px] h-[56px] bg-transparent font-manrope font-bold text-md">
                        Back
                      </Button>
                      <Button
                        onClick={handlePayment}
                        className="w-[193px] h-[56px] bg-[#4A48FF] hover:bg-[#4A48FF] text-white font-manrope font-bold text-md"
                        disabled={!email || !cardNumber || !nameOnCard}
                      >
                        Pay ${price}
                      </Button>
                    </div>
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
