import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignupFormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  required?: boolean
}

export function SignupFormField({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "",
  required = false 
}: SignupFormFieldProps) {
  return (
    <div className="flex flex-col">
      <Label htmlFor={id} className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg font-manrope font-bold ${className}`}
        required={required}
      />
    </div>
  )
} 