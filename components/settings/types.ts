export interface SubscriptionData {
  plan: string
  amount: string
  status: string
  nextBillingDate: string
  paymentMethod: string
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  popular: boolean
  current: boolean
  buttonText: string
  buttonAction: (onChangePlan?: () => void) => void
}

export interface NotificationItem {
  name: string
  description: string
  type: string
  defaultChecked: boolean
}

export interface NotificationGroup {
  group: string
  notifications: NotificationItem[]
}

export interface WebhookConfig {
  enabled: boolean
  url: string
  secret: string
}

export interface ProfileData {
  firstName: string
  lastName: string
  phoneNumber: string
  profileImage?: string
}

export interface BillingData {
  name: string
  email: string
  amount: string
  paymentMethod: string
} 