"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'

const navigationItems = [
  { name: 'Profile', href: '/setting/profile' },
  { name: 'Subscriptions', href: '/setting/subscriptions' },
  { name: 'Developer', href: '/setting/developer' },
  { name: 'Notifications', href: '/setting/notifications' },
]

export default function NotificationsPage() {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Navigation Tabs */}
            <div className="mb-8">
              <nav className="flex space-x-8">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Manage your notification preferences.</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center py-12">
                <p className="text-gray-500">Notification settings coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 