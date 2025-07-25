"use client"

import React from 'react'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import Header from '../header/header'

interface CampaignsLayoutProps {
  children: React.ReactNode
  sidebarCollapsed: boolean
  onSidebarToggle: () => void
  isMobileMenuOpen: boolean
  onMobileMenuClose: () => void
  onMobileMenuToggle: () => void
}

export default function CampaignsLayout({
  children,
  sidebarCollapsed,
  onSidebarToggle,
  isMobileMenuOpen,
  onMobileMenuClose,
  onMobileMenuToggle
}: CampaignsLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={onSidebarToggle}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={onMobileMenuClose}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header onMobileMenuToggle={onMobileMenuToggle} />

        {/* Campaigns Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 