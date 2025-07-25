import React from 'react'
import { Upload, Download, Copy, Edit, X, Save, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface JsonConfigControlsProps {
  isValid: boolean
  onUploadJson: () => void
  onDownloadJson: () => void
  onCopyToClipboard: () => void
  onFormatJson: () => void
  onClearJson: () => void
  onSaveToLocalStorage: () => void
}

export default function JsonConfigControls({
  isValid,
  onUploadJson,
  onDownloadJson,
  onCopyToClipboard,
  onFormatJson,
  onClearJson,
  onSaveToLocalStorage
}: JsonConfigControlsProps) {
  return (
    <div className="bg-white px-6 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900">Flow Configuration (JSON)</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onUploadJson}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownloadJson}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCopyToClipboard}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onFormatJson}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            <Edit className="h-4 w-4 mr-2" />
            Format
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearJson}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button
            size="sm"
            onClick={onSaveToLocalStorage}
            disabled={!isValid}
            className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Link href="/call-flow">
            <Button
              size="sm"
              className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 