import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Message } from './types'

interface TranscriptTabsProps {
  currentTab: string
  onTabChange: (tab: string) => void
  transcript: Message[]
}

export default function TranscriptTabs({ currentTab, onTabChange, transcript }: TranscriptTabsProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-0">
        <Tabs value={currentTab} onValueChange={onTabChange}>
          <div className="p-4">
            <TabsList className="bg-gray-100 h-12 lg:h-14 rounded-lg p-1 w-full">
              <TabsTrigger
                value="transcript"
                className="flex-1 h-10 lg:h-12 text-base lg:text-[24px] font-manrope font-bold data-[state=active]:bg-[#a09fd6] data-[state=active]:text-[#4A48FF] data-[state=inactive]:text-gray-600 rounded-md transition-all"
              >
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="flex-1 h-10 lg:h-12 text-base lg:text-[24px] font-manrope font-bold data-[state=active]:bg-[#8a89d4] data-[state=active]:text-[#4A48FF] data-[state=inactive]:text-gray-600 rounded-md transition-all"
              >
                Summary
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="transcript" className="p-4 lg:p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {transcript.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.speaker === 'caller' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-sm bg-pink-100 text-pink-600">
                      {message.speaker === 'ai' ? 'B' : 'D'}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.speaker === 'ai'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-[#4A48FF] text-white'
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.speaker === 'ai' ? 'text-gray-500' : 'text-blue-100'
                      }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="p-4 lg:p-6">
            <div className="prose max-w-none">
              <h3 className="text-3xl font-bold font-manrope mb-4">Call Summary</h3>
              <p className="text-gray-700 leading-relaxed font-bold font-manrope">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 font-bold font-manrope">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 