# Calls Components

This directory contains the componentized structure for the calls feature, providing a clean separation of concerns and improved maintainability.

## Structure

```
components/calls/
├── types.ts              # TypeScript interfaces and types
├── constants.tsx         # Constants and configuration
├── index.ts             # Barrel exports
├── CallsLayout.tsx      # Shared layout component
├── StatsCards.tsx       # Call statistics cards
├── CallFilters.tsx      # Search and filter controls
├── CallsTable.tsx       # Calls data table
├── Pagination.tsx       # Pagination controls
├── CallDetailsCard.tsx  # Call details display
├── CallerInfoCard.tsx   # Caller information form
├── TranscriptTabs.tsx   # Transcript and summary tabs
└── README.md           # This file
```

## Key Components

### Types (`types.ts`)
- `Call`: Basic call information
- `CallDetail`: Extended call information with transcript
- `Message`: Individual message in transcript
- `CallFilters`: Filter state interface
- `CallStats`: Statistics data interface
- `PaginationState`: Pagination state interface

### Constants (`constants.tsx`)
- `MOCK_CALLS`: Sample call data
- `STATUS_COLORS`: Color mapping for call statuses
- `TYPE_COLORS`: Color mapping for call types
- `CALL_TYPE_OPTIONS`: Available call type filter options
- `STATUS_OPTIONS`: Available status filter options
- `DATE_RANGE_OPTIONS`: Available date range filter options

### Layout (`CallsLayout.tsx`)
Shared layout component that includes:
- Dashboard sidebar
- Header with search (optional)
- Main content area
- Mobile menu handling

### Stats Cards (`StatsCards.tsx`)
Displays call statistics:
- Total calls
- Average duration
- Unique callers

### Filters (`CallFilters.tsx`)
Search and filter controls:
- Search input
- Call type filter
- Status filter
- Date range filter
- Export button

### Table (`CallsTable.tsx`)
Data table with:
- Call information columns
- Action menus (play audio, delete)
- Note/flag functionality
- Row click navigation

### Pagination (`Pagination.tsx`)
Smart pagination with:
- Previous/Next buttons
- Page number buttons
- Ellipsis for large page counts

### Call Detail Components
- `CallDetailsCard.tsx`: Audio player and call metadata
- `CallerInfoCard.tsx`: Caller information form
- `TranscriptTabs.tsx`: Transcript and summary tabs

## Hooks

### `useCalls` (`hooks/useCalls.ts`)
Manages the calls list page state:
- Call data and filtering
- Pagination
- Action menus
- Search functionality

### `useCallDetail` (`hooks/useCallDetail.ts`)
Manages individual call detail page state:
- Call detail data
- Audio player state
- Tab management
- Caller information form

## Usage Examples

### Main Calls Page
```tsx
import { useCalls } from '@/hooks/useCalls'
import { CallsLayout, StatsCards, CallFilters, CallsTable, Pagination } from '@/components/calls'

export default function CallsPage() {
  const { calls, filters, pagination, stats, ... } = useCalls()
  
  return (
    <CallsLayout {...layoutProps}>
      <StatsCards stats={stats} />
      <CallFilters filters={filters} onFiltersChange={updateFilters} />
      <CallsTable calls={calls} {...tableProps} />
      <Pagination pagination={pagination} onPageChange={goToPage} />
    </CallsLayout>
  )
}
```

### Call Detail Page
```tsx
import { useCallDetail } from '@/hooks/useCallDetail'
import { CallsLayout, CallDetailsCard, CallerInfoCard, TranscriptTabs } from '@/components/calls'

export default function CallDetailPage() {
  const { call, isPlaying, currentTab, ... } = useCallDetail(callId)
  
  return (
    <CallsLayout showSearch={true}>
      <CallDetailsCard call={call} isPlaying={isPlaying} onPlayPause={handlePlayPause} />
      <CallerInfoCard {...callerProps} />
      <TranscriptTabs currentTab={currentTab} transcript={call.transcript} />
    </CallsLayout>
  )
}
```

## Benefits

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be reused across different pages
3. **Maintainability**: Easier to update and debug individual components
4. **Type Safety**: Strong TypeScript interfaces ensure data consistency
5. **State Management**: Custom hooks centralize business logic
6. **Code Reduction**: Main pages reduced from 400+ lines to ~80 lines
7. **Consistency**: Shared layout and styling patterns
8. **Testability**: Individual components can be tested in isolation

## Migration from Monolithic Pages

The original calls pages were monolithic with:
- 481 lines in main calls page
- 396 lines in call detail page
- Mixed UI, business logic, and state management
- Duplicated code patterns

The new structure provides:
- Clean separation of UI and logic
- Reusable components
- Centralized state management
- Consistent patterns
- Significantly reduced code duplication 