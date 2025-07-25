import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export default function CampaignDetailLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={false}
        onToggle={() => {}}
        isMobileOpen={false}
        onMobileClose={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header Skeleton */}
        <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-sm lg:max-w-md mx-2 sm:mx-0">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              <Skeleton className="h-8 w-16 hidden lg:block" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </header>

        {/* Content Skeleton */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Campaign Header Skeleton */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                <Skeleton className="h-10 w-full sm:w-32" />
                <Skeleton className="h-10 w-full sm:w-20" />
              </div>
            </div>

            {/* Metric Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="rounded-3xl shadow-sm">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs Skeleton */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-white rounded-lg p-1 shadow-sm w-full sm:w-fit h-auto sm:h-12">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full sm:w-24 rounded-lg" />
              ))}
            </div>

            {/* Content Area Skeleton */}
            <Card className="rounded-lg shadow-sm">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-4">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24 hidden sm:block" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20 hidden sm:block" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 