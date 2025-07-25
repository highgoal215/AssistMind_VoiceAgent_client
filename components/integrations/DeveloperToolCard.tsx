import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DeveloperTool } from './types'
import { IconRenderer } from './IconRenderer'

interface DeveloperToolCardProps {
  tool: DeveloperTool
  onLearnMore: (toolId: string) => void
}

export const DeveloperToolCard: React.FC<DeveloperToolCardProps> = ({
  tool,
  onLearnMore
}) => {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <IconRenderer icon={tool.icon} />
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1 font-manrope">
              {tool.title}
            </CardTitle>
            <p className="text-sm text-gray-500 mb-3 font-manrope font-bold">
              {tool.subtitle}
            </p>
            <p className="text-sm text-gray-600 mb-4 font-manrope font-bold">
              {tool.description}
            </p>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onLearnMore(tool.id)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 