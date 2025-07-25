import { ReactNode } from "react"
import { GradientBackground } from "@/components/gradient-background"
import Image from "next/image"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white lg:bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-[1440px] max-h-[983px] overflow-hidden">
        <GradientBackground>
          <div className="flex-1 flex flex-col px-6 lg:pl-[52px] pt-12 lg:pt-[40px] h-full overflow-y-auto">
            {/* Logo - Mobile Only */}
            <div className="flex items-center justify-center mb-8 lg:hidden">
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

            {/* Modal-style container for desktop */}
            <div className="lg:flex lg:items-center lg:justify-center lg:h-full lg:pr-[52px]">
              <div className="lg:bg-white lg:rounded-2xl lg:shadow-2xl lg:p-8 lg:w-full lg:max-w-md lg:border lg:border-gray-100 lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                {children}
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  )
} 