import { Button } from "@/components/ui/button"

interface SignupButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: "default" | "outline"
  className?: string
  fullWidth?: boolean
}

export function SignupButton({ 
  children, 
  onClick, 
  variant = "default",
  className = "",
  fullWidth = true
}: SignupButtonProps) {
  const baseClasses = "h-12 lg:h-[56px] rounded-lg text-base font-manrope font-bold"
  const widthClasses = fullWidth ? "w-full" : "lg:w-[193px]"
  const variantClasses = variant === "default" 
    ? "bg-[#4A48FF] hover:bg-[#4A48FF] text-white" 
    : "bg-transparent border border-gray-300 text-gray-700 hover:bg-[#4A48FF]"

  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={`${baseClasses} ${widthClasses} ${variantClasses} ${className}`}
    >
      {children}
    </Button>
  )
} 