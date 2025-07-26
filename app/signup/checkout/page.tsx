"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  SignupPageLayout,
  SignupContentWrapper,
  SignupFormSection,
  SignupPaymentSection,
  SignupActionButtons
} from "@/components/signup"

const planPrices = {
  basic: 10,
  business: 50,
  enterprise: 99,
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "business"
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")
  const [country, setCountry] = useState("")

  const price = planPrices[planId as keyof typeof planPrices] || 50

  const handleBack = () => {
    router.back()
  }

  const handlePayment = () => {
    // Handle Stripe payment
    console.log("Processing payment...")
    // Redirect to success page or dashboard
    router.push("/ai-agent")
  }

  const handleApplePay = () => {
    // Handle Apple Pay
    console.log("Apple Pay selected")
  }

  return (
    <SignupPageLayout>
      <SignupContentWrapper
        currentStep={6}
        title="Stripe checkout"
        subtitle="Securely complete your payment via Stripe. All major cards accepted."
      >
        <SignupFormSection>
          <SignupPaymentSection
            email={email}
            onEmailChange={setEmail}
            cardNumber={cardNumber}
            onCardNumberChange={setCardNumber}
            nameOnCard={nameOnCard}
            onNameOnCardChange={setNameOnCard}
            country={country}
            onCountryChange={setCountry}
            onApplePay={handleApplePay}
          />

          <SignupActionButtons
            onNext={handlePayment}
            onBack={handleBack}
            nextText={`Pay $${price}`}
            backText="Back"
            nextDisabled={!email || !cardNumber || !nameOnCard}
          />
        </SignupFormSection>
      </SignupContentWrapper>
    </SignupPageLayout>
  )
}
