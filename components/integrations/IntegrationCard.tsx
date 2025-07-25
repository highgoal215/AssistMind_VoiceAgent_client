import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { LoadingSpinner } from './LoadingSpinner'
import { IntegrationCard as IntegrationCardType } from './types'

interface IntegrationCardProps {
  integration: IntegrationCardType
  onConfigure: (integrationId: string) => void
  onTest: (integrationId: string) => void
  onDisconnect: (integrationId: string) => void
  loading?: string | null
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onConfigure,
  onTest,
  onDisconnect,
  loading
}) => {
  const isConfiguring = loading === integration.id
  const isTesting = loading === `${integration.id}-test`
  const isDisconnecting = loading === `${integration.id}-disconnect`
  const isAnyLoading = isConfiguring || isTesting || isDisconnecting

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {integration.icon || <Calendar className="w-5 h-5 text-blue-500" />}
            <CardTitle className="text-3xl font-bold text-gray-900">
              {integration.title}
            </CardTitle>
          </div>
          {integration.isActive && (
            <Badge className="bg-green-100 text-green-800 border-green-200 font-bold font-manrope text-md">
              Active
            </Badge>
          )}
        </div>
        <p className="text-md font-semibold font-manrope text-gray-600 mt-2">
          {integration.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-2xl font-bold font-manrope text-gray-900">Key Features:</h4>
          <ul className="space-y-1">
            {integration.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2 text-md text-gray-600 font-medium font-manrope">
                <Image 
                  src="/images/integration/check_feature.svg" 
                  alt='checkout' 
                  width={30} 
                  height={30} 
                  className='w-4 h-4' 
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button 
            size="sm" 
            className="bg-[#4A48FF] hover:bg-[#4A48FF] text-white text-md font-manrope font-bold"
            onClick={() => onConfigure(integration.id)}
            disabled={isAnyLoading}
          >
            {isConfiguring ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Configuring...
              </>
            ) : (
              'Configure'
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className='text-md font-manrope font-bold'
            onClick={() => onTest(integration.id)}
            disabled={isAnyLoading}
          >
            {isTesting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Testing...
              </>
            ) : (
              'Test'
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-600 hover:text-red-700 text-md font-manrope font-bold"
            onClick={() => onDisconnect(integration.id)}
            disabled={isAnyLoading}
          >
            {isDisconnecting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Disconnecting...
              </>
            ) : (
              'Disconnect'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 