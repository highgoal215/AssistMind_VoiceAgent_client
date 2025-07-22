"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Use replace instead of push to avoid back button issues
    router.replace("/auth/signin")
  }, [router])

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 animate-pulse" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
