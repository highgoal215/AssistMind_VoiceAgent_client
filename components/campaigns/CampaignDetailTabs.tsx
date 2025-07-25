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
    <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm w-fit h-12">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onClick={() => onTabChange(tab.id)}
          className={`rounded-lg px-4 py-2 text-lg font-manrope transition-colors ${
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