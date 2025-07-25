import React from 'react'
import { IntegrationStatus } from './types'

interface IntegrationStatusBarProps {
  status: IntegrationStatus
  description: string
}

export const IntegrationStatusBar: React.FC<IntegrationStatusBarProps> = ({
  status,
  description
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className='flex'>
        <p className='font-semibold font-manrope text-md'>
          {description}
        </p>
      </div>
      <div className="flex space-x-4">
        {/* Active Integrations Status */}
        <div className="relative bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-semibold font-manrope text-md text-gray-900">
              Active Integrations: {status.activeCount}
            </span>
          </div>
        </div>
        
        {/* Developer Tools Status */}
        <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <span className="font-semibold font-manrope text-md text-gray-900">
            Developer Tools: {status.developerToolsCount}
          </span>
        </div>
      </div>
    </div>
  )
} 