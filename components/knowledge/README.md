# Knowledge Base Components

This directory contains all the components for the Knowledge Base page, which allows users to upload and manage documents that train their AI Voice Agent.

## Component Structure

### Core Components

- **`KnowledgeLayout.tsx`** - Main layout component that contains the documents table and search/filter functionality
- **`UploadSection.tsx`** - Handles file upload functionality with drag & drop support
- **`TrainingEngine.tsx`** - Displays training statistics and provides refresh functionality
- **`DocumentsTable.tsx`** - Renders documents in both table (desktop) and card (mobile) formats
- **`DocumentCard.tsx`** - Mobile-friendly card view for individual documents
- **`DocumentActions.tsx`** - Action buttons for viewing and deleting documents
- **`SearchAndFilter.tsx`** - Search input and filter buttons for documents
- **`FileUploadZone.tsx`** - Drag & drop zone for file uploads
- **`UploadProgress.tsx`** - Progress indicator during file uploads

### Supporting Files

- **`types.ts`** - TypeScript interfaces for all knowledge-related data structures
- **`utils.ts`** - Utility functions for file handling, formatting, and calculations
- **`constants.ts`** - Application constants and initial data
- **`index.ts`** - Barrel export file for easy importing

## Custom Hook

- **`useKnowledge.ts`** - Custom hook that manages all state and business logic for the knowledge page

## Usage

```tsx
import {
  UploadSection,
  TrainingEngine,
  KnowledgeLayout
} from '@/components/knowledge'
import { useKnowledge } from '@/hooks/useKnowledge'

export default function KnowledgePage() {
  const {
    documents,
    filteredDocuments,
    uploadState,
    filterState,
    stats,
    // ... other state and handlers
  } = useKnowledge()

  return (
    <div>
      <UploadSection {...uploadProps} />
      <TrainingEngine stats={stats} onRefreshTraining={refreshTraining} />
      <KnowledgeLayout {...layoutProps} />
    </div>
  )
}
```

## Features

- **File Upload**: Drag & drop or click to upload PDF, DOCX, TXT, and CSV files
- **File Validation**: Size limits (500KB) and type validation
- **Progress Tracking**: Real-time upload progress with visual feedback
- **Document Management**: View, delete, and toggle document activation
- **Search & Filter**: Search by filename/type and filter by file type
- **Responsive Design**: Table view on desktop, card view on mobile
- **Training Status**: Track document processing status (Trained, Processing, Failed)
- **Storage Monitoring**: Visual storage usage with 5MB limit

## State Management

The `useKnowledge` hook manages all state including:
- Document list and filtering
- Upload state and progress
- Search and filter state
- Training statistics

## File Structure

```
components/knowledge/
├── index.ts              # Barrel exports
├── types.ts              # TypeScript interfaces
├── utils.ts              # Utility functions
├── constants.ts          # Application constants
├── README.md             # This file
├── KnowledgeLayout.tsx   # Main layout component
├── UploadSection.tsx     # Upload functionality
├── TrainingEngine.tsx    # Training statistics
├── DocumentsTable.tsx    # Document display
├── DocumentCard.tsx      # Mobile document card
├── DocumentActions.tsx   # Document action buttons
├── SearchAndFilter.tsx   # Search and filter UI
├── FileUploadZone.tsx    # Drag & drop zone
└── UploadProgress.tsx    # Upload progress indicator
``` 