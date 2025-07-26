export interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
  rememberMe?: boolean
}

export interface AuthValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

export interface AuthPageConfig {
  title: string
  subtitle?: string
  heroSlogan?: string
  showBackButton?: boolean
  backButtonText?: string
  backButtonAction?: () => void
}

export type AuthPageType = 
  | 'signin'
  | 'signup'
  | 'reset-password'
  | 'verify-email'
  | 'new-password'
  | 'password-updated' 