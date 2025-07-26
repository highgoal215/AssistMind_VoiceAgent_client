"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AuthLayout,
  AuthHeader,
  PasswordInput,
  AuthButton
} from "@/components/auth"

export default function NewPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    // Handle password reset logic
    console.log("Reset password")
    router.push("/auth/password-updated")
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Choose a new password"
        subtitle="Don't worry, we'll help you get back in."
      />

      <div className="space-y-6 flex-1">
        <PasswordInput
          id="password"
          label="Choose a new Password"
          value={password}
          onChange={setPassword}
        />

        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <AuthButton
          onClick={handleResetPassword}
          disabled={!password || !confirmPassword}
        >
          Reset Password
        </AuthButton>
      </div>
    </AuthLayout>
  )
}
