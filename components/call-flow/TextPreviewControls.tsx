import React from 'react'
import { Copy, Download, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TextPreviewControlsProps {
  showSuccess: boolean
  onCopyToClipboard: () => void
  onDownloadText: () => void
}

export default function TextPreviewControls({
  showSuccess,
  onCopyToClipboard,
  onDownloadText
}: TextPreviewControlsProps) {
  return (
    <div className="bg-white px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showSuccess && (
            <div className="text-green-600 text-sm font-manrope">
              ✓ Copied to clipboard!
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onCopyToClipboard}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownloadText}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Link href="/call-flow">
            <Button
              size="sm"
              className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Flow
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 