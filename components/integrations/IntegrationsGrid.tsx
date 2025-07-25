import React from 'react'
import { IntegrationCard } from './IntegrationCard'
import { IntegrationCard as IntegrationCardType } from './types'

interface IntegrationsGridProps {
  integrations: IntegrationCardType[]
  onConfigure: (integrationId: string) => void
  onTest: (integrationId: string) => void
  onDisconnect: (integrationId: string) => void
  loading?: string | null
}

export const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({
  integrations,
  onConfigure,
  onTest,
  onDisconnect,
  loading
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onConfigure={onConfigure}
          onTest={onTest}
          onDisconnect={onDisconnect}
          loading={loading}
        />
      ))}
    </div>
  )
} 