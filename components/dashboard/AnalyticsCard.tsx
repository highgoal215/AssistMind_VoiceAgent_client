'use client'

import React from 'react'
import Image from 'next/image'
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
    <Card className="h-full">
      <CardHeader className="pb-2 relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-sm lg:text-md font-manrope text-gray-600 font-bold leading-tight">
            {title}
          </CardTitle>

          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs lg:text-sm font-manrope font-semibold ${trend.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
          >
            <span>{trend.value}</span>
            <Image
              src={trend.isPositive ? 'images/dashboard/up.svg' : 'images/dashboard/down.svg'}
              alt={trend.isPositive ? 'Up' : 'Down'}
              width={12}
              height={12}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-gray-900 font-manrope leading-tight">
            {value}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 font-semibold font-manrope leading-tight mt-1">
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
