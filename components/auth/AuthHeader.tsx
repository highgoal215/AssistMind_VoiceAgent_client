interface AuthHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function AuthHeader({ title, subtitle, className = "" }: AuthHeaderProps) {
  return (
    <div className={`mb-8 text-center lg:text-left ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  )
} 