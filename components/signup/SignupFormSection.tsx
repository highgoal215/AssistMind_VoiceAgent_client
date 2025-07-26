import type { ReactNode } from "react"

interface SignupFormSectionProps {
  children: ReactNode
  className?: string
}

export function SignupFormSection({ children, className = "" }: SignupFormSectionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  )
} 