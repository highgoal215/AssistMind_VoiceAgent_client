import React from 'react'
import GoogleCalendarConfigModal, { GoogleCalendarConfig } from '@/components/modals/GoogleCalendarConfigModal'
import CalendlyConfigModal, { CalendlyConfig } from '@/components/modals/CalendlyConfigModal'
import GoHighLevelConfigModal, { GoHighLevelConfig } from '@/components/modals/GoHighLevelConfigModal'
import WebhooksConfigModal, { WebhooksConfig } from '@/components/modals/WebhooksConfigModal'
import { ModalState } from './types'

interface IntegrationsModalsProps {
  modalState: ModalState
  onClose: (modalType: keyof ModalState) => void
  onGoogleCalendarSave: (config: GoogleCalendarConfig) => void
  onCalendlySave: (config: CalendlyConfig) => void
  onGoHighLevelSave: (config: GoHighLevelConfig) => void
  onGoHighLevelTest: (config: GoHighLevelConfig) => void
  onWebhooksSave: (config: WebhooksConfig) => void
  onWebhooksTest: (config: WebhooksConfig) => void
}

export const IntegrationsModals: React.FC<IntegrationsModalsProps> = ({
  modalState,
  onClose,
  onGoogleCalendarSave,
  onCalendlySave,
  onGoHighLevelSave,
  onGoHighLevelTest,
  onWebhooksSave,
  onWebhooksTest
}) => {
  return (
    <>
      {/* Google Calendar Configuration Modal */}
      <GoogleCalendarConfigModal
        isOpen={modalState.googleCalendar}
        onClose={() => onClose('googleCalendar')}
        onSave={onGoogleCalendarSave}
      />

      {/* Calendly Configuration Modal */}
      <CalendlyConfigModal
        isOpen={modalState.calendly}
        onClose={() => onClose('calendly')}
        onSave={onCalendlySave}
      />

      {/* GoHighLevel Configuration Modal */}
      <GoHighLevelConfigModal
        isOpen={modalState.goHighLevel}
        onClose={() => onClose('goHighLevel')}
        onSave={onGoHighLevelSave}
        onTest={onGoHighLevelTest}
      />

      {/* Webhooks Configuration Modal */}
      <WebhooksConfigModal
        isOpen={modalState.webhooks}
        onClose={() => onClose('webhooks')}
        onSave={onWebhooksSave}
        onTest={onWebhooksTest}
      />
    </>
  )
} 