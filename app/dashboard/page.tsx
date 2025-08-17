'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userType, setUserType] = useState<'hospital' | 'patient' | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user && !userType) {
      fetchUserProfile()
    }
  }, [user, loading, userType, router])

  const fetchUserProfile = async () => {
    if (!user) return

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        setUserType(userData.userType)
      } else {
        // If no profile exists, redirect to signup to complete profile
        router.push('/auth/signup')
        return
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // Fallback to patient dashboard if there's an error
      setUserType('patient')
    } finally {
      setIsLoadingProfile(false)
    }
  }

  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Redirect to role-specific dashboard
  if (userType === 'hospital') {
    router.push('/dashboard/hospital')
    return null
  } else {
    router.push('/dashboard/patient')
    return null
  }
}
