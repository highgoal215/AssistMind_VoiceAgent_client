"use client"

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Camera, Upload } from 'lucide-react'
import { settingsService } from '@/lib/services/settingsService'
import { showToast } from '@/lib/utils/toast'

export default function ProfileSection() {
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Connor')
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567')
  const [profileImage, setProfileImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSaveChanges = async () => {
    setIsLoading(true)
    try {
      const result = await settingsService.updateProfile({
        firstName,
        lastName,
        phoneNumber,
        profileImage
      })
      
      if (result.success) {
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast.error('Please select a valid image file')
      return
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      showToast.error('Image size must be less than 2MB')
      return
    }

    setIsUploading(true)
    try {
      const result = await settingsService.uploadProfileImage(file)
      
      if (result.success && result.imageUrl) {
        setProfileImage(result.imageUrl)
        showToast.success(result.message)
      } else {
        showToast.error(result.message)
      }
    } catch (error) {
      showToast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      {/* Profile Image Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-4">Profile Image</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {profileImage ? (
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {firstName.charAt(0)}{lastName.charAt(0)}
              </div>
            )}
            <button
              onClick={handleImageClick}
              disabled={isUploading}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera className="w-3 h-3 text-white" />
              )}
            </button>
          </div>
          <div>
            <p className="font-bold font-manrope text-gray-900">Upload a new photo</p>
            <p className="text-md font-manrope font-semibold text-gray-600">
              Upload (JPG, PNG, GIF), max 2MB, with live preview.
            </p>
            {isUploading && (
              <p className="text-sm text-blue-600 font-semibold">Uploading...</p>
            )}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="firstName" className="text-lg font-bold font-manrope text-gray-700 mb-2 block">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-12 font-manrope font-semibold text-md"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-lg font-bold font-manrope text-gray-700 mb-2 block">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-12 font-manrope font-semibold text-md"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="text-lg font-bold font-manrope text-gray-700 mb-2 block">
              Phone number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-12 font-manrope font-semibold text-md"
            />
            <p className="text-md font-semibold font-manrope text-gray-500 mt-1">
              Personal phone number for account verification <br /> and notification
            </p>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveChanges}
            disabled={isLoading}
            className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-6 py-2 rounded-lg font-bold text-md font-manrope disabled:opacity-50"
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
    </>
  )
} 