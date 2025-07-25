"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  SignupLayout,
  SignupHeader,
  SignupFormField,
  SignupPasswordInput,
  TermsCheckbox,
  SignupActionButtons,
  SignupGoogleButton
} from "@/components/signup"

export default function CreateAccountPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
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
    <SignupLayout currentStep={3}>
      <SignupHeader
        title="Create Your Account"
        subtitle="Almost done! Let's set up your login details."
      />

      {/* Form Fields */}
      <div className="space-y-6 lg:space-y-4 lg:flex lg:flex-col">
        {/* Name Fields - Stack on mobile, side by side on desktop */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          <SignupFormField
            id="first-name"
            label="First Name"
            placeholder="First name"
            value={firstName}
            onChange={setFirstName}
            required
          />
          <SignupFormField
            id="last-name"
            label="Last Name"
            placeholder="Last name"
            value={lastName}
            onChange={setLastName}
            required
          />
        </div>

        <SignupFormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={setEmail}
          required
        />

        <SignupFormField
          id="phone"
          label="Phone number"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />

        <SignupPasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
        />

        <TermsCheckbox
          checked={agreeToTerms}
          onCheckedChange={setAgreeToTerms}
        />
      </div>

      <SignupActionButtons
        onNext={handleNext}
        onBack={handleBack}
        nextText="Create Account"
        nextDisabled={!firstName || !lastName || !email || !password || !agreeToTerms}
      />

      {/* Google Sign In Button */}
      <div className="flex justify-center items-center w-full pt-5">
        <SignupGoogleButton onClick={handleGoogleSignIn} />
      </div>
    </SignupLayout>
  )
}
