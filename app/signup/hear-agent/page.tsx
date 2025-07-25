"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { SignupProgress } from "@/components/signup-progress"
import {
  SignupActionButtons
} from "@/components/signup"

export default function HearAgentPage() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)

  const handleNext = () => {
    router.push("/signup/create-account")
  }

  const handleBack = () => {
    router.back()
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
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

          {/* Right Column - Hear Agent Form */}
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
              <SignupProgress currentStep={2} />
            </div>

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Hear Your AI Agent
              </h1>
              <p className="text-gray-600">
                Listen to how your AI agent sounds. You can customize voice and tone anytime
              </p>
            </div>

            {/* Audio Player Section */}
            <div className="bg-white rounded-lg p-6 lg:p-4 mb-8 lg:mb-0 shadow-sm border border-gray-100 w-full lg:max-w-none lg:w-full">
              <h3 className="lg:font-bold text-gray-900 mb-4 lg:mb-6 font-manrope lg:text-lg font-bold">Agent Intro Sample</h3>

              <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 lg:w-12 lg:h-12 bg-[#4A48FF] hover:bg-[#3A38EF] rounded-full flex items-center justify-center text-white flex-shrink-0 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 lg:w-5 lg:h-5" /> : <Play className="w-4 h-4 lg:w-5 lg:h-5 ml-0.5" />}
                </button>

                <div className="flex-1 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-2 lg:space-y-0">
                  <div className="w-full lg:w-auto bg-gray-300 rounded-full h-2 relative">
                    <div
                      className="bg-gray-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: '65%' }}
                    >
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-gray-200 rounded-full shadow-sm border border-gray-300"></div>
                    </div>
                  </div>
                  <div className="flex justify-end text-xs lg:text-sm text-gray-600">
                    <span className="font-manrope font-medium">1m 12s</span>
                  </div>
                </div>
              </div>
            </div>

            <SignupActionButtons
              onNext={handleNext}
              onBack={handleBack}
              nextText="Next"
              backText="Back"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
