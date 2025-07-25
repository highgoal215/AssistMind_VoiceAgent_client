import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CallActivityChart from '@/components/CallActivityChart'

export function CallActivitySection() {
  return (
    <div className="flex w-full">
      <Card className='flex flex-col w-full'>
        <CardHeader>
          <div className="text-center lg:text-left">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-manrope font-bold">Call Activity</CardTitle>
            <p className="text-sm sm:text-md font-semibold text-gray-500 mt-1">Daily overview: call volume + avg. call duration</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[250px] sm:min-h-[300px]">
            <CallActivityChart />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 