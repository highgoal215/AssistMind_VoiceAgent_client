import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    borderWidth: number
    pointBackgroundColor: string
    pointBorderColor: string
    pointBorderWidth: number
    pointRadius: number
    tension: number
  }[]
}

interface InsightsChartsProps {
  timeMetricsData: ChartData
  callResultsData: ChartData
  chartOptions: any
}

export default function InsightsCharts({
  timeMetricsData,
  callResultsData,
  chartOptions
}: InsightsChartsProps) {
  return (
    <div className="space-y-6">
      {/* Time Metrics Chart */}
      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-manrope">Time Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg p-4 border border-gray-200 relative">
            <Line data={timeMetricsData} options={chartOptions} />
            {/* Date label overlay */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-gray-50 px-2">
              06/25
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call Results Chart */}
      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-manrope">Call Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg p-4 border border-gray-200 relative">
            <Bar data={callResultsData} options={chartOptions} />
            {/* Date label overlay */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-gray-50 px-2">
              06/25
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 