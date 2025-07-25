import React from 'react'
import { CampaignStep } from './types'

interface CampaignStepIndicatorProps {
  steps: CampaignStep[]
  currentStep: number
}

export default function CampaignStepIndicator({ steps, currentStep }: CampaignStepIndicatorProps) {
  return (
    <div className="flex justify-starter items-center mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            {/* Step Circle */}
            <div className="relative">
              <div className={`w-12 h-12 ${currentStep >= step.step ? 'bg-[#EDEDFF]' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
                <div className={`w-10 h-10 ${currentStep >= step.step ? 'bg-[#4A48FF] text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center text-sm font-bold`}>
                  {step.step}
                </div>
              </div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
} 