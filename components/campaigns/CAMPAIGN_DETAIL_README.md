# Campaign Detail Page Components

This document outlines the componentized structure for the campaign detail page, which has been refactored from a monolithic component into smaller, reusable, and maintainable components.

## Component Architecture

### Core Components

#### 1. **CampaignDetailHeader**
- **Purpose**: Displays campaign title, status badge, and action buttons
- **Props**: `campaignName`, `status`, `statusColor`, `onExport`, `onDelete`
- **Location**: `components/campaigns/CampaignDetailHeader.tsx`

#### 2. **CampaignDetailMetrics**
- **Purpose**: Renders the grid of metric cards showing campaign statistics
- **Props**: `metrics` (array of MetricCard objects)
- **Location**: `components/campaigns/CampaignDetailMetrics.tsx`

#### 3. **CampaignDetailTabs**
- **Purpose**: Navigation tabs for switching between different views
- **Props**: `tabs`, `activeTab`, `onTabChange`
- **Location**: `components/campaigns/CampaignDetailTabs.tsx`

### Tab Content Components

#### 4. **CallRecordsTable**
- **Purpose**: Displays call records with status tooltip and action buttons
- **Props**: `records`, `showTooltip`, `onToggleTooltip`, `onDownloadRecording`, `onPlayRecording`
- **Location**: `components/campaigns/CallRecordsTable.tsx`

#### 5. **RecipientsTable**
- **Purpose**: Shows recipient information in a table format
- **Props**: `recipients`
- **Location**: `components/campaigns/RecipientsTable.tsx`

#### 6. **MessageSetupSection**
- **Purpose**: Displays campaign configuration details
- **Props**: `openingMessage`, `scheduledTime`, `startedTime`, `callPrompt`
- **Location**: `components/campaigns/MessageSetupSection.tsx`

#### 7. **InsightsCharts**
- **Purpose**: Renders time metrics and call results charts
- **Props**: `timeMetricsData`, `callResultsData`, `chartOptions`
- **Location**: `components/campaigns/InsightsCharts.tsx`

### Utility Components

#### 8. **StatusTooltip**
- **Purpose**: Tooltip explaining different call statuses
- **Props**: `isVisible`, `onClose`
- **Location**: `components/campaigns/StatusTooltip.tsx`

## Data Management

### Custom Hook: `useCampaignDetail`
- **Location**: `hooks/useCampaignDetail.ts`
- **Purpose**: Centralized state management and business logic
- **Features**:
  - Campaign data management
  - UI state (sidebar, mobile menu, active tab, tooltip)
  - Event handlers for user interactions
  - Data fetching and processing

### Constants: `campaignDetailConstants.tsx`
- **Location**: `components/campaigns/campaignDetailConstants.tsx`
- **Purpose**: Centralized data storage for static content
- **Contains**:
  - Tab configurations
  - Metric card data
  - Sample call records and recipients
  - Chart data and options
  - Message setup data

## Type Definitions

### Updated Types: `types.ts`
- **Location**: `components/campaigns/types.ts`
- **New Interfaces**:
  - `TabItem`: Navigation tab structure
  - `CallRecord`: Call record data structure
  - `RecipientDetail`: Recipient information
  - `ChartData`: Chart.js data structure
  - `MessageSetupData`: Campaign setup information

## Usage Example

```tsx
import { useCampaignDetail } from '@/hooks/useCampaignDetail'
import {
  CampaignDetailHeader,
  CampaignDetailMetrics,
  CampaignDetailTabs,
  CallRecordsTable,
  RecipientsTable,
  MessageSetupSection,
  InsightsCharts
} from '@/components/campaigns'

export default function CampaignDetailPage() {
  const {
    campaignName,
    campaignStatus,
    campaignStatusColor,
    activeTab,
    setActiveTab,
    showTooltip,
    tabs,
    metrics,
    callRecords,
    recipients,
    messageSetup,
    timeMetricsData,
    callResultsData,
    chartOptions,
    handleExport,
    handleDelete,
    handleDownloadRecording,
    handlePlayRecording,
    toggleTooltip
  } = useCampaignDetail()

  return (
    <div>
      <CampaignDetailHeader
        campaignName={campaignName}
        status={campaignStatus}
        statusColor={campaignStatusColor}
        onExport={handleExport}
        onDelete={handleDelete}
      />
      
      <CampaignDetailMetrics metrics={metrics} />
      
      <CampaignDetailTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {activeTab === 'call-records' && (
        <CallRecordsTable
          records={callRecords}
          showTooltip={showTooltip}
          onToggleTooltip={toggleTooltip}
          onDownloadRecording={handleDownloadRecording}
          onPlayRecording={handlePlayRecording}
        />
      )}
      
      {/* Other tab content components... */}
    </div>
  )
}
```

## Benefits of This Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be reused across different parts of the application
3. **Testability**: Individual components can be tested in isolation
4. **Readability**: Code is more organized and easier to understand
5. **Scalability**: Easy to add new features or modify existing ones
6. **Separation of Concerns**: UI logic is separated from business logic

## File Structure

```
components/campaigns/
├── CampaignDetailHeader.tsx
├── CampaignDetailMetrics.tsx
├── CampaignDetailTabs.tsx
├── CallRecordsTable.tsx
├── RecipientsTable.tsx
├── MessageSetupSection.tsx
├── InsightsCharts.tsx
├── StatusTooltip.tsx
├── campaignDetailConstants.tsx
├── types.ts (updated)
└── index.ts (updated)

hooks/
└── useCampaignDetail.ts

app/campaigns/[id]/
└── page.tsx (refactored)
```

## Migration Notes

The original monolithic component has been successfully refactored into:
- **8 new components** for different UI sections
- **1 custom hook** for state management
- **1 constants file** for data management
- **Updated types** for better type safety
- **Cleaner main page** with clear separation of concerns

This structure makes the codebase more maintainable and follows React best practices for component composition and state management. 