import React from 'react'
import { Calendar } from 'lucide-react'

interface IconRendererProps {
  icon: string | React.ReactNode
  className?: string
}

export const IconRenderer: React.FC<IconRendererProps> = ({ icon, className = "w-5 h-5 text-blue-500" }) => {
  if (typeof icon === 'string') {
    switch (icon) {
      case 'calendar':
        return <Calendar className={className} />
      case 'rest-api-icon':
        return (
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
                fill="white"
              />
            </svg>
          </div>
        )
      case 'sdk-libraries-icon':
        return (
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
                fill="white"
              />
            </svg>
          </div>
        )
      default:
        return <Calendar className={className} />
    }
  }
  
  return <>{icon}</>
} 