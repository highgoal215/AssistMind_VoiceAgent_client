import { useState, useEffect } from 'react'
import { FlowData } from '@/components/call-flow/types'
import { STORAGE_KEY } from '@/components/call-flow/constants'

export function useJsonConfig() {
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
    const savedFlow = localStorage.getItem(STORAGE_KEY)
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
      setShowSuccess(true)
      setValidationMessage('Flow saved successfully!')
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      setValidationMessage('Error saving flow')
    }
  }

  return {
    jsonConfig,
    isValid,
    validationMessage,
    showSuccess,
    handleJsonChange,
    copyToClipboard,
    downloadJson,
    uploadJson,
    formatJson,
    clearJson,
    saveToLocalStorage
  }
} 