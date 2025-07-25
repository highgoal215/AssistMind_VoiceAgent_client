import React from 'react'

interface AIAgentHeaderProps {
  currentStep: number
}

export function AIAgentHeader({ currentStep }: AIAgentHeaderProps) {
  const getTitle = () => {
    switch (currentStep) {
      case 1:
        return "Let's Finalize Your Agent Setup!"
      case 2:
        return "Business Details & Availability"
      case 3:
        return "Final Review & Launch"
      default:
        return "AI Agent Setup"
    }
  }

  return (
    <div className="flex flex-col space-y-8">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
        {getTitle()}
      </h1>

      {/* Progress Steps */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <div className="flex flex-col justify-center items-center border border-gray-300 h-24 sm:h-28 lg:h-32 shadow-md rounded-2xl">
          {/* Desktop Version */}
          <div className='flex items-center justify-center w-full'>
            {/* Step 1 */}
            <div className="flex flex-col items-center relative">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex justify-center items-center ${currentStep >= 1 ? 'bg-[#E5ECFD]' : 'bg-gray-200'}`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${currentStep >= 1 ? 'bg-[#4A48FF]' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                  <span className={`text-xs sm:text-sm font-semibold ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
                    1
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-bold font-manrope text-gray-900 text-center absolute -bottom-6 sm:-bottom-8 lg:-bottom-6 whitespace-nowrap">
                Agent Profile
              </span>
            </div>

            {/* Connecting Line 1-2 */}
            <div className={`w-16 sm:w-32 lg:w-80 h-0.5 mx-1 self-center ${currentStep >= 2 ? 'bg-[#4A48FF]' : 'bg-gray-200'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex justify-center items-center ${currentStep >= 2 ? 'bg-[#E5ECFD]' : 'bg-[#F5F5F5]'}`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${currentStep >= 2 ? 'bg-[#4A48FF]' : 'bg-[#D9D9D9]'} rounded-full flex items-center justify-center`}>
                  <span className={`text-xs sm:text-sm font-semibold ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
                    2
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 text-center absolute -bottom-6 sm:-bottom-8 lg:-bottom-6 whitespace-nowrap">
                Business Details
              </span>
            </div>

            {/* Connecting Line 2-3 */}
            <div className={`w-16 sm:w-32 lg:w-80 h-0.5 mx-1 self-center ${currentStep >= 3 ? 'bg-[#4A48FF]' : 'bg-gray-200'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex justify-center items-center ${currentStep >= 3 ? 'bg-[#E5ECFD]' : 'bg-[#F5F5F5]'}`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ${currentStep >= 3 ? 'bg-[#4A48FF]' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                  <span className={`text-xs sm:text-sm font-semibold ${currentStep >= 3 ? 'text-white' : 'text-gray-500'}`}>
                    3
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 text-center absolute -bottom-6 sm:-bottom-8 lg:-bottom-6 whitespace-nowrap">
                Final Review & Launch
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 