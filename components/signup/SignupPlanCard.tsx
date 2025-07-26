import { Button } from "@/components/ui/button"

interface PlanFeature {
  text: string
}

interface SignupPlanCardProps {
  id: string
  name: string
  price: number
  features: PlanFeature[]
  isPopular?: boolean
  isMostPopular?: boolean
  onSelect: (planId: string) => void
  className?: string
}

export function SignupPlanCard({
  id,
  name,
  price,
  features,
  isPopular = false,
  isMostPopular = false,
  onSelect,
  className = ""
}: SignupPlanCardProps) {
  const isSelected = isMostPopular
  const baseClasses = "relative rounded-2xl p-6 lg:px-6 lg:py-2"
  const selectedClasses = "bg-gradient-to-r from-[#4A48FF] to-[#4A48FF] text-white"
  const defaultClasses = "bg-white border border-gray-200"
  
  const cardClasses = `${baseClasses} ${isSelected ? selectedClasses : defaultClasses} ${className}`

  return (
    <div className={cardClasses}>
      {/* Popular Badge */}
      {(isPopular || isMostPopular) && (
        <div className="absolute top-6 right-6">
          <span className={`text-md px-3 py-1 rounded-full font-manrope font-semibold ${
            isMostPopular 
              ? "bg-white text-[#4A48FF]" 
              : "bg-[#a3a3cf] text-[#4A48FF]"
          }`}>
            {isMostPopular ? "Most popular" : "Popular"}
          </span>
        </div>
      )}

      <div className="mb-2">
        <h3 className={`text-lg font-bold mb-4 font-manrope ${
          isSelected ? "text-white" : "text-gray-900"
        }`}>
          {name}
        </h3>
        
        <div className="flex items-baseline mb-6">
          <span className={`text-4xl font-bold font-manrope ${
            isSelected ? "text-white" : "text-gray-900"
          }`}>
            ${price}
          </span>
          <span className={`ml-2 font-manrope ${
            isSelected ? "text-blue-100" : "text-gray-500"
          }`}>
            per month
          </span>
        </div>

        <Button
          onClick={() => onSelect(id)}
          className={`w-full py-3 h-12 rounded-xl font-manrope font-bold ${
            isSelected
              ? "bg-white text-[#4A48FF] hover:bg-gray-50"
              : "bg-[#4A48FF] hover:bg-[#4A48FF] text-white"
          }`}
        >
          Get started
        </Button>
      </div>
    </div>
  )
} 