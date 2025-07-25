"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { settingsService } from '@/lib/services/settingsService'
import { showToast } from '@/lib/utils/toast'

export default function DeveloperSection() {
  const [webhooksEnabled, setWebhooksEnabled] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState('https://api.example.com/webhooks')
  const [webhookSecret, setWebhookSecret] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveWebhookConfiguration = async () => {
    setIsLoading(true)
    try {
      const result = await settingsService.updateWebhookConfig({
        enabled: webhooksEnabled,
        url: webhookUrl,
        secret: webhookSecret
      })
      
      if (result.success) {
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to save webhook configuration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-4">Enable Webhooks</h2>
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-semibold font-manrope text-gray-900">Enable Webhooks</span>
        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
          <input
            type="checkbox"
            id="webhook-toggle"
            className="sr-only"
            checked={webhooksEnabled}
            onChange={(e) => setWebhooksEnabled(e.target.checked)}
          />
          <label
            htmlFor="webhook-toggle"
            className={`block w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
              webhooksEnabled ? 'bg-[#4A48FF]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
              webhooksEnabled ? 'transform translate-x-6' : 'transform translate-x-1'
            }`}></div>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="webhook-url" className="text-lg font-semibold font-manrope text-gray-900 mb-2 block">
            Webhook URL
          </Label>
          <Input
            id="webhook-url"
            type="url"
            placeholder="Enter webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="w-full h-12 font-manrope font-semibold text-md"
          />
        </div>

        <div>
          <Label htmlFor="webhook-secret" className="text-lg font-semibold font-manrope text-gray-900 mb-2 block">
            Webhook Secret (Optional)
          </Label>
          <Input
            id="webhook-secret"
            type="password"
            placeholder="Enter webhook Secret"
            value={webhookSecret}
            onChange={(e) => setWebhookSecret(e.target.value)}
            className="w-full h-12 font-manrope font-semibold text-md"
          />
          <p className="text-sm font-semibold font-manrope text-gray-500 mt-1">
            Used for HMAC-SHA256 signature verification
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleSaveWebhookConfiguration}
          disabled={isLoading}
          className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-6 py-3 rounded-lg font-bold text-lg font-manrope disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            'Save configuration'
          )}
        </Button>
      </div>
    </div>
  )
} 