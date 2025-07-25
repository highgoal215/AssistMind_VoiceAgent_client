"use client"

import React, { useState, useEffect } from 'react'
import PlanDetails from './PlanDetails'
import BillingInformation from './BillingInformation'
import PricingPlans from './PricingPlans'
import { settingsService } from '@/lib/services/settingsService'
import { showToast } from '@/lib/utils/toast'

export interface SubscriptionsSectionProps {
  onManageSubscription: () => void
  onCancelSubscription: () => void
  onChangePlan: () => void
}

export default function SubscriptionsSection({
  onManageSubscription,
  onCancelSubscription,
  onChangePlan
}: SubscriptionsSectionProps) {
  const [subscriptionData, setSubscriptionData] = useState({
    plan: 'Business plan',
    amount: '$50',
    status: 'Active',
    nextBillingDate: 'July 16, 2026',
    paymentMethod: '**** 4562 VISA',
    currentPlan: 'Pro Plan',
    nextInvoiceAmount: '$462.50',
    nextInvoiceDate: 'Jul 16, 2025'
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadSubscriptionData = async () => {
      try {
        const data = await settingsService.getSubscriptionData()
        setSubscriptionData(data)
      } catch (error) {
        showToast.error('Failed to load subscription data')
      }
    }
    
    loadSubscriptionData()
  }, [])

  const handleUpdateInformation = async () => {
    setIsLoading(true)
    try {
      const result = await settingsService.updateBillingInformation({
        name: 'Alex B.',
        email: 'alexb.@gmail.com',
        amount: '$50 per month',
        paymentMethod: '**** 4562 VISA'
      })
      
      if (result.success) {
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to update billing information')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Plan Details Section */}
      <PlanDetails onManageSubscription={onManageSubscription} />

      {/* Current Subscription Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 gap-10">
        <h2 className="text-3xl font-bold font-manrope text-gray-900">Current Subscription</h2>
        <p className="text-md font-bold font-manrope text-gray-900">Your current Plan</p>
        
        {/* Billing Information Section */}
        <BillingInformation
          onUpdateInformation={handleUpdateInformation}
          onCancelSubscription={onCancelSubscription}
          onChangePlan={onChangePlan}
        />

        {/* Pricing Plans Section */}
        <PricingPlans onChangePlan={onChangePlan} />
      </div>
    </>
  )
} 