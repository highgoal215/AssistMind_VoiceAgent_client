import type { ReactNode } from "react"
import Image from "next/image"

interface GradientBackgroundProps {
  children: ReactNode
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <div className="min-h-screen flex p-[21px] ">
      {/* Left side - Video background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-2xl ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
        <div
          className="relative z-10 flex flex-col  items-start text-white"
        >
          <div className="flex items-center mb-12 pt-[52.24px] pl-[37.93px]" >
            <Image 
              src="/images/logo.png" 
              alt="logo" 
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
          <div className="flex pl-[68px] pt-48">
            <h1 className="text-5xl font-bold leading-tight mb-6 ">
              Never Miss a Call. Never Lose a Lead. Powered <br/>
             by AI.
          </h1>
          </div>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 flex flex-col" >
        {children}
      </div>
    </div>
  )
}
