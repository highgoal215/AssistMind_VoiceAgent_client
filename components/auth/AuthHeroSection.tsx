import Image from "next/image"

interface AuthHeroSectionProps {
  slogan?: string
  className?: string
}

export function AuthHeroSection({ 
  slogan = "Never Miss a Call. Never Lose a Lead. Powered by AI.",
  className = "" 
}: AuthHeroSectionProps) {
  return (
    <div className={`hidden lg:flex lg:w-1/2 h-full relative overflow-hidden ${className}`}>
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
            {slogan}
          </p>
        </div>
      </div>
    </div>
  )
} 