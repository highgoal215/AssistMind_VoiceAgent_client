"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SignupProgress } from "@/components/signup-progress"
import { GradientBackground } from "@/components/gradient-background"
import Image from "next/image"

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
            <SignupProgress currentStep={1} />

            <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:pt-[40px]">
              {/* Header Section */}
              <div className="flex flex-col justify-center items-center pt-[20px] lg:pt-0 lg:items-start">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope text-center lg:text-left">Enter Your Business Details</h2>
                <p className="text-gray-600 mb-8 lg:mb-8 font-manrope lg:text-[18px] text-center lg:text-left">Let's manually set up your business details to connect your AI agent</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6 lg:space-y-10 lg:flex lg:flex-col">
                {/* Business Name Field */}
                <div className="flex flex-col gap-[14px] lg:gap-[14px]">
                  <Label htmlFor="business-name" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                    Business Name
                  </Label>
                  <Input
                    id="business-name"
                    placeholder="Business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg font-manrope"
                  />
                </div>

                {/* Website Field */}
                <div className="flex flex-col gap-[14px] lg:gap-[14px]">
                  <Label htmlFor="website" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://yourbusiness.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full h-12 lg:h-[56px] border border-gray-300 lg:border-gray-300 rounded-lg font-manrope"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col gap-[14px] lg:gap-[14px]">
                  <Label htmlFor="phone" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                    Business Phone number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-12 lg:h-[56px] border border-gray-300 lg:border-gray-300 rounded-lg font-manrope"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 lg:space-y-0 lg:pt-[40px]">
                {/* Mobile: Stacked buttons */}
                <div className="lg:hidden space-y-4">
                  <Button
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 h-12 rounded-lg text-base font-manrope font-manrope"
                    disabled={!businessName}
                  >
                    Next
                  </Button>
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="w-full py-3 h-12 rounded-lg text-base font-manrope bg-transparent border-gray-300 font-manrope"
                  >
                    Back
                  </Button>
                </div>

                {/* Desktop: Side by side buttons */}
                <div className="hidden lg:flex justify-center items-center w-full space-x-4">
                  <Button onClick={handleBack} variant="outline" className="w-[193px] h-[56px] bg-transparent font-manrope">
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="w-[193px] h-[56px] bg-blue-600 hover:bg-blue-700 text-white font-manrope"
                    disabled={!businessName}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  )
}
