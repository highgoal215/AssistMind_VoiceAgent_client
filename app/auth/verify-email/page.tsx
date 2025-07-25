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
    <div className="min-h-screen bg-white lg:bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-[1440px] max-h-[983px] overflow-hidden">
        <GradientBackground>
          <div className="flex-1 flex flex-col px-6 lg:pl-[52px] pt-12 lg:pt-[40px] h-full overflow-y-auto">
            {/* Logo - Mobile Only */}
            <div className="flex items-center justify-center mb-8 lg:hidden">
              <div className="flex items-center pb-[44px]">
                <Image
                  src="/images/logo2.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Modal-style container for desktop */}
            <div className="lg:flex lg:items-center lg:justify-center lg:h-full lg:pr-[52px]">
              <div className="lg:bg-white lg:rounded-2xl lg:shadow-2xl lg:p-8 lg:w-full lg:max-w-md lg:border lg:border-gray-100 lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex flex-col w-full gap-[40px]">
                  {/* Header */}
                  <div className="text-center lg:text-left mb-8">
                    <h1 className="text-3xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 font-manrope">
                      Verify your Email
                    </h1>
                    <p className="text-gray-600 text-2xl lg:text-base xl:text-lg pt-[12px] font-manrope font-semibold">
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
                      <span className="text-gray-600 font-manrope font-medium">Didn't receive your code? </span>
                      <button onClick={handleResendCode} className="text-[#4A48FF] hover:text-[#4A48FF] font-manrope">
                        Resend code
                      </button>
                    </div>

                    <Button
                      onClick={handleVerify}
                      className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-3 h-12 lg:h-auto rounded-lg text-base font-manrope font-semibold"
                      disabled={code.length !== 6}
                    >
                      Verify & Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  )
}
