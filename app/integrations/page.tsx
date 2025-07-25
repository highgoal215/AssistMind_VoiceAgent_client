"use client"

import React, { useState } from 'react'
import { useIntegrations } from '@/hooks/useIntegrations'
import { IntegrationsLayout, IntegrationsContent, IntegrationsModals } from '@/components/integrations'

export default function IntegrationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const {
    integrations,
    developerTools,
    status,
    modalState,
    loading,
    error,
    success,
    configurations,
    handleConfigureClick,
    handleTest,
    handleDisconnect,
    handleLearnMore,
    handleGoogleCalendarSave,
    handleCalendlySave,
    handleGoHighLevelSave,
    handleGoHighLevelTest,
    handleWebhooksSave,
    handleWebhooksTest,
    closeModal,
    clearError,
    clearSuccess
  } = useIntegrations()

  return (
    <IntegrationsLayout
      sidebarCollapsed={sidebarCollapsed}
      isMobileMenuOpen={isMobileMenuOpen}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
    >
      <IntegrationsContent
        integrations={integrations}
        developerTools={developerTools}
        status={status}
        onConfigure={handleConfigureClick}
        onTest={handleTest}
        onDisconnect={handleDisconnect}
        onLearnMore={handleLearnMore}
        loading={loading}
        error={error}
        success={success}
        onClearError={clearError}
        onClearSuccess={clearSuccess}
      />

      <IntegrationsModals
        modalState={modalState}
        onClose={closeModal}
        onGoogleCalendarSave={handleGoogleCalendarSave}
        onCalendlySave={handleCalendlySave}
        onGoHighLevelSave={handleGoHighLevelSave}
        onGoHighLevelTest={handleGoHighLevelTest}
        onWebhooksSave={handleWebhooksSave}
        onWebhooksTest={handleWebhooksTest}
      />
    </IntegrationsLayout>
  )
} 