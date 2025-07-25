import { IntegrationCard, DeveloperTool } from './types'

export const INTEGRATIONS_DATA: Omit<IntegrationCard, 'icon'>[] = [
  {
    id: 'google-calendar',
    title: 'Google Calendar',
    description: 'Schedules appointments directly in your Google Calendar with real-time sync.',
    features: [
      'Real-time sync',
      'Conflict avoidance',
      'Auto-create event w/ details',
      'Sends confirmation/reminders'
    ],
    isActive: true
  },
  {
    id: 'calendly',
    title: 'Calendly',
    description: 'Use live Calendly links to book appointments during calls.',
    features: [
      'Sync with calendars',
      'AI shares booking link',
      'Email confirmations',
      'Uses link in call script'
    ],
    isActive: true
  },
  {
    id: 'gohighlevel',
    title: 'GoHighLevel',
    description: 'Push call leads into GHL for nurturing and automated follow-up campaigns.',
    features: [
      'Lead mapping (name, phone, email)',
      'Location selector',
      'Pipeline triggers/tags',
      'Instant follow-up'
    ],
    isActive: true
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    description: 'Enables real-time data transmission from the AI agent to your CRM or automation tools.',
    features: [
      'Real-time event push',
      'Configurable endpoint(s)',
      'Token-based auth',
      'Zapier/Make compatible'
    ],
    isActive: true
  }
]

export const DEVELOPER_TOOLS_DATA: DeveloperTool[] = [
  {
    id: 'rest-api',
    title: 'REST API',
    subtitle: 'Full programmatic access',
    description: 'Access all voice agent data and controls through our RESTful API endpoints.',
    icon: 'rest-api-icon'
  },
  {
    id: 'sdk-libraries',
    title: 'SDK Libraries',
    subtitle: 'JavaScript, Python, PHP',
    description: 'Pre-built libraries to accelerate your custom integration development.',
    icon: 'sdk-libraries-icon'
  }
]

export const INTEGRATION_STATUS: { activeCount: number; developerToolsCount: number } = {
  activeCount: INTEGRATIONS_DATA.filter(integration => integration.isActive).length,
  developerToolsCount: DEVELOPER_TOOLS_DATA.length
} 