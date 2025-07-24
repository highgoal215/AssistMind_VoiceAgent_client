"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { X, Users } from 'lucide-react'

interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  planName?: string
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  onConfirm,
  planName = 'Business plan'
}: CancelSubscriptionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-manrope text-gray-900">Cancel subscription</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-center mb-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          
          {/* Confirmation Message */}
          <p className="text-gray-700 font-manrope mb-2 font-bold">
            You’ll lose access to [premium features] at the end of your billing period.
          </p>
          <p className="text-gray-700 font-manrope font-bold">
            Are you sure you want to cancel your {planName}?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            className="flex-1  bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold font-manrope py-2 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold font-manrope py-2 rounded-lg"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
} 