export const getFileType = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toUpperCase()
  switch (extension) {
    case 'PDF': return 'PDF'
    case 'DOCX': return 'DOCX'
    case 'TXT': return 'TXT'
    case 'CSV': return 'CSV'
    default: return 'PDF'
  }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

import { FileText, File, FileType, FileSpreadsheet } from 'lucide-react'

export const getFileIcon = (type: string) => {
  switch (type) {
    case 'PDF':
      return FileText
    case 'DOCX':
      return File
    case 'TXT':
      return FileType
    case 'CSV':
      return FileSpreadsheet
    default:
      return FileText
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Trained':
      return 'bg-green-100 text-green-700'
    case 'Processing':
      return 'bg-orange-100 text-orange-700'
    case 'Failed':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export const calculateStats = (documents: any[]) => {
  const processed = documents.filter(doc => doc.status === 'Trained').length
  const inProgress = documents.filter(doc => doc.status === 'Processing').length
  const totalSize = documents.reduce((acc, doc) => {
    const size = parseFloat(doc.size.split(' ')[0])
    return acc + size
  }, 0)
  const storageUsed = Math.min(totalSize, 5) // 5MB limit
  const storagePercentage = (storageUsed / 5) * 100

  return {
    processed,
    inProgress,
    storageUsed: storageUsed.toFixed(1),
    storagePercentage
  }
} 