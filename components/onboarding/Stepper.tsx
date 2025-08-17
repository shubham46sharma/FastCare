'use client'

import React from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { OnboardingStep } from '@/types/hospital'

interface StepperProps {
  steps: OnboardingStep[]
  currentStep: number
  completedSteps: number[]
  onStepClick?: (stepNumber: number) => void
}

export function Stepper({ steps, currentStep, completedSteps, onStepClick }: StepperProps) {
  const isStepCompleted = (stepNumber: number) => completedSteps.includes(stepNumber)
  const isStepCurrent = (stepNumber: number) => stepNumber === currentStep
  const isStepAccessible = (stepNumber: number) => 
    isStepCompleted(stepNumber) || stepNumber <= currentStep

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = isStepCompleted(step.id)
          const isCurrent = isStepCurrent(step.id)
          const isAccessible = isStepAccessible(step.id)
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onStepClick && isAccessible && onStepClick(step.id)}
                  disabled={!isAccessible}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200
                    ${isCompleted 
                      ? 'bg-healthcare-600 text-white' 
                      : isCurrent 
                        ? 'bg-healthcare-100 text-healthcare-600 border-2 border-healthcare-600' 
                        : isAccessible 
                          ? 'bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    step.id
                  )}
                </button>
                
                {/* Step Label */}
                <div className="mt-2 text-center max-w-24">
                  <p className={`text-xs font-medium ${
                    isCompleted 
                      ? 'text-healthcare-600' 
                      : isCurrent 
                        ? 'text-healthcare-600' 
                        : isAccessible 
                          ? 'text-gray-600' 
                          : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className={`text-xs mt-1 ${
                    isCompleted 
                      ? 'text-healthcare-500' 
                      : isCurrent 
                        ? 'text-healthcare-500' 
                        : isAccessible 
                          ? 'text-gray-500' 
                          : 'text-gray-300'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  isStepCompleted(step.id + 1) 
                    ? 'bg-healthcare-600' 
                    : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          )
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-healthcare-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Step {currentStep} of {steps.length} • {Math.round((completedSteps.length / steps.length) * 100)}% Complete
        </p>
      </div>
    </div>
  )
}
