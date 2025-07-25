import React from 'react'
import Image from 'next/image'
import { DeveloperToolCard } from './DeveloperToolCard'
import { DeveloperTool } from './types'

interface DeveloperToolsSectionProps {
  tools: DeveloperTool[]
  onLearnMore: (toolId: string) => void
}

export const DeveloperToolsSection: React.FC<DeveloperToolsSectionProps> = ({
  tools,
  onLearnMore
}) => {
  return (
    <div className="space-y-6 border border-gray-300 p-4 rounded-3xl bg-[#FFFFFF]">
      <div className="flex items-center space-x-2">
        <div className='flex justify-center items-center w-12 h-12 rounded-2xl bg-[#adacec]'>
          <Image 
            src="/images/integration/link.svg" 
            alt='links' 
            width={30} 
            height={30} 
            className='w-5 h-5 items-center' 
          />
        </div>
        <h2 className="text-3xl font-bold font-manrope text-gray-900">Developer Tools</h2>
      </div>
      <p className="text-sm font-manrope font-bold text-gray-600">
        Advanced integration options for custom workflows and automation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <DeveloperToolCard
            key={tool.id}
            tool={tool}
            onLearnMore={onLearnMore}
          />
        ))}
      </div>
    </div>
  )
} 