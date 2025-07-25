import React from 'react'
import { Play, Pause } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Campaign } from './types'
import Link from 'next/link'

interface CampaignsGridProps {
  campaigns: Campaign[]
  onToggleCampaign?: (campaignId: number) => void
}

export default function CampaignsGrid({ campaigns, onToggleCampaign }: CampaignsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{campaign.title}</h3>
                  <p className="text-md font-semibold text-gray-500">Created: {campaign.createdDate}</p>
                </div>
                <Badge className={`text-xs px-2 py-1 rounded-full font-semibold font-manrope ${campaign.typeColor}`}>
                  {campaign.type}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-sm font-bold font-manrope text-gray-600 line-clamp-2">
                {campaign.description}
              </p>

              {/* Metrics */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-gray-500">Recipients:</span>
                    <span className="font-semibold font-manrope text-gray-900 ml-1">{campaign.recipients}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Completed:</span>
                    <span className="font-semibold font-manrope text-gray-900 ml-1">{campaign.completed}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-bold font-manrope">Progress</span>
                  <span className="font-semibold text-gray-900">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#4A48FF] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status and Time */}
              <div className="flex items-center justify-between">
                <Badge className={`text-sm font-bold font-manrope px-2 py-1 rounded-full ${campaign.statusColor}`}>
                  {campaign.status}
                </Badge>
                <span className="text-sm font-bold font-manrope text-gray-500">{campaign.timeRemaining}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                  <Button className="w-full bg-[#4A48FF] hover:bg-[#9392eb] text-white text-sm">
                    View Details
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={() => onToggleCampaign?.(campaign.id)}
                >
                  {campaign.status === 'Paused' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 