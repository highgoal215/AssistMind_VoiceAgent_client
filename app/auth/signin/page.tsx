"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { GradientBackground } from "@/components/gradient-background"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = () => {
    // Handle sign in logic
    console.log("Sign in with:", { email, password, rememberMe })
    router.push("/dashboard")
  }

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Google sign in")
  }

  const handleForgotPassword = () => {
    router.push("/auth/reset-password")
  }

  const handleSignUp = () => {
    router.push("/signup/meet-agent")
  }

  return (
    <div className="min-h-screen bg-white lg:bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-[1440px] max-h-[983px] overflow-hidden">
        {/* Mobile Layout */}
        <div className="lg:hidden h-full">
          <div className="px-6 pt-12 pb-6 h-full overflow-y-auto">
            {/* Mobile Header */}
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

            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 font-manrope">Sign in to Your Account</h1>
                <p className="text-gray-600 font-manrope">Sign in to your account</p>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block font-manrope">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 border border-gray-300 rounded-lg font-manrope"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block font-manrope">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-lg pr-12 font-manrope"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-700 font-manrope">
                    Remember me
                  </Label>
                </div>
                <button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:text-blue-700 font-medium font-manrope">
                  Forget Password
                </button>
              </div>

              <Button
                onClick={handleSignIn}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 h-12 rounded-lg text-base font-medium font-manrope"
                disabled={!email || !password}
              >
                Signin
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-manrope">Or</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full py-3 h-12 rounded-lg text-base font-medium bg-white border border-gray-300 flex items-center justify-center space-x-2 font-manrope"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <span>Sign in with Google</span>
              </Button>

              <div className="text-center">
                <span className="text-gray-600 font-manrope">Don't have an Account? </span>
                <button onClick={handleSignUp} className="text-blue-600 hover:text-blue-700 font-medium font-manrope">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block h-full">
          <GradientBackground>
            <div className="flex-1 flex flex-col  lg:pl-[52px] pt-[40px] h-full overflow-y-auto ">
              <div className="flex flex-col w-full gap-[40px]">
                <div className=" mb-8">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-manrope">Sign in to your Account</h1>
                  <p className="text-gray-600 pt-[12px] font-manrope">Sign in to your account</p>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="email-desktop" className="text-sm font-medium text-gray-700 mb-2 block font-manrope">
                      Email Address
                    </Label>
                    <Input
                      id="email-desktop"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full font-manrope"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <Label htmlFor="password-desktop" className="text-sm font-medium text-gray-700 mb-2 block font-manrope">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password-desktop"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pr-10 font-manrope"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-desktop"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember-desktop" className="text-sm text-gray-700 font-manrope">
                        Remember me
                      </Label>
                    </div>
                    <button
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium font-manrope"
                    >
                      Forget Password
                    </button>
                  </div>

                  <Button
                    onClick={handleSignIn}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-manrope"
                    disabled={!email || !password}
                  >
                    Sign in
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500 font-manrope">Or</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full py-3 bg-white border border-gray-300 flex items-center justify-center space-x-2 font-manrope"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
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

                  <div className="text-center">
                    <span className="text-gray-600 font-manrope">Don't have an Account? </span>
                    <button onClick={handleSignUp} className="text-blue-600 hover:text-blue-700 font-medium font-manrope">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </GradientBackground>
        </div>
      </div>
    </div>
  )
}
