import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalyticsCardProps {
  title: string
  value: string
  description: string
  trend: {
    value: string
    isPositive: boolean
  }
}

export function AnalyticsCard({ title, value, description, trend }: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-manrope text-gray-600 font-bold">{title}</CardTitle>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-manrope font-semibold ${
            trend.isPositive 
              ? 'bg-green-100 text-green-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            <span>{trend.value}</span>
            <svg 
              className={`w-3 h-3 ${trend.isPositive ? '' : 'transform rotate-180'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-[36px] font-bold text-gray-900 font-manrope">{value}</div>
          <div className="text-sm text-gray-500 font-semibold font-manrope">{description}</div>
        </div>
      </CardContent>
    </Card>
  )
} 