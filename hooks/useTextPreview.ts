import { useState, useEffect } from 'react'
import { FlowData } from '@/components/call-flow/types'
import { STORAGE_KEY, NODE_TYPE_DISPLAY_NAMES } from '@/components/call-flow/constants'

export function useTextPreview() {
  const [flowData, setFlowData] = useState<FlowData>({ nodes: [], connections: [] })
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved flow data on component mount
  useEffect(() => {
    const savedFlow = localStorage.getItem(STORAGE_KEY)
    if (savedFlow) {
      try {
        const parsed = JSON.parse(savedFlow)
        setFlowData(parsed)
      } catch (error) {
        console.error('Error loading saved flow:', error)
      }
    }
  }, [])

  const copyToClipboard = () => {
    const text = flowData.nodes.map((node, index) =>
      `${index + 1}. ${NODE_TYPE_DISPLAY_NAMES[node.type]}: ${node.content || 'No content specified'}`
    ).join('\n\n')
    
    navigator.clipboard.writeText(text)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const downloadText = () => {
    const text = flowData.nodes.map((node, index) =>
      `${index + 1}. ${NODE_TYPE_DISPLAY_NAMES[node.type]}: ${node.content || 'No content specified'}`
    ).join('\n\n')

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'call-flow-preview.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    flowData,
    showSuccess,
    copyToClipboard,
    downloadText
  }
} 