"use client"

import React from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'
import { useKnowledge } from '@/hooks/useKnowledge'
import {
  UploadSection,
  TrainingEngine,
  KnowledgeLayout
} from '@/components/knowledge'

export default function KnowledgeBasePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  const {
    documents,
    filteredDocuments,
    uploadState,
    filterState,
    stats,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleFileInput,
    handleFileSelect,
    toggleDocumentActive,
    deleteDocument,
    viewDocument,
    refreshTraining,
    handleSearchChange,
    handleFilterChange
  } = useKnowledge()

  // Handle body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* Knowledge Base Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-sm sm:text-base font-semibold text-gray-900">Upload and manage documents that train your AI Voice Agent</p>
            
            {/* Top Row - Upload and Training Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6">
              <UploadSection
                documents={documents}
                uploadState={uploadState}
                onDrag={handleDrag}
                onDrop={handleDrop}
                onFileSelect={handleFileSelect}
              />

              <TrainingEngine
                stats={stats}
                onRefreshTraining={refreshTraining}
              />
            </div>

            {/* Training Documents */}
            <KnowledgeLayout
              documents={filteredDocuments}
              filterState={filterState}
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
              onToggleActive={toggleDocumentActive}
              onView={viewDocument}
              onDelete={deleteDocument}
            />
          </div>
        </main>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.txt,.docx,.csv"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  )
}
