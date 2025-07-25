import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MERGE_TAGS } from './constants'

interface CampaignInformationFormProps {
  campaignName: string
  openingMessage: string
  callerInstructions: string
  onCampaignNameChange: (value: string) => void
  onOpeningMessageChange: (value: string) => void
  onCallerInstructionsChange: (value: string) => void
  onInsertMergeTag: (tag: string) => void
}

export default function CampaignInformationForm({
  campaignName,
  openingMessage,
  callerInstructions,
  onCampaignNameChange,
  onOpeningMessageChange,
  onCallerInstructionsChange,
  onInsertMergeTag
}: CampaignInformationFormProps) {
  return (
    <>
      {/* Campaign Name */}
      <div className="mb-6">
        <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
          Campaign Name
        </label>
        <Input
          value={campaignName}
          onChange={(e) => onCampaignNameChange(e.target.value)}
          className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
        />
      </div>

      {/* Opening Message */}
      <div className="mb-6">
        <label className="block text-md font-bold font-manrope text-gray-700 mb-2">
          Opening Message
        </label>
        <Input
          value={openingMessage}
          onChange={(e) => onOpeningMessageChange(e.target.value)}
          className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] mb-2"
        />
        <p className="text-sm text-gray-500 mb-3">Use merge tags for personalization</p>

        {/* Quick Insert Buttons */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Insert:</p>
          <div className="flex space-x-2">
            {MERGE_TAGS.slice(0, 3).map((tag) => (
              <Button
                key={tag.tag}
                variant="outline"
                size="sm"
                onClick={() => onInsertMergeTag(tag.tag)}
                className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
              >
                {tag.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Caller Instructions */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <label className="block text-md font-bold font-manrope text-gray-700">
            Caller Instructions
          </label>
          <div className="ml-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">i</span>
          </div>
        </div>
        <div className="relative">
          <Textarea
            value={callerInstructions}
            onChange={(e) => onCallerInstructionsChange(e.target.value)}
            placeholder="Define the AI agents personality..."
            className="w-full h-32 border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] resize-none pr-12"
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {callerInstructions.length}/5000
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Include: Tone, Personality, Environment, Goal, Guardrails</p>

        {/* Quick Insert Buttons for Caller Instructions */}
        <div className="mt-4">
          <p className="text-md font-bold font-manrope text-gray-700 mb-2">Quick Insert:</p>
          <div className="flex space-x-2">
            {MERGE_TAGS.map((tag) => (
              <Button
                key={tag.tag}
                variant="outline"
                size="sm"
                onClick={() => onInsertMergeTag(tag.tag)}
                className="bg-[#4A48FF] text-white border-[#4A48FF] hover:bg-[#3a38ef] text-xs px-3 py-1"
              >
                {tag.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 