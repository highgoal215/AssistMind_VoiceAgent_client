# Settings Components

This directory contains all the componentized settings page components for the AssistMind Voice Agent application.

## Component Structure

### Main Components

- **`SettingsLayout.tsx`** - Main layout component that handles the overall settings page structure, sidebar, header, and tab switching logic
- **`SettingsNavigation.tsx`** - Navigation tabs component for switching between different settings sections

### Section Components

- **`ProfileSection.tsx`** - Profile management section with profile image upload and personal information form
- **`SubscriptionsSection.tsx`** - Main subscriptions section that combines plan details, billing info, and pricing plans
- **`DeveloperSection.tsx`** - Developer settings section for webhook configuration
- **`NotificationsSection.tsx`** - Notification preferences section with configurable notification settings

### Sub-Components

- **`PlanDetails.tsx`** - Displays current subscription plan details and management options
- **`BillingInformation.tsx`** - Shows billing information and provides update/cancel options
- **`PricingPlans.tsx`** - Displays all available pricing plans with features and action buttons

## Usage

The main settings page (`app/setting/page.tsx`) now simply imports and renders the `SettingsLayout` component:

```tsx
"use client"

import React from 'react'
import SettingsLayout from '@/components/settings/SettingsLayout'

export default function SettingsPage() {
  return <SettingsLayout />
}
```

## Component Hierarchy

```
SettingsLayout
├── SettingsNavigation
├── ProfileSection
├── SubscriptionsSection
│   ├── PlanDetails
│   ├── BillingInformation
│   └── PricingPlans
├── DeveloperSection
└── NotificationsSection
```

## Benefits of Componentization

1. **Maintainability** - Each component has a single responsibility and can be modified independently
2. **Reusability** - Components can be reused in other parts of the application
3. **Testability** - Individual components can be unit tested in isolation
4. **Code Organization** - Clear separation of concerns and logical grouping
5. **Performance** - Components can be optimized individually and lazy-loaded if needed

## State Management

Each component manages its own local state using React hooks. The main layout component (`SettingsLayout`) handles:
- Active tab state
- Modal visibility states
- Sidebar collapse state
- Mobile menu state

Child components receive props for event handlers and data, maintaining a clean parent-child relationship.

## Styling

All components use Tailwind CSS classes and maintain consistency with the existing design system. The primary brand color `#4A48FF` is used throughout for buttons and active states. 