import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CallActivityChart from '@/components/CallActivityChart'

export function CallActivitySection() {
  return (
    <div className="flex w-full">
      <Card className='flex flex-col w-full'>
        <CardHeader>
          <CardTitle className="text-3xl font-manrope font-bold">Call Activity</CardTitle>
          <p className="text-md font-semibold text-gray-500">Daily overview: call volume + avg. call duration</p>
        </CardHeader>
        <CardContent>
          <CallActivityChart />
        </CardContent>
      </Card>
    </div>
  )
} 