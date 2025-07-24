import { cn } from "@/lib/utils"

interface SignupProgressProps {
  currentStep: number
  totalSteps?: number
}

export function SignupProgress({ currentStep, totalSteps = 4 }: SignupProgressProps) {
  return (
    <div className="flex justify-center px-2 md:mb-0 mb-10">
      <div className="relative flex items-center w-full">
        {/* Main horizontal line */}
        <div className="w-full h-[2px] bg-gray-300 rounded-full" />

        {/* Progress circles positioned above the line */}
        <div className="absolute flex justify-between w-full">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-md font-bold font-manrope relative",
                  step <= currentStep
                    ? "bg-[#4A48FF] text-white"
                    : "bg-[#D9D9D9] text-gray-600"
                )}>
                {step <= currentStep && (
                  <div className="absolute inset-0 bg-[#7f7df7] rounded-full scale-150 opacity-60" />
                )}
                {step > currentStep && (
                  <div className="absolute inset-0 bg-[#F5F5F5] rounded-full scale-125 opacity-80" />
                )}
                <span className="relative z-10">{step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
