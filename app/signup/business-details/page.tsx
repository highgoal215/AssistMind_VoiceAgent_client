"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SignupProgress } from "@/components/signup-progress"
import {
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

          {/* Right Column - Business Details Form */}
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
            <div className="mt-16 mb-16">
              <SignupProgress currentStep={1} />
            </div>

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Enter Your Business Details
              </h1>
              <p className="text-gray-600">
                Let's manually set up your business details to connect your AI agent
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
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

              <SignupActionButtons
                onNext={handleNext}
                onBack={handleBack}
                nextText="Next"
                backText="Back"
                nextDisabled={!businessName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
