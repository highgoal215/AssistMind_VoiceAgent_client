export interface Campaign {
  id: number
  title: string
  type: 'Promo' | 'Survey' | 'Reminder'
  typeColor: string
  createdDate: string
  description: string
  recipients: number
  completed: number
  progress: number
  status: 'In Progress' | 'Completed' | 'Paused' | 'Scheduled' | 'Failed'
  statusColor: string
  timeRemaining: string
}

export interface MetricCard {
  title: string
  value: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  badge?: string
}

export interface CallMetric {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
}

export interface CampaignStatus {
  label: string
  percentage: number
  color: string
}

export interface Recipient {
  id: number
  name: string
  phoneNumber: string
  number?: string
  language?: string
  status?: string
  statusColor?: string
}

export interface CampaignFilters {
  search: string
  status: string
  dateRange: string
  sortBy: string
}

export interface CampaignFormData {
  campaignName: string
  openingMessage: string
  callerInstructions: string
  recipients: Recipient[]
  uploadMethod: 'file-upload' | 'manual-input'
  timingOption: 'send-now' | 'schedule-later'
  scheduledDate?: string
  scheduledTime?: string
  timeZone?: string
}

export interface CampaignStats {
  totalCampaigns: string
  activeCampaigns: string
  totalRecipients: string
  successRate: string
}

export interface NavigationTab {
  id: string
  label: string
}

export interface CampaignStep {
  step: number
  title: string
  description: string
} 