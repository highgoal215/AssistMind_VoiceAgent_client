# Campaigns Components

This directory contains the componentized structure for the campaigns feature, providing a clean separation of concerns and improved maintainability.

## Structure

```
components/campaigns/
├── types.ts                    # TypeScript interfaces and types
├── constants.tsx               # Constants and configuration
├── index.ts                   # Barrel exports
├── CampaignsLayout.tsx        # Shared layout component
├── NavigationTabs.tsx         # Navigation tabs component
├── MetricCards.tsx            # Campaign statistics cards
├── CampaignStatusChart.tsx    # Campaign status breakdown chart
├── CallMetrics.tsx            # Call metrics display
├── CampaignFilters.tsx        # Search and filter controls
├── CampaignsGrid.tsx          # Campaigns grid display
├── NewCampaignForm.tsx        # New campaign form wrapper
├── CampaignStepIndicator.tsx  # Step indicator for new campaign
├── CampaignInformationForm.tsx # Campaign info form (step 1)
├── RecipientUploadForm.tsx    # Recipient upload form (step 2)
├── CampaignTimingForm.tsx     # Campaign timing form (step 3)
└── README.md                  # This file
```

## Key Components

### Types (`types.ts`)
- `Campaign`: Campaign information interface
- `MetricCard`: Metric card data interface
- `CallMetric`: Call metric data interface
- `CampaignStatus`: Campaign status data interface
- `Recipient`: Recipient information interface
- `CampaignFilters`: Filter state interface
- `CampaignFormData`: New campaign form data interface
- `NavigationTab`: Navigation tab interface
- `CampaignStep`: Campaign step interface

### Constants (`constants.tsx`)
- `NAVIGATION_TABS`: Navigation tab configuration
- `METRIC_CARDS`: Campaign metric cards data
- `CALL_METRICS`: Call metrics data
- `CAMPAIGN_STATUS_DATA`: Campaign status breakdown data
- `MOCK_CAMPAIGNS`: Sample campaign data
- `CAMPAIGN_STEPS`: New campaign step configuration
- `STATUS_OPTIONS`: Status filter options
- `DATE_RANGE_OPTIONS`: Date range filter options
- `SORT_OPTIONS`: Sort options
- `TIME_ZONE_OPTIONS`: Time zone options
- `MERGE_TAGS`: Available merge tags

### Layout (`CampaignsLayout.tsx`)
Shared layout component that includes:
- Dashboard sidebar
- Header
- Main content area
- Mobile menu handling

### Navigation (`NavigationTabs.tsx`)
Navigation tabs for switching between:
- Dashboard view
- Campaigns list
- New campaign form

### Dashboard Components
- `MetricCards.tsx`: Displays campaign statistics
- `CampaignStatusChart.tsx`: Campaign status breakdown with donut chart
- `CallMetrics.tsx`: Call metrics in grid layout

### Campaign List Components
- `CampaignFilters.tsx`: Search and filter controls
- `CampaignsGrid.tsx`: Campaign cards in grid layout

### New Campaign Components
- `NewCampaignForm.tsx`: Main form wrapper with step management
- `CampaignStepIndicator.tsx`: Visual step indicator
- `CampaignInformationForm.tsx`: Step 1 - Campaign details
- `RecipientUploadForm.tsx`: Step 2 - Recipient management
- `CampaignTimingForm.tsx`: Step 3 - Campaign timing

## Hooks

### `useCampaigns` (`hooks/useCampaigns.ts`)
Manages the campaigns page state:
- Layout state (sidebar, mobile menu)
- Campaign list and filtering
- New campaign form state
- Campaign actions (toggle, launch, cancel)

## Usage Examples

### Main Campaigns Page
```tsx
import { useCampaigns } from '@/hooks/useCampaigns'
import {
  CampaignsLayout,
  NavigationTabs,
  MetricCards,
  CampaignStatusChart,
  CallMetrics,
  CampaignFilters,
  CampaignsGrid,
  NewCampaignForm,
  NAVIGATION_TABS,
  METRIC_CARDS,
  CALL_METRICS,
  CAMPAIGN_STATUS_DATA
} from '@/components/campaigns'

export default function CampaignsPage() {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeTab,
    setActiveTab,
    campaigns,
    filters,
    setFilters,
    campaignStep,
    setCampaignStep,
    formData,
    setFormData,
    toggleCampaign,
    launchCampaign,
    cancelNewCampaign
  } = useCampaigns()

  return (
    <CampaignsLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      isMobileMenuOpen={isMobileMenuOpen}
      onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
    >
      <div className="space-y-6">
        <NavigationTabs
          tabs={NAVIGATION_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'dashboard' && (
          <>
            <MetricCards cards={METRIC_CARDS} />
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">
              <CampaignStatusChart statusData={CAMPAIGN_STATUS_DATA} />
              <CallMetrics metrics={CALL_METRICS} />
            </div>
          </>
        )}

        {activeTab === 'campaigns' && (
          <>
            <CampaignFilters filters={filters} onFiltersChange={setFilters} />
            <CampaignsGrid campaigns={campaigns} onToggleCampaign={toggleCampaign} />
          </>
        )}

        {activeTab === 'new-campaign' && (
          <NewCampaignForm
            currentStep={campaignStep}
            formData={formData}
            onStepChange={setCampaignStep}
            onFormDataChange={setFormData}
            onCancel={cancelNewCampaign}
            onLaunch={launchCampaign}
          />
        )}
      </div>
    </CampaignsLayout>
  )
}
```

## Key Features

### 1. **Separation of Concerns**
- **UI Components**: Pure presentation components with props
- **Business Logic**: Extracted into custom hooks
- **State Management**: Centralized in `useCampaigns` hook
- **Types**: Centralized in `types.ts`

### 2. **Reusability**
- `CampaignsLayout`: Shared layout across all campaign pages
- `NavigationTabs`: Consistent navigation
- `MetricCards`: Reusable metric display
- `CampaignsGrid`: Reusable campaign grid

### 3. **Type Safety**
- Strong TypeScript interfaces for all components
- Centralized type definitions
- Proper prop typing for all components

### 4. **Maintainability**
- Clear component hierarchy
- Consistent naming conventions
- Modular structure
- Easy to test individual components

### 5. **User Experience**
- Responsive design
- Mobile-friendly navigation
- Smooth transitions
- Intuitive form flow 