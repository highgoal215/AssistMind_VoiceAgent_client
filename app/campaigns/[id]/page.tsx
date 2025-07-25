"use client"

import React from 'react'
import {
  Search,
  Bell,
  Moon,
  ChevronDown,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { useCampaignDetail } from '@/hooks/useCampaignDetail'
import {
  CampaignDetailHeader,
  CampaignDetailMetrics,
  CampaignDetailTabs,
  CallRecordsTable,
  RecipientsTable,
  MessageSetupSection,
  InsightsCharts,
  CampaignDetailError
} from '@/components/campaigns'

export default function CampaignDetailPage() {
  const {
    // Campaign data
    campaignName,
    campaignStatus,
    campaignStatusColor,
    isLoading,
    error,
    
    // UI state
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeTab,
    setActiveTab,
    showTooltip,
    
    // Data
    tabs,
    metrics,
    callRecords,
    recipients,
    messageSetup,
    timeMetricsData,
    callResultsData,
    chartOptions,
    
    // Event handlers
    handleExport,
    handleDelete,
    handleDownloadRecording,
    handlePlayRecording,
    toggleTooltip,
    retry
  } = useCampaignDetail()

  // Show error state
  if (error) {
    return <CampaignDetailError error={error} onRetry={retry} />
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
        <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search Bar */}
            <div className="flex items-center flex-1 max-w-sm lg:max-w-md mx-2 sm:mx-0">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 w-full bg-gray-100 border-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {/* Dark Mode Button - Hidden on mobile */}
              <Button variant="outline" className="hidden lg:flex bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  2
                </span>
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-600 hidden lg:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Campaign Detail Content */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Campaign Header */}
            <CampaignDetailHeader
              campaignName={campaignName}
              status={campaignStatus}
              statusColor={campaignStatusColor}
              onExport={handleExport}
              onDelete={handleDelete}
              isLoading={isLoading}
            />

            {/* Metric Cards */}
            <CampaignDetailMetrics metrics={metrics} />

            {/* Navigation Tabs */}
            <CampaignDetailTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Tab Content */}
            {activeTab === 'call-records' && (
              <CallRecordsTable
                records={callRecords}
                showTooltip={showTooltip}
                onToggleTooltip={toggleTooltip}
                onDownloadRecording={handleDownloadRecording}
                onPlayRecording={handlePlayRecording}
              />
            )}

            {activeTab === 'recipients' && (
              <RecipientsTable recipients={recipients} />
            )}

            {activeTab === 'message-setup' && (
              <MessageSetupSection
                openingMessage={messageSetup.openingMessage}
                scheduledTime={messageSetup.scheduledTime}
                startedTime={messageSetup.startedTime}
                callPrompt={messageSetup.callPrompt}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsCharts
                timeMetricsData={timeMetricsData}
                callResultsData={callResultsData}
                chartOptions={chartOptions}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 