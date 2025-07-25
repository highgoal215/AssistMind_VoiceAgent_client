import React, { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'

interface AIAgentLayoutProps {
  children: ReactNode
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  isMobileMenuOpen: boolean
  onMobileClose: () => void
  onMobileMenuToggle: () => void
}

export function AIAgentLayout({
  children,
  sidebarCollapsed,
  onToggleSidebar,
  isMobileMenuOpen,
  onMobileClose,
  onMobileMenuToggle
}: AIAgentLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={onToggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={onMobileClose}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header onMobileMenuToggle={onMobileMenuToggle} />

        {/* AI Agent Content */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
          <div className="mx-auto">
            {/* Main White Card */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {children}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 