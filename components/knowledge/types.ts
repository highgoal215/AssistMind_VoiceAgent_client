export interface Document {
  id: number
  fileName: string
  type: string
  size: string
  uploadDate: string
  status: 'Trained' | 'Processing' | 'Failed'
  isActive: boolean
  file?: File
}

export interface KnowledgeStats {
  processed: number
  inProgress: number
  storageUsed: string
  storagePercentage: number
}

export interface UploadState {
  isUploading: boolean
  uploadProgress: number
  dragActive: boolean
}

export interface FilterState {
  selectedFilter: string
  searchQuery: string
} 