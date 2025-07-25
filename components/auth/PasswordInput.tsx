import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function PasswordInput({ 
  id, 
  label, 
  placeholder = "••••••••••••", 
  value, 
  onChange, 
  className = "" 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={id} className="text-md font-bold font-manrope text-gray-700 mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-12 lg:h-auto border border-gray-300 rounded-lg pr-12 font-manrope ${className}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5 lg:w-4 lg:h-4" /> : <Eye className="w-5 h-5 lg:w-4 lg:h-4" />}
        </button>
      </div>
    </div>
  )
} 