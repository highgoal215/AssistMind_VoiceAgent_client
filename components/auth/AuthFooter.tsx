interface AuthFooterProps {
  text: string
  linkText: string
  onLinkClick: () => void
  className?: string
}

export function AuthFooter({ text, linkText, onLinkClick, className = "" }: AuthFooterProps) {
  return (
    <div className={`text-center font-medium font-manrope ${className}`}>
      <span className="text-gray-600 font-manrope">{text} </span>
      <button onClick={onLinkClick} className="text-red-600 hover:text-red-400 font-manrope">
        {linkText}
      </button>
    </div>
  )
} 