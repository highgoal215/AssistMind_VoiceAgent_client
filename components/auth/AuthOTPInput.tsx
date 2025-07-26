import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

interface AuthOTPInputProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  className?: string
}

export function AuthOTPInput({ 
  value, 
  onChange, 
  maxLength = 6, 
  className = "" 
}: AuthOTPInputProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <InputOTP maxLength={maxLength} value={value} onChange={onChange}>
        <InputOTPGroup className="flex gap-2">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot 
              key={index}
              index={index} 
              className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg" 
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
} 