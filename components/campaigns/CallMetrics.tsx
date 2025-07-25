import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CallMetric } from './types'

interface CallMetricsProps {
  metrics: CallMetric[]
}

export default function CallMetrics({ metrics }: CallMetricsProps) {
  return (
    <Card className="rounded-lg shadow-sm lg:col-span-5">
      <CardHeader>
        <CardTitle className="text-3xl font-manrope font-bold">Call Metrics</CardTitle>
        <p className="text-sm font-bold text-gray-500">Overall calling performance</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-bold text-gray-600">{metric.title}</p>
                <p className="text-2xl font-manrope font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 