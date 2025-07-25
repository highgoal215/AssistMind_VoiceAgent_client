import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  CAMPAIGN_DETAIL_TABS,
  CAMPAIGN_METRICS,
  CALL_RECORDS,
  RECIPIENTS_DATA,
  MESSAGE_SETUP_DATA,
  TIME_METRICS_DATA,
  CALL_RESULTS_DATA,
  CHART_OPTIONS
} from '@/components/campaigns'

export function useCampaignDetail() {
  const params = useParams()
  const router = useRouter()
  const campaignId = params.id as string
  
  // State management
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('call-records')
  const [showTooltip, setShowTooltip] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [campaignData, setCampaignData] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  // Fetch campaign data
  const fetchCampaignData = async () => {
    if (!campaignId) return
    
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch(`/api/campaigns/${campaignId}`)
      if (response.ok) {
        const data = await response.json()
        setCampaignData(data)
      } else {
        throw new Error('Failed to fetch campaign data')
      }
    } catch (error) {
      console.error('Error fetching campaign data:', error)
      setError(error instanceof Error ? error : new Error('Failed to load campaign data'))
      toast.error('Failed to load campaign data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaignData()
  }, [campaignId])

  // Event handlers
  const handleExport = async () => {
    try {
      setIsLoading(true)
      
      // Simulate export API call
      const response = await fetch(`/api/campaigns/${campaignId}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `campaign-${campaignId}-results.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        toast.success('Campaign results exported successfully')
      } else {
        throw new Error('Export failed')
      }
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export campaign results')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return
    }

    try {
      setIsLoading(true)
      
      // Simulate delete API call
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Campaign deleted successfully')
        router.push('/campaigns')
      } else {
        throw new Error('Delete failed')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete campaign')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadRecording = async (recordId: number) => {
    try {
      setIsLoading(true)
      
      // Simulate download API call
      const response = await fetch(`/api/calls/${recordId}/recording`, {
        method: 'GET',
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `call-recording-${recordId}.mp3`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        toast.success('Recording downloaded successfully')
      } else {
        throw new Error('Download failed')
      }
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download recording')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayRecording = async (recordId: number) => {
    try {
      // Simulate play API call - this would typically open an audio player
      const response = await fetch(`/api/calls/${recordId}/recording/stream`, {
        method: 'GET',
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        // Create and play audio element
        const audio = new Audio(audioUrl)
        audio.play()
        
        toast.success('Playing recording...')
      } else {
        throw new Error('Play failed')
      }
    } catch (error) {
      console.error('Play error:', error)
      toast.error('Failed to play recording')
    }
  }

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    // Save tab preference to localStorage
    localStorage.setItem('campaign-detail-active-tab', tabId)
  }

  const retry = () => {
    fetchCampaignData()
  }

  // Load saved tab preference
  useEffect(() => {
    const savedTab = localStorage.getItem('campaign-detail-active-tab')
    if (savedTab && CAMPAIGN_DETAIL_TABS.find(tab => tab.id === savedTab)) {
      setActiveTab(savedTab)
    }
  }, [])

  return {
    // Campaign data
    campaignId,
    campaignName: campaignData?.name || `Campaign - Jun 25`,
    campaignStatus: campaignData?.status || 'In Progress',
    campaignStatusColor: campaignData?.statusColor || 'bg-orange-100 text-orange-700',
    isLoading,
    error,
    
    // UI state
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeTab,
    setActiveTab: handleTabChange,
    showTooltip,
    
    // Data
    tabs: CAMPAIGN_DETAIL_TABS,
    metrics: CAMPAIGN_METRICS,
    callRecords: CALL_RECORDS,
    recipients: RECIPIENTS_DATA,
    messageSetup: MESSAGE_SETUP_DATA,
    timeMetricsData: TIME_METRICS_DATA,
    callResultsData: CALL_RESULTS_DATA,
    chartOptions: CHART_OPTIONS,
    
    // Event handlers
    handleExport,
    handleDelete,
    handleDownloadRecording,
    handlePlayRecording,
    toggleTooltip,
    retry
  }
} 