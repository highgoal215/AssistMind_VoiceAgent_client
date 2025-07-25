"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left Column - Video Background */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/bg-video.mp4" type="video/mp4" />
            </video>
            
            {/* Content Overlay */}
            <div className="relative z-10 p-12 flex flex-col w-full">
              {/* Logo */}
              <div className="flex items-center mb-24">
                <Image
                  src="/images/AssistMind AI Logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-auto h-12"
                />
              </div>

              {/* Slogan */}
              <div className="flex flex-col pt-12 items-center text-start text-white h-full">
                <h1 className="text-4xl font-bold leading-tight mb-4">
                Never Miss a Call. Never Lose a Lead. Powered <br />
                by AI.
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column - Verify Email Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mt-16 mb-16 lg:hidden">
              <div className="flex items-center">
                <div>
                <Image
                  src="/images/logo2.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-auto h-12"
                />
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Verify your Email
              </h1>
              <p className="text-gray-600">
                We've sent a 6-digit verification code to [user@example.com]. Please enter the code below to continue.
              </p>
            </div>

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
                <span className="text-gray-600">Didn't receive your code? </span>
                <button onClick={handleResendCode} className="text-red-600 hover:text-red-700 font-medium">
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
        </div>
      </div>
    </div>
  )
}
