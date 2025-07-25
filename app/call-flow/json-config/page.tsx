"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useJsonConfig } from '@/hooks/useJsonConfig'
import { Textarea } from '@/components/ui/textarea'
import {
  CallFlowLayout,
  ViewModeToggle,
  JsonConfigControls,
  JsonValidationAlert
} from '@/components/call-flow'

export default function JsonConfigPage() {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const {
    jsonConfig,
    isValid,
    validationMessage,
    showSuccess,
    handleJsonChange,
    copyToClipboard,
    downloadJson,
    uploadJson,
    formatJson,
    clearJson,
    saveToLocalStorage
  } = useJsonConfig()

  const handleViewModeChange = (mode: string) => {
    if (mode === 'visual') {
      router.push('/call-flow')
    } else if (mode === 'text') {
      router.push('/call-flow/text-preview')
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
      {/* JSON Config Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Controls */}
        <JsonConfigControls
          isValid={isValid}
          onUploadJson={uploadJson}
          onDownloadJson={downloadJson}
          onCopyToClipboard={copyToClipboard}
          onFormatJson={formatJson}
          onClearJson={clearJson}
          onSaveToLocalStorage={saveToLocalStorage}
        />

        {/* Validation Alert */}
        <JsonValidationAlert
          isValid={isValid}
          message={validationMessage}
        />

        {/* JSON Content Area */}
        <div className="flex-1 bg-gray-900 relative overflow-auto p-6">
          <Textarea
            value={jsonConfig}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="font-mono text-sm h-full w-full resize-none bg-gray-900 text-green-400 border-gray-700 focus:border-gray-600"
            placeholder="Enter your JSON configuration here..."
          />
        </div>

        {/* Bottom Controls */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Placeholder for zoom controls if needed */}
            </div>

            <ViewModeToggle
              currentMode="json"
              onModeChange={handleViewModeChange}
            />
          </div>
        </div>
      </div>
    </CallFlowLayout>
  )
} 