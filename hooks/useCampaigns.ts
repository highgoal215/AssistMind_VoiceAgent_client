import { useState, useEffect } from 'react'
import { 
  Campaign, 
  CampaignFilters, 
  CampaignFormData, 
  Recipient 
} from '@/components/campaigns/types'
import { MOCK_CAMPAIGNS } from '@/components/campaigns/constants'

export function useCampaigns() {
  // Layout state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('campaigns')

  // Campaign list state
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS)
  const [filters, setFilters] = useState<CampaignFilters>({
    search: '',
    status: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  })

  // New campaign form state
  const [campaignStep, setCampaignStep] = useState(1)
  const [formData, setFormData] = useState<CampaignFormData>({
    campaignName: 'Campaign - Jul 8',
    openingMessage: 'Hi [[name]], this is call from...',
    callerInstructions: '',
    recipients: [{ id: 1, name: '', phoneNumber: '' }],
    uploadMethod: 'file-upload',
    timingOption: 'send-now'
  })

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

  // Filter campaigns based on current filters
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(filters.search.toLowerCase())
    
    const matchesStatus = filters.status === 'all' || 
                         campaign.status.toLowerCase().replace(' ', '-') === filters.status

    return matchesSearch && matchesStatus
  })

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (filters.sortBy) {
      case 'oldest':
        return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      case 'name':
        return a.title.localeCompare(b.title)
      case 'newest':
      default:
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    }
  })

  // Campaign actions
  const toggleCampaign = (campaignId: number) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        const newStatus = campaign.status === 'Paused' ? 'In Progress' : 'Paused'
        return {
          ...campaign,
          status: newStatus,
          statusColor: newStatus === 'Paused' 
            ? 'bg-gray-100 text-gray-700' 
            : 'bg-yellow-100 text-yellow-800'
        }
      }
      return campaign
    }))
  }

  const launchCampaign = () => {
    // Here you would typically send the campaign data to your API
    console.log('Launching campaign:', formData)
    
    // Reset form and go back to campaigns list
    setFormData({
      campaignName: 'Campaign - Jul 8',
      openingMessage: 'Hi [[name]], this is call from...',
      callerInstructions: '',
      recipients: [{ id: 1, name: '', phoneNumber: '' }],
      uploadMethod: 'file-upload',
      timingOption: 'send-now'
    })
    setCampaignStep(1)
    setActiveTab('campaigns')
  }

  const cancelNewCampaign = () => {
    setFormData({
      campaignName: 'Campaign - Jul 8',
      openingMessage: 'Hi [[name]], this is call from...',
      callerInstructions: '',
      recipients: [{ id: 1, name: '', phoneNumber: '' }],
      uploadMethod: 'file-upload',
      timingOption: 'send-now'
    })
    setCampaignStep(1)
    setActiveTab('campaigns')
  }

  return {
    // Layout state
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeTab,
    setActiveTab,

    // Campaign list state
    campaigns: sortedCampaigns,
    filters,
    setFilters,

    // New campaign form state
    campaignStep,
    setCampaignStep,
    formData,
    setFormData,

    // Actions
    toggleCampaign,
    launchCampaign,
    cancelNewCampaign
  }
} 