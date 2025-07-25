import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { getFileIcon, getStatusColor } from './utils'
import { Document } from './types'
import DocumentActions from './DocumentActions'
import DocumentCard from './DocumentCard'

interface DocumentsTableProps {
  documents: Document[]
  onToggleActive: (id: number) => void
  onView: (doc: Document) => void
  onDelete: (id: number) => void
}

export default function DocumentsTable({ 
  documents, 
  onToggleActive, 
  onView, 
  onDelete 
}: DocumentsTableProps) {
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="w-full hidden md:table">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">FILE NAME</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">TYPE</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">SIZE</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">UPLOAD DATE</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">STATUS</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">ACTIVE FOR CALL</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => {
            const FileIcon = getFileIcon(doc.type)
            return (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <FileIcon className="h-4 w-4" />
                    <span className="text-sm text-gray-900">{doc.fileName}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{doc.type}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{doc.size}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{doc.uploadDate}</span>
                </td>
                <td className="py-3 px-4">
                  <Badge className={`${getStatusColor(doc.status)} text-xs px-2 py-1 rounded-full`}>
                    {doc.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Switch 
                    checked={doc.isActive} 
                    onCheckedChange={() => onToggleActive(doc.id)}
                  />
                </td>
                <td className="py-3 px-4">
                  <DocumentActions 
                    document={doc}
                    onView={onView}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onToggleActive={onToggleActive}
            onView={onView}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
} 