import React from 'react'
import { Eye, FileText, Code } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ViewMode } from './types'

interface ViewModeToggleProps {
  currentMode: ViewMode
  onModeChange: (mode: ViewMode) => void
  className?: string
}

export default function ViewModeToggle({ 
  currentMode, 
  onModeChange, 
  className = "" 
}: ViewModeToggleProps) {
  const handleModeChange = (value: string) => {
    if (value && ['visual', 'text', 'json'].includes(value)) {
      onModeChange(value as ViewMode)
    }
  }

  return (
    <ToggleGroup 
      type="single" 
      value={currentMode} 
      onValueChange={handleModeChange}
      className={className}
    >
      <ToggleGroupItem
        value="visual"
        size="sm"
        className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
      >
        <Eye className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline font-bold font-manrope">Visual Editor</span>
        <span className="lg:hidden font-bold font-manrope">Visual</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="text"
        size="sm"
        className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
      >
        <FileText className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline font-bold font-manrope">Text Preview</span>
        <span className="lg:hidden font-bold font-manrope">Text</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="json"
        size="sm"
        className="px-3 lg:px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
      >
        <Code className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline font-bold font-manrope">JSON Config</span>
        <span className="lg:hidden">JSON</span>
      </ToggleGroupItem>
    </ToggleGroup>
  )
} 