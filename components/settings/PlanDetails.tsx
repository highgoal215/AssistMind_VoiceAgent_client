"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

export interface PlanDetailsProps {
  onManageSubscription: () => void
}

export default function PlanDetails({ onManageSubscription }: PlanDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-6">Plan Details</h2>
      <div className="flex justify-between space-x-14">
        <div className='flex-1 flex-col space-y-6'>
          {/* Current Plan Row */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-lg font-semibold font-manrope text-gray-900">Current Plan:</span>
            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-md font-semibold font-manrope">
              Pro Plan
            </span>
          </div>

          {/* Payment Method Row */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-lg font-semibold font-manrope text-gray-900">Payment Method:</span>
            <span className="text-lg font-semibold font-manrope text-gray-900">**** 4562 VISA</span>
          </div>

          {/* Next Invoice Amount Row */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-lg font-semibold font-manrope text-gray-900">Next Invoice Amount:</span>
            <span className="text-lg font-semibold font-manrope text-gray-900">$462.50</span>
          </div>
        </div>

        <div className='flex-1 flex-col space-y-6'>
          {/* Next Invoice Date Row */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-lg font-semibold font-manrope text-gray-900">Next Invoice Date:</span>
            <span className="text-lg font-semibold font-manrope text-gray-900">Jul 16, 2025</span>
          </div>

          {/* Status Row */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-lg font-semibold font-manrope text-gray-900">Status:</span>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold font-manrope">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Manage Subscription Button */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={onManageSubscription}
          className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-6 py-3 rounded-lg font-bold text-lg h-14 font-manrope"
        >
          Manage Subscription
        </Button>
      </div>
    </div>
  )
} 