"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'
import Link from 'next/link'

const navigationItems = [
  { name: 'Dashboard', icon: '/images/sidebar/Dashboard.svg', href: '/dashboard', current: false },
  { name: 'AI Agent', icon: '/images/sidebar/AIAgent.svg', href: '/ai-agent', current: false },
  { name: 'Call Flow Builder', icon: '/images/sidebar/Call-builder.svg', href: '/call-flow', current: false },
  { name: 'Calls', icon: '/images/sidebar/call.svg', href: '/calls', current: false },
  { name: 'Campaigns', icon: '/images/sidebar/campaign.svg', href: '/campaigns', current: false },
  { name: 'Messages', icon: '/images/sidebar/message.svg', href: '/messages', current: false },
  { name: 'Knowledge Base', icon: '/images/sidebar/knowledge.svg', href: '/knowledge', current: false },
  { name: 'Integrations', icon: '/images/sidebar/integration.svg', href: '/integrations', current: false },
  { name: 'Settings', icon: '/images/sidebar/settings.svg', href: '/setting', current: false },
]

interface DashboardSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export default function DashboardSidebar({ 
  isCollapsed, 
  onToggle, 
  isMobileOpen = false, 
  onMobileClose 
}: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-[#FFFFFF]  bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "bg-[#FFFFFF] flex flex-col h-full transition-all duration-300 fixed lg:relative z-50 border-b border-gray-200",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className="py-3 border border-gray-300">
          <div className="flex items-center justify-center gap-1 px-4">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <Image src="/images/logo2.svg" alt="AssistMind AI" width={30} height={30} className='w-3/4 min-h-min' />
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="h-8 w-8 text-black"
                >
                  <Image 
                    src="/images/dashboard/menu-button.svg" 
                    alt="Toggle sidebar"
                    width={isCollapsed ? 32 : 20}
                    height={isCollapsed ? 32 : 20}
                    className="filter brightness-0 "
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 py-6 ",
          isCollapsed ? "px-2" : "px-4  "
        )}>
          <div className="mb-1 ">
            {!isCollapsed && <h3 className="text-sm font-manrope font-semibold text-gray-400 ">Menu</h3>}
          </div>
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={onMobileClose}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg text-md font-manrope font-bold transition-colors",
                          isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-2",
                          isActive
                            ? "bg-[#4A48FF] text-white shadow-lg"
                            : "text-[#212123] hover:bg-gray-300 hover:text-black font-manrope font-bold"
                        )}
                      >
                        <Image 
                          src={item.icon} 
                          alt={item.name}
                          width={isCollapsed ? 20 : 16}
                          height={isCollapsed ? 20 : 16}
                          className={cn(
                            isActive ? "filter brightness-0 invert" : "filter brightness-0"
                          )}
                        />
                        {!isCollapsed && <span>{item.name}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Trial Plan Card */}
        {!isCollapsed && (
          <div className="p-4">
            <div
              className="rounded-[16px] p-4 text-white"
              style={{
                background: 'linear-gradient(135deg, #4A48FF, #4A48FF, #43CBFF)',
              }}
            >
              <h3 className="text-lg font-bold font-manrope mb-2">7 Day Free Trial</h3>
              <p className="text-sm font-medium font-manrope mb-2">30 minutes of free usage.</p>
              <p className="text-sm font-medium font-manrope mb-3">3 days left</p>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-[70px] h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-[#EEEEFF] to-[#4A48FF] h-2 rounded-full transition-all duration-300"
                  style={{ width: '60%' }}
                ></div>
              </div>

              <p className="text-sm font-medium font-manrope mb-4">18 / 30 minutes used</p>

              <Button
                className="w-full bg-white text-gray-900 hover:bg-gray-100 font-manrope font-bold rounded-[12px]"
              size="sm" 
              >
                Upgrade Plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
} 