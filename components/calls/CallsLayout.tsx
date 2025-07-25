import React from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'

interface CallsLayoutProps {
  children: React.ReactNode
  sidebarCollapsed: boolean
  onSidebarToggle: () => void
  isMobileMenuOpen?: boolean
  onMobileMenuClose?: () => void
  onMobileMenuToggle?: () => void
}

export default function CallsLayout({
  children,
  sidebarCollapsed,
  onSidebarToggle,
  isMobileMenuOpen = false,
  onMobileMenuClose,
  onMobileMenuToggle
}: CallsLayoutProps) {
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 