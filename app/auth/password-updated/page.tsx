"use client"

import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import Image from "next/image"
import {
  AuthButton
} from "@/components/auth"

export default function PasswordUpdatedPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push("/auth/signin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1400px] h-[880px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-full">
          {/* Left Column - Video Background */}
          <div className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden">
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
              <div className="flex flex-col justify-center mb-10 items-center text-start text-white h-full">
                <p className="text-5xl font-bold leading-tight mb-4">
                  Never Miss a Call. Never Lose a Lead. Powered <br />
                  by AI.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Success Content */}
          <div className="w-full h-full lg:w-1/2 p-8 lg:p-12">
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

            {/* Success Content */}
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center max-w-md w-full">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-green-500 rounded-full"></div>
                      <div className="absolute inset-2 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                      </div>
                      {/* Star-like points around the circle */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rotate-45"></div>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Your password has been updated!
                  </h1>

                  <p className="text-gray-600">
                    Password updated successfully. You can now sign in.
                  </p>
                </div>

                <AuthButton onClick={handleSignIn}>
                  Sign in
                </AuthButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
