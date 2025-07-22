"use client"

import React from 'react'
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

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', current: true },
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
}

export default function DashboardSidebar({ isCollapsed, onToggle }: DashboardSidebarProps) {
  return (
    <TooltipProvider>
      <div className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 ">
            {!isCollapsed && <Image src="/images/logo2.svg" alt="AssistMind AI" width={30} height={30} className='w-full h-full'/>}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8"
              >
                {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="mb-4">
          {!isCollapsed && <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Menu</h3>}
        </div>
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      item.current
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5",
                      item.current ? "text-white" : "text-gray-700"
                    )} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </a>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </li>
          ))}
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
              className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium"
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