"use client"

import { useRouter } from "next/navigation"
import {
  AuthLayout,
  AuthSuccessCard
} from "@/components/auth"

export default function PasswordUpdatedPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push("/auth/signin")
  }

  return (
    <AuthLayout>
      <AuthSuccessCard
        title="Your password has been updated!"
        description="Password updated successfully. You can now sign in."
        buttonText="Sign in"
        onButtonClick={handleSignIn}
      />
    </AuthLayout>
  )
}
