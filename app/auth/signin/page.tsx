"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AuthLayout,
  AuthHeader,
  AuthFooter,
  FormField,
  PasswordInput,
  RememberMeCheckbox,
  AuthButton,
  GoogleSignInButton
} from "@/components/auth"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = () => {
    // Handle sign in logic
    console.log("Sign in with:", { email, password, rememberMe })
    router.push("/ai-agent")
  }

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Google sign in")
  }

  const handleForgotPassword = () => {
    router.push("/auth/reset-password")
  }

  const handleSignUp = () => {
    router.push("/signup/meet-agent")
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Sign in to your Account"
        subtitle="Sign in to your account"
      />

      <div className="space-y-6 flex-1">
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
          onForgotPassword={handleForgotPassword}
        />

        <AuthButton
          onClick={handleSignIn}
          disabled={!email || !password}
        >
          Sign in
        </AuthButton>

        <GoogleSignInButton onClick={handleGoogleSignIn} />

        <AuthFooter
          text="Don't have an Account?"
          linkText="Sign Up"
          onLinkClick={handleSignUp}
        />
      </div>
    </AuthLayout>
  )
}
