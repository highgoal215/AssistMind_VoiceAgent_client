"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Link, Check, Settings, TestTube, Power, Network, Code } from 'lucide-react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'
import Image from 'next/image'
import GoogleCalendarConfigModal, { GoogleCalendarConfig } from '@/components/modals/GoogleCalendarConfigModal'

interface IntegrationCard {
  id: string
  title: string
  description: string
  features: string[]
  isActive: boolean
}

interface DeveloperTool {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
}

export default function IntegrationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isGoogleCalendarModalOpen, setIsGoogleCalendarModalOpen] = useState(false)

  const integrations: IntegrationCard[] = [
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

  const developerTools: DeveloperTool[] = [
    {
      id: 'rest-api',
      title: 'REST API',
      subtitle: 'Full programmatic access',
      description: 'Access all voice agent data and controls through our RESTful API endpoints.',
      icon: (
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
              fill="white"
            />
          </svg>
        </div>
      )
    },
    {
      id: 'sdk-libraries',
      title: 'SDK Libraries',
      subtitle: 'JavaScript, Python, PHP',
      description: 'Pre-built libraries to accelerate your custom integration development.',
      icon: (
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
              fill="white"
            />
          </svg>
        </div>
      )
    }
  ]

  const handleConfigureClick = (integrationId: string) => {
    if (integrationId === 'google-calendar') {
      setIsGoogleCalendarModalOpen(true)
    }
  }

  const handleGoogleCalendarSave = (config: GoogleCalendarConfig) => {
    // Handle saving the Google Calendar configuration
    console.log('Google Calendar config saved:', config)
    // You can add API calls or state updates here
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* Integrations Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="space-y-8">
            {/* Integrations Section */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold font-manrope text-gray-900">Integrations</h1>
             
              {/* Status Bar */}
              <div className="flex justify-between items-center">
                <div className='flex'>
                  <p className='font-semibold font-manrope text-md'>Connect and manage third-party tools to automate your AI voice agent workflows.</p>
                </div>
                <div className="flex space-x-4">
                  {/* Active Integrations Status */}
                  <div className="relative bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-semibold font-manrope text-md text-gray-900">Active Integrations: 4</span>
                    </div>
                  </div>
                  
                  {/* Developer Tools Status */}
                  <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                    <span className="font-semibold font-manrope text-md text-gray-900">Developer Tools: 2</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                  <Card key={integration.id} className="bg-white shadow-sm border border-gray-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <CardTitle className="text-3xl font-bold text-gray-900">
                            {integration.title}
                          </CardTitle>
                        </div>
                        {integration.isActive && (
                          <Badge className="bg-green-100 text-green-800 border-green-200 font-bold font-manrope text-md">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-md font-semibold font-manrope text-gray-600 mt-2">
                        {integration.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold font-manrope text-gray-900">Key Features:</h4>
                        <ul className="space-y-1">
                          {integration.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-md  text-gray-600 font-medium font-manrope">
                              <Image src="/images/integration/check_feature.svg" alt='checkout' width={30} height={30} className='w-4 h-4' />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white text-md font-manrope font-bold"
                          onClick={() => handleConfigureClick(integration.id)}
                        >
                          Configure
                        </Button>
                        <Button size="sm" variant="outline" className='text-md font-manrope font-bold'>
                          Test
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 text-md font-manrope font-bold">
                          Disconnect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Developer Tools Section */}
            <div className="space-y-6 border border-gray-300 p-4 rounded-3xl bg-[#FFFFFF]">
              <div className="flex items-center space-x-2 ">
                <div className='flex justify-center items-center w-12 h-12 rounded-2xl bg-[#adacec]'>
                  <Image src="/images/integration/link.svg" alt='links' width={30} height={30} className='w-5 h-5 items-center' />
                </div>
                <h2 className="text-3xl font-bold font-manrope text-gray-900">Developer Tools</h2>
              </div>
              <p className="text-sm font-manrope font-bold text-gray-600">
                Advanced integration options for custom workflows and automation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {developerTools.map((tool) => (
                  <Card key={tool.id} className="bg-white shadow-sm border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        {tool.icon}
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-1 font-manrope">
                            {tool.title}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mb-3 font-manrope font-bold">
                            {tool.subtitle}
                          </p>
                          <p className="text-sm text-gray-600 mb-4 font-manrope font-bold">
                            {tool.description}
                          </p>
                          <Button size="sm" variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Google Calendar Configuration Modal */}
      <GoogleCalendarConfigModal
        isOpen={isGoogleCalendarModalOpen}
        onClose={() => setIsGoogleCalendarModalOpen(false)}
        onSave={handleGoogleCalendarSave}
      />
    </div>
  )
} 