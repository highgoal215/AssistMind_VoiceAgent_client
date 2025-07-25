"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import {
  AuthLayout,
  AuthHeader,
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
      <div className="flex flex-col w-full gap-[40px]">
        <AuthHeader
          title="Verify your Email"
          subtitle="We've sent a 6-digit verification code to [user@example.com]. Please enter the code below to continue."
        />

        {/* Form */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup className="flex gap-2">
                <InputOTPSlot index={0} className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg" />
                <InputOTPSlot index={1} className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg" />
                <InputOTPSlot index={2} className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg" />
                <InputOTPSlot index={3} className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg" />
                <InputOTPSlot index={4} className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg" />
                <InputOTPSlot index={5} className="w-12 h-12 text-lg border-2 border-gray-300 rounded-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <span className="text-gray-600 font-manrope font-medium">Didn't receive your code? </span>
            <button onClick={handleResendCode} className="text-[#4A48FF] hover:text-[#4A48FF] font-manrope">
              Resend code
            </button>
          </div>

          <AuthButton
            onClick={handleVerify}
            disabled={code.length !== 6}
          >
            Verify & Continue
          </AuthButton>
        </div>
      </div>
    </AuthLayout>
  )
}
