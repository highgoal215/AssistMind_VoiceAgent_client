'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Menu, Search, Moon, Bell, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
    const pathname = usePathname()
    
    // Pages that should show search input
    const pagesWithSearch = ['/dashboard', '/ai-agent']
    const shouldShowSearch = pagesWithSearch.includes(pathname)
    
    return (
        <>
        {/* Header */}
        <header className="bg-white border-gray-200 px-4 lg:px-6 py-4 border">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Always on left */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileMenuToggle}
              className="lg:hidden mr-2"
            >
              <Image 
                src="/images/dashboard/menu-button.svg" 
                alt="Toggle menu"
                width={20}
                height={20}
                className="filter brightness-0"
              />
            </Button>

            {/* Center Content */}
            <div className="flex items-center flex-1 justify-center lg:justify-start">
              {/* Search Bar - Only show on Dashboard and AI Agent pages */}
              {shouldShowSearch && (
                <div className="flex items-center max-w-sm lg:max-w-md">
                  <div className="relative w-full rounded-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 " />
                    <Input
                      placeholder="Search"
                      className="pl-10 w-full bg-gray-100 border-gray-200 text-sm font-semibold font-manrope"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Dark Mode Button - Hidden on mobile */}
              <Button variant="outline" className="hidden lg:flex bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200 font-bold font-manrope">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  2
                </span>
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-600 hidden lg:block" />
              </div>
            </div>
          </div>
        </header>
        </>
    )
}