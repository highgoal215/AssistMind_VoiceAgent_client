"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

export interface BillingInformationProps {
  onUpdateInformation: () => void
  onCancelSubscription: () => void
  onChangePlan: () => void
}

export default function BillingInformation({ 
  onUpdateInformation, 
  onCancelSubscription, 
  onChangePlan 
}: BillingInformationProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-manrope text-gray-900">Billing Information</h2>
        <button
          onClick={onUpdateInformation}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 font-semibold font-manrope"
        >
          <span>Update Information</span>
          <Edit className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Name and Email Row */}
        <div className="flex gap-4">
          <div>
            <p className="text-sm font-semibold font-manrope text-gray-900 mb-2">Name</p>
            <p className="text-lg font-bold font-manrope text-gray-900">Alex B.</p>
          </div>
          <div>
            <p className="text-sm font-semibold font-manrope text-gray-900 mb-2">Email</p>
            <p className="text-lg font-bold font-manrope text-gray-900">alexb.@gmail.com</p>
          </div>
        </div>

        {/* Amount Row */}
        <div>
          <p className="text-sm font-semibold font-manrope text-gray-900 mb-2">Amount</p>
          <p className="text-2xl font-bold font-manrope text-gray-900">$50 per month</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          onClick={onCancelSubscription}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold font-manrope"
        >
          Cancel Subscription
        </Button>
        <Button
          onClick={onChangePlan}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg font-semibold font-manrope"
        >
          Change Plan
        </Button>
      </div>
    </div>
  )
} 