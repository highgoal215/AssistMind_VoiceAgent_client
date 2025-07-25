"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  DashboardSidebar,
  DashboardHeader,
  AnalyticsOverview,
  ChartsSection,
  CallActivitySection,
  CallRecordsTable
} from '@/components/dashboard'
import Header from '@/components/header/header'

export default function DashboardPage() {
  const router = useRouter()
  const [timeRange, setTimeRange] = React.useState('7days')
  const [callVolumeView, setCallVolumeView] = React.useState('weekly')
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [isExporting, setIsExporting] = React.useState(false)

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

  const callRecords = [
    {
      callerId: '+617 4904 0137',
      dateTime: '15 May 2020 11:00 pm',
      duration: '4:32',
      status: 'Incoming',
      result: 'Missed',
      resultColor: 'text-red-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 5:00 pm',
      duration: '5:32',
      status: 'Ongoing',
      result: 'Completed',
      resultColor: 'text-green-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 7:00 pm',
      duration: '7:12',
      status: 'Ongoing',
      result: 'Voicemail',
      resultColor: 'text-orange-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 6:00 pm',
      duration: '4:32',
      status: 'Incoming',
      result: 'Missed',
      resultColor: 'text-red-500'
    },
    {
      callerId: '+61 8 8223 0323',
      dateTime: '15 May 2020 9:00 pm',
      duration: '2:10',
      status: 'Ongoing',
      result: 'Completed',
      resultColor: 'text-green-500'
    }
  ]

  const handleRefresh = async () => {
    if (isRefreshing) return
    
    setIsRefreshing(true)
    try {
      // Simulate API call to refresh dashboard data
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would fetch fresh data here
      // const response = await fetch('/api/dashboard/refresh', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ timeRange })
      // })
      // const data = await response.json()
      
      toast.success('Dashboard data refreshed successfully!')
    } catch (error) {
      console.error('Error refreshing dashboard:', error)
      toast.error('Failed to refresh dashboard data. Please try again.')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExport = async () => {
    if (isExporting) return
    
    setIsExporting(true)
    try {
      // Simulate API call to export dashboard data
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would trigger a file download here
      // const response = await fetch('/api/dashboard/export', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     timeRange, 
      //     format: 'csv', // or 'xlsx', 'pdf'
      //     includeCharts: true 
      //   })
      // })
      // const blob = await response.blob()
      // const url = window.URL.createObjectURL(blob)
      // const a = document.createElement('a')
      // a.href = url
      // a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`
      // a.click()
      // window.URL.revokeObjectURL(url)
      
      toast.success('Dashboard data exported successfully!')
    } catch (error) {
      console.error('Error exporting dashboard:', error)
      toast.error('Failed to export dashboard data. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleViewMore = () => {
    // Navigate to the calls page to see all call records
    router.push('/calls')
  }

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange)
    // In a real app, you might want to refetch data when time range changes
    // fetchDashboardData(newTimeRange)
  }

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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Analytics Dashboard Header */}
            <DashboardHeader
              timeRange={timeRange}
              onTimeRangeChange={handleTimeRangeChange}
              onRefresh={handleRefresh}
              onExport={handleExport}
              isRefreshing={isRefreshing}
              isExporting={isExporting}
            />

            {/* Analytics Overview */}
            <AnalyticsOverview />

            {/* Charts Section */}
            <ChartsSection
              timeRange={timeRange}
              callVolumeView={callVolumeView}
              onCallVolumeViewChange={setCallVolumeView}
            />

            {/* Call Activity Section */}
            <CallActivitySection />

            {/* Call Records Table */}
            <CallRecordsTable
              records={callRecords}
              onViewMore={handleViewMore}
            />
          </div>
        </main>
      </div>
    </div>
  )
} 