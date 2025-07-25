"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AuthLayout,
  AuthHeader,
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

  return (
    <AuthLayout>
      <div className="flex flex-col w-full gap-[40px]">
        <AuthHeader
          title="Reset Your password"
          subtitle="Don't worry, we'll help you get back in."
        />

        {/* Form */}
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

          <AuthButton
            onClick={handleSendLink}
            disabled={!email}
          >
            Send Link
          </AuthButton>
        </div>
      </div>
    </AuthLayout>
  )
}
