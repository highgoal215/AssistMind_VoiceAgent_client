import React from 'react'
import { X, Save, Edit, Trash2, Plus, Minus, Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CanvasControlsProps {
  selectedNode: string | null
  onEditNode?: () => void
  onDeleteNode?: () => void
  onClearCanvas?: () => void
  onSaveFlow?: () => void
  onZoomIn?: () => void
  onZoomOut?: () => void
  onZoomReset?: () => void
  zoom?: number
  showZoomControls?: boolean
  showNodeControls?: boolean
  showFlowControls?: boolean
  additionalControls?: React.ReactNode
}

export default function CanvasControls({
  selectedNode,
  onEditNode,
  onDeleteNode,
  onClearCanvas,
  onSaveFlow,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  zoom = 1,
  showZoomControls = true,
  showNodeControls = true,
  showFlowControls = true,
  additionalControls
}: CanvasControlsProps) {
  return (
    <div className="bg-white px-4 lg:px-6 py-3">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
        {/* Node Controls */}
        {showNodeControls && (
          <div className="flex items-center space-x-2 lg:space-x-4">
            {selectedNode && (
              <>
                {onEditNode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEditNode}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-8 lg:h-9 px-3 lg:px-4 text-sm font-bold font-manrope"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
                {onDeleteNode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDeleteNode}
                    className="bg-white border-red-200 text-red-700 hover:bg-red-50 h-8 lg:h-9 px-3 lg:px-4 text-sm font-bold font-manrope"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
              </>
            )}
          </div>
        )}

        {/* Flow Controls */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {additionalControls}
          
          {showFlowControls && (
            <>
              {onClearCanvas && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearCanvas}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-8 lg:h-9 px-3 lg:px-4 text-sm font-bold font-manrope"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
              {onSaveFlow && (
                <Button
                  size="sm"
                  onClick={onSaveFlow}
                  data-save-button
                  className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-8 lg:h-9 px-3 lg:px-4 text-sm font-bold font-manrope"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Flow
                </Button>
              )}
            </>
          )}

          {/* Zoom Controls */}
          {showZoomControls && (
            <div className="flex items-center space-x-2">
              {onZoomIn && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 font-bold font-manrope" 
                  onClick={onZoomIn}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
              {onZoomOut && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 font-bold font-manrope" 
                  onClick={onZoomOut}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
              {onZoomReset && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 font-bold font-manrope" 
                  onClick={onZoomReset}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              )}
              <span className="text-sm text-gray-600 ml-2">{Math.round(zoom * 100)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 