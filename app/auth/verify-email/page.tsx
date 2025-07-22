"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { GradientBackground } from "@/components/gradient-background"
import Image from 'next/image'


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
    <GradientBackground>
      <div className="flex items-center justify-center">
        <div className="flex items-center lg:hidden">
          <Image
            src="/images/logo2.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start p-6 lg:p-12 h-full">
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify your Email</h2>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to [user@example.com]. Please enter the code below to continue.
            </p>
          </div>

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
              <span className="text-gray-600">Didn't receive your code? </span>
              <button onClick={handleResendCode} className="text-blue-600 hover:text-blue-700 font-medium">
                Resend code
              </button>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              disabled={code.length !== 6}
            >
              Verify & Continue
            </Button>
          </div>
        </div>
      </div>
    </GradientBackground>
  )
}
