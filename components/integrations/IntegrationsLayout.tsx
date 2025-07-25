import React from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'

interface IntegrationsLayoutProps {
  children: React.ReactNode
  sidebarCollapsed: boolean
  isMobileMenuOpen: boolean
  onSidebarToggle: () => void
  onMobileMenuClose: () => void
  onMobileMenuToggle: () => void
}

export const IntegrationsLayout: React.FC<IntegrationsLayoutProps> = ({
  children,
  sidebarCollapsed,
  isMobileMenuOpen,
  onSidebarToggle,
  onMobileMenuClose,
  onMobileMenuToggle
}) => {
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

        {/* Integrations Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 