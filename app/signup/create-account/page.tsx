"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SignupProgress } from "@/components/signup-progress"
import {
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1400px] h-[880px] bg-white rounded-2xl shadow-2xl overflow-y-auto ">
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

          {/* Right Column - Create Account Form */}
          <div className="w-full h-full lg:w-1/2 p-8 lg:p-12">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mt-16 mb-8 lg:hidden">
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

            {/* Progress Indicator */}
            <div className="mt-10 mb-16">
              <SignupProgress currentStep={3} />
            </div>

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Almost done! Let's set up your login details.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
