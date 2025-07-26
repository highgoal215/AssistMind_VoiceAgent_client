import React from "react"
import { AuthHeroSection } from "./AuthHeroSection"
import { AuthFormSection } from "./AuthFormSection"

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AuthLayout({ children, className = "" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-[1400px] h-[880px] bg-white rounded-2xl shadow-2xl overflow-hidden ${className}`}>
        <div className="flex h-full">
          <AuthHeroSection />
          <AuthFormSection>
            {children}
          </AuthFormSection>
        </div>
      </div>
    </div>
  )
} 