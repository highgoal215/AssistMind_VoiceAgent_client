import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from './types'

interface MetricCardsProps {
  cards: MetricCard[]
}

export default function MetricCards({ cards }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg text-gray-600 mb-1 font-bold font-manrope">
                  {card.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900 font-manrope">
                    {card.value}
                  </span>
                  {card.badge && (
                    <Badge className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-full">
                      {card.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-md text-gray-500 mt-1 font-bold font-manrope">
                  {card.subtitle}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.iconBg}`}>
                <card.icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 