import React, { useState } from 'react'
import { Download, Play, Info, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import StatusTooltip from './StatusTooltip'

export interface CallRecord {
  id: number
  name: string
  number: string
  status: string
  statusColor: string
  duration: string
  hasRecording: boolean
}

interface CallRecordsTableProps {
  records: CallRecord[]
  showTooltip: boolean
  onToggleTooltip: () => void
  onDownloadRecording: (recordId: number) => void
  onPlayRecording: (recordId: number) => void
}

export default function CallRecordsTable({
  records,
  showTooltip,
  onToggleTooltip,
  onDownloadRecording,
  onPlayRecording
}: CallRecordsTableProps) {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})

  const handleDownload = async (recordId: number) => {
    setLoadingStates(prev => ({ ...prev, [`download-${recordId}`]: true }))
    try {
      await onDownloadRecording(recordId)
    } finally {
      setLoadingStates(prev => ({ ...prev, [`download-${recordId}`]: false }))
    }
  }

  const handlePlay = async (recordId: number) => {
    setLoadingStates(prev => ({ ...prev, [`play-${recordId}`]: true }))
    try {
      await onPlayRecording(recordId)
    } finally {
      setLoadingStates(prev => ({ ...prev, [`play-${recordId}`]: false }))
    }
  }

  return (
    <div className="relative">
      <StatusTooltip isVisible={showTooltip} onClose={onToggleTooltip} />
      
      <Card className="rounded-lg shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-xl sm:text-3xl font-bold font-manrope">Call Records</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onToggleTooltip}
              >
                <Info className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">NAME</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider hidden sm:table-cell">NUMBER</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider hidden sm:table-cell">DURATION</th>
                  <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-lg font-semibold font-manrope text-gray-700 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="py-3 px-2 sm:px-4 text-sm text-gray-900 font-medium">
                      <div className="flex flex-col sm:block">
                        <span className="font-medium">{record.name}</span>
                        <span className="text-xs text-gray-500 sm:hidden">{record.number}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm text-gray-900 hidden sm:table-cell">{record.number}</td>
                    <td className="py-3 px-2 sm:px-4">
                      <Badge className={`text-xs px-2 py-1 rounded-full ${record.statusColor}`}>
                        {record.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm text-gray-900 hidden sm:table-cell">{record.duration}</td>
                    <td className="py-3 px-2 sm:px-4">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          disabled={!record.hasRecording || loadingStates[`download-${record.id}`]}
                          onClick={() => handleDownload(record.id)}
                        >
                          {loadingStates[`download-${record.id}`] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          disabled={!record.hasRecording || loadingStates[`play-${record.id}`]}
                          onClick={() => handlePlay(record.id)}
                        >
                          {loadingStates[`play-${record.id}`] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 