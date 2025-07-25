import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Document } from './types'
import SearchAndFilter from './SearchAndFilter'
import DocumentsTable from './DocumentsTable'

interface KnowledgeLayoutProps {
  documents: Document[]
  filterState: {
    selectedFilter: string
    searchQuery: string
  }
  onSearchChange: (query: string) => void
  onFilterChange: (filter: string) => void
  onToggleActive: (id: number) => void
  onView: (doc: Document) => void
  onDelete: (id: number) => void
}

export default function KnowledgeLayout({
  documents,
  filterState,
  onSearchChange,
  onFilterChange,
  onToggleActive,
  onView,
  onDelete
}: KnowledgeLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6">
      <Card className="rounded-lg shadow-sm lg:col-span-5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Training Documents</CardTitle>
              <p className="text-sm text-gray-600">{documents.length} documents</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SearchAndFilter
            filterState={filterState}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
          />
          <DocumentsTable
            documents={documents}
            onToggleActive={onToggleActive}
            onView={onView}
            onDelete={onDelete}
          />
        </CardContent>
      </Card>
    </div>
  )
} 