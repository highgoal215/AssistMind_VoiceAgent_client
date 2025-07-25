interface SignupHeaderProps {
  title: string
  subtitle: string
}

export function SignupHeader({ title, subtitle }: SignupHeaderProps) {
  return (
    <div className="flex flex-col justify-center items-center pt-[20px] lg:pt-12 lg:items-start">
      <div className="flex flex-col gap-1 lg:gap-1">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope text-center lg:text-left">
          {title}
        </h2>
        <p className="text-gray-600 mb-8 lg:mb-8 font-manrope lg:text-[18px] text-center lg:text-left font-semibold">
          {subtitle}
        </p>
      </div>
    </div>
  )
} 