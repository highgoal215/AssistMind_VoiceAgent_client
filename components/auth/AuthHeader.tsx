interface AuthHeaderProps {
  title: string
  subtitle: string
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center lg:text-left mb-8">
      <h1 className="text-3xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 font-manrope">
        {title}
      </h1>
      <p className="text-gray-600 text-2xl lg:text-base xl:text-lg pt-[12px] font-semibold font-manrope">
        {subtitle}
      </p>
    </div>
  )
} 