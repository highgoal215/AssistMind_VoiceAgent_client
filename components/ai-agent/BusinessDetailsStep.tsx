import React from 'react'

interface BusinessDetailsStepProps {
  businessName: string
  onBusinessNameChange: (value: string) => void
  businessPhone: string
  onBusinessPhoneChange: (value: string) => void
  businessEmail: string
  onBusinessEmailChange: (value: string) => void
  businessAddress: string
  onBusinessAddressChange: (value: string) => void
}

export function BusinessDetailsStep({
  businessName,
  onBusinessNameChange,
  businessPhone,
  onBusinessPhoneChange,
  businessEmail,
  onBusinessEmailChange,
  businessAddress,
  onBusinessAddressChange
}: BusinessDetailsStepProps) {
  return (
    <div className="space-y-8 mt-8">
      {/* Business Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold font-manrope text-gray-900 mb-6">Business Details</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
              Business Name
            </label>
            <input
              value={businessName}
              onChange={(e) => onBusinessNameChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
              placeholder="Enter your business name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              value={businessPhone}
              onChange={(e) => onBusinessPhoneChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
              Email
            </label>
            <input
              value={businessEmail}
              onChange={(e) => onBusinessEmailChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-manrope text-gray-700 mb-2">
              Business Address
            </label>
            <input
              value={businessAddress}
              onChange={(e) => onBusinessAddressChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#4A48FF] focus:ring-[#4A48FF] text-sm"
              placeholder="Enter business address"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 