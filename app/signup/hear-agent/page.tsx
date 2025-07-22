"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SignupProgress } from "@/components/signup-progress"
import { GradientBackground } from "@/components/gradient-background"
import { Play, Pause } from "lucide-react"
import Image from "next/image"

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
    <div className="min-h-screen bg-white flex items-center justify-center">
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
          <div className="px-6 lg:px-0 lg:pt-[70px] pt-[50px] pb-6 lg:pb-0 h-full overflow-y-auto lg:flex-1 lg:flex lg:flex-col lg:pl-[52px]">
            <SignupProgress currentStep={2} />

            <div className="flex-1 flex flex-col justify-center lg:justify-start items-center lg:items-start space-y-6 lg:space-y-0 lg:pt-[40px]">
              {/* Header Section */}
              <div className="text-center lg:text-start lg:mb-8 mb-0 lg:mt-0 md:mt-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope">Hear Your AI Agent</h2>
                <p className="text-gray-600 font-manrope lg:text-lg">
                  Listen to how your AI agent sounds. You can customize voice and tone anytime
                </p>
              </div>

              {/* Audio Player Section */}
              <div className="bg-white rounded-lg p-6 lg:p-4 mb-8 lg:mb-0 shadow-sm border border-gray-100 w-full lg:max-w-none lg:w-full">
                <h3 className="font-medium lg:font-bold text-gray-900 mb-4 lg:mb-6 font-manrope lg:text-lg">Agent Intro Sample</h3>

                <div className="flex items-center space-x-4 lg:space-x-6 p-2 lg:p-2 bg-white rounded-lg lg:rounded-lg shadow-sm border border-gray-100">
                  <button
                    onClick={togglePlay}
                    className="w-12 lg:w-10 h-12 lg:h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  >
                    {isPlaying ? <Pause className="w-5 lg:w-6 h-5 lg:h-6" /> : <Play className="w-5 lg:w-6 h-5 lg:h-6 ml-1" />}
                  </button>

                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3 relative">
                      <div className="bg-gray-300 h-2 lg:h-3 rounded-full w-1/3 relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 lg:w-4 h-3 lg:h-4 bg-white rounded-full shadow-sm border border-gray-200"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1 lg:mt-2">
                      <span className="font-manrope">0:00</span>
                      <span className="font-manrope">1m 12s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 w-full  lg:max-w-none lg:justify-between lg:pt-[40px]">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 lg:w-[193px] h-12 lg:h-[56px] bg-white border-gray-300 text-gray-900 font-manrope rounded-lg lg:rounded-none hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 lg:w-[193px] h-12 lg:h-[56px] bg-indigo-600 hover:bg-indigo-700 text-white font-manrope rounded-lg lg:rounded-none"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  )
}
