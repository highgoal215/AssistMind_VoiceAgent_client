"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GradientBackground } from "@/components/gradient-background"
import { Eye, EyeOff } from "lucide-react"
import Image from 'next/image'

export default function NewPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
                      Choose a new password
                    </h1>
                    <p className="text-gray-600 text-2xl lg:text-base xl:text-lg pt-[12px] font-manrope font-semibold">
                      Don't worry, we'll help you get back in.
                    </p>
                  </div>

                  {/* Form */}
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="password" className="text-md font-bold font-manrope text-gray-700 mb-2 block">
                        Choose a new Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-12 lg:h-auto border border-gray-300 rounded-lg pr-12 font-manrope font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5 lg:w-4 lg:h-4" /> : <Eye className="w-5 h-5 lg:w-4 lg:h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <Label htmlFor="confirm-password" className="text-md font-bold font-manrope text-gray-700 mb-2 block">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full h-12 lg:h-auto border border-gray-300 rounded-lg pr-12 font-manrope font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5 lg:w-4 lg:h-4" /> : <Eye className="w-5 h-5 lg:w-4 lg:h-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handleResetPassword}
                      className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-3 h-12 lg:h-auto rounded-lg text-base font-manrope font-bold"
                      disabled={!password || !confirmPassword}
                    >
                      Reset Password
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
