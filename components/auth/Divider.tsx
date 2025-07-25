interface DividerProps {
  text?: string
  className?: string
}

export function Divider({ text = "Or", className = "" }: DividerProps) {
  return (
    <div className={`relative my-6 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500 font-manrope">{text}</span>
      </div>
    </div>
  )
} 