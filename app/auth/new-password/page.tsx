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
      <div className="flex-1 flex flex-col justify-start h-full p-6 lg:px-12 lg:py-8">

        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a new password</h2>
            <p className="text-gray-600">Don't worry, we'll help you get back in.</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-sm font-manrope text-gray-700 mb-2 block">
                Choose a new Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirm-password" className="text-sm font-manrope text-gray-700 mb-2 block">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleResetPassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              disabled={!password || !confirmPassword}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </GradientBackground>
  )
}
