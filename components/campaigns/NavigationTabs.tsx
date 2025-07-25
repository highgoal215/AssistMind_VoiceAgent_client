import React from 'react'
import { Button } from '@/components/ui/button'
import { NavigationTab } from './types'

interface NavigationTabsProps {
  tabs: NavigationTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function NavigationTabs({
  tabs,
  activeTab,
  onTabChange
}: NavigationTabsProps) {
  return (
    <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm w-[564px] justify-between">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onClick={() => onTabChange(tab.id)}
          className={`rounded-lg px-4 py-2 h-12 text-xl font-bold font-manrope transition-colors ${
            activeTab === tab.id
              ? "bg-[#EDEDFF] text-blue-700"
              : "text-gray-900 hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
} 