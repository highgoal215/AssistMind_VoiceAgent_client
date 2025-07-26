# Signup Components

A sophisticated, componentized signup system for the AssistMind Voice Agent client that eliminates code duplication and provides a consistent, maintainable signup experience across all signup pages.

## Overview

This directory contains a comprehensive set of reusable signup components designed to provide a consistent, maintainable signup experience across all signup pages. The system follows the same architectural patterns as the auth components, ensuring consistency across the application.

## Architecture

### Core Layout Components

- **`SignupPageLayout`** - The main layout wrapper that provides the consistent structure for all signup pages (video background, logo, responsive design)
- **`SignupContentWrapper`** - Content wrapper that handles progress indicator and page headers
- **`SignupFormSection`** - Form container with consistent spacing and structure

### Specialized Components

- **`SignupPlanCard`** - Pricing plan card component with popular badges and selection states
- **`SignupBusinessSearch`** - Business lookup component with search results and manual entry option
- **`SignupAudioPlayer`** - Audio player component for agent voice preview
- **`SignupPaymentSection`** - Payment form component with Apple Pay and card payment options

### Form Components

- **`SignupFormField`** - Reusable form input field with label and validation
- **`SignupPasswordInput`** - Password input with show/hide functionality
- **`SignupButton`** - Primary action button with consistent styling
- **`SignupGoogleButton`** - Google OAuth sign-in button
- **`TermsCheckbox`** - Terms and conditions checkbox
- **`SignupActionButtons`** - Navigation buttons (Next/Back) with consistent styling

## Usage

### Basic Signup Page Structure

```tsx
import { 
  SignupPageLayout, 
  SignupContentWrapper, 
  SignupFormSection 
} from "@/components/signup"

export default function MySignupPage() {
  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={1}
        title="Page Title"
        subtitle="Page description"
      >
        <SignupFormSection>
          {/* Your form content */}
        </SignupFormSection>
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
```

### Pricing Plans Page

```tsx
import { 
  SignupPageLayout, 
  SignupContentWrapper, 
  SignupPlanCard,
  PLANS 
} from "@/components/signup"

export default function ActivatePlanPage() {
  const handlePlanSelect = (planId: string) => {
    router.push(`/signup/checkout?plan=${planId}`)
  }

  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={5}
        title="Activate Your Plan"
        subtitle="Start enjoying premium features — activate your plan now."
      >
        <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-6 lg:max-w-4xl lg:h-1/4">
          {PLANS.map((plan) => (
            <SignupPlanCard
              key={plan.id}
              {...plan}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
```

### Business Search Page

```tsx
import { 
  SignupPageLayout, 
  SignupContentWrapper, 
  SignupFormSection,
  SignupBusinessSearch,
  BUSINESS_RESULTS 
} from "@/components/signup"

export default function MeetAgentPage() {
  const [businessSearch, setBusinessSearch] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleBusinessSearch = (value: string) => {
    setBusinessSearch(value)
    setShowResults(value.length > 2)
  }

  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={2}
        title="Meet Your AI Agent"
        subtitle="Pick a name, voice and connect your business"
      >
        <SignupFormSection>
          <SignupBusinessSearch
            value={businessSearch}
            onChange={handleBusinessSearch}
            onSelect={handleBusinessSelect}
            results={BUSINESS_RESULTS}
            showResults={showResults}
            onManualEntry={() => router.push("/signup/business-details")}
          />
        </SignupFormSection>
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
```

### Audio Player Page

```tsx
import { 
  SignupPageLayout, 
  SignupContentWrapper, 
  SignupAudioPlayer 
} from "@/components/signup"

export default function HearAgentPage() {
  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={3}
        title="Hear Your AI Agent"
        subtitle="Listen to how your AI agent sounds. You can customize voice and tone anytime"
      >
        <SignupAudioPlayer
          title="Agent Intro Sample"
          duration="1m 12s"
          progress={65}
        />
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
```

### Payment Page

```tsx
import { 
  SignupPageLayout, 
  SignupContentWrapper, 
  SignupPaymentSection 
} from "@/components/signup"

export default function CheckoutPage() {
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")
  const [country, setCountry] = useState("")

  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={6}
        title="Stripe checkout"
        subtitle="Securely complete your payment via Stripe. All major cards accepted."
      >
        <SignupPaymentSection
          email={email}
          onEmailChange={setEmail}
          cardNumber={cardNumber}
          onCardNumberChange={setCardNumber}
          nameOnCard={nameOnCard}
          onNameOnCardChange={setNameOnCard}
          country={country}
          onCountryChange={setCountry}
          onApplePay={handleApplePay}
        />
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
```

## Benefits

### 1. **Code Reusability**
- Eliminates duplicate layout code across signup pages
- Consistent styling and behavior
- Single source of truth for signup components

### 2. **Maintainability**
- Changes to layout or styling only need to be made in one place
- Easy to add new signup pages with consistent structure
- Clear separation of concerns

### 3. **Type Safety**
- Comprehensive TypeScript interfaces
- Shared types for form data and validation
- Better developer experience with autocomplete

### 4. **Consistency**
- Uniform user experience across all signup flows
- Consistent styling and interactions
- Standardized error handling

### 5. **Performance**
- Optimized component structure
- Reduced bundle size through code sharing
- Efficient re-rendering

## File Structure

```
components/signup/
├── index.ts                    # Main exports
├── types.ts                    # Shared TypeScript interfaces and constants
├── README.md                   # This documentation
├── SignupPageLayout.tsx        # Main layout wrapper
├── SignupContentWrapper.tsx    # Content wrapper with progress and header
├── SignupFormSection.tsx       # Form container
├── SignupPlanCard.tsx          # Pricing plan card component
├── SignupBusinessSearch.tsx    # Business lookup component
├── SignupAudioPlayer.tsx       # Audio player component
├── SignupPaymentSection.tsx    # Payment form component
├── SignupLayout.tsx            # Legacy layout component
├── SignupHeader.tsx            # Legacy header component
├── SignupFormField.tsx         # Form input field
├── SignupPasswordInput.tsx     # Password input with toggle
├── SignupButton.tsx            # Primary action button
├── SignupGoogleButton.tsx      # Google OAuth button
├── TermsCheckbox.tsx           # Terms checkbox
├── SignupActionButtons.tsx     # Navigation buttons
└── Divider.tsx                 # Visual separator
```

## Migration Guide

### Before (Old Structure)
```tsx
// Each page had duplicate layout code
<div className="min-h-screen flex items-center justify-center p-4">
  <div className="w-full max-w-[1400px] h-[880px] bg-white rounded-2xl shadow-2xl overflow-y-auto">
    <div className="flex h-full">
      {/* Duplicate video background code */}
      {/* Duplicate logo code */}
      {/* Duplicate form structure */}
    </div>
  </div>
</div>
```

### After (New Structure)
```tsx
// Clean, componentized structure
<SignupPageLayout>
  <SignupContentWrapper
    currentStep={1}
    title="Title"
    subtitle="Subtitle"
  >
    <SignupFormSection>
      {/* Form content */}
    </SignupFormSection>
  </SignupContentWrapper>
</SignupPageLayout>
```

## Constants and Types

### Signup Steps
The system includes predefined signup steps with consistent navigation:

```tsx
import { SIGNUP_STEPS } from "@/components/signup"

// Access step information
const currentStep = SIGNUP_STEPS.find(step => step.id === 1)
```

### Plans Data
Predefined pricing plans with features:

```tsx
import { PLANS } from "@/components/signup"

// Access plan information
const businessPlan = PLANS.find(plan => plan.id === "business")
```

### Business Results
Sample business data for search functionality:

```tsx
import { BUSINESS_RESULTS } from "@/components/signup"

// Use in business search
const searchResults = BUSINESS_RESULTS.filter(business => 
  business.name.toLowerCase().includes(searchTerm)
)
```

## Future Enhancements

1. **Form Validation Hooks** - Custom hooks for form validation
2. **Error Boundary** - Error handling for signup flows
3. **Loading States** - Loading indicators for async operations
4. **Accessibility** - Enhanced ARIA labels and keyboard navigation
5. **Internationalization** - Multi-language support
6. **Theme Support** - Dark mode and custom themes
7. **Analytics** - Built-in analytics tracking
8. **Testing** - Comprehensive test suite
9. **Form State Management** - Global form state management
10. **Progress Persistence** - Save signup progress across sessions

## Contributing

When adding new signup components:

1. Follow the existing naming convention
2. Add proper TypeScript interfaces
3. Include comprehensive props documentation
4. Export from `index.ts`
5. Update this README if needed
6. Add tests for new components
7. Consider adding to the types file for shared interfaces 