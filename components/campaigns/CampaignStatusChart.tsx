import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CampaignStatus } from './types'

interface CampaignStatusChartProps {
  statusData: CampaignStatus[]
}

export default function CampaignStatusChart({ statusData }: CampaignStatusChartProps) {
  // Calculate cumulative percentages for chart segments
  const calculateChartSegments = () => {
    let cumulative = 0
    return statusData.map((item) => {
      const start = cumulative
      cumulative += item.percentage
      return {
        ...item,
        start,
        end: cumulative
      }
    })
  }

  const segments = calculateChartSegments()

  return (
    <Card className="rounded-lg shadow-sm lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Campaign Status Breakdown</CardTitle>
        <p className="text-sm font-bold font-manrope text-gray-500">
          Breakdown of common call reasons
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-8">
          {/* Donut Chart */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
              />
              {segments.map((segment, index) => {
                const colorMap: { [key: string]: string } = {
                  'bg-blue-500': '#3b82f6',
                  'bg-green-500': '#10b981',
                  'bg-orange-500': '#f97316',
                  'bg-red-500': '#ef4444',
                  'bg-gray-500': '#6b7280'
                }
                return (
                  <circle
                    key={index}
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke={colorMap[segment.color] || segment.color}
                    strokeWidth="4"
                    strokeDasharray={`${segment.percentage * 0.88} ${100 - segment.percentage * 0.88}`}
                    strokeDashoffset={`-${segment.start * 0.88}`}
                  />
                )
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 