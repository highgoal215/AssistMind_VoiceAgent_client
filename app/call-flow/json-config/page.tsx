"use client"

import React, { useState, useEffect } from 'react'
import {
  Bell,
  Moon,
  X,
  Save,
  Eye,
  FileText,
  Code,
  ArrowLeft,
  Edit,
  Copy,
  Download,
  Upload,
  Minus,
  Maximize,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import NodePalette from '@/components/call-flow/NodePalette'
import Link from 'next/link'

export default function JsonConfigPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [jsonConfig, setJsonConfig] = useState(`{
  "nodes": [],
  "connections": [],
  "metadata": {
    "version": "1.0",
    "createdAt": "2025-07-11T09:21:44.687Z",
    "totalNodes": 0,
    "totalConnections": 0
  }
}`)
  const [isValid, setIsValid] = useState(true)
  const [validationMessage, setValidationMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // Load saved flow data on component mount
  useEffect(() => {
    const savedFlow = localStorage.getItem('callFlow')
    if (savedFlow) {
      try {
        const parsed = JSON.parse(savedFlow)
        setJsonConfig(JSON.stringify(parsed, null, 2))
        setIsValid(true)
        setValidationMessage('')
      } catch (error) {
        console.error('Error loading saved flow:', error)
      }
    }
  }, [])

  const validateJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)

      // Basic structure validation
      if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
        setValidationMessage('Invalid structure: "nodes" must be an array')
        return false
      }

      if (!parsed.connections || !Array.isArray(parsed.connections)) {
        setValidationMessage('Invalid structure: "connections" must be an array')
        return false
      }

      // Node validation
      for (const node of parsed.nodes) {
        if (!node.id || !node.type || !node.title) {
          setValidationMessage('Invalid node: missing required fields (id, type, title)')
          return false
        }

        if (!['start', 'response', 'question', 'transfer', 'action'].includes(node.type)) {
          setValidationMessage(`Invalid node type: ${node.type}. Must be one of: start, response, question, transfer, action`)
          return false
        }
      }

      // Connection validation
      for (const connection of parsed.connections) {
        if (!connection.id || !connection.from || !connection.to) {
          setValidationMessage('Invalid connection: missing required fields (id, from, to)')
          return false
        }

        const fromNodeExists = parsed.nodes.some((node: any) => node.id === connection.from)
        const toNodeExists = parsed.nodes.some((node: any) => node.id === connection.to)

        if (!fromNodeExists || !toNodeExists) {
          setValidationMessage('Invalid connection: referenced node does not exist')
          return false
        }
      }

      setValidationMessage('JSON is valid!')
      return true
    } catch (error) {
      setValidationMessage(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return false
    }
  }

  const handleJsonChange = (value: string) => {
    setJsonConfig(value)
    const valid = validateJson(value)
    setIsValid(valid)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonConfig)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const downloadJson = () => {
    const blob = new Blob([jsonConfig], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'call-flow-config.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const uploadJson = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setJsonConfig(content)
          validateJson(content)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonConfig)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonConfig(formatted)
      setIsValid(true)
      setValidationMessage('JSON formatted successfully!')
    } catch (error) {
      setIsValid(false)
      setValidationMessage('Cannot format invalid JSON')
    }
  }

  const clearJson = () => {
    const defaultConfig = `{
  "nodes": [],
  "connections": [],
  "metadata": {
    "version": "1.0",
    "createdAt": "${new Date().toISOString()}",
    "totalNodes": 0,
    "totalConnections": 0
  }
}`
    setJsonConfig(defaultConfig)
    setIsValid(true)
    setValidationMessage('JSON cleared')
  }

  const saveToLocalStorage = () => {
    if (!isValid) {
      setValidationMessage('Cannot save invalid JSON')
      return
    }

    try {
      const parsed = JSON.parse(jsonConfig)
      localStorage.setItem('callFlow', JSON.stringify(parsed))
      setShowSuccess(true)
      setValidationMessage('Flow saved successfully!')
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      setValidationMessage('Error saving flow')
    }
  }

  const handleViewModeChange = (mode: string) => {
    if (mode === 'visual') {
      window.location.href = '/call-flow'
    } else if (mode === 'text') {
      window.location.href = '/call-flow/text-preview'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  1
                </span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* JSON Config Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Node Palette */}
          <NodePalette
            isReadOnly={true}
          />

          {/* JSON Config Workspace */}
          <div className="flex-1 flex flex-col">
            {/* Canvas Controls */}
            <div className="bg-white px-6 py-3">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-gray-900">Flow Configuration (JSON)</h1>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={uploadJson}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadJson}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={formatJson}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Format
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearJson}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveToLocalStorage}
                    disabled={!isValid}
                    className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Link href="/call-flow">
                    <Button
                      size="sm"
                      className="bg-[#4A48FF] hover:bg-[#3A38FF] text-white h-9 px-4"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Validation Alert */}
            {validationMessage && (
              <div className="px-6 py-2">
                <Alert className={isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={isValid ? "text-green-800" : "text-red-800"}>
                    {validationMessage}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* JSON Content Area */}
            <div className="flex-1 bg-gray-900 relative overflow-auto p-6">
              <Textarea
                value={jsonConfig}
                onChange={(e) => handleJsonChange(e.target.value)}
                className="font-mono text-sm h-full w-full resize-none bg-gray-900 text-green-400 border-gray-700 focus:border-gray-600"
                placeholder="Enter your JSON configuration here..."
              />
            </div>

            {/* Bottom Controls */}
            <div className="bg-white border-t border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                <ToggleGroup type="single" value="json" onValueChange={(value) => value && handleViewModeChange(value)}>
                  <ToggleGroupItem
                    value="visual"
                    size="sm"
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visual Editor
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="text"
                    size="sm"
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Text Preview
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="json"
                    size="sm"
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all data-[state=on]:bg-[#4A48FF] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-gray-700 data-[state=off]:border data-[state=off]:border-gray-200 hover:data-[state=off]:bg-gray-50"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    JSON Config
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 