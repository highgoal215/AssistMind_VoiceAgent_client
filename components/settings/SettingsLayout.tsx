"use client"

import React, { useState } from 'react'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import Header from '../header/header'
import SettingsNavigation from './SettingsNavigation'
import ProfileSection from './ProfileSection'
import SubscriptionsSection from './SubscriptionsSection'
import DeveloperSection from './DeveloperSection'
import NotificationsSection from './NotificationsSection'
import CancelSubscriptionModal from '../modals/CancelSubscriptionModal'
import ManageSubscriptionModal from '../modals/ManageSubscriptionModal'
import { settingsService } from '@/lib/services/settingsService'
import { showToast } from '@/lib/utils/toast'

export interface SettingsLayoutProps {
  children?: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showManageModal, setShowManageModal] = useState(false)

  const handleManageSubscription = () => {
    setShowManageModal(true)
  }

  const handleCancelSubscription = () => {
    setShowCancelModal(true)
  }

  const handleConfirmCancel = async () => {
    try {
      const result = await settingsService.cancelSubscription()
      if (result.success) {
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to cancel subscription')
    } finally {
      setShowCancelModal(false)
    }
  }

  const handleCloseModal = () => {
    setShowCancelModal(false)
  }

  const handleCloseManageModal = () => {
    setShowManageModal(false)
  }

  const handleChangePlan = async () => {
    try {
      const result = await settingsService.changePlan('business')
      if (result.success) {
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to change plan')
    }
  }

  const handleUpdatePayment = async () => {
    try {
      const result = await settingsService.updatePaymentMethod()
      if (result.success) {
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to update payment method')
    }
  }

  const handleDownloadInvoice = async () => {
    try {
      const result = await settingsService.downloadInvoice('inv_123456')
      if (result.success) {
        showToast.success(result.message)
        // In a real app, you would trigger the download here
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank')
        }
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to download invoice')
    }
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />
      case 'subscriptions':
        return (
          <SubscriptionsSection
            onManageSubscription={handleManageSubscription}
            onCancelSubscription={handleCancelSubscription}
            onChangePlan={handleChangePlan}
          />
        )
      case 'developer':
        return <DeveloperSection />
      case 'notifications':
        return <NotificationsSection />
      default:
        return <ProfileSection />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Cancel Subscription Modal */}
      <CancelSubscriptionModal
        isOpen={showCancelModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        planName="Business plan"
      />
      
      {/* Manage Subscription Modal */}
      <ManageSubscriptionModal
        isOpen={showManageModal}
        onClose={handleCloseManageModal}
        onChangePlan={handleChangePlan}
        onUpdatePayment={handleUpdatePayment}
        onCancelSubscription={handleCancelSubscription}
        onDownloadInvoice={handleDownloadInvoice}
        subscriptionData={{
          plan: 'Business plan',
          amount: '$50',
          status: 'Active',
          nextBillingDate: 'July 16, 2026',
          paymentMethod: '**** 4562 VISA'
        }}
      />

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

        {/* Settings Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto space-y-6">
            {/* Navigation Tabs */}
            <SettingsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-manrope text-gray-900 mb-2">
                {activeTab === 'profile' ? 'Profile' :
                  activeTab === 'subscriptions' ? 'Subscriptions' :
                    activeTab === 'developer' ? 'Developer' : 'Notifications'}
              </h1>
              <p className="text-md font-semibold font-manrope text-gray-600">
                {activeTab === 'profile' ? 'Update personal information and profile image.' :
                  activeTab === 'subscriptions' ? 'Manage subscription plan and billing details.' :
                    activeTab === 'developer' ? 'Manage developer settings and API access.' :
                      'Manage your notification preferences.'}
              </p>
            </div>

            {/* Render active tab content */}
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  )
} 