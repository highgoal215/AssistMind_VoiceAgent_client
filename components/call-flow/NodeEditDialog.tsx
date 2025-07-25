import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FlowNode } from './types'

interface NodeEditDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  node: FlowNode | null
  onSave: (nodeId: string, content: string) => void
}

export default function NodeEditDialog({
  isOpen,
  onOpenChange,
  node,
  onSave
}: NodeEditDialogProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    if (node) {
      setContent(node.content || '')
    }
  }, [node])

  const handleSave = () => {
    if (node) {
      onSave(node.id, content)
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Node Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-manrope text-gray-700">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter node content..."
              className="mt-1"
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 