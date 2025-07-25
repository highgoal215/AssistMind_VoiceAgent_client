import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  required?: boolean
}

export function FormField({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "",
  required = false 
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={id} className="text-md font-bold font-manrope text-gray-700 mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 lg:h-auto border border-gray-300 rounded-lg font-manrope ${className}`}
        required={required}
      />
    </div>
  )
} 