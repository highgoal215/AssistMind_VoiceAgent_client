import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, TrendingUp, CheckCircle, Phone, Users } from 'lucide-react'

export interface MetricCard {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
}

interface CampaignDetailMetricsProps {
  metrics: MetricCard[]
}

export default function CampaignDetailMetrics({ metrics }: CampaignDetailMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      {metrics.map((card, index) => (
        <Card key={index} className="rounded-3xl shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-lg font-manrope text-gray-600 mb-1 truncate">{card.title}</h3>
                <span className="text-xl sm:text-3xl font-bold text-gray-900 block truncate">{card.value}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 