import React from 'react'
import { Download, Trash2, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CampaignDetailHeaderProps {
  campaignName: string
  status: string
  statusColor: string
  onExport: () => void
  onDelete: () => void
  isLoading?: boolean
}

export default function CampaignDetailHeader({
  campaignName,
  status,
  statusColor,
  onExport,
  onDelete,
  isLoading = false
}: CampaignDetailHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{campaignName}</h1>
        <Badge className={`${statusColor} text-xs px-2 py-1 rounded-full w-fit`}>
          {status}
        </Badge>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
        <Button 
          className="bg-[#4A48FF] hover:bg-[#9392eb] text-white w-full sm:w-auto"
          onClick={onExport}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          <span className="hidden sm:inline">Export Result</span>
          <span className="sm:hidden">Export</span>
        </Button>
        <Button 
          variant="destructive" 
          className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
          onClick={onDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          Delete
        </Button>
      </div>
    </div>
  )
} 