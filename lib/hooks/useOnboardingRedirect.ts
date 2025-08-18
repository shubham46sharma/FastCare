'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { checkOnboardingStatus } from '@/lib/hospital'

export function useOnboardingRedirect() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return // Wait for auth to load

    // Only run this hook if user is authenticated
    if (user) {
      // Check if user is a hospital
      const extendedUser = user as any // Type assertion for extended user
      if (extendedUser.userType === 'hospital') {
        checkHospitalOnboarding()
      } else if (extendedUser.userType === 'patient') {
        // Patient users go to patient dashboard
        router.push('/dashboard/patient')
      }
    }
    // Don't redirect to login if no user - let the page handle that
  }, [user, loading, router])

  const checkHospitalOnboarding = async () => {
    if (!user) return // Early return if user is null
    
    try {
      const { needsOnboarding, currentStep } = await checkOnboardingStatus(user.uid)
      
      if (needsOnboarding) {
        // Hospital needs onboarding, redirect to onboarding
        router.push('/hospital/onboarding')
      } else {
        // Hospital is onboarded, check verification status
        // TODO: Check if hospital is verified and redirect accordingly
        router.push('/dashboard/hospital')
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error)
      // On error, redirect to onboarding as fallback
      router.push('/hospital/onboarding')
    }
  }

  return { user, loading }
}
