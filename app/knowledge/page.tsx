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
  FileType
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'

export default function KnowledgeBasePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [selectedFilter, setSelectedFilter] = React.useState('All')
  const [searchQuery, setSearchQuery] = React.useState('')

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

  // Sample documents data
  const documents = [
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
  ]

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
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6">
              {/* Upload New Documents */}
              <Card className="rounded-lg shadow-sm lg:col-span-5">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Upload New Documents</CardTitle>
                  <p className="text-sm text-gray-600">3/10 documents</p>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      Drag and drop your CSV, TXT, DOCX, PDF or click to browse
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base">
                      Choose File
                    </Button>
                    <p className="text-xs text-gray-500 mt-4">Max 10 docs, 500KB each</p>
                  </div>
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
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">5</p>
                      <p className="text-xs text-green-600">Successfully trained and ready</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">1</p>
                      <p className="text-xs text-orange-600">Currently processing...</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Storage Used</p>
                      <p className="text-sm text-gray-900">1.6 MB of 5 MB</p>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
                    <p className="text-sm text-gray-600">3 documents</p>
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
                    </div>
                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Filter Row */}
                  <div className="flex flex-wrap gap-2">
                    {['All', 'PDF', 'DOCS', 'TXT', 'CSV'].map((filter) => (
                      <Button
                        key={filter}
                        variant={selectedFilter === filter ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter(filter)}
                        className={`text-xs sm:text-sm ${selectedFilter === filter ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
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
                      {documents.map((doc) => (
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
                            <Switch checked={doc.isActive} />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
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
                    {documents.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(doc.type)}
                            <span className="text-sm font-medium text-gray-900">{doc.fileName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
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
                          <Switch checked={doc.isActive} />
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
