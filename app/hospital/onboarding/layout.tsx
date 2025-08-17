'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (loading) return // Wait for auth to load

    if (!user) {
      // No user, redirect to login
      router.push('/auth/login')
      return
    }

    // Check if user is a hospital
    if (user.userType !== 'hospital') {
      // User is not a hospital, redirect to appropriate dashboard
      router.push(`/dashboard/${user.userType || 'patient'}`)
      return
    }

    // User is a hospital, allow access to onboarding
    setIsAuthorized(true)
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading onboarding...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Will redirect
  }

  return <>{children}</>
}
