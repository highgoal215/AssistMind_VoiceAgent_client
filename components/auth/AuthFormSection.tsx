import React from "react"
import Image from "next/image"

interface AuthFormSectionProps {
  children: React.ReactNode
  className?: string
}

export function AuthFormSection({ children, className = "" }: AuthFormSectionProps) {
  return (
    <div className={`w-full h-full lg:w-1/2 p-8 lg:p-12 ${className}`}>
      {/* Mobile Logo */}
      <div className="flex items-center justify-center mt-10 mb-16 lg:hidden">
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

      {/* Form Content */}
      <div className="h-full flex flex-col">
        {children}
      </div>
    </div>
  )
} 