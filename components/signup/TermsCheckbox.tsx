import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface TermsCheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function TermsCheckbox({ checked, onCheckedChange, className = "" }: TermsCheckboxProps) {
  return (
    <div className={`flex items-center space-x-2 font-semibold font-manrope ${className}`}>
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
        className="data-[state=checked]:bg-[#4A48FF] data-[state=checked]:border-[#4A48FF]"
      />
      <Label htmlFor="terms" className="text-sm text-gray-700 font-manrope">
        By signuping Up, I agree to the{" "}
        <a href="#" className="text-[#4A48FF] hover:text-[#4A48FF] font-manrope">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-[#4A48FF] hover:text-[#4A48FF] font-manrope">
          Privacy Policy
        </a>
      </Label>
    </div>
  )
} 