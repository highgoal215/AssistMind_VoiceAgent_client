import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface RememberMeCheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  forgotPasswordText?: string
  onForgotPassword?: () => void
  className?: string
}

export function RememberMeCheckbox({ 
  checked, 
  onCheckedChange, 
  forgotPasswordText = "Forget Password",
  onForgotPassword,
  className = "" 
}: RememberMeCheckboxProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
          className="data-[state=checked]:bg-[#4A48FF] data-[state=checked]:border-[#4A48FF]"
        />
        <Label htmlFor="remember" className="text-sm font-medium text-gray-700 font-manrope">
          Remember me
        </Label>
      </div>
      {onForgotPassword && (
        <button
          onClick={onForgotPassword}
          className="text-sm font-bold text-[#4A48FF] hover:text-blue-700 font-manrope"
        >
          {forgotPasswordText}
        </button>
      )}
    </div>
  )
} 