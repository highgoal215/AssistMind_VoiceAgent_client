import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StatusTooltipProps {
  isVisible: boolean
  onClose: () => void
}

export default function StatusTooltip({ isVisible, onClose }: StatusTooltipProps) {
  if (!isVisible) return null

  return (
    <div className="absolute top-0 right-0 z-10 bg-white rounded-lg shadow-lg p-3 sm:p-4 w-full sm:w-80 border border-gray-200">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Call Status</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2 text-xs sm:text-sm">
        <div>
          <span className="text-blue-600 font-medium">Completed:</span>
          <span className="text-gray-600 ml-1">Call reached the recipient and was successfully delivered</span>
        </div>
        <div>
          <span className="text-red-600 font-medium">Missed:</span>
          <span className="text-gray-600 ml-1">Call rang but wasn't answered</span>
        </div>
        <div>
          <span className="text-blue-600 font-medium">Failed:</span>
          <span className="text-gray-600 ml-1">Call was not initiated due to error (e.g. number invalid, integration failure)</span>
        </div>
      </div>
    </div>
  )
} 