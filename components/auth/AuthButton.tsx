import { Button } from "@/components/ui/button"

interface AuthButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: "default" | "outline"
  className?: string
}

export function AuthButton({ 
  children, 
  onClick, 
  disabled = false, 
  variant = "default",
  className = "" 
}: AuthButtonProps) {
  const baseClasses = "w-full font-semibold py-3 h-12 lg:h-auto rounded-lg text-base font-manrope"
  const variantClasses = variant === "default" 
    ? "bg-[#4A48FF] hover:bg-blue-700 text-white" 
    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"

  return (
    <Button
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </Button>
  )
} 