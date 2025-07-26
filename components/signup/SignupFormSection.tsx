import type { ReactNode } from "react"

interface SignupFormSectionProps {
  children: ReactNode
  className?: string
}

export function SignupFormSection({ children, className = "" }: SignupFormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  )
} 