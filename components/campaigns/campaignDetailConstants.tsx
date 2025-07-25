import { Clock, TrendingUp, CheckCircle, Phone, Users } from 'lucide-react'
import { MetricCard, TabItem, CallRecord, Recipient, ChartData } from './types'

export const CAMPAIGN_DETAIL_TABS: TabItem[] = [
  { id: 'call-records', label: 'Call Records' },
  { id: 'recipients', label: 'Recipients' },
  { id: 'message-setup', label: 'Message Setup' },
  { id: 'insights', label: 'Insights' }
]

export const CAMPAIGN_METRICS: MetricCard[] = [
  { title: 'Created', value: 'Jun 25, 2025', icon: Clock, iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
  { title: 'Progress', value: '30%', icon: TrendingUp, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { title: 'Success Rate', value: '72%', icon: CheckCircle, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { title: 'Total Calls', value: '150', icon: Phone, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { title: 'Avg Duration', value: '2:45', icon: Clock, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { title: 'Recipients', value: '2', icon: Users, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' }
]

export const CALL_RECORDS: CallRecord[] = [
  {
    id: 1,
    name: 'Jerome Bell',
    number: '(702) 555-0122',
    status: 'Failed',
    statusColor: 'bg-red-100 text-red-700',
    duration: '4:32',
    hasRecording: true
  },
  {
    id: 2,
    name: 'Cameron Williamson',
    number: '(229) 555-0109',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    duration: '5:32',
    hasRecording: true
  },
  {
    id: 3,
    name: 'Bessie Cooper',
    number: '(252) 555-0126',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    duration: '7:12',
    hasRecording: true
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    number: '(308) 555-0121',
    status: 'Missed',
    statusColor: 'bg-orange-100 text-orange-700',
    duration: '4:32',
    hasRecording: false
  },
  {
    id: 5,
    name: 'Annette Black',
    number: '(405) 555-0128',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    duration: '2:10',
    hasRecording: true
  }
]

export const RECIPIENTS_DATA: Recipient[] = [
  {
    id: 1,
    name: 'Jerome Bell',
    number: '(702) 555-0122',
    language: 'English',
    status: 'Failed',
    statusColor: 'bg-red-100 text-red-700'
  },
  {
    id: 2,
    name: 'Cameron Williamson',
    number: '(229) 555-0109',
    language: 'Hindi',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    name: 'Bessie Cooper',
    number: '(252) 555-0126',
    language: 'Spanish',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    number: '(308) 555-0121',
    language: 'English',
    status: 'Missed',
    statusColor: 'bg-red-100 text-red-700'
  },
  {
    id: 5,
    name: 'Annette Black',
    number: '(405) 555-0128',
    language: 'Hindi',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700'
  }
]

export const MESSAGE_SETUP_DATA = {
  openingMessage: "Hi {name}, this is about your upcoming appointment on {appointment_date}.",
  scheduledTime: "Jun 25, 2025, 8:30:00 PM",
  startedTime: "Jun 25, 2025, 8:30:15 PM",
  callPrompt: "Be friendly and professional. Confirm appointment details. Ask about any questions they might have. Do not promise discounts or make commitments beyond appointment confirmation."
}

export const TIME_METRICS_DATA: ChartData = {
  labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  datasets: [
    {
      label: 'Success',
      data: [32, 28, 25, 30, 22, 18, 20, 15, 12],
      borderColor: '#1e40af',
      backgroundColor: '#1e40af',
      borderWidth: 2,
      pointBackgroundColor: '#1e40af',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      tension: 0.1,
    },
    {
      label: 'Failed',
      data: [8, 12, 10, 15, 6, 4, 7, 5, 3],
      borderColor: '#a855f7',
      backgroundColor: '#a855f7',
      borderWidth: 2,
      pointBackgroundColor: '#a855f7',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      tension: 0.1,
    },
  ],
}

export const CALL_RESULTS_DATA: ChartData = {
  labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
  datasets: [
    {
      label: 'Success',
      data: [25, 30, 28, 35, 22, 18, 20],
      backgroundColor: '#1e40af',
      borderColor: '#1e40af',
      borderWidth: 1,
      pointBackgroundColor: '#1e40af',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      tension: 0.1,
    },
    {
      label: 'Failed',
      data: [8, 12, 10, 15, 6, 4, 7],
      backgroundColor: '#a855f7',
      borderColor: '#a855f7',
      borderWidth: 1,
      pointBackgroundColor: '#a855f7',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      tension: 0.1,
    },
  ],
}

export const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#000000',
      bodyColor: '#000000',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: function(context: any) {
          return context[0].label
        },
        label: function(context: any) {
          const label = context.dataset.label || ''
          const value = context.parsed.y
          return `${label}: ${value}`
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 35,
      grid: {
        color: '#e5e7eb',
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
  },
} 