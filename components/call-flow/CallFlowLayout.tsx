import React from 'react'
import { Bell, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import NodePalette from '@/components/call-flow/NodePalette'
import { NodeType } from '@/components/call-flow/types'

interface CallFlowLayoutProps {
  children: React.ReactNode
  sidebarCollapsed: boolean
  onSidebarToggle: () => void
  isMobileMenuOpen?: boolean
  onMobileMenuClose?: () => void
  onMobileMenuToggle?: () => void
  nodePaletteProps?: {
    onDragStart?: (e: React.DragEvent, nodeType: NodeType) => void
    onCreateCustomNode?: () => void
    isReadOnly?: boolean
  }
}

export default function CallFlowLayout({
  children,
  sidebarCollapsed,
  onSidebarToggle,
  isMobileMenuOpen = false,
  onMobileMenuClose,
  onMobileMenuToggle,
  nodePaletteProps
}: CallFlowLayoutProps) {
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
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {onMobileMenuToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMobileMenuToggle}
                className="lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            )}
            
            <div className="flex items-center space-x-4 ml-auto">
              <Button variant="outline" className="bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  1
                </span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Call Flow Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Node Palette */}
          {nodePaletteProps && (
            <NodePalette {...nodePaletteProps} />
          )}

          {/* Main Content Area */}
          {children}
        </main>
      </div>
    </div>
  )
} 