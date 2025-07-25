import React from 'react'
import { Button } from '@/components/ui/button'
import { CampaignStep, CampaignFormData, Recipient } from './types'
import { CAMPAIGN_STEPS } from './constants'
import CampaignStepIndicator from './CampaignStepIndicator'
import CampaignInformationForm from './CampaignInformationForm'
import RecipientUploadForm from './RecipientUploadForm'
import CampaignTimingForm from './CampaignTimingForm'

interface NewCampaignFormProps {
  currentStep: number
  formData: CampaignFormData
  onStepChange: (step: number) => void
  onFormDataChange: (data: CampaignFormData) => void
  onCancel: () => void
  onLaunch: () => void
}

export default function NewCampaignForm({
  currentStep,
  formData,
  onStepChange,
  onFormDataChange,
  onCancel,
  onLaunch
}: NewCampaignFormProps) {
  const currentStepData = CAMPAIGN_STEPS.find(step => step.step === currentStep)

  const handleFormDataChange = (updates: Partial<CampaignFormData>) => {
    onFormDataChange({
      ...formData,
      ...updates
    })
  }

  const handleInsertMergeTag = (tag: string) => {
    // This would typically insert the tag at the cursor position
    // For now, we'll append it to the current field
    const tagText = `[[${tag}]]`
    if (currentStep === 1) {
      // Insert into opening message or caller instructions based on context
      handleFormDataChange({
        openingMessage: formData.openingMessage + tagText
      })
    }
  }

  const handleAddRecipient = () => {
    const newRecipient: Recipient = {
      id: Date.now(),
      name: '',
      phoneNumber: ''
    }
    handleFormDataChange({
      recipients: [...formData.recipients, newRecipient]
    })
  }

  const handleRemoveRecipient = (index: number) => {
    const newRecipients = formData.recipients.filter((_, i) => i !== index)
    handleFormDataChange({ recipients: newRecipients })
  }

  const handleRecipientChange = (index: number, field: keyof Recipient, value: string) => {
    const newRecipients = [...formData.recipients]
    newRecipients[index] = {
      ...newRecipients[index],
      [field]: value
    }
    handleFormDataChange({ recipients: newRecipients })
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
      {/* Campaign Information Header */}
      <div className="flex flex-col justify-start mb-8">
        <h2 className="text-3xl font-manrope font-bold text-gray-900 mb-2">
          {currentStepData?.title}
        </h2>
        <p className="text-gray-500 font-bold font-manrope">
          {currentStepData?.description}
        </p>
      </div>

      {/* Progress Steps */}
      <CampaignStepIndicator steps={CAMPAIGN_STEPS} currentStep={currentStep} />

      {/* Step Content */}
      {currentStep === 1 && (
        <CampaignInformationForm
          campaignName={formData.campaignName}
          openingMessage={formData.openingMessage}
          callerInstructions={formData.callerInstructions}
          onCampaignNameChange={(value) => handleFormDataChange({ campaignName: value })}
          onOpeningMessageChange={(value) => handleFormDataChange({ openingMessage: value })}
          onCallerInstructionsChange={(value) => handleFormDataChange({ callerInstructions: value })}
          onInsertMergeTag={handleInsertMergeTag}
        />
      )}

      {currentStep === 2 && (
        <RecipientUploadForm
          uploadMethod={formData.uploadMethod}
          recipients={formData.recipients}
          onUploadMethodChange={(method) => handleFormDataChange({ uploadMethod: method })}
          onRecipientsChange={(recipients) => handleFormDataChange({ recipients })}
          onAddRecipient={handleAddRecipient}
          onRemoveRecipient={handleRemoveRecipient}
          onRecipientChange={handleRecipientChange}
        />
      )}

      {currentStep === 3 && (
        <CampaignTimingForm
          timingOption={formData.timingOption}
          scheduledDate={formData.scheduledDate}
          scheduledTime={formData.scheduledTime}
          timeZone={formData.timeZone}
          onTimingOptionChange={(option) => handleFormDataChange({ timingOption: option })}
          onScheduledDateChange={(date) => handleFormDataChange({ scheduledDate: date })}
          onScheduledTimeChange={(time) => handleFormDataChange({ scheduledTime: time })}
          onTimeZoneChange={(timeZone) => handleFormDataChange({ timeZone })}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={() => onStepChange(currentStep - 1)}
            className="px-6 py-2 rounded-lg bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
          >
            Back
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
        >
          Cancel
        </Button>
        {currentStep < 3 ? (
          <Button 
            onClick={() => onStepChange(currentStep + 1)}
            className="px-6 py-2 rounded-lg bg-[#4A48FF] hover:bg-[#3a38ef] text-white"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={onLaunch}
            className="px-6 py-2 rounded-lg bg-[#4A48FF] hover:bg-[#3a38ef] text-white"
          >
            Launch Campaign
          </Button>
        )}
      </div>
    </div>
  )
} 