import React from 'react'
import { Button } from '@/components/ui/button'

interface AgentBehaviorStepProps {
  agentName: string
  roles: string[]
  selectedServices: string[]
  agentInstructions: string
  onAgentInstructionsChange: (value: string) => void
  onTest: () => void
  onLaunch: () => void
  showLoading: boolean
}

export function AgentBehaviorStep({
  agentName,
  roles,
  selectedServices,
  agentInstructions,
  onAgentInstructionsChange,
  onTest,
  onLaunch,
  showLoading
}: AgentBehaviorStepProps) {
  return (
    <div className="space-y-6">
      {/* Agent Behavior Header with Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mt-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl sm:text-2xl font-bold font-manrope text-gray-900">Agent Behavior</h3>
          <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-600">i</span>
          </div>
        </div>
        
        {/* Test and Launch Buttons - Positioned opposite to Agent Behavior */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto bg-gray-100 text-gray-700 hover:bg-gray-200 font-manrope font-bold"
            onClick={onTest}
          >
            Test my Agent
          </Button>
          <Button 
            onClick={onLaunch}
            disabled={showLoading}
            className="w-full sm:w-auto bg-[#4A48FF] hover:bg-[#4A48FF] text-white font-manrope font-bold"
          >
            {showLoading ? 'Launching...' : 'Launch my Agent'}
          </Button>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Agent Instructions */}
      <div className="space-y-4">
        <h4 className="text-xl sm:text-2xl font-bold font-manrope text-gray-900">Agent Instructions</h4>
        <div className="relative">
          <textarea
            value={agentInstructions || `${agentName}, ${roles.join(', ')}, ${selectedServices.join(', ')}, You are a helpful customer service representative. Be professional, friendly, and efficient. Always ask for clarification if you're unsure about what the customer needs.`}
            onChange={(e) => onAgentInstructionsChange(e.target.value)}
            className="w-full min-h-[200px] border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-blue-500 resize-none"
            placeholder="Enter agent instructions..."
            maxLength={2000}
          />
          <div className="absolute bottom-3 left-3 flex items-center space-x-1">
            <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-red-600">i</span>
            </div>
            <span className="text-sm font-manrope font-bold text-gray-500">2000-character limit</span>
          </div>
        </div>
      </div>
    </div>
  )
} 