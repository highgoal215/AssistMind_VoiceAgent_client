import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Play, X, ChevronDown, Check } from 'lucide-react'

interface AgentProfileStepProps {
  agentName: string
  onAgentNameChange: (name: string) => void
  roles: string[]
  onRolesChange: (roles: string[]) => void
  welcomeMessage: string
  onWelcomeMessageChange: (message: string) => void
  selectedVoice: string
  onVoiceChange: (voice: string) => void
  language: string
  onLanguageChange: (language: string) => void
  avatarImage: string | null
  onAvatarChange: (image: string | null) => void
}

const availableRoles = [
  'Receptionist',
  'Appointment Booker',
  'Lead Qualifier',
  'Customer Support',
  'Sales Representative',
  'Technical Support',
  'Booking Agent',
  'Information Desk'
]

const voiceOptions = [
  { value: 'female-calm', label: 'Female - Calm and Professional' },
  { value: 'female-energetic', label: 'Female - Energetic and Friendly' },
  { value: 'male-calm', label: 'Male - Calm and Professional' },
  { value: 'male-energetic', label: 'Male - Energetic and Friendly' }
]

export function AgentProfileStep({
  agentName,
  onAgentNameChange,
  roles,
  onRolesChange,
  welcomeMessage,
  onWelcomeMessageChange,
  selectedVoice,
  onVoiceChange,
  language,
  onLanguageChange,
  avatarImage,
  onAvatarChange
}: AgentProfileStepProps) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)

  // Handle click outside to close role dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isRoleDropdownOpen && !target.closest('.role-dropdown')) {
        setIsRoleDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isRoleDropdownOpen])

  const removeRole = (roleToRemove: string) => {
    onRolesChange(roles.filter(role => role !== roleToRemove))
  }

  const handleRoleSelect = (role: string) => {
    if (roles.includes(role)) {
      onRolesChange(roles.filter(r => r !== role))
    } else {
      onRolesChange([...roles, role])
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        onAvatarChange(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10">
      {/* Left Column - Agent Profile */}
      <div className="flex-1 space-y-6">
        {/* Agent Avatar */}
        <div>
          <label className="block text-sm sm:text-md font-bold text-gray-700 mb-4">
            Agent Avatar
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-14 h-14 sm:w-16 sm:h-16">
                <AvatarImage src={avatarImage || "/images/user-profile.jpg"} />
                <AvatarFallback className="bg-blue-600 text-white text-lg">A</AvatarFallback>
              </Avatar>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload">
                <Button
                  variant="outline"
                  className="font-bold border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
            What's your agent's name?
          </label>
          <Input
            value={agentName}
            onChange={(e) => onAgentNameChange(e.target.value)}
            className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF]"
          />
        </div>

        {/* Role */}
        <div className="role-dropdown">
          <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
            Role
          </label>
          <div className="relative">
            {/* Role Dropdown Button */}
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A48FF] focus:border-[#4A48FF]"
            >
              <span className="text-gray-700">Select roles</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Role Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {availableRoles.map((role) => (
                  <div
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${roles.includes(role)
                      ? 'bg-[#4A48FF] border-[#4A48FF]'
                      : 'border-gray-300'
                      }`}>
                      {roles.includes(role) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-gray-700">{role}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Roles Display */}
            {roles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {roles.map((role, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center space-x-1 hover:bg-gray-200"
                  >
                    <span>{role}</span>
                    <button
                      onClick={() => removeRole(role)}
                      className="ml-1 hover:text-red-500 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Welcome Message */}
        <div>
          <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
            Welcome Message
          </label>
          <Textarea
            value={welcomeMessage}
            onChange={(e) => onWelcomeMessageChange(e.target.value)}
            className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] min-h-[100px] resize-none"
            placeholder="Enter your welcome message..."
          />
        </div>
      </div>

      {/* Right Column - Voice and Language */}
      <div className="flex-1 space-y-6">
        {/* Voice Selection */}
        <div>
          <label className="block text-sm font-bold font-manrope text-gray-700 mb-6">
            Choose your agent's voice
          </label>
          <Select value={selectedVoice} onValueChange={onVoiceChange}>
            <SelectTrigger className="border-gray-300 focus:border-[#4A48FF] focus:ring-[#4A48FF] font-semibold font-manrope">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {voiceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div className='flex flex-col pt-6'>
          <label className="block text-sm font-bold font-manrope text-gray-700 mb-1">
            Language
          </label>
          <Input
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="border-gray-300 bg-gray-50 cursor-not-allowed text-gray-500"
            disabled
          />
        </div>

        {/* Preview Voice */}
        <div className='flex flex-col'>
          <label className="block text-sm font-manrope font-bold text-gray-700 mb-2">
            Preview Voice
          </label>
          <div className="flex items-center space-x-4 border border-gray-300 shadow-lg h-10 rounded-md px-1">
            <Button
              size="icon"
              className="w-8 h-8 bg-[#4A48FF] hover:bg-[#3a39e8] rounded-full"
            >
              <Play className="h-5 w-5 text-white ml-0.5" />
            </Button>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#4A48FF] h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <span className="text-sm font-manrope font-semibold text-gray-500 whitespace-nowrap">1m 12s</span>
          </div>
        </div>
      </div>
    </div>
  )
} 