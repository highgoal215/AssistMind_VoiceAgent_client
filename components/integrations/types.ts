export interface IntegrationCard {
  id: string
  title: string
  description: string
  features: string[]
  isActive: boolean
  icon?: React.ReactNode
}

export interface DeveloperTool {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string | React.ReactNode
}

export interface IntegrationStatus {
  activeCount: number
  developerToolsCount: number
}

export interface ModalState {
  googleCalendar: boolean
  calendly: boolean
  goHighLevel: boolean
  webhooks: boolean
}

export interface IntegrationConfig {
  googleCalendar: any
  calendly: any
  goHighLevel: any
  webhooks: any
} 