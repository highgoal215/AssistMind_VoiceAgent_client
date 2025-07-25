import { useState, useCallback } from 'react'
import { ModalState } from '@/components/integrations/types'
import { INTEGRATIONS_DATA, DEVELOPER_TOOLS_DATA, INTEGRATION_STATUS } from '@/components/integrations/constants'
import GoogleCalendarConfigModal, { GoogleCalendarConfig } from '@/components/modals/GoogleCalendarConfigModal'
import CalendlyConfigModal, { CalendlyConfig } from '@/components/modals/CalendlyConfigModal'
import GoHighLevelConfigModal, { GoHighLevelConfig } from '@/components/modals/GoHighLevelConfigModal'
import WebhooksConfigModal, { WebhooksConfig } from '@/components/modals/WebhooksConfigModal'

export const useIntegrations = () => {
  const [modalState, setModalState] = useState<ModalState>({
    googleCalendar: false,
    calendly: false,
    goHighLevel: false,
    webhooks: false
  })

  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [integrations, setIntegrations] = useState(INTEGRATIONS_DATA)
  const [configurations, setConfigurations] = useState<Record<string, any>>({})

  const openModal = useCallback((modalType: keyof ModalState) => {
    setModalState(prev => ({
      ...prev,
      [modalType]: true
    }))
    setError(null)
    setSuccess(null)
  }, [])

  const closeModal = useCallback((modalType: keyof ModalState) => {
    setModalState(prev => ({
      ...prev,
      [modalType]: false
    }))
    setError(null)
    setSuccess(null)
  }, [])

  const handleConfigureClick = useCallback((integrationId: string) => {
    switch (integrationId) {
      case 'google-calendar':
        openModal('googleCalendar')
        break
      case 'calendly':
        openModal('calendly')
        break
      case 'gohighlevel':
        openModal('goHighLevel')
        break
      case 'webhooks':
        openModal('webhooks')
        break
      default:
        console.warn(`Unknown integration ID: ${integrationId}`)
        setError(`Unknown integration: ${integrationId}`)
    }
  }, [openModal])

  const handleGoogleCalendarSave = useCallback(async (config: GoogleCalendarConfig) => {
    setLoading('google-calendar')
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Google Calendar config saved:', config)
      setConfigurations(prev => ({
        ...prev,
        'google-calendar': config
      }))
      
      // Update integration status
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === 'google-calendar' 
            ? { ...integration, isActive: true }
            : integration
        )
      )
      
      setSuccess('Google Calendar configured successfully!')
      closeModal('googleCalendar')
    } catch (err) {
      setError('Failed to save Google Calendar configuration')
      console.error('Google Calendar save error:', err)
    } finally {
      setLoading(null)
    }
  }, [closeModal])

  const handleCalendlySave = useCallback(async (config: CalendlyConfig) => {
    setLoading('calendly')
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Calendly config saved:', config)
      setConfigurations(prev => ({
        ...prev,
        'calendly': config
      }))
      
      // Update integration status
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === 'calendly' 
            ? { ...integration, isActive: true }
            : integration
        )
      )
      
      setSuccess('Calendly configured successfully!')
      closeModal('calendly')
    } catch (err) {
      setError('Failed to save Calendly configuration')
      console.error('Calendly save error:', err)
    } finally {
      setLoading(null)
    }
  }, [closeModal])

  const handleGoHighLevelSave = useCallback(async (config: GoHighLevelConfig) => {
    setLoading('gohighlevel')
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('GoHighLevel config saved:', config)
      setConfigurations(prev => ({
        ...prev,
        'gohighlevel': config
      }))
      
      // Update integration status
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === 'gohighlevel' 
            ? { ...integration, isActive: true }
            : integration
        )
      )
      
      setSuccess('GoHighLevel configured successfully!')
      closeModal('goHighLevel')
    } catch (err) {
      setError('Failed to save GoHighLevel configuration')
      console.error('GoHighLevel save error:', err)
    } finally {
      setLoading(null)
    }
  }, [closeModal])

  const handleGoHighLevelTest = useCallback(async (config: GoHighLevelConfig) => {
    setLoading('gohighlevel-test')
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API test call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Testing GoHighLevel integration:', config)
      
      // Simulate test result
      const testResult = Math.random() > 0.3 // 70% success rate
      if (testResult) {
        console.log('GoHighLevel test successful')
        setSuccess('GoHighLevel test completed successfully!')
      } else {
        throw new Error('Test failed')
      }
    } catch (err) {
      setError('GoHighLevel test failed. Please check your API key and location.')
      console.error('GoHighLevel test error:', err)
    } finally {
      setLoading(null)
    }
  }, [])

  const handleWebhooksSave = useCallback(async (config: WebhooksConfig) => {
    setLoading('webhooks')
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Webhooks config saved:', config)
      setConfigurations(prev => ({
        ...prev,
        'webhooks': config
      }))
      
      // Update integration status
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === 'webhooks' 
            ? { ...integration, isActive: true }
            : integration
        )
      )
      
      setSuccess('Webhooks configured successfully!')
      closeModal('webhooks')
    } catch (err) {
      setError('Failed to save Webhooks configuration')
      console.error('Webhooks save error:', err)
    } finally {
      setLoading(null)
    }
  }, [closeModal])

  const handleWebhooksTest = useCallback(async (config: WebhooksConfig) => {
    setLoading('webhooks-test')
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API test call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Testing Webhooks integration:', config)
      
      // Simulate test result
      const testResult = Math.random() > 0.2 // 80% success rate
      if (testResult) {
        console.log('Webhooks test successful')
        setSuccess('Webhooks test completed successfully!')
      } else {
        throw new Error('Test failed')
      }
    } catch (err) {
      setError('Webhooks test failed. Please check your webhook URL and authentication token.')
      console.error('Webhooks test error:', err)
    } finally {
      setLoading(null)
    }
  }, [])

  const handleTest = useCallback(async (integrationId: string) => {
    setLoading(`${integrationId}-test`)
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API test call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log(`Testing integration: ${integrationId}`)
      
      // Simulate test result
      const testResult = Math.random() > 0.1 // 90% success rate
      if (testResult) {
        console.log(`${integrationId} test successful`)
        setSuccess(`${integrationId} test completed successfully!`)
      } else {
        throw new Error('Test failed')
      }
    } catch (err) {
      setError(`${integrationId} test failed. Please check your configuration.`)
      console.error(`${integrationId} test error:`, err)
    } finally {
      setLoading(null)
    }
  }, [])

  const handleDisconnect = useCallback(async (integrationId: string) => {
    setLoading(`${integrationId}-disconnect`)
    setError(null)
    setSuccess(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log(`Disconnecting integration: ${integrationId}`)
      
      // Update integration status
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, isActive: false }
            : integration
        )
      )
      
      // Remove configuration
      setConfigurations(prev => {
        const newConfigs = { ...prev }
        delete newConfigs[integrationId]
        return newConfigs
      })
      
      setSuccess(`${integrationId} disconnected successfully!`)
      console.log(`${integrationId} disconnected successfully`)
    } catch (err) {
      setError(`Failed to disconnect ${integrationId}`)
      console.error(`${integrationId} disconnect error:`, err)
    } finally {
      setLoading(null)
    }
  }, [])

  const handleLearnMore = useCallback((toolId: string) => {
    console.log(`Learn more about tool: ${toolId}`)
    
    // Simulate opening documentation or external link
    const toolUrls: Record<string, string> = {
      'rest-api': 'https://docs.example.com/api',
      'sdk-libraries': 'https://docs.example.com/sdk'
    }
    
    const url = toolUrls[toolId]
    if (url) {
      window.open(url, '_blank')
    } else {
      console.log(`No documentation available for ${toolId}`)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearSuccess = useCallback(() => {
    setSuccess(null)
  }, [])

  return {
    integrations,
    developerTools: DEVELOPER_TOOLS_DATA,
    status: {
      activeCount: integrations.filter(integration => integration.isActive).length,
      developerToolsCount: DEVELOPER_TOOLS_DATA.length
    },
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
  }
} 