import React from 'react'
import { AnalyticsCard } from './AnalyticsCard'

interface AnalyticsData {
  title: string
  value: string
  description: string
  trend: {
    value: string
    isPositive: boolean
  }
}

interface AnalyticsOverviewProps {
  data?: AnalyticsData[]
}

const defaultAnalyticsData: AnalyticsData[] = [
  {
    title: "Minutes Used",
    value: "18/30",
    description: "23% of quota used",
    trend: { value: "+2.3%", isPositive: true }
  },
  {
    title: "Total Calls",
    value: "145",
    description: "Voice interactions (inbound + outbound)",
    trend: { value: "+2.3%", isPositive: true }
  },
  {
    title: "Answer Rate",
    value: "96.8%",
    description: "% of calls successfully answered",
    trend: { value: "+2.3%", isPositive: true }
  },
  {
    title: "Booking Rate",
    value: "68.5%",
    description: "% of calls successfully answered",
    trend: { value: "-2.3%", isPositive: false }
  }
]

export function AnalyticsOverview({ data = defaultAnalyticsData }: AnalyticsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {data.map((item, index) => (
        <AnalyticsCard
          key={index}
          title={item.title}
          value={item.value}
          description={item.description}
          trend={item.trend}
        />
      ))}
    </div>
  )
} 