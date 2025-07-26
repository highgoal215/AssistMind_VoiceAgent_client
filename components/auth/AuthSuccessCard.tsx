import { Check } from "lucide-react"
import { AuthButton } from "./AuthButton"

interface AuthSuccessCardProps {
  title: string
  description: string
  buttonText: string
  onButtonClick: () => void
  className?: string
}

export function AuthSuccessCard({ 
  title, 
  description, 
  buttonText, 
  onButtonClick, 
  className = "" 
}: AuthSuccessCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full ${className}`}>
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-green-500 rounded-full"></div>
              <div className="absolute inset-2 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              {/* Star-like points around the circle */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
              <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
              <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 rotate-45"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rotate-45"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-500 rotate-45"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rotate-45"></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h1>

          <p className="text-gray-600">
            {description}
          </p>
        </div>

        <AuthButton onClick={onButtonClick}>
          {buttonText}
        </AuthButton>
      </div>
    </div>
  )
} 