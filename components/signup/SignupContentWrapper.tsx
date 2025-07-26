import type { ReactNode } from "react"
import { SignupProgress } from "@/components/signup-progress"

interface SignupContentWrapperProps {
  children: ReactNode
  currentStep: number
  title: string
  subtitle: string
  className?: string
}

export function SignupContentWrapper({ 
  children, 
  currentStep, 
  title, 
  subtitle, 
  className = "" 
}: SignupContentWrapperProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Indicator */}
      <div className="mt-10 mb-16">
        <SignupProgress currentStep={currentStep} />
      </div>

      {/* Header */}
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600">
          {subtitle}
        </p>
      </div>

      {/* Content */}
      {children}
    </div>
  )
} 