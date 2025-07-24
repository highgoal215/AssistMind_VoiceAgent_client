"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LoadingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    "Loading your business details and preferences...",
    "Customizing call flow and conversation logic...",
    "Syncing with your calendar and integrations...",
    "Setting voice tone and personalization...",
    "Running final checks — your agent is almost ready!"
  ]

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Step rotation
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [steps.length])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">AssistMind</span>
              <span className="text-2xl font-bold text-purple-600 ml-1">AI</span>
            </div>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Background circle */}
          <div className="w-24 h-24 rounded-full border-4 border-gray-200"></div>
          
          {/* Progress circle */}
          <div 
            className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-purple-600 transition-all duration-300 ease-out"
            style={{
              transform: `rotate(${progress * 3.6}deg)`,
            }}
          ></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Setting up your AI agent...
          <br />
          <span className="text-gray-600 font-normal">please wait</span>
        </h2>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-3 transition-all duration-500 ${
                index === currentStep 
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-50 transform translate-x-2'
              }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {index <= currentStep && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm font-medium ${
                index === currentStep ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 