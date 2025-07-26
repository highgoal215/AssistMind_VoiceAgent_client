import { SignupButton } from "./SignupButton"

interface SignupActionButtonsProps {
  onNext: () => void
  onBack: () => void
  nextText?: string
  backText?: string
  nextDisabled?: boolean
  showBack?: boolean
  className?: string
}

export function SignupActionButtons({ 
  onNext, 
  onBack, 
  nextText = "Next", 
  backText = "Back",
  nextDisabled = false,
  showBack = true,
  className = "" 
}: SignupActionButtonsProps) {
  return (
    <div className={`space-y-1 lg:space-y-0  ${className}`}>
      {/* Mobile: Stacked buttons */}
      <div className="lg:hidden space-y-1">
        <SignupButton onClick={onNext} disabled={nextDisabled}>
          {nextText}
        </SignupButton>
        {showBack && (
          <SignupButton onClick={onBack} variant="outline">
            {backText}
          </SignupButton>
        )}
      </div>

      {/* Desktop: Side by side buttons */}
      <div className="hidden lg:flex justify-between items-center w-full  ">
        {showBack && (
          <SignupButton onClick={onBack} variant="outline" fullWidth={false}>
            {backText}
          </SignupButton>
        )}
        <SignupButton onClick={onNext} disabled={nextDisabled} fullWidth={false}>
          {nextText}
        </SignupButton>
      </div>
    </div>
  )
} 