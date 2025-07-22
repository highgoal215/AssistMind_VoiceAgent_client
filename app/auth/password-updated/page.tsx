"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PasswordUpdatedPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
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

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your password has been updated!</h1>

          <p className="text-gray-600 flex items-center justify-center">
            <span className="mr-2">🎉</span>
            Password updated successfully. You can now sign in.
          </p>
        </div>

        <Button
          onClick={handleSignIn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
        >
          Sign in
        </Button>
      </div>
    </div>
  )
}
