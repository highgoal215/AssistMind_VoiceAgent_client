import React from 'react'
import { Button } from '@/components/ui/button'

interface AIAgentNavigationProps {
  currentStep: number
  onNext: () => void
  onBack: () => void
  onLaunch?: () => void
  onTest?: () => void
  isLoading?: boolean
}

export function AIAgentNavigation({ 
  currentStep, 
  onNext, 
  onBack, 
  onLaunch,
  onTest,
  isLoading = false
}: AIAgentNavigationProps) {
  if (currentStep === 3) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          {onTest && (
            <Button 
              variant="outline" 
              className="w-full sm:w-auto bg-gray-100 text-gray-700 hover:bg-gray-200 font-manrope font-bold"
              onClick={onTest}
            >
              Test my Agent
            </Button>
          )}
          {onLaunch && (
            <Button 
              onClick={onLaunch}
              disabled={isLoading}
              className="w-full sm:w-auto bg-[#4A48FF] hover:bg-[#4A48FF] text-white font-manrope font-bold"
            >
              {isLoading ? 'Launching...' : 'Launch my Agent'}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-end mt-8">
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
          >
            Back
          </Button>
        )}

        <Button
          onClick={onNext}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#4A48FF] hover:bg-[#3a38ef] text-white"
        >
          Next
        </Button>
      </div>
    </div>
  )
} 