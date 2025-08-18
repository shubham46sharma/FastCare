'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return // Wait for auth to load

    if (!user) {
      // No user, redirect to login
      router.push('/auth/login')
      return
    }

    // Redirect based on user type
    const extendedUser = user as any // Type assertion for extended user
    if (extendedUser.userType === 'hospital') {
      router.push('/dashboard/hospital')
    } else if (extendedUser.userType === 'patient') {
      router.push('/dashboard/patient')
    } else {
      // Unknown user type, redirect to login
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return null // Will redirect
}
