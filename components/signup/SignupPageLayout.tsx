import type { ReactNode } from "react"
import Image from "next/image"

interface SignupPageLayoutProps {
  children: ReactNode
  className?: string
}

export function SignupPageLayout({ children, className = "" }: SignupPageLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-[1400px] h-[880px] bg-white rounded-2xl shadow-2xl overflow-y-auto ${className}`}>
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
                  alt="AssistMind AI Logo"
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

          {/* Right Column - Content */}
          <div className="w-full h-full lg:w-1/2 p-8 lg:p-12">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mt-16 mb-8 lg:hidden">
              <div className="flex items-center">
                <Image
                  src="/images/logo2.svg"
                  alt="AssistMind Logo"
                  width={100}
                  height={100}
                  className="w-auto h-12"
                />
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 