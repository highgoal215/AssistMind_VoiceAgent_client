# Auth Components

This directory contains reusable components for authentication pages. These components provide a consistent, maintainable, and scalable approach to building auth interfaces.

## Components Overview

### Core Layout Components

#### `AuthLayout`
The main layout wrapper that provides the gradient background, responsive design, and modal container structure.

```tsx
import { AuthLayout } from "@/components/auth"

<AuthLayout>
  {/* Your auth page content */}
</AuthLayout>
```

#### `AuthHeader`
Displays the title and subtitle for auth pages with consistent styling.

```tsx
<AuthHeader
  title="Sign in to Your Account"
  subtitle="Sign in to your account"
/>
```

### Form Components

#### `FormField`
A reusable form field component with label and input styling.

```tsx
<FormField
  id="email"
  label="Email Address"
  type="email"
  placeholder="Email address"
  value={email}
  onChange={setEmail}
  required
/>
```

#### `PasswordInput`
A password input field with show/hide functionality.

```tsx
<PasswordInput
  id="password"
  label="Password"
  value={password}
  onChange={setPassword}
/>
```

#### `RememberMeCheckbox`
A checkbox component for "Remember me" functionality with optional forgot password link.

```tsx
<RememberMeCheckbox
  checked={rememberMe}
  onCheckedChange={setRememberMe}
  onForgotPassword={handleForgotPassword}
/>
```

### Button Components

#### `AuthButton`
A consistent button component for auth actions.

```tsx
<AuthButton
  onClick={handleSignIn}
  disabled={!email || !password}
>
  Sign in
</AuthButton>
```

#### `GoogleSignInButton`
A pre-styled Google sign-in button with the Google logo.

```tsx
<GoogleSignInButton onClick={handleGoogleSignIn} />
```

### Utility Components

#### `Divider`
A divider component for separating sections (e.g., "Or" separator).

```tsx
<Divider text="Or" />
```

#### `AuthFooter`
A footer component for auth pages with customizable text and link.

```tsx
<AuthFooter
  text="Don't have an Account?"
  linkText="Sign Up"
  onLinkClick={handleSignUp}
/>
```

## Usage Example

Here's how to use these components to build a complete signin page:

```tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AuthLayout,
  AuthHeader,
  FormField,
  PasswordInput,
  RememberMeCheckbox,
  AuthButton,
  Divider,
  GoogleSignInButton,
  AuthFooter
} from "@/components/auth"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = () => {
    // Handle sign in logic
    router.push("/dashboard")
  }

  return (
    <AuthLayout>
      <div className="flex flex-col w-full gap-[40px]">
        <AuthHeader
          title="Sign in to Your Account"
          subtitle="Sign in to your account"
        />

        <div className="space-y-6">
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={setEmail}
            required
          />

          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={setPassword}
          />

          <RememberMeCheckbox
            checked={rememberMe}
            onCheckedChange={setRememberMe}
            onForgotPassword={() => router.push("/auth/reset-password")}
          />

          <AuthButton
            onClick={handleSignIn}
            disabled={!email || !password}
          >
            Sign in
          </AuthButton>

          <Divider />

          <GoogleSignInButton onClick={() => console.log("Google sign in")} />

          <AuthFooter
            text="Don't have an Account?"
            linkText="Sign Up"
            onLinkClick={() => router.push("/signup")}
          />
        </div>
      </div>
    </AuthLayout>
  )
}
```

## Benefits

1. **Consistency**: All auth pages will have the same look and feel
2. **Maintainability**: Changes to styling or behavior can be made in one place
3. **Reusability**: Components can be used across different auth pages
4. **Type Safety**: All components are fully typed with TypeScript
5. **Accessibility**: Built-in accessibility features and proper ARIA labels
6. **Responsive**: All components work seamlessly on mobile and desktop

## Customization

All components accept `className` props for additional styling when needed. The base styling follows the design system with the primary color `#4A48FF` and consistent spacing. 