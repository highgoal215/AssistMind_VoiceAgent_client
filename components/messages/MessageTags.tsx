import React from 'react'
import { Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface MessageTagsProps {
  tags: string[]
  className?: string
}

export default function MessageTags({ tags, className = '' }: MessageTagsProps) {
  const getTagStyle = (tag: string) => {
    const lowerTag = tag.toLowerCase()
    if (lowerTag.includes('priority')) {
      return 'bg-red-100 text-red-700'
    }
    if (lowerTag.includes('appointment')) {
      return 'bg-blue-100 text-blue-700'
    }
    if (lowerTag.includes('inquiry')) {
      return 'bg-green-100 text-green-700'
    }
    if (lowerTag.includes('missed')) {
      return 'bg-yellow-100 text-yellow-700'
    }
    return 'bg-gray-100 text-gray-700'
  }

  const getTagIcon = (tag: string) => {
    const lowerTag = tag.toLowerCase()
    if (lowerTag.includes('appointment')) {
      return <Calendar className="h-3 w-3 mr-1" />
    }
    return null
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag, index) => (
        <Badge 
          key={index} 
          className={`${getTagStyle(tag)} text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-bold`}
        >
          {getTagIcon(tag)}
          {tag}
        </Badge>
      ))}
    </div>
  )
} 