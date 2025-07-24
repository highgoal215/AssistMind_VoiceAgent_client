"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { X, Download } from 'lucide-react'
import Image from 'next/image'
interface ManageSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onChangePlan: () => void
  onUpdatePayment: () => void
  onCancelSubscription: () => void
  onDownloadInvoice: () => void
  subscriptionData?: {
    plan: string
    amount: string
    status: string
    nextBillingDate: string
    paymentMethod: string
  }
}

export default function ManageSubscriptionModal({
  isOpen,
  onClose,
  onChangePlan,
  onUpdatePayment,
  onCancelSubscription,
  onDownloadInvoice,
  subscriptionData = {
    plan: 'Business plan',
    amount: '$50',
    status: 'Active',
    nextBillingDate: 'July 16, 2026',
    paymentMethod: '**** 4562 VISA'
  }
}: ManageSubscriptionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-manrope text-gray-900">Manage your subscription</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Subscription Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold font-manrope text-gray-600">Plan</p>
            <p className="text-lg font-bold font-manrope text-gray-900">{subscriptionData.plan}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold font-manrope text-gray-600">Amount</p>
            <p className="text-lg font-bold font-manrope text-gray-900">{subscriptionData.amount}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold font-manrope text-gray-600">Status</p>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold font-manrope">
              {subscriptionData.status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold font-manrope text-gray-600">Next Billing date</p>
            <p className="text-lg font-bold font-manrope text-gray-900">{subscriptionData.nextBillingDate}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold font-manrope text-gray-600">Payment method</p>
            <p className="text-lg font-bold font-manrope text-gray-900">{subscriptionData.paymentMethod}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold font-manrope text-gray-600">Download invoice</p>
            <button
              onClick={onDownloadInvoice}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold font-manrope"
            >
              <Image
                                src="/images/setting/download.svg"
                                alt="download"
                                width={40}
                                height={40}
                                className="w-4 h-4"
                              />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onChangePlan}
            className="w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold font-manrope py-3 rounded-lg"
          >
            Change Plan
          </Button>
          <Button
            onClick={onUpdatePayment}
            className="w-full bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold font-manrope py-3 rounded-lg"
          >
            Update Payment method
          </Button>
          <Button
            onClick={onCancelSubscription}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold font-manrope py-3 rounded-lg"
          >
            Cancel subscription
          </Button>
        </div>
      </div>
    </div>
  )
} 