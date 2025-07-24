"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Camera, Upload } from 'lucide-react'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'

const navigationTabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'developer', label: 'Developer' },
  { id: 'notifications', label: 'Notifications' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSaveChanges = () => {
    // Handle save changes logic
    console.log('Saving changes:', { firstName, lastName, phoneNumber })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* Settings Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto space-y-6">
            {/* Navigation Tabs */}
            <div className="flex flex-col justify-between  bg-white w-3/4 h-14 rounded-lg p-1 shadow-md mb-6 border border-gray-300">
              <div className="flex space-x-1">
                {navigationTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 rounded-lg px-4 py-2 text-xl font-bold font-manrope transition-colors ${activeTab === tab.id
                        ? "bg-[#EDEDFF] text-[#4A48FF]"
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-manrope text-gray-900 mb-2">Profile</h1>
              <p className="text-md font-semibold font-manrope text-gray-600">Update personal information and profile image.</p>
            </div>
            {/* Main Content Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Profile Image Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-4">Profile Image</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      JC
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <Camera className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold font-manrope text-gray-900">Upload a new photo</p>
                    <p className="text-md font-manrope font-semibold text-gray-600">Upload (JPG, PNG, GIF), max 2MB, with live preview.</p>
                  </div>
                </div>
              </div>

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
                    className="w-full h-12 font-manrope font-semibol text-md "
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
                    className="w-full h-12 font-manrope font-semibold text-md "
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-lg font-manrope font-bold text-gray-700 mb-2 block">
                    Phone number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-12 font-manrope font-semibold text-md "
                  />
                  <p className="text-md font-semibold font-manrope text-gray-500 mt-1">
                    Personal phone number for account verification and notification
                  </p>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveChanges}
                  className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-6 py-2 rounded-lg font-bold text-md font-manrope"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 