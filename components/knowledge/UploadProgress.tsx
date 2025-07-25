import React from 'react'
import { Progress } from '@/components/ui/progress'

interface UploadProgressProps {
  progress: number
}

export default function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="space-y-4">
      <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-600">Uploading...</p>
      <Progress value={progress} className="h-2" />
    </div>
  )
} 