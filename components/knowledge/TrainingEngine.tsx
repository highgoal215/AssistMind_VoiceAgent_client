import React from 'react'
import { RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { KnowledgeStats } from './types'

interface TrainingEngineProps {
  stats: KnowledgeStats
  onRefreshTraining: () => void
}

export default function TrainingEngine({ stats, onRefreshTraining }: TrainingEngineProps) {
  return (
    <Card className="rounded-lg shadow-sm lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Training Engine</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Documents Processed</p>
            <p className="text-xs text-green-600">Successfully trained and ready</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.processed}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-xs text-orange-600">Currently processing...</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.inProgress}</p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">Storage Used</p>
            <p className="text-sm text-gray-900">{stats.storageUsed} MB of 5 MB</p>
          </div>
          <Progress value={stats.storagePercentage} className="h-2" />
        </div>
        
        <Button 
          className="w-full bg-[#4A48FF] hover:bg-blue-700 text-white"
          onClick={onRefreshTraining}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Training
        </Button>
      </CardContent>
    </Card>
  )
} 