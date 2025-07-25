import {
  Phone,
  CheckCircle,
  Users,
  TrendingUp,
  RefreshCw
} from 'lucide-react'
import { MetricCard, CallMetric, CampaignStatus, Campaign, NavigationTab, CampaignStep } from './types'

export const NAVIGATION_TABS: NavigationTab[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'new-campaign', label: 'New Campaign' }
]

export const METRIC_CARDS: MetricCard[] = [
  {
    title: 'Total Campaigns',
    value: '24',
    subtitle: '+2 from last month',
    icon: Phone,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    title: 'Active Campaigns',
    value: '12',
    subtitle: 'Currently running',
    icon: TrendingUp,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  },
  {
    title: 'Total Recipients',
    value: '1,247',
    subtitle: 'Across all campaigns',
    icon: Users,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  },
  {
    title: 'Success Rate',
    value: '78.5%',
    badge: 'Good',
    subtitle: '+2.1% from last month',
    icon: CheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  }
]

export const CALL_METRICS: CallMetric[] = [
  {
    title: 'Total Calls',
    value: '365',
    icon: Phone,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  },
  {
    title: 'Completed',
    value: '365',
    icon: CheckCircle,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  },
  {
    title: 'Completion Rate',
    value: '100%',
    icon: RefreshCw,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  },
  {
    title: 'Success Rate',
    value: '73.2%',
    icon: CheckCircle,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  },
  {
    title: 'Total Call Duration',
    value: '48h 23m',
    icon: Phone,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  },
  {
    title: 'Total Recipients',
    value: '740',
    icon: Users,
    iconBg: 'bg-[#EDEDFF]',
    iconColor: 'text-[#4A48FF]'
  }
]

export const CAMPAIGN_STATUS_DATA: CampaignStatus[] = [
  { label: 'Scheduled', percentage: 45, color: 'bg-blue-500' },
  { label: 'In Progress', percentage: 15, color: 'bg-green-500' },
  { label: 'Completed', percentage: 30, color: 'bg-orange-500' },
  { label: 'Failed', percentage: 8, color: 'bg-red-500' },
  { label: 'Paused', percentage: 2, color: 'bg-gray-500' }
]

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: 'Campaign - Jun 25',
    type: 'Promo',
    typeColor: 'bg-purple-500 text-white',
    createdDate: 'Jun 25, 2025, 2:22 PM',
    description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
    recipients: 150,
    completed: 78,
    progress: 30,
    status: 'In Progress',
    statusColor: 'bg-yellow-100 text-yellow-800',
    timeRemaining: '2h 15m'
  },
  {
    id: 2,
    title: 'Campaign - Jun 24',
    type: 'Survey',
    typeColor: 'bg-green-100 text-green-700',
    createdDate: 'Jun 24, 2025, 1:45 PM',
    description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
    recipients: 79,
    completed: 65,
    progress: 100,
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    timeRemaining: '1h 43m'
  },
  {
    id: 3,
    title: 'Campaign - Jun 23',
    type: 'Reminder',
    typeColor: 'bg-orange-100 text-orange-700',
    createdDate: 'Jun 23, 2025, 3:15 PM',
    description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
    recipients: 170,
    completed: 80,
    progress: 70,
    status: 'Paused',
    statusColor: 'bg-gray-100 text-gray-700',
    timeRemaining: '45m'
  },
  {
    id: 4,
    title: 'Campaign - Jun 25',
    type: 'Promo',
    typeColor: 'bg-purple-500 text-white',
    createdDate: 'Jun 25, 2025, 2:22 PM',
    description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
    recipients: 150,
    completed: 78,
    progress: 30,
    status: 'In Progress',
    statusColor: 'bg-yellow-100 text-yellow-800',
    timeRemaining: '2h 15m'
  },
  {
    id: 5,
    title: 'Campaign - Jun 24',
    type: 'Survey',
    typeColor: 'bg-green-100 text-green-700',
    createdDate: 'Jun 24, 2025, 1:45 PM',
    description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
    recipients: 79,
    completed: 65,
    progress: 100,
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    timeRemaining: '1h 43m'
  },
  {
    id: 6,
    title: 'Campaign - Jun 23',
    type: 'Reminder',
    typeColor: 'bg-orange-100 text-orange-700',
    createdDate: 'Jun 23, 2025, 3:15 PM',
    description: 'Hi Anjana, this is a friendly reminder about your upcoming appointment...',
    recipients: 170,
    completed: 80,
    progress: 70,
    status: 'Paused',
    statusColor: 'bg-gray-100 text-gray-700',
    timeRemaining: '45m'
  }
]

export const CAMPAIGN_STEPS: CampaignStep[] = [
  {
    step: 1,
    title: 'Campaign Information',
    description: 'Set up your campaign details and messaging'
  },
  {
    step: 2,
    title: 'Recipient Upload',
    description: 'Add recipients via file upload or manual entry'
  },
  {
    step: 3,
    title: 'Campaign Timing',
    description: 'Choose when to start your campaign'
  }
]

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'failed', label: 'Failed' },
  { value: 'paused', label: 'Paused' }
]

export const DATE_RANGE_OPTIONS = [
  { value: 'all', label: 'All Dates' },
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '6months', label: 'Last 6 Month' },
  { value: '1year', label: 'Last 1 Year' }
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'A To Z' }
]

export const TIME_ZONE_OPTIONS = [
  { value: 'utc', label: 'UTC (Coordinated Universal Time)' },
  { value: 'est', label: 'EST (Eastern Standard Time)' },
  { value: 'pst', label: 'PST (Pacific Standard Time)' },
  { value: 'gmt', label: 'GMT (Greenwich Mean Time)' },
  { value: 'cet', label: 'CET (Central European Time)' }
]

export const MERGE_TAGS = [
  { tag: 'name', label: 'name' },
  { tag: 'phone_number', label: 'phone_number' },
  { tag: 'appointment_date', label: 'appointment_date' },
  { tag: 'language', label: 'language' }
] 