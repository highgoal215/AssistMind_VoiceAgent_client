"use client"

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { useCalls } from '@/hooks/useCalls'
import {
  CallsLayout,
  StatsCards,
  CallFilters,
  CallsTable,
  Pagination
} from '@/components/calls'

export default function CallsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const {
    calls,
    filters,
    pagination,
    stats,
    actionMenuOpen,
    noteMenuOpen,
    updateFilters,
    goToPage,
    deleteCall,
    setActionMenuOpen,
    setNoteMenuOpen
  } = useCalls()

  // Handle body scroll when mobile menu is open
  useEffect(() => {
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
    <CallsLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
    >
      <div className="mx-auto space-y-6">
        {/* Summary Cards */}
        <StatsCards stats={stats} />

        {/* Call Log */}
        <Card className="bg-white shadow-sm">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <CallFilters
              filters={filters}
              onFiltersChange={updateFilters}
            />
          </div>

          <CallsTable
            calls={calls}
            actionMenuOpen={actionMenuOpen}
            noteMenuOpen={noteMenuOpen}
            onActionMenuToggle={setActionMenuOpen}
            onNoteMenuToggle={setNoteMenuOpen}
            onDeleteCall={deleteCall}
          />

          {/* Pagination */}
          <div className="p-4 lg:p-6 border-t border-gray-200">
            <Pagination
              pagination={pagination}
              onPageChange={goToPage}
            />
          </div>
        </Card>
      </div>
    </CallsLayout>
  )
} 