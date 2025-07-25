import React from 'react'
import { Play, Pause, Volume2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { CallDetail } from './types'
import { TYPE_COLORS } from './constants'

interface CallDetailsCardProps {
  call: CallDetail
  isPlaying: boolean
  onPlayPause: () => void
}

export default function CallDetailsCard({ call, isPlaying, onPlayPause }: CallDetailsCardProps) {
  return (
    <div className="bg-white shadow-sm lg:col-span-5">
      <div className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-4 space-y-4 lg:space-y-0 p-2">
          <div className="flex-1">
            <div className="mb-2">
              <Badge className={TYPE_COLORS[call.type]}>
                {call.type.charAt(0).toUpperCase() + call.type.slice(1)}
              </Badge>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{call.caller}</h1>
            <p className="text-gray-600 mb-4 font-bold font-manrope">{call.dateTime} • {call.duration}</p>

            {/* Audio Player */}
            <div className="bg-gray-50 rounded-lg p-3 lg:p-4 mb-4">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Button
                  onClick={onPlayPause}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 font-bold font-manrope"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <div className="flex-1">
                  <Slider
                    defaultValue={[30]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <Button variant="ghost" size="sm" className='font-bold font-manrope'>
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" size="sm" className="flex-1 font-bold font-manrope">
                Audio
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-blue-50 border-blue-200 text-blue-700 font-bold font-manrope"
              >
                Transcript
              </Button>
              <Button variant="destructive" size="sm" className="flex-1 sm:flex-none font-bold font-manrope">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 