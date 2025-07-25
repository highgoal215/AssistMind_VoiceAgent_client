import React from 'react'
import { Plus, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Recipient } from './types'

interface RecipientUploadFormProps {
  uploadMethod: 'file-upload' | 'manual-input'
  recipients: Recipient[]
  onUploadMethodChange: (method: 'file-upload' | 'manual-input') => void
  onRecipientsChange: (recipients: Recipient[]) => void
  onAddRecipient: () => void
  onRemoveRecipient: (index: number) => void
  onRecipientChange: (index: number, field: keyof Recipient, value: string) => void
}

export default function RecipientUploadForm({
  uploadMethod,
  recipients,
  onUploadMethodChange,
  onRecipientsChange,
  onAddRecipient,
  onRemoveRecipient,
  onRecipientChange
}: RecipientUploadFormProps) {
  return (
    <>
      {/* Upload Method Selection */}
      <div className="sm:flex justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            onClick={() => onUploadMethodChange('file-upload')}
            className={`px-6 py-3 rounded-lg text-sm font-medium ${
              uploadMethod === 'file-upload'
                ? 'bg-[#4A48FF] text-white'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            File Upload
          </Button>
          <Button
            onClick={() => onUploadMethodChange('manual-input')}
            className={`px-6 py-3 rounded-lg text-sm font-medium ${
              uploadMethod === 'manual-input'
                ? 'bg-[#4A48FF] text-white'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Manual Input
          </Button>
        </div>
        <div className='flex'>
          <Button
            variant="outline"
            onClick={onAddRecipient}
            className="px-4 py-3 rounded-lg border-gray-300 text-gray-900 hover:bg-gray-50 text-sm font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Recipient
          </Button>
        </div>
      </div>

      {/* File Upload Area */}
      {uploadMethod === 'file-upload' && (
        <>
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Upload recipient file</h3>
              <p className="font-bold font-manrope text-gray-600 mb-4">
                Drag and drop your CSV or Excel file here, or click to browse
              </p>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Choose File
              </Button>
              <p className="text-md font-bold font-manrope text-gray-500 mt-2">
                csv, .xlsx (max 25MB)
              </p>
            </div>
          </div>

          {/* Template Information */}
          <div className="mb-8">
            <p className="text-gray-700 font-bold font-manrope">
              Template includes: name, phone_number
            </p>
          </div>
        </>
      )}

      {/* Manual Input Area */}
      {uploadMethod === 'manual-input' && (
        <>
          {/* Manual Input Fields */}
          <div className="mb-6">
            {recipients.map((recipient, index) => (
              <div key={recipient.id} className="flex items-end space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-md font-manrope font-bold text-gray-900 mb-2">
                    Name
                  </label>
                  <Input
                    placeholder="Enter Name"
                    value={recipient.name}
                    onChange={(e) => onRecipientChange(index, 'name', e.target.value)}
                    className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-md font-manrope font-bold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <Input
                    placeholder="Enter number"
                    value={recipient.phoneNumber}
                    onChange={(e) => onRecipientChange(index, 'phoneNumber', e.target.value)}
                    className="w-full bg-white border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] rounded-lg"
                  />
                </div>
                {recipients.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveRecipient(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mb-8">
            <div className="bg-[#EDEDFF] rounded-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Summary</h3>
              <div className="flex space-x-6 text-sm text-gray-900">
                <span>Recipient Count: {recipients.length}</span>
                <span>Input Method: Manual</span>
                <span>Status: Draft</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
} 