"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  PasswordInput,
  GoogleSignInButton,
  RememberMeCheckbox,
  FormField,
  AuthButton
} from "@/components/auth"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignIn = () => {
    // Handle sign in logic
    console.log("Sign in with:", { email, password, rememberMe })
    router.push("/ai-agent")
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left Column - Video Background */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden ">
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
            <div className="relative z-10 p-12 flex flex-col  w-full">
              {/* Logo */}
              <div className="flex items-center mb-24 ">
                <Image
                  src="/images/AssistMind AI Logo.svg"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-auto h-12"
                />
              </div>

              {/* Slogan */}
              <div className="flex flex-col  pt-12 items-center text-start text-white  h-full">
                <h1 className="text-4xl font-bold leading-tight mb-4">
                Never Miss a Call. Never Lose a Lead. Powered <br />
                by AI.
                </h1>
              </div>
            </div>
          </div>

          {/* Right Column - Signin Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 ">
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
                Sign in to your Account
              </h1>
              <p className="text-gray-600">
                Sign in to your account
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <FormField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={setEmail}
                required
              />

              <PasswordInput
                id="password"
                label="Password"
                value={password}
                onChange={setPassword}
              />

              <RememberMeCheckbox
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                onForgotPassword={handleForgotPassword}
              />

              <AuthButton
                onClick={handleSignIn}
                disabled={!email || !password}
              >
                Sign in
              </AuthButton>

              <GoogleSignInButton onClick={handleGoogleSignIn} />

              {/* Footer */}
              <div className="text-center">
                <span className="text-gray-600">Don't have an Account? </span>
                <button 
                  onClick={handleSignUp} 
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
