'use client'

import React from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HospitalDashboard } from '@/components/dashboard/HospitalDashboard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { checkOnboardingStatus } from '@/lib/hospital'

export default function HospitalDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user) {
      checkUserAuthorization()
    }
  }, [user, loading, router])

  const checkUserAuthorization = async () => {
    if (!user) return

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        if (userData.userType === 'hospital') {
          // Check if hospital has completed onboarding
          const { needsOnboarding } = await checkOnboardingStatus(user.uid)
          
          if (needsOnboarding) {
            // Hospital needs onboarding, redirect to onboarding
            router.push('/hospital/onboarding')
            return
          }
          
          // Hospital is onboarded, allow access to dashboard
          setIsAuthorized(true)
        } else {
          // User is not a hospital, redirect to appropriate dashboard
          router.push(`/dashboard/${userData.userType}`)
          return
        }
      } else {
        // No profile found, redirect to signup
        router.push('/auth/signup')
        return
      }
    } catch (error) {
      console.error('Error checking user authorization:', error)
      router.push('/auth/login')
      return
    } finally {
      setIsCheckingAuth(false)
    }
  }

  if (loading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!user || !isAuthorized) {
    return null // Will redirect
  }

  return <HospitalDashboard user={user} />
}
