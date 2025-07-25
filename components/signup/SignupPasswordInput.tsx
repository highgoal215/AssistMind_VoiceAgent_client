import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface SignupPasswordInputProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SignupPasswordInput({ 
  id, 
  label, 
  placeholder = "••••••••••••", 
  value, 
  onChange, 
  className = "" 
}: SignupPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col">
      <Label htmlFor={id} className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg pr-10 font-manrope font-bold ${className}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
} 