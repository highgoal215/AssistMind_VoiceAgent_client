"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AuthLayout,
  AuthHeader,
  AuthOTPInput,
  AuthResendCode,
  AuthButton
} from "@/components/auth"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [code, setCode] = useState("")

  const handleVerify = () => {
    if (code.length === 6) {
      // Handle verification logic
      console.log("Verify code:", code)
      router.push("/auth/new-password")
    }
  }

  const handleResendCode = () => {
    // Handle resend code logic
    console.log("Resend code")
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Verify your Email"
        subtitle="We've sent a 6-digit verification code to [user@example.com]. Please enter the code below to continue."
      />

      <div className="space-y-6 flex-1">
        <AuthOTPInput
          value={code}
          onChange={setCode}
          maxLength={6}
        />

        <AuthResendCode onResend={handleResendCode} />

        <AuthButton
          onClick={handleVerify}
          disabled={code.length !== 6}
        >
          Verify & Continue
        </AuthButton>
      </div>
    </AuthLayout>
  )
}
