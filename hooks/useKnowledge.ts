import { useState, useMemo, useRef } from 'react'
import { useToast } from './use-toast'
import { Document, KnowledgeStats, UploadState, FilterState } from '@/components/knowledge/types'
import { getFileType, formatFileSize, calculateStats } from '@/components/knowledge/utils'
import { FILE_TYPES, MAX_FILE_SIZE, MAX_DOCUMENTS, INITIAL_DOCUMENTS } from '@/components/knowledge/constants'

export function useKnowledge() {
  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCUMENTS)
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    uploadProgress: 0,
    dragActive: false
  })
  const [filterState, setFilterState] = useState<FilterState>({
    selectedFilter: 'All',
    searchQuery: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Calculate filtered documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents

    // Apply search filter
    if (filterState.searchQuery) {
      filtered = filtered.filter(doc => 
        doc.fileName.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(filterState.searchQuery.toLowerCase())
      )
    }

    // Apply type filter
    if (filterState.selectedFilter !== 'All') {
      filtered = filtered.filter(doc => doc.type === filterState.selectedFilter)
    }

    return filtered
  }, [documents, filterState.searchQuery, filterState.selectedFilter])

  // Calculate stats
  const stats = useMemo(() => calculateStats(documents), [documents])

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setUploadState(prev => ({ ...prev, dragActive: true }))
    } else if (e.type === "dragleave") {
      setUploadState(prev => ({ ...prev, dragActive: false }))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setUploadState(prev => ({ ...prev, dragActive: false }))
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = async (files: FileList) => {
    if (documents.length >= MAX_DOCUMENTS) {
      toast({
        title: "Upload limit reached",
        description: "You can only upload up to 10 documents.",
        variant: "destructive"
      })
      return
    }

    const validTypes = Object.values(FILE_TYPES)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive"
        })
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 500KB limit.`,
          variant: "destructive"
        })
        continue
      }

      await uploadFile(file)
    }
  }

  const uploadFile = async (file: File) => {
    setUploadState(prev => ({ ...prev, isUploading: true, uploadProgress: 0 }))

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadState(prev => {
        if (prev.uploadProgress >= 90) {
          clearInterval(progressInterval)
          return { ...prev, uploadProgress: 90 }
        }
        return { ...prev, uploadProgress: prev.uploadProgress + 10 }
      })
    }, 200)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newDocument: Document = {
        id: Date.now(),
        fileName: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
        uploadDate: new Date().toLocaleDateString(),
        status: 'Processing',
        isActive: true,
        file
      }

      setDocuments(prev => [...prev, newDocument])
      setUploadState(prev => ({ ...prev, uploadProgress: 100 }))
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded and is being processed.`
      })

      // Simulate processing completion
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDocument.id 
              ? { ...doc, status: 'Trained' as const }
              : doc
          )
        )
      }, 5000)

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      })
    } finally {
      setUploadState(prev => ({ ...prev, isUploading: false, uploadProgress: 0 }))
      clearInterval(progressInterval)
    }
  }

  // Document management functions
  const toggleDocumentActive = (id: number) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id ? { ...doc, isActive: !doc.isActive } : doc
      )
    )
  }

  const deleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
    toast({
      title: "Document deleted",
      description: "The document has been removed from your knowledge base."
    })
  }

  const viewDocument = (doc: Document) => {
    toast({
      title: "View document",
      description: `Opening ${doc.fileName}...`
    })
    // Here you would typically open a modal or navigate to a document viewer
  }

  const refreshTraining = () => {
    toast({
      title: "Refreshing training",
      description: "Updating training status for all documents..."
    })
    
    // Simulate refresh
    setTimeout(() => {
      setDocuments(prev => 
        prev.map(doc => 
          doc.status === 'Processing' 
            ? { ...doc, status: 'Trained' as const }
            : doc
        )
      )
      toast({
        title: "Training refreshed",
        description: "All documents have been updated."
      })
    }, 2000)
  }

  // Filter handlers
  const handleSearchChange = (query: string) => {
    setFilterState(prev => ({ ...prev, searchQuery: query }))
  }

  const handleFilterChange = (filter: string) => {
    setFilterState(prev => ({ ...prev, selectedFilter: filter }))
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  return {
    // State
    documents,
    filteredDocuments,
    uploadState,
    filterState,
    stats,
    fileInputRef,
    
    // Handlers
    handleDrag,
    handleDrop,
    handleFileInput,
    handleFileSelect,
    toggleDocumentActive,
    deleteDocument,
    viewDocument,
    refreshTraining,
    handleSearchChange,
    handleFilterChange
  }
} 