"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SignupProgress } from "@/components/signup-progress"
import { GradientBackground } from "@/components/gradient-background"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function CreateAccountPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleNext = () => {
    router.push("/signup/activate-plan")
  }

  const handleBack = () => {
    router.back()
  }

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Google sign in")
  }

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-[1440px] max-h-[983px] overflow-auto">
        {/* Mobile Header - Only visible on mobile */}
        <div className="lg:hidden flex items-center justify-center mb-8 px-6 pt-12">
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

        {/* Main Content Container */}
        <GradientBackground>
          <div className="px-6 lg:px-0  lg:pt-[70px] pt-[50px] pb-6 lg:pb-0 h-full overflow-y-auto lg:flex-1 lg:flex lg:flex-col lg:pl-[52px]">
            {/* Modal-style container for desktop */}
            <div className="lg:flex lg:items-center lg:justify-center lg:h-full lg:pr-[52px] lg:pt-0">
              <div className="lg:bg-white lg:rounded-2xl lg:shadow-2xl lg:p-8 lg:w-full lg:max-w-lg lg:border lg:border-gray-100 lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                {/* Progress indicator inside modal */}
                <div className="lg:mb-6">
                  <SignupProgress currentStep={3} />
                </div>

                <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:pt-10">
                  {/* Header Section */}
                  <div className="flex flex-col justify-center items-center pt-[20px] lg:pt-12 lg:items-start">
                    <div className="flex flex-col gap-1 lg:gap-1">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope text-center lg:text-left">Create Your Account</h2>
                      <p className="text-gray-600 mb-8 lg:mb-8 font-manrope lg:text-[18px] text-center lg:text-left font-semibold">Almost done! Let's set up your login details.</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6 lg:space-y-4 lg:flex lg:flex-col">
                    {/* Name Fields - Stack on mobile, side by side on desktop */}
                    <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
                      <div className="flex flex-col">
                        <Label htmlFor="first-name" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                          First Name
                        </Label>
                        <Input
                          id="first-name"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg font-manrope font-bold"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Label htmlFor="last-name" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                          Last Name
                        </Label>
                        <Input
                          id="last-name"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg font-manrope font-bold"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                      <Label htmlFor="email" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg font-manrope font-bold"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col">
                      <Label htmlFor="phone" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                        Phone number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg font-manrope font-bold"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                      <Label htmlFor="password" className="text-[16px] lg:text-[18px] font-bold text-gray-700 mb-2 block font-manrope">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-12 lg:h-[56px] border-2 border-blue-600 lg:border-gray-300 rounded-lg pr-10 font-manrope font-bold"
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

                    {/* Terms Checkbox */}
                    <div className="flex items-center space-x-2 font-semibold font-manrope">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        className="data-[state=checked]:bg-[#4A48FF] data-[state=checked]:border-[#4A48FF]"
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-700 font-manrope">
                        By signuping Up, I agree to the{" "}
                        <a href="#" className="text-[#4A48FF] hover:text-[#4A48FF] font-manrope">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#4A48FF] hover:text-[#4A48FF] font-manrope">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 lg:space-y-0 lg:pt-[20px]">
                    {/* Mobile: Stacked buttons */}
                    <div className="lg:hidden space-y-4">
                      <Button
                        onClick={handleNext}
                        className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-3 h-12 rounded-lg text-base font-manrope font-manrope"
                        disabled={!firstName || !lastName || !email || !password || !agreeToTerms}
                      >
                        Create Account
                      </Button>
                      <Button onClick={handleBack} variant="outline" className="w-full py-3 h-12 bg-transparent font-manrope rounded-lg">
                        Back
                      </Button>
                    </div>

                    {/* Desktop: Side by side buttons */}
                    <div className="hidden lg:flex justify-between items-center w-full pt-[26px]">
                      <Button onClick={handleBack} variant="outline" className="w-[193px] h-[56px] bg-transparent font-manrope font-semibold">
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="w-[193px] h-[56px] bg-[#4A48FF] hover:bg-[#4A48FF] text-white font-manrope font-semibold"
                        disabled={!firstName || !lastName || !email || !password || !agreeToTerms}
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>

                  {/* Google Sign In Button */}
                  <div className="flex justify-center items-center w-full pt-5 ">
                    <Button
                      onClick={handleGoogleSignIn}
                      variant="outline"
                      className="w-full h-12 lg:h-14 bg-white border border-gray-300 flex items-center justify-center space-x-2 font-manrope rounded-lg font-bold font-manrope text-md"
                    >
                      <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
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
