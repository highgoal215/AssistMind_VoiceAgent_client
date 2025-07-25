import React from 'react'
import { Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCardProps } from './types'
import ContactCard from './ContactCard'

export default function MessageCard({ 
  message, 
  onView, 
  className = '' 
}: MessageCardProps) {
  return (
    <div className={`mx-auto ${className}`}>
      <Card className="rounded-lg shadow-sm">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row w-full items-start space-y-4 lg:space-y-0">
            {/* Left Section - Contact Information */}
            <ContactCard 
              contact={message.contact}
              tags={message.tags}
            />

            {/* Vertical Separator Line - Hidden on mobile */}
            <div className="hidden lg:block w-px h-24 bg-gray-200 mx-4 lg:mx-8"></div>

            {/* Right Section - Message Details and Actions */}
            <div className="flex w-full lg:flex-1 flex-col space-y-3 lg:space-y-4 lg:pl-8">
              {/* Message Preview and View Button */}
              <div className="flex w-full justify-between items-start space-x-3">
                {/* Message Preview */}
                <p className="text-xs sm:text-sm text-gray-600 flex-1 min-w-0 font-bold">
                  {message.preview}
                </p>

                {/* View Button */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 border-gray-300 hover:bg-gray-50 flex-shrink-0"
                  onClick={() => onView(message.id)}
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 