"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Camera, Upload, Check, Edit, CreditCard } from 'lucide-react'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'
import Header from '@/components/header/header'
import Image from 'next/image'
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

  const handleManageSubscription = () => {
    // Handle manage subscription logic
    console.log('Managing subscription')
  }

  const handleUpdateInformation = () => {
    // Handle update information logic
    console.log('Updating information')
  }

  const handleCancelSubscription = () => {
    // Handle cancel subscription logic
    console.log('Canceling subscription')
  }

  const handleChangePlan = () => {
    // Handle change plan logic
    console.log('Changing plan')
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
              <h1 className="text-3xl font-bold font-manrope text-gray-900 mb-2">
                {activeTab === 'profile' ? 'Profile' :
                  activeTab === 'subscriptions' ? 'Subscriptions' :
                    activeTab === 'developer' ? 'Developer' : 'Notifications'}
              </h1>
              <p className="text-md font-semibold font-manrope text-gray-600">
                {activeTab === 'profile' ? 'Update personal information and profile image.' :
                  activeTab === 'subscriptions' ? 'Manage subscription plan and billing details.' :
                    activeTab === 'developer' ? 'Manage developer settings and API access.' :
                      'Manage your notification preferences.'}
              </p>
            </div>

            {/* Profile Content */}
            {activeTab === 'profile' && (
              <>
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
                      <Label htmlFor="phoneNumber" className="text-lg font-bold font-manrope text-gray-700 mb-2 block">
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
                        Personal phone number for account verification <br /> and notification
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
              </>
            )}

            {/* Subscriptions Content */}
            {activeTab === 'subscriptions' && (
              <>
                {/* Plan Details Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-3xl font-bold font-manrope text-gray-900 mb-6">Plan Details</h2>
                  <div className="flex justify-between space-x-14">
                    <div className='flex-1 flex-col space-y-6'>
                      {/* Current Plan Row */}
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-lg font-semibold font-manrope text-gray-900">Current Plan:</span>
                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-md font-semibold font-manrope">
                          Pro Plan
                        </span>
                      </div>

                      {/* Payment Method Row */}
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-lg font-semibold font-manrope text-gray-900">Payment Method:</span>
                        <span className="text-lg font-semibold font-manrope text-gray-900">**** 4562 VISA</span>
                      </div>

                      {/* Next Invoice Amount Row */}
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-lg font-semibold font-manrope text-gray-900">Next Invoice Amount:</span>
                        <span className="text-lg font-semibold font-manrope text-gray-900">$462.50</span>
                      </div>
                    </div>

                    <div className='flex-1 flex-col space-y-6'>
                      {/* Next Invoice Date Row */}
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-lg font-semibold font-manrope text-gray-900">Next Invoice Date:</span>
                        <span className="text-lg font-semibold font-manrope text-gray-900">Jul 16, 2025</span>
                      </div>

                      {/* Status Row */}
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <span className="text-lg font-semibold font-manrope text-gray-900">Status:</span>
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-lg font-semibold font-manrope">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Manage Subscription Button */}
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleManageSubscription}
                      className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white px-6 py-3 rounded-lg font-bold text-lg h-14 font-manrope"
                    >
                      Manage Subscription
                    </Button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 gap-10">
                  <h2 className="text-3xl font-bold font-manrope text-gray-900">Current Subscription</h2>
                  <p className="text-md font-bold font-manrope text-gray-900">Your current Plan</p>
                  {/* Billing Information Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-300 mt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold font-manrope text-gray-900">Billing Information</h2>
                      <button
                        onClick={handleUpdateInformation}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 font-semibold font-manrope"
                      >
                        <span>Update Information</span>
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Name and Email Row */}
                      <div className="flex gap-4">
                        <div>
                          <p className="text-sm font-semibold font-manrope text-gray-900 mb-2">Name</p>
                          <p className="text-lg font-bold font-manrope text-gray-900">Alex B.</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold font-manrope text-gray-900 mb-2">Email</p>
                          <p className="text-lg font-bold font-manrope text-gray-900">alexb.@gmail.com</p>
                        </div>
                      </div>

                      {/* Amount Row */}
                      <div>
                        <p className="text-sm font-semibold font-manrope text-gray-900 mb-2">Amount</p>
                        <p className="text-2xl font-bold font-manrope text-gray-900">$50 per month</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        onClick={handleCancelSubscription}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold font-manrope"
                      >
                        Cancel Subscription
                      </Button>
                      <Button
                        onClick={handleChangePlan}
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg font-semibold font-manrope"
                      >
                        Change Plan
                      </Button>
                    </div>
                  </div>

                  {/* Pricing Plans Section */}
                  <div className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Basic Plan */}
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="relative">
                          <span className="absolute top-0 right-0 bg-purple-100 text-[#4A48FF] px-2 py-1 rounded text-xs font-semibold font-manrope">
                            Popular
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-manrope text-gray-900 mb-2">Basic plan</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold font-manrope text-gray-900">$10</span>
                          <span className="text-sm font-semibold font-manrope text-gray-600"> per month</span>
                        </div>
                        <p className="text-sm font-semibold font-manrope text-gray-600 mb-4">Our most popular plan.</p>
                        <Button className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-2 rounded-md font-semibold font-manrope mb-4">
                          Get started
                        </Button>
                        <div className="mb-4">
                          <h4 className="text-sm font-bold font-manrope text-gray-900 mb-2">FEATURES</h4>
                          <p className="text-sm font-semibold font-manrope text-gray-600 mb-3">Everything in our free plan plus....</p>
                        </div>
                        <ul className="space-y-2">
                          {['Access to basic features', 'Basic reporting and analytics', 'Up to 10 individual users', '20 GB individual data', 'Basic chat and email support'].map((feature) => (
                            <li key={feature} className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-[#4A48FF] rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                                <Image src="/images/setting/paymentcheck.svg" alt="check" width={10} height={10} className='w-3 h-3' />
                              </div>
                              <span className="text-sm font-semibold font-manrope text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Business Plan - Current */}
                      <div className="bg-[#4A48FF] rounded-lg shadow-sm p-6 text-white">
                        <div className="relative">
                          <span className="absolute top-0 right-0 bg-white text-[#4A48FF] px-2 py-1 rounded text-xs font-semibold font-manrope">
                            Current Plan
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-manrope text-white mb-2">Business plan</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold font-manrope text-white">$50</span>
                          <span className="text-sm font-semibold font-manrope text-purple-200"> per month</span>
                        </div>
                        <p className="text-sm font-semibold font-manrope text-purple-200 mb-4">Growing teams up to 20 users.</p>
                        <Button
                          onClick={handleChangePlan}
                          className="w-full bg-white text-[#4A48FF] hover:bg-gray-100 py-2 rounded-md font-semibold font-manrope mb-4 border border-[#4A48FF]"
                        >
                          Change Plan
                        </Button>
                        <div className="mb-4">
                          <h4 className="text-sm font-bold font-manrope text-white mb-2">FEATURES</h4>
                          <p className="text-sm font-semibold font-manrope text-purple-200 mb-3">Everything in Basic plus....</p>
                        </div>
                        <ul className="space-y-2">
                          {['200+ integrations', 'Advanced reporting and analytics', 'Up to 20 individual users', '40 GB individual data', 'Priority chat and email support'].map((feature) => (
                            <li key={feature} className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-[#4A48FF]" />
                              </div>
                              <span className="text-sm font-semibold font-manrope text-purple-200">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Enterprise Plan */}
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h3 className="text-xl font-bold font-manrope text-gray-900 mb-2">Enterprise plan</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold font-manrope text-gray-900">$99</span>
                          <span className="text-sm font-semibold font-manrope text-gray-600"> per month</span>
                        </div>
                        <p className="text-sm font-semibold font-manrope text-gray-600 mb-4">Advanced features + unlimited users.</p>
                        <Button className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-2 rounded-md font-semibold font-manrope mb-4">
                          Get started
                        </Button>
                        <div className="mb-4">
                          <h4 className="text-sm font-bold font-manrope text-gray-900 mb-2">FEATURES</h4>
                          <p className="text-sm font-semibold font-manrope text-gray-600 mb-3">Everything in Business plus....</p>
                        </div>
                        <ul className="space-y-2">
                          {['Advanced custom fields', 'Audit log and data history', 'Unlimited individual users', 'Unlimited individual data', 'Personalized + priority service'].map((feature) => (
                            <li key={feature} className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-[#4A48FF] rounded-full flex items-center justify-center">
                                <Image src="/images/setting/paymentcheck.svg" alt="check" width={10} height={10} className='w-3 h-3' />
                              </div>
                              <span className="text-sm font-semibold font-manrope text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
              </>
            )}

            {/* Developer Content */}
            {activeTab === 'developer' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center py-12">
                  <p className="text-gray-500 font-semibold font-manrope">Developer settings coming soon...</p>
                </div>
              </div>
            )}

            {/* Notifications Content */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center py-12">
                  <p className="text-gray-500 font-semibold font-manrope">Notification settings coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 