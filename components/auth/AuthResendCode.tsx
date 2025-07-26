interface AuthResendCodeProps {
  onResend: () => void
  className?: string
}

export function AuthResendCode({ onResend, className = "" }: AuthResendCodeProps) {
  return (
    <div className={`text-center ${className}`}>
      <span className="text-gray-600">Didn't receive your code? </span>
      <button 
        onClick={onResend} 
        className="text-red-600 hover:text-red-700 font-medium transition-colors"
      >
        Resend code
      </button>
    </div>
  )
} 