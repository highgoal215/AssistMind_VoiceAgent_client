"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { settingsService } from '@/lib/services/settingsService'
import { showToast } from '@/lib/utils/toast'

interface NotificationSettings {
  callSummaryEmail: boolean
  callSummarySMS: boolean
  missedCallAlert: boolean
  weeklySummaryEmail: boolean
  paymentConfirmation: boolean
  paymentFailedAlert: boolean
  campaignSummary: boolean
}

interface NotificationItem {
  name: string
  description: string
  type: string
  key: keyof NotificationSettings
}

interface NotificationGroup {
  group: string
  notifications: NotificationItem[]
}

export default function NotificationsSection() {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    callSummaryEmail: true,
    callSummarySMS: true,
    missedCallAlert: true,
    weeklySummaryEmail: true,
    paymentConfirmation: true,
    paymentFailedAlert: true,
    campaignSummary: true
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadNotificationSettings = async () => {
      try {
        const settings = await settingsService.getNotificationSettings()
        setNotificationSettings(settings)
      } catch (error) {
        showToast.error('Failed to load notification settings')
      }
    }
    
    loadNotificationSettings()
  }, [])

  const handleToggleNotification = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSaveChanges = async () => {
    setIsLoading(true)
    try {
      const result = await settingsService.updateNotificationSettings(notificationSettings)
      
      if (result.success) {
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to save notification settings')
    } finally {
      setIsLoading(false)
    }
  }

  const notificationGroups: NotificationGroup[] = [
    {
      group: 'Call Notifications',
      notifications: [
        {
          name: 'Call summary Email',
          description: 'Short Summary after each call',
          type: 'Email',
          key: 'callSummaryEmail'
        },
        {
          name: 'Call Summary SMS',
          description: 'Short SMS summary + link after every call',
          type: 'SMS',
          key: 'callSummarySMS'
        },
        {
          name: 'Missed call alert',
          description: 'Notifies when a call wasn\'t answered by AI or human',
          type: 'Email',
          key: 'missedCallAlert'
        }
      ]
    },
    {
      group: 'Reports & Digests',
      notifications: [
        {
          name: 'Weekly summary email',
          description: 'High-level report of call activity leads, keywords',
          type: 'Email',
          key: 'weeklySummaryEmail'
        }
      ]
    },
    {
      group: 'Billings & Payments',
      notifications: [
        {
          name: 'Payment confirmation + Invoice',
          description: 'Email receipt and invoice sent after successful payment.',
          type: 'Email',
          key: 'paymentConfirmation'
        },
        {
          name: 'Payment failed alert',
          description: 'Billing alert or declined payment alert',
          type: 'Email',
          key: 'paymentFailedAlert'
        }
      ]
    },
    {
      group: 'Outbound Campaigns',
      notifications: [
        {
          name: 'Campaign Summary',
          description: 'Sends a summary with call results after each outbound campaign',
          type: 'Email',
          key: 'campaignSummary'
        }
      ]
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-2">Notifications</h2>
        <p className="text-md font-semibold font-manrope text-gray-600">
          The notification options selected during Agent Setup (Email/SMS or both)
        </p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-gray-900">GROUP</TableHead>
              <TableHead className="font-bold text-gray-900">NOTIFICATION</TableHead>
              <TableHead className="font-bold text-gray-900">DESCRIPTION</TableHead>
              <TableHead className="font-bold text-gray-900">TYPE</TableHead>
              <TableHead className="font-bold text-gray-900">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificationGroups.map((group) => 
              group.notifications.map((notification, index) => (
                <TableRow key={`${group.group}-${index}`}>
                  <TableCell className="font-semibold text-gray-900">
                    {index === 0 ? group.group : ''}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">{notification.name}</TableCell>
                  <TableCell className="text-gray-600">{notification.description}</TableCell>
                  <TableCell className="text-gray-600">{notification.type}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={notificationSettings[notification.key]}
                      onCheckedChange={() => handleToggleNotification(notification.key)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSaveChanges}
            disabled={isLoading}
            className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-6 py-3 rounded-lg font-bold text-lg font-manrope disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 