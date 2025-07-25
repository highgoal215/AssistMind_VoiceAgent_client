"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

export interface SettingsNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationTabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'developer', label: 'Developer' },
  { id: 'notifications', label: 'Notifications' },
]

export default function SettingsNavigation({ activeTab, onTabChange }: SettingsNavigationProps) {
  return (
    <div className="flex flex-col justify-between bg-white w-3/4 h-14 rounded-lg p-1 shadow-md mb-6 border border-gray-300">
      <div className="flex space-x-1">
        {navigationTabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 rounded-lg px-4 py-2 text-xl font-bold font-manrope transition-colors ${
              activeTab === tab.id
                ? "bg-[#EDEDFF] text-[#4A48FF]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  )
} 