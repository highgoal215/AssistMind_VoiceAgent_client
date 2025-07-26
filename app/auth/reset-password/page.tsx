"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AuthLayout,
  AuthHeader,
  AuthFooter,
  FormField,
  AuthButton
} from "@/components/auth"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSendLink = () => {
    // Handle send reset link logic
    console.log("Send reset link to:", email)
    router.push("/auth/verify-email")
  }

  const handleBackToSignIn = () => {
    router.push("/auth/signin")
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Reset Your Password"
        subtitle="Don't worry, we'll help you get back in."
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

        <AuthButton
          onClick={handleSendLink}
          disabled={!email}
        >
          Send Link
        </AuthButton>

        <AuthFooter
          text="Remember your password?"
          linkText="Sign In"
          onLinkClick={handleBackToSignIn}
        />
      </div>
    </AuthLayout>
  )
}
