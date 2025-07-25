import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FileUploadZone from './FileUploadZone'
import { Document } from './types'

interface UploadSectionProps {
  documents: Document[]
  uploadState: {
    isUploading: boolean
    uploadProgress: number
    dragActive: boolean
  }
  onDrag: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: () => void
}

export default function UploadSection({
  documents,
  uploadState,
  onDrag,
  onDrop,
  onFileSelect
}: UploadSectionProps) {
  return (
    <Card className="rounded-lg shadow-sm lg:col-span-5">
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle className="text-lg font-semibold">Upload New Documents</CardTitle>
        <p className="text-sm text-gray-600">{documents.length}/10 documents</p>
      </CardHeader>
      <CardContent>
        <FileUploadZone
          dragActive={uploadState.dragActive}
          isUploading={uploadState.isUploading}
          uploadProgress={uploadState.uploadProgress}
          documentCount={documents.length}
          onDrag={onDrag}
          onDrop={onDrop}
          onFileSelect={onFileSelect}
        />
      </CardContent>
    </Card>
  )
} 