import React from 'react'
import { FileText, Copy, Download, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { FlowNode, FlowData } from './types'
import { NODE_TYPE_DISPLAY_NAMES, NODE_COLORS, NODE_ICONS } from './constants'

interface TextPreviewContentProps {
  flowData: FlowData
  showSuccess: boolean
  onCopyToClipboard: () => void
  onDownloadText: () => void
}

export default function TextPreviewContent({
  flowData,
  showSuccess,
  onCopyToClipboard,
  onDownloadText
}: TextPreviewContentProps) {
  return (
    <div className="flex-1 bg-white relative overflow-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {flowData.nodes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-manrope text-gray-900 mb-2">No flow configured</h3>
            <p className="text-sm text-gray-600">Create a flow in the visual editor to see the text preview</p>
            <Link href="/call-flow">
              <Button className="mt-4 bg-[#4A48FF] hover:bg-[#3A38FF] text-white font-bold font-manrope">
                <Edit className="h-4 w-4 mr-2" />
                Go to Visual Editor
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Flow Steps */}
            <div className="space-y-4">
              {flowData.nodes.map((node, index) => (
                <Card key={node.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-manrope">
                          {index + 1}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 ${NODE_COLORS[node.type]} rounded flex items-center justify-center text-white`}>
                            {NODE_ICONS[node.type]}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold">{NODE_TYPE_DISPLAY_NAMES[node.type]}</CardTitle>
                            <p className="text-sm text-gray-600">{node.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 leading-relaxed">
                        {node.content || 'No content specified for this node'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Flow Summary */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Flow Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 font-manrope">Total Steps</p>
                    <p className="text-blue-900 text-lg font-bold">{flowData.nodes.length}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-manrope">Estimated Duration</p>
                    <p className="text-blue-900 text-lg font-bold">{Math.max(1, Math.ceil(flowData.nodes.length * 0.5))} min</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-manrope">AI Responses</p>
                    <p className="text-blue-900 text-lg font-bold">{flowData.nodes.filter(n => n.type === 'response').length}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-manrope">Human Transfers</p>
                    <p className="text-blue-900 text-lg font-bold">{flowData.nodes.filter(n => n.type === 'transfer').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
} 