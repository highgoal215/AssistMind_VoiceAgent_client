"use client"

import React from 'react'
import {
  Search,
  Bell,
  Moon,
  ChevronDown,
  Upload,
  RefreshCw,
  Menu,
  MoreVertical,
  Trash2,
  Filter,
  Eye,
  FileText,
  File,
  FileSpreadsheet,
  FileType,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'

interface Document {
  id: number
  fileName: string
  type: string
  size: string
  uploadDate: string
  status: 'Trained' | 'Processing' | 'Failed'
  isActive: boolean
  file?: File
}

export default function KnowledgeBasePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [selectedFilter, setSelectedFilter] = React.useState('All')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [documents, setDocuments] = React.useState<Document[]>([
    {
      id: 1,
      fileName: '2024 Pricing Guide.pdf',
      type: 'PDF',
      size: '320.0 KB',
      uploadDate: '6/22/2024',
      status: 'Trained',
      isActive: true
    },
    {
      id: 2,
      fileName: 'Company Policies.doc>',
      type: 'DOCX',
      size: '240.0 KB',
      uploadDate: '6/20/2024',
      status: 'Trained',
      isActive: true
    },
    {
      id: 3,
      fileName: 'FAQ Database.txt',
      type: 'TXT',
      size: '80.0 KB',
      uploadDate: '6/18/2024',
      status: 'Processing',
      isActive: true
    }
  ])
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Handle body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
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
    if (documents.length >= 10) {
      toast({
        title: "Upload limit reached",
        description: "You can only upload up to 10 documents.",
        variant: "destructive"
      })
      return
    }

    const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv']
    const maxSize = 500 * 1024 // 500KB

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

      if (file.size > maxSize) {
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
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
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
      setUploadProgress(100)
      
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
      setIsUploading(false)
      setUploadProgress(0)
      clearInterval(progressInterval)
    }
  }

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toUpperCase()
    switch (extension) {
      case 'PDF': return 'PDF'
      case 'DOCX': return 'DOCX'
      case 'TXT': return 'TXT'
      case 'CSV': return 'CSV'
      default: return 'PDF'
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // Search and filter functionality
  const filteredDocuments = React.useMemo(() => {
    let filtered = documents

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply type filter
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(doc => doc.type === selectedFilter)
    }

    return filtered
  }, [documents, searchQuery, selectedFilter])

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

  // Statistics
  const stats = React.useMemo(() => {
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
  }, [documents])

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-4 w-4" />
      case 'DOCX':
        return <File className="h-4 w-4" />
      case 'TXT':
        return <FileType className="h-4 w-4" />
      case 'CSV':
        return <FileSpreadsheet className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Dark Mode Button - Hidden on mobile */}
              <Button variant="outline" className="hidden lg:flex bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-manrope">
                  2
                </span>
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/user-profile.jpg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-600 hidden lg:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Knowledge Base Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-sm sm:text-base font-semibold text-gray-900">Upload and manage documents that train your AI Voice Agent</p>
            
            {/* Top Row - Upload and Training Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6 ">
              {/* Upload New Documents */}
              <Card className="rounded-lg shadow-sm lg:col-span-5">
                <CardHeader className='flex flex-row justify-between'>
                  <CardTitle className="text-lg font-semibold">Upload New Documents</CardTitle>
                  <p className="text-sm text-gray-600">{documents.length}/10 documents</p>
                </CardHeader>
                <CardContent>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors ${
                      dragActive 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {isUploading ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-gray-600">Uploading...</p>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm sm:text-base text-gray-600 mb-4">
                          Drag and drop your CSV, TXT, DOCX, PDF or click to browse
                        </p>
                        <Button 
                            className="bg-[#4A48FF] hover:bg-blue-700 text-white text-sm sm:text-base"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={documents.length >= 10}
                        >
                          Choose File
                        </Button>
                        <p className="text-xs text-gray-500 mt-4">Max 10 docs, 500KB each</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.txt,.docx,.csv"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {/* Training Engine */}
              <Card className="rounded-lg shadow-sm lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Training Engine</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Documents Processed</p>
                      <p className="text-xs text-green-600">Successfully trained and ready</p>
                    </div>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.processed}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-xs text-orange-600">Currently processing...</p>
                    </div>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Storage Used</p>
                      <p className="text-sm text-gray-900">{stats.storageUsed} MB of 5 MB</p>
                    </div>
                    <Progress value={stats.storagePercentage} className="h-2" />
                  </div>
                  
                  <Button 
                    className="w-full bg-[#4A48FF] hover:bg-blue-700 text-white"
                    onClick={refreshTraining}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Training
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Training Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6">
              <Card className="rounded-lg shadow-sm lg:col-span-5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">Training Documents</CardTitle>
                      <p className="text-sm text-gray-600">{filteredDocuments.length} documents</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter Bar */}
                  <div className="space-y-4 mb-6">
                    {/* Search Row */}
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                        {searchQuery && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                            onClick={() => setSearchQuery('')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <Button size="icon" className="bg-[#4A48FF] hover:bg-blue-700 flex-shrink-0">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Filter Row */}
                    <div className="flex flex-wrap gap-2">
                      {['All', 'PDF', 'DOCX', 'TXT', 'CSV'].map((filter) => (
                        <Button
                          key={filter}
                          variant={selectedFilter === filter ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedFilter(filter)}
                          className={`text-xs sm:text-sm ${selectedFilter === filter ? 'bg-[#4A48FF] hover:bg-blue-700' : ''}`}
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Documents Table */}
                  <div className="overflow-x-auto">
                    {/* Desktop Table */}
                    <table className="w-full hidden md:table">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">FILE NAME</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">TYPE</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">SIZE</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">UPLOAD DATE</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">STATUS</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">ACTIVE FOR CALL</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments.map((doc) => (
                          <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                {getFileIcon(doc.type)}
                                <span className="text-sm text-gray-900">{doc.fileName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-600">{doc.type}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-600">{doc.size}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-600">{doc.uploadDate}</span>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={`${getStatusColor(doc.status)} text-xs px-2 py-1 rounded-full`}>
                                {doc.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Switch 
                                checked={doc.isActive} 
                                onCheckedChange={() => toggleDocumentActive(doc.id)}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => viewDocument(doc)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-600 hover:text-red-700"
                                  onClick={() => deleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                      {filteredDocuments.map((doc) => (
                        <div key={doc.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(doc.type)}
                              <span className="text-sm font-medium text-gray-900">{doc.fileName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => viewDocument(doc)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600 hover:text-red-700"
                                onClick={() => deleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Type:</span>
                              <span className="ml-2 text-gray-900">{doc.type}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Size:</span>
                              <span className="ml-2 text-gray-900">{doc.size}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Upload Date:</span>
                              <span className="ml-2 text-gray-900">{doc.uploadDate}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Status:</span>
                              <Badge className={`ml-2 ${getStatusColor(doc.status)} text-xs px-2 py-1 rounded-full`}>
                                {doc.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Active for Call</span>
                            <Switch 
                              checked={doc.isActive} 
                              onCheckedChange={() => toggleDocumentActive(doc.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
