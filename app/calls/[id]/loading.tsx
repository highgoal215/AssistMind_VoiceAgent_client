import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CallDetailLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="p-4 space-y-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between">
            <Skeleton className="h-9 w-32" />
            <div className="flex space-x-4">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </header>

        {/* Content Skeleton */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Call Details Card */}
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-8 w-48" />
                      <Skeleton className="h-4 w-32" />
                      
                      {/* Audio Player Skeleton */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-9 w-9 rounded" />
                          <div className="flex-1">
                            <Skeleton className="h-2 w-full" />
                          </div>
                          <Skeleton className="h-9 w-9 rounded" />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Skeleton className="h-9 flex-1" />
                        <Skeleton className="h-9 flex-1" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Caller Information Card */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>

            {/* Transcript/Summary Tabs */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-0">
                <div className="border-b border-gray-200 p-6">
                  <div className="flex space-x-4">
                    <Skeleton className="h-12 w-24" />
                    <Skeleton className="h-12 w-24" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-64" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 