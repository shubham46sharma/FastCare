'use client'

import React, { createContext, useContext } from 'react'
import { User } from 'firebase/auth'
import { useAuth as useFirebaseAuth } from '@/lib/firebase/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string, userType: 'hospital' | 'patient', profileData?: any) => Promise<void>
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFirebaseAuth()

  const login = async (email: string, password: string) => {
    try {
      const { signIn } = await import('@/lib/firebase/auth')
      await signIn(email, password)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (email: string, password: string, displayName: string, userType: 'hospital' | 'patient', profileData?: any) => {
    try {
      const { signUp, updateUserProfile } = await import('@/lib/firebase/auth')
      const userCredential = await signUp(email, password)
      await updateUserProfile(displayName)
      
      // Store additional profile data in Firestore
      if (profileData && userCredential.user) {
        const { db } = await import('@/lib/firebase/config')
        const { doc, setDoc } = await import('firebase/firestore')
        
        // Filter out undefined values from profile data
        const cleanProfileData = Object.fromEntries(
          Object.entries(profileData).filter(([_, value]) => value !== undefined)
        )
        
        const userProfile = {
          uid: userCredential.user.uid,
          email: email,
          displayName: displayName,
          userType: userType,
          createdAt: new Date(),
          ...cleanProfileData
        }
        
        await setDoc(doc(db, 'users', userCredential.user.uid), userProfile)
      }
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const { logOut } = await import('@/lib/firebase/auth')
      await logOut()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { signInWithGoogle: googleSignIn } = await import('@/lib/firebase/auth')
      await googleSignIn()
    } catch (error) {
      console.error('Google sign-in error:', error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { resetPassword: resetPwd } = await import('@/lib/firebase/auth')
      await resetPwd(email)
    } catch (error) {
      console.error('Password reset error:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    signInWithGoogle,
    resetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
