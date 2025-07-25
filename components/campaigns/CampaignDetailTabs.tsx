import React from 'react'
import { Button } from '@/components/ui/button'

export interface TabItem {
  id: string
  label: string
}

interface CampaignDetailTabsProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function CampaignDetailTabs({
  tabs,
  activeTab,
  onTabChange
}: CampaignDetailTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-white rounded-lg p-1 shadow-sm w-full sm:w-fit h-auto sm:h-12">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onClick={() => onTabChange(tab.id)}
          className={`rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-lg font-manrope transition-colors flex-1 sm:flex-none ${
            activeTab === tab.id
              ? "bg-[#EDEDFF] text-[#4A48FF]"
              : "text-gray-900 hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
} 