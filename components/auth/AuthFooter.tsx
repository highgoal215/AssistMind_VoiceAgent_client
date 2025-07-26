interface AuthFooterProps {
  text: string
  linkText: string
  onLinkClick: () => void
  className?: string
}

export function AuthFooter({ text, linkText, onLinkClick, className = "" }: AuthFooterProps) {
  return (
    <div className={`text-center ${className}`}>
      <span className="text-gray-600">{text} </span>
      <button
        onClick={onLinkClick}
        className="text-[#4A48FF] hover:text-[#4A48FF] font-medium transition-colors"
      >
        {linkText}
      </button>
    </div>
  )
} 