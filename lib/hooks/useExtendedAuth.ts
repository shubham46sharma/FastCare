'use client'

import { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { auth } from '@/lib/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

interface ExtendedUser extends User {
  userType?: 'hospital' | 'patient'
  hospitalName?: string
  fullName?: string
}

export function useExtendedAuth() {
  const [user, setUser] = useState<ExtendedUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            const extendedUser: ExtendedUser = {
              ...firebaseUser,
              userType: userData.userType,
              hospitalName: userData.hospitalName,
              fullName: userData.fullName
            }
            setUser(extendedUser)
          } else {
            // User exists in Firebase Auth but not in Firestore
            setUser(firebaseUser)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          // Fallback to just Firebase user data
          setUser(firebaseUser)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { user, loading }
}
