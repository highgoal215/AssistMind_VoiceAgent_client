"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCallDetail } from '@/hooks/useCallDetail'
import {
  CallsLayout,
  CallDetailsCard,
  CallerInfoCard,
  TranscriptTabs
} from '@/components/calls'

export default function CallDetailPage() {
  const params = useParams()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const {
    call,
    isPlaying,
    currentTab,
    callerName,
    phoneNumber,
    handlePlayPause,
    handleSaveToContacts,
    updateCallerInfo,
    setCurrentTab
  } = useCallDetail(params.id as string)

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  if (!call) {
    return (
      <CallsLayout
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading call details...</p>
        </div>
      </CallsLayout>
    )
  }

  return (
    <CallsLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
    >
      <div className="mx-auto space-y-6">
        {/* Top Section - Call Details and Caller Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <CallDetailsCard
            call={call}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
          />

          <CallerInfoCard
            call={call}
            callerName={callerName}
            phoneNumber={phoneNumber}
            onCallerNameChange={(name) => updateCallerInfo(name, phoneNumber)}
            onPhoneNumberChange={(number) => updateCallerInfo(callerName, number)}
            onSaveToContacts={handleSaveToContacts}
          />
        </div>

        {/* Transcript/Summary Section */}
        <TranscriptTabs
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          transcript={call.transcript}
        />
      </div>
    </CallsLayout>
  )
} 