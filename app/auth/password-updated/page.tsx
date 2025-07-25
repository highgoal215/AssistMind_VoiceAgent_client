"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { GradientBackground } from "@/components/gradient-background"
import Image from "next/image"

export default function PasswordUpdatedPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push("/auth/signin")
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
                <div className="flex flex-col w-full gap-[40px] items-center justify-center">
                  {/* Success Content */}
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

                      <h1 className="text-3xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 font-manrope">
                        Your password has been updated!
                      </h1>

                      <p className="text-gray-600 text-2xl lg:text-base xl:text-lg flex items-center justify-center font-manrope font-semibold">
                        Password updated successfully. You can now sign in.
                      </p>
                    </div>

                    <Button
                      onClick={handleSignIn}
                      className="w-full bg-[#4A48FF] hover:bg-[#4A48FF] text-white py-3 h-12 lg:h-auto rounded-lg text-base font-manrope font-bold"
                    >
                      Sign in
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
