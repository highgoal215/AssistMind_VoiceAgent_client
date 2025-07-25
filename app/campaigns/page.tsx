"use client"

import React from 'react'
import { useCampaigns } from '@/hooks/useCampaigns'
import {
  CampaignsLayout,
  NavigationTabs,
  MetricCards,
  CampaignStatusChart,
  CallMetrics,
  CampaignFilters,
  CampaignsGrid,
  NewCampaignForm,
  NAVIGATION_TABS,
  METRIC_CARDS,
  CALL_METRICS,
  CAMPAIGN_STATUS_DATA
} from '@/components/campaigns'

export default function CampaignsPage() {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeTab,
    setActiveTab,
    campaigns,
    filters,
    setFilters,
    campaignStep,
    setCampaignStep,
    formData,
    setFormData,
    toggleCampaign,
    launchCampaign,
    cancelNewCampaign
  } = useCampaigns()

  return (
    <CampaignsLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
    >
      <div className="space-y-6">
        <NavigationTabs
          tabs={NAVIGATION_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <>
            <MetricCards cards={METRIC_CARDS} />
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
              <CampaignStatusChart statusData={CAMPAIGN_STATUS_DATA} />
              <CallMetrics metrics={CALL_METRICS} />
            </div>
          </>
        )}

        {/* Campaigns List View */}
        {activeTab === 'campaigns' && (
          <>
            <CampaignFilters filters={filters} onFiltersChange={setFilters} />
            <CampaignsGrid campaigns={campaigns} onToggleCampaign={toggleCampaign} />
          </>
        )}

        {/* New Campaign View */}
        {activeTab === 'new-campaign' && (
          <NewCampaignForm
            currentStep={campaignStep}
            formData={formData}
            onStepChange={setCampaignStep}
            onFormDataChange={setFormData}
            onCancel={cancelNewCampaign}
            onLaunch={launchCampaign}
          />
        )}
      </div>
    </CampaignsLayout>
  )
} 