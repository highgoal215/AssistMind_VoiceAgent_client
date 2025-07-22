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
    <GradientBackground>
      <div className="flex items-center justify-center lg:hidden">
        <div className="flex items-center">
          <Image
            src="/images/logo2.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start p-6 lg:px-12 py-8 h-full">
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Your password</h2>
            <p className="text-gray-600">Don't worry, we'll help you get back in.</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleSendLink}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              disabled={!email}
            >
              Send Link
            </Button>
          </div>
        </div>
      </div>
    </GradientBackground>
  )
}
