import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from './config'
import { useState, useEffect } from 'react'

// Authentication functions
export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logOut = async (): Promise<void> => {
  return signOut(auth)
}

export const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email)
}

export const updateUserProfile = async (displayName: string): Promise<void> => {
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, { displayName })
  }
  throw new Error('No user logged in')
}

// Google Sign In
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

// Custom hook for authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    // Check if auth is already initialized
    if (auth.currentUser) {
      setUser(auth.currentUser)
      setLoading(false)
    }

    return unsubscribe
  }, [])

  return { user, loading }
}

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser
}
