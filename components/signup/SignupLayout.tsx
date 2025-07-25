import { ReactNode } from "react"
import { GradientBackground } from "@/components/gradient-background"
import { SignupProgress } from "@/components/signup-progress"
import Image from "next/image"

interface SignupLayoutProps {
  children: ReactNode
  currentStep: number
}

export function SignupLayout({ children, currentStep }: SignupLayoutProps) {
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
          <div className="px-6 lg:px-0 lg:pt-[20px] pt-[50px] pb-6 lg:pb-0 h-full overflow-y-auto lg:flex-1 lg:flex lg:flex-col lg:pl-[52px]">
            {/* Modal-style container for desktop */}
            <div className="lg:flex lg:items-center lg:justify-center lg:h-full lg:pr-[52px] lg:pt-0">
              <div className="lg:bg-white lg:rounded-2xl lg:shadow-2xl lg:p-8 lg:w-full lg:max-w-lg lg:border lg:border-gray-100 lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] lg:my-auto">
                <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:pt-10">
                  {/* Progress indicator moved below header */}
                  <div className="lg:mb-6">
                    <SignupProgress currentStep={currentStep} />
                  </div>

                  {children}
                </div>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  )
} 