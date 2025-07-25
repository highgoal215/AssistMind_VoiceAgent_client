import React from 'react'
import { IntegrationStatusBar } from './IntegrationStatusBar'
import { IntegrationsGrid } from './IntegrationsGrid'
import { DeveloperToolsSection } from './DeveloperToolsSection'
import { ErrorDisplay } from './ErrorDisplay'
import { SuccessNotification } from './SuccessNotification'
import { IntegrationCard as IntegrationCardType, DeveloperTool } from './types'

interface IntegrationsContentProps {
  integrations: IntegrationCardType[]
  developerTools: DeveloperTool[]
  status: { activeCount: number; developerToolsCount: number }
  onConfigure: (integrationId: string) => void
  onTest: (integrationId: string) => void
  onDisconnect: (integrationId: string) => void
  onLearnMore: (toolId: string) => void
  loading?: string | null
  error?: string | null
  success?: string | null
  onClearError?: () => void
  onClearSuccess?: () => void
}

export const IntegrationsContent: React.FC<IntegrationsContentProps> = ({
  integrations,
  developerTools,
  status,
  onConfigure,
  onTest,
  onDisconnect,
  onLearnMore,
  loading,
  error,
  success,
  onClearError,
  onClearSuccess
}) => {
  return (
    <div className="space-y-8">
      {/* Success Notification */}
      {success && onClearSuccess && (
        <SuccessNotification 
          message={success} 
          onClear={onClearSuccess}
          className="mb-4"
        />
      )}

      {/* Error Display */}
      {error && onClearError && (
        <ErrorDisplay 
          error={error} 
          onClear={onClearError}
          className="mb-4"
        />
      )}

      {/* Integrations Section */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-manrope text-gray-900">Integrations</h1>
       
        {/* Status Bar */}
        <IntegrationStatusBar
          status={status}
          description="Connect and manage third-party tools to automate your AI voice agent workflows."
        />
        
        {/* Integrations Grid */}
        <IntegrationsGrid
          integrations={integrations}
          onConfigure={onConfigure}
          onTest={onTest}
          onDisconnect={onDisconnect}
          loading={loading}
        />
      </div>

      {/* Developer Tools Section */}
      <DeveloperToolsSection
        tools={developerTools}
        onLearnMore={onLearnMore}
      />
    </div>
  )
} 