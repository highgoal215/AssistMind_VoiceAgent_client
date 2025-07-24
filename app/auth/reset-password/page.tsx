"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GradientBackground } from "@/components/gradient-background"
import Image from 'next/image'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSendLink = () => {
    // Handle send reset link logic
    console.log("Send reset link to:", email)
    router.push("/auth/verify-email")
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

            <div className="flex flex-col w-full gap-[40px]">
              {/* Header */}
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-3xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 font-manrope ">
                  Reset Your password
                </h1>
                <p className="text-gray-600 text-2xl lg:text-base xl:text-lg pt-[12px] font-manrope font-semibold">
                  Don't worry, we'll help you get back in.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="email" className="text-md font-semibold font-manrope text-gray-700 mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 lg:h-auto border border-gray-300 rounded-lg font-manrope font-medium"
                  />
                </div>

                <Button
                  onClick={handleSendLink}
                  className="w-full bg-[#4A48FF] hover:bg-[#2b29b1] text-white py-3 h-12 lg:h-auto rounded-lg text-base font-manrope font-semibold"
                  disabled={!email}
                >
                  Send Link
                </Button>
              </div>
            </div>
          </div>
        </GradientBackground>
      </div>
    </div>
  )
}
