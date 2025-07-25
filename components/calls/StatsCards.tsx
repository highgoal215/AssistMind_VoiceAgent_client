import React from 'react'
import { Phone, Clock, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { CallStats } from './types'

interface StatsCardsProps {
  stats: CallStats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#EFEEFF] rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-[#4A48FF]" />
            </div>
            <div>
              <p className="text-md font-bold font-manrope text-gray-600">Total Calls</p>
              <p className="text-xl lg:text-3xl font-bold font-manrope text-gray-900">{stats.totalCalls}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#EFEEFF] rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-[#4A48FF]" />
            </div>
            <div>
              <p className="text-md font-bold font-manrope text-gray-600">Average Duration</p>
              <p className="text-xl lg:text-3xl font-bold font-manrope text-gray-900">{stats.averageDuration}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm sm:col-span-2 lg:col-span-1">
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#EFEEFF] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 lg:w-6 lg:h-6 text-[#4A48FF]" />
            </div>
            <div>
              <p className="text-md font-bold font-manrope text-gray-600">Unique Callers</p>
              <p className="text-xl lg:text-3xl font-bold font-manrope text-gray-900">
                {stats.uniqueCallers.toString().padStart(2, '0')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 