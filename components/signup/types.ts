export interface PlanFeature {
  text: string
}

export interface BusinessResult {
  id: number
  name: string
  address: string
  rating: number
  reviews: number
  status: string
  tags: string[]
  image: string
}

export interface SignupFormData {
  // Business Details
  businessName: string
  website: string
  phoneNumber: string
  
  // Agent Details
  agentName: string
  voiceTone: string
  businessSearch: string
  
  // Account Details
  firstName: string
  lastName: string
  email: string
  password: string
  agreeToTerms: boolean
  
  // Payment Details
  cardNumber: string
  nameOnCard: string
  country: string
}

export interface SignupStep {
  id: number
  title: string
  subtitle: string
  path: string
}

export const SIGNUP_STEPS: SignupStep[] = [
  {
    id: 1,
    title: "Business Details",
    subtitle: "Tell us about your business",
    path: "/signup/business-details"
  },
  {
    id: 2,
    title: "Meet Your Agent",
    subtitle: "Customize your AI agent",
    path: "/signup/meet-agent"
  },
  {
    id: 3,
    title: "Hear Your Agent",
    subtitle: "Listen to your agent's voice",
    path: "/signup/hear-agent"
  },
  {
    id: 4,
    title: "Create Account",
    subtitle: "Set up your login details",
    path: "/signup/create-account"
  },
  {
    id: 5,
    title: "Activate Plan",
    subtitle: "Choose your subscription",
    path: "/signup/activate-plan"
  },
  {
    id: 6,
    title: "Checkout",
    subtitle: "Complete your payment",
    path: "/signup/checkout"
  }
]

export const PLANS = [
  {
    id: "basic",
    name: "Basic plan",
    price: 10,
    popular: true,
    features: [
      { text: "AI-powered call handling" },
      { text: "Basic voice customization" },
      { text: "Up to 100 calls/month" },
      { text: "Email support" }
    ],
  },
  {
    id: "business",
    name: "Business plan",
    price: 50,
    mostPopular: true,
    features: [
      { text: "Everything in Basic" },
      { text: "Advanced voice & tone options" },
      { text: "Up to 1,000 calls/month" },
      { text: "Priority support" },
      { text: "Custom integrations" },
      { text: "Analytics dashboard" }
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise plan",
    price: 99,
    features: [
      { text: "Everything in Business" },
      { text: "Unlimited calls" },
      { text: "White-label solution" },
      { text: "Dedicated account manager" },
      { text: "Custom AI training" },
      { text: "API access" }
    ],
  },
]

export const BUSINESS_RESULTS: BusinessResult[] = [
  {
    id: 1,
    name: "Canadian Renovator & Technical Services Inc.",
    address: "63 Thorncliffe Park Dr #307, Toronto, ON M4H 1L4",
    rating: 5,
    reviews: 201,
    status: "Closed",
    tags: ["Plumber", "Electrician", "+4 more"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Canadian Renovator & Technical Services Inc.",
    address: "63 Thorncliffe Park Dr #307, Toronto, ON M4H 1L4",
    rating: 5,
    reviews: 201,
    status: "Closed",
    tags: ["Plumber", "Electrician", "+4 more"],
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Canadian Renovator & Technical Services Inc.",
    address: "63 Thorncliffe Park Dr #307, Toronto, ON M4H 1L4",
    rating: 5,
    reviews: 201,
    status: "Closed",
    tags: ["Plumber", "Electrician", "+4 more"],
    image: "/placeholder.svg?height=80&width=80",
  },
] 