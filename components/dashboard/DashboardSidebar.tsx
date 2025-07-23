"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Bot,
  Phone,
  PhoneCall,
  Megaphone,
  MessageSquare,
  BookOpen,
  Settings,
  Zap,
  Globe,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react'
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
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', current: false },
  { name: 'AI Agent', icon: Bot, href: '/ai-agent', current: false },
  { name: 'Call Flow Builder', icon: Phone, href: '/call-flow', current: false },
  { name: 'Calls', icon: PhoneCall, href: '/calls', current: false },
  { name: 'Campaigns', icon: Megaphone, href: '/campaigns', current: false },
  { name: 'Messages', icon: MessageSquare, href: '/messages', current: false },
  { name: 'Knowledge Base', icon: BookOpen, href: '/knowledge', current: false },
  { name: 'Integrations', icon: Zap, href: '/integrations', current: false },
  { name: 'Settings', icon: Settings, href: '/settings', current: false },
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
        "bg-[#FFFFFF] flex flex-col h-full transition-all duration-300 fixed lg:relative z-50",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className="p-[20px] border-b border-l border-gray-200 ">
          {!isCollapsed}
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center space-x-2">
              {!isCollapsed ? (
                <div className="flex items-center space-x-2">
                  <Image src="/images/logo2.svg" alt="AssistMind AI" width={30} height={30} className='w-full h-full' />
                </div>
              ) : (
                <Image src="/images/logo2.svg" alt="AssistMind AI" width={30} height={30} className='w-8 h-8' />
              )}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="h-8 w-8 text-black"
                >
                  {isCollapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-4 w-4" />}
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
          "flex-1 py-6",
          isCollapsed ? "px-2" : "px-4"
        )}>
          <div className="mb-4">
            {!isCollapsed && <h3 className="text-sm font-manrope text-gray-400 uppercase tracking-wider">Menu</h3>}
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
                          "flex items-center space-x-3 rounded-lg text-sm font-manrope transition-colors",
                          isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-2",
                          isActive
                            ? "bg-[#4A48FF] text-white"
                            : "text-gray-800 hover:bg-[#4A48FF] hover:text-black font-manrope font-bold"
                        )}
                      >
                        <item.icon className={cn(
                          isCollapsed ? "w-5 h-5" : "w-4 h-4",
                          isActive ? "text-white" : "text-gray-400"
                        )} />
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
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-4 text-white">
              <h3 className="text-lg font-bold mb-2">7 Day Free Trial</h3>
              <p className="text-sm mb-2">30 minutes of free usage.</p>
              <p className="text-sm mb-3">3 days left</p>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: '60%' }}
                ></div>
              </div>

              <p className="text-sm mb-4">18 / 30 minutes used</p>

              <Button
                className="w-full bg-white text-gray-900 hover:bg-gray-100 font-manrope"
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