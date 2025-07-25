import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import CallVolumeChart from '@/components/CallVolumeChart'
import CallIntentChart from '@/components/CallIntentChart'

interface ChartsSectionProps {
  timeRange: string
  callVolumeView: string
  onCallVolumeViewChange: (value: string) => void
}

export function ChartsSection({ 
  timeRange, 
  callVolumeView, 
  onCallVolumeViewChange 
}: ChartsSectionProps) {
  const [chartError, setChartError] = useState<string | null>(null)

  // Example of how to handle chart errors if needed
  const handleChartError = (error: string) => {
    setChartError(error)
    // Auto-clear error after 5 seconds
    setTimeout(() => setChartError(null), 5000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {/* Call Volume Over Time */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <CardTitle className="text-3xl font-bold font-manrope">Call Volume Over Time</CardTitle>
                <p className="text-md font-semibold font-manrope text-gray-500">Long-term trends in call volume</p>
              </div>
              <ToggleGroup 
                type="single" 
                value={callVolumeView} 
                onValueChange={(value) => value && onCallVolumeViewChange(value)}
              >
                <ToggleGroupItem
                  value="weekly"
                  size="sm"
                  className="px-4 py-2 text-md font-semibold rounded-md transition-all data-[state]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                >
                  Weekly View
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="monthly"
                  size="sm"
                  className="px-4 py-2 text-md font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                >
                  Monthly View
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent>
            {chartError && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{chartError}</AlertDescription>
              </Alert>
            )}
            <div className="min-h-[300px]">
              <CallVolumeChart timeRange={timeRange} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        {/* Call Intent Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-manrope font-bold">Call Intent Breakdown</CardTitle>
            <p className="text-md font-semibold text-gray-500">Breakdown of common call reasons</p>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px]">
              <CallIntentChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 