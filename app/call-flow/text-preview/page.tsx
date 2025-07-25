"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTextPreview } from '@/hooks/useTextPreview'
import {
  CallFlowLayout,
  ViewModeToggle,
  TextPreviewContent,
  TextPreviewControls
} from '@/components/call-flow'

export default function TextPreviewPage() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { flowData, showSuccess, copyToClipboard, downloadText } = useTextPreview()

  const handleViewModeChange = (mode: string) => {
    if (mode === 'visual') {
      router.push('/call-flow')
    } else if (mode === 'json') {
      router.push('/call-flow/json-config')
    }
  }

  return (
    <CallFlowLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      nodePaletteProps={{
        isReadOnly: true
      }}
    >
      {/* Text Preview Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Controls */}
        <TextPreviewControls
          showSuccess={showSuccess}
          onCopyToClipboard={copyToClipboard}
          onDownloadText={downloadText}
        />

        {/* Content */}
        <TextPreviewContent
          flowData={flowData}
          showSuccess={showSuccess}
          onCopyToClipboard={copyToClipboard}
          onDownloadText={downloadText}
        />

        {/* Bottom Controls */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Placeholder for zoom controls if needed */}
            </div>

            <ViewModeToggle
              currentMode="text"
              onModeChange={handleViewModeChange}
            />
          </div>
        </div>
      </div>
    </CallFlowLayout>
  )
} 