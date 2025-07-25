import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ContactCardProps } from './types'
import MessageTags from './MessageTags'

export default function ContactCard({ 
  contact, 
  tags = [], 
  actions, 
  className = '' 
}: ContactCardProps) {
  return (
    <div className={`flex w-full lg:w-1/3 items-start space-x-4 ${className}`}>
      {/* Avatar */}
      <Avatar className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-pink-500 flex-shrink-0">
        {contact.avatar && <AvatarImage src={contact.avatar} alt={contact.name} />}
        <AvatarFallback className="text-white font-semibold text-sm sm:text-base lg:text-lg">
          {contact.initials}
        </AvatarFallback>
      </Avatar>

      {/* Contact Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 font-manrope">
          {contact.name}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2 font-bold font-manrope">
          {contact.phone}
        </p>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
            contact.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
          <span className="text-xs sm:text-sm text-gray-500 font-bold font-manrope">
            {contact.isOnline ? 'Online' : `Last active: ${contact.lastActive}`}
          </span>
        </div>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-2">
            <MessageTags tags={tags} />
          </div>
        )}
        
        {/* Actions */}
        {actions && (
          <div className="mt-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
} 