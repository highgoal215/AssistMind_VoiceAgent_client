import React from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import UploadProgress from './UploadProgress'
import { MAX_DOCUMENTS } from './constants'

interface FileUploadZoneProps {
  dragActive: boolean
  isUploading: boolean
  uploadProgress: number
  documentCount: number
  onDrag: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: () => void
}

export default function FileUploadZone({
  dragActive,
  isUploading,
  uploadProgress,
  documentCount,
  onDrag,
  onDrop,
  onFileSelect
}: FileUploadZoneProps) {
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors ${
        dragActive 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
    >
      {isUploading ? (
        <UploadProgress progress={uploadProgress} />
      ) : (
        <>
          <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Drag and drop your CSV, TXT, DOCX, PDF or click to browse
          </p>
          <Button 
            className="bg-[#4A48FF] hover:bg-blue-700 text-white text-sm sm:text-base"
            onClick={onFileSelect}
            disabled={documentCount >= MAX_DOCUMENTS}
          >
            Choose File
          </Button>
          <p className="text-xs text-gray-500 mt-4">Max 10 docs, 500KB each</p>
        </>
      )}
    </div>
  )
} 