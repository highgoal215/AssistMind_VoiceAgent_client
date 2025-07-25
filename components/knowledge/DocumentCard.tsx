import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { getFileIcon, getStatusColor } from './utils'
import { Document } from './types'
import DocumentActions from './DocumentActions'

interface DocumentCardProps {
  document: Document
  onToggleActive: (id: number) => void
  onView: (doc: Document) => void
  onDelete: (id: number) => void
}

export default function DocumentCard({ 
  document, 
  onToggleActive, 
  onView, 
  onDelete 
}: DocumentCardProps) {
  const FileIcon = getFileIcon(document.type)

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileIcon className="h-4 w-4" />
          <span className="text-sm font-medium text-gray-900">{document.fileName}</span>
        </div>
        <DocumentActions 
          document={document}
          onView={onView}
          onDelete={onDelete}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Type:</span>
          <span className="ml-2 text-gray-900">{document.type}</span>
        </div>
        <div>
          <span className="text-gray-500">Size:</span>
          <span className="ml-2 text-gray-900">{document.size}</span>
        </div>
        <div>
          <span className="text-gray-500">Upload Date:</span>
          <span className="ml-2 text-gray-900">{document.uploadDate}</span>
        </div>
        <div>
          <span className="text-gray-500">Status:</span>
          <Badge className={`ml-2 ${getStatusColor(document.status)} text-xs px-2 py-1 rounded-full`}>
            {document.status}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-sm text-gray-500">Active for Call</span>
        <Switch 
          checked={document.isActive} 
          onCheckedChange={() => onToggleActive(document.id)}
        />
      </div>
    </div>
  )
} 