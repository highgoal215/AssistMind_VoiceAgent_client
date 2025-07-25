"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { settingsService } from '@/lib/services/settingsService'
import { showToast } from '@/lib/utils/toast'

export interface PricingPlansProps {
  onChangePlan: () => void
}

const plans = [
  {
    id: 'basic',
    name: 'Basic plan',
    price: '$10',
    description: 'Our most popular plan.',
    features: [
      'Access to basic features',
      'Basic reporting and analytics',
      'Up to 10 individual users',
      '20 GB individual data',
      'Basic chat and email support'
    ],
    popular: true,
    current: false,
    buttonText: 'Get started',
    buttonAction: async () => {
      try {
        const result = await settingsService.changePlan('basic')
        if (result.success) {
          showToast.success(result.message)
        } else {
          showToast.error(result.message)
        }
      } catch (error) {
        showToast.error('Failed to change plan')
      }
    }
  },
  {
    id: 'business',
    name: 'Business plan',
    price: '$50',
    description: 'Growing teams up to 20 users.',
    features: [
      '200+ integrations',
      'Advanced reporting and analytics',
      'Up to 20 individual users',
      '40 GB individual data',
      'Priority chat and email support'
    ],
    popular: false,
    current: true,
    buttonText: 'Change Plan',
    buttonAction: async (onChangePlan: () => void) => {
      try {
        const result = await settingsService.changePlan('business')
        if (result.success) {
          showToast.success(result.message)
          onChangePlan()
        } else {
          showToast.error(result.message)
        }
      } catch (error) {
        showToast.error('Failed to change plan')
      }
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise plan',
    price: '$99',
    description: 'Advanced features + unlimited users.',
    features: [
      'Advanced custom fields',
      'Audit log and data history',
      'Unlimited individual users',
      'Unlimited individual data',
      'Personalized + priority service'
    ],
    popular: false,
    current: false,
    buttonText: 'Get started',
    buttonAction: async () => {
      try {
        const result = await settingsService.changePlan('enterprise')
        if (result.success) {
          showToast.success(result.message)
        } else {
          showToast.error(result.message)
        }
      } catch (error) {
        showToast.error('Failed to change plan')
      }
    }
  }
]

export default function PricingPlans({ onChangePlan }: PricingPlansProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg shadow-sm p-6 border border-gray-200 ${
              plan.current ? 'bg-[#4A48FF] text-white' : 'bg-white'
            }`}
          >
            <div className="relative">
              {plan.popular && (
                <span className={`absolute top-0 right-0 px-2 py-1 rounded text-xs font-semibold font-manrope ${
                  plan.current 
                    ? 'bg-white text-[#4A48FF]' 
                    : 'bg-purple-100 text-[#4A48FF]'
                }`}>
                  Popular
                </span>
              )}
              {plan.current && (
                <span className="absolute top-0 right-0 bg-white text-[#4A48FF] px-2 py-1 rounded text-xs font-semibold font-manrope">
                  Current Plan
                </span>
              )}
            </div>
            
            <h3 className={`text-xl font-bold font-manrope mb-2 ${
              plan.current ? 'text-white' : 'text-gray-900'
            }`}>
              {plan.name}
            </h3>
            
            <div className="mb-4">
              <span className={`text-3xl font-bold font-manrope ${
                plan.current ? 'text-white' : 'text-gray-900'
              }`}>
                {plan.price}
              </span>
              <span className={`text-sm font-semibold font-manrope ${
                plan.current ? 'text-purple-200' : 'text-gray-600'
              }`}>
                {' '}per month
              </span>
            </div>
            
            <p className={`text-sm font-semibold font-manrope mb-4 ${
              plan.current ? 'text-purple-200' : 'text-gray-600'
            }`}>
              {plan.description}
            </p>
            
            <Button
              onClick={() => plan.buttonAction(onChangePlan)}
              className={`w-full py-2 rounded-md font-semibold font-manrope mb-4 ${
                plan.current
                  ? 'bg-white text-[#4A48FF] hover:bg-gray-100 border border-[#4A48FF]'
                  : 'bg-[#4A48FF] hover:bg-[#4A48FF] text-white'
              }`}
            >
              {plan.buttonText}
            </Button>
            
            <div className="mb-4">
              <h4 className={`text-sm font-bold font-manrope mb-2 ${
                plan.current ? 'text-white' : 'text-gray-900'
              }`}>
                FEATURES
              </h4>
              <p className={`text-sm font-semibold font-manrope mb-3 ${
                plan.current ? 'text-purple-200' : 'text-gray-600'
              }`}>
                {plan.id === 'basic' && 'Everything in our free plan plus....'}
                {plan.id === 'business' && 'Everything in Basic plus....'}
                {plan.id === 'enterprise' && 'Everything in Business plus....'}
              </p>
            </div>
            
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    plan.current ? 'bg-white' : 'bg-[#4A48FF]'
                  }`}>
                    <Check className={`w-3 h-3 ${
                      plan.current ? 'text-[#4A48FF]' : 'text-white'
                    }`} />
                  </div>
                  <span className={`text-sm font-semibold font-manrope ${
                    plan.current ? 'text-purple-200' : 'text-gray-700'
                  }`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
} 