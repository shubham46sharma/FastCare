'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { Stepper } from '@/components/onboarding/Stepper'
import { HospitalProfileStep } from '@/components/onboarding/steps/HospitalProfileStep'
import { GovernmentSchemesStep } from '@/components/onboarding/steps/GovernmentSchemesStep'
import { DoctorsStep } from '@/components/onboarding/steps/DoctorsStep'
import { TreatmentsStep } from '@/components/onboarding/steps/TreatmentsStep'
import { PatientImportStep } from '@/components/onboarding/steps/PatientImportStep'
import { VerificationStep } from '@/components/onboarding/steps/VerificationStep'
import { ONBOARDING_STEPS, OnboardingData } from '@/types/hospital'
import { 
  getOnboardingData, 
  saveOnboardingData, 
  completeOnboarding,
  getHospitalProfile,
  checkOnboardingStatus
} from '@/lib/hospital'
import toast from 'react-hot-toast'

export default function HospitalOnboardingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    hospitalProfile: {},
    schemes: [],
    doctors: [],
    treatments: [],
    patients: [],
    verificationDocuments: {},
    currentStep: 1,
    completedSteps: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user && (user as any).userType !== 'hospital') {
      router.push('/dashboard')
      return
    }

    // Load existing onboarding data
    if (user) {
      // First check if user is already onboarded
      verifyUserOnboardingStatus()
      loadOnboardingData()
    }
  }, [user, loading, router])

  const verifyUserOnboardingStatus = async () => {
    if (!user) return
    
    try {
      console.log('Checking onboarding status for user:', user.uid)
      const { needsOnboarding } = await checkOnboardingStatus(user.uid)
      console.log('Onboarding status result:', { needsOnboarding })
      
      if (!needsOnboarding) {
        // User is already onboarded, redirect to dashboard
        toast.success('You have already completed onboarding!')
        router.push('/dashboard/hospital')
        return
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error)
      // Continue with onboarding if we can't check status
    }
  }

  const loadOnboardingData = async () => {
    if (!user) return

    try {
      console.log('Loading onboarding data for user:', user.uid)
      const existingData = await getOnboardingData(user.uid)
      console.log('Existing onboarding data:', existingData)
      
      if (existingData) {
        console.log('Raw existing data:', existingData)
        
        // Migrate old data structure to new structure
        const migratedData: OnboardingData = {
          hospitalProfile: existingData.hospitalProfile || {},
          schemes: existingData.schemes || (existingData as any).governmentSchemes || [],
          doctors: existingData.doctors || [],
          treatments: existingData.treatments || [],
          patients: existingData.patients || [],
          verificationDocuments: existingData.verificationDocuments || {},
          currentStep: existingData.currentStep || 1,
          completedSteps: existingData.completedSteps || []
        }
        
        console.log('Migrated data:', migratedData)
        setOnboardingData(migratedData)
        
        // Determine completed steps
        const completed: number[] = []
        if (migratedData.hospitalProfile && Object.keys(migratedData.hospitalProfile).length > 0) completed.push(1)
        
        if (migratedData.schemes.length > 0) completed.push(2)
        if (migratedData.doctors.length > 0) completed.push(3)
        if (migratedData.treatments.length > 0) completed.push(4)
        if (migratedData.patients.length > 0) completed.push(5)
        if (migratedData.currentStep === 6 || (existingData as any).isCompleted) completed.push(6)
        
        setCompletedSteps(completed)
        
        // Set current step to first incomplete step
        const firstIncomplete = ONBOARDING_STEPS.find(step => !completed.includes(step.id))
        if (firstIncomplete) {
          setCurrentStep(firstIncomplete.id)
        }
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error)
      // Don't show error toast, just continue with empty data
      // This prevents the infinite redirect loop
      console.log('Continuing with default onboarding data')
    }
  }

  const handleStepSave = async (stepData: Partial<OnboardingData>) => {
    if (!user) return

    try {
      setIsLoading(true)
      
      const updatedData = { ...onboardingData, ...stepData }
      setOnboardingData(updatedData)
      
      // Save to database
      await saveOnboardingData(user.uid, updatedData)
      
      // Mark step as completed
      const stepNumber = getStepNumberFromData(stepData)
      if (stepNumber && !completedSteps.includes(stepNumber)) {
        setCompletedSteps(prev => [...prev, stepNumber])
      }
      
      toast.success('Progress saved successfully')
    } catch (error) {
      console.error('Error saving step data:', error)
      toast.error('Failed to save progress')
    } finally {
      setIsLoading(false)
    }
  }

  const getStepNumberFromData = (data: Partial<OnboardingData>): number | null => {
    if (data.hospitalProfile && Object.keys(data.hospitalProfile).length > 0) return 1
    if (data.schemes) return 2
    if (data.doctors) return 3
    if (data.treatments) return 4
    if (data.patients) return 5
    return null
  }

  const handleStepComplete = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      
      // Mark onboarding as complete
      const success = await completeOnboarding(user.uid)
      
      if (success) {
        toast.success('Onboarding completed successfully!')
        
        // Redirect to hospital dashboard
        router.push('/dashboard/hospital')
      } else {
        toast.error('Failed to complete onboarding. Please try again.')
      }
    } catch (error) {
      console.error('Error completing onboarding:', error)
      toast.error('Failed to complete onboarding. Please try again.')
      
      // Even if completion fails, try to redirect to dashboard
      // The dashboard will handle checking onboarding status
      setTimeout(() => {
        router.push('/dashboard/hospital')
      }, 2000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepChange = (stepNumber: number) => {
    // Only allow navigation to completed steps or the next step
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber)) {
      setCurrentStep(stepNumber)
    }
  }

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <HospitalProfileStep
            initialData={onboardingData.hospitalProfile || undefined}
            onSave={(data) => handleStepSave({ hospitalProfile: data })}
            onNext={handleNext}
            isLoading={isLoading}
          />
        )
      
      case 2:
        return (
          <GovernmentSchemesStep
            initialData={onboardingData.schemes}
            onSave={(data) => handleStepSave({ schemes: data })}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      
      case 3:
        return (
          <DoctorsStep
            initialData={onboardingData.doctors}
            onSave={(data) => handleStepSave({ doctors: data })}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      
      case 4:
        return (
          <TreatmentsStep
            initialData={onboardingData.treatments}
            onSave={(data) => handleStepSave({ treatments: data })}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      
      case 5:
        return (
          <PatientImportStep
            initialData={onboardingData.patients}
            availableSchemes={onboardingData.schemes}
            onSave={(data) => handleStepSave({ patients: data })}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      
      case 6:
        return (
          <VerificationStep
            onComplete={handleStepComplete}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      
      default:
        return <div>Step not found</div>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-healthcare-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading onboarding...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Hospital Onboarding
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {ONBOARDING_STEPS.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stepper */}
        <div className="mb-8">
          <Stepper
            steps={ONBOARDING_STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepChange}
          />
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {renderCurrentStep()}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Onboarding Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {ONBOARDING_STEPS.map((step) => (
              <div
                key={step.id}
                className={`text-center p-3 rounded-lg border ${
                  completedSteps.includes(step.id)
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : currentStep === step.id
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
              >
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs mt-1">
                  {completedSteps.includes(step.id) ? 'Completed' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
