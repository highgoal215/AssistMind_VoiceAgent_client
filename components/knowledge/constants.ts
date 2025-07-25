export const FILE_TYPES = {
  PDF: 'application/pdf',
  TXT: 'text/plain',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  CSV: 'text/csv'
}

export const MAX_FILE_SIZE = 500 * 1024 // 500KB
export const MAX_DOCUMENTS = 10
export const STORAGE_LIMIT = 5 // 5MB

export const FILTER_OPTIONS = ['All', 'PDF', 'DOCX', 'TXT', 'CSV']

export const INITIAL_DOCUMENTS = [
  {
    id: 1,
    fileName: '2024 Pricing Guide.pdf',
    type: 'PDF',
    size: '320.0 KB',
    uploadDate: '6/22/2024',
    status: 'Trained' as const,
    isActive: true
  },
  {
    id: 2,
    fileName: 'Company Policies.doc>',
    type: 'DOCX',
    size: '240.0 KB',
    uploadDate: '6/20/2024',
    status: 'Trained' as const,
    isActive: true
  },
  {
    id: 3,
    fileName: 'FAQ Database.txt',
    type: 'TXT',
    size: '80.0 KB',
    uploadDate: '6/18/2024',
    status: 'Processing' as const,
    isActive: true
  }
] 