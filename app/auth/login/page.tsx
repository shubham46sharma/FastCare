'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { Button } from '@/components/ui/Button'
import { Eye, EyeOff, Mail, Lock, Building2, User, ArrowRight, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [userType, setUserType] = useState<'hospital' | 'patient' | null>(null)
  const [showForm, setShowForm] = useState(false)
  
  const { login, signInWithGoogle, user, loading } = useAuth()
  const router = useRouter()

  // Handle redirect after successful login
  useEffect(() => {
    if (user && !loading) {
      // User is authenticated, redirect based on user type
      const extendedUser = user as any // Type assertion for extended user
      if (extendedUser.userType === 'hospital') {
        router.push('/dashboard/hospital')
      } else if (extendedUser.userType === 'patient') {
        router.push('/dashboard/patient')
      }
    }
  }, [user, loading, router])

  // Show loading state while auth is processing
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-healthcare-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  


  const handleUserTypeSelect = (type: 'hospital' | 'patient') => {
    setUserType(type)
    setTimeout(() => setShowForm(true), 300)
  }

  const handleBackToSelection = () => {
    setShowForm(false)
    setTimeout(() => setUserType(null), 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    
    try {
      await login(email, password)
      toast.success('Login successful! Redirecting...')
      
      // Don't redirect immediately - let the auth state change handle it
      // The useAuth hook will detect the user and redirect appropriately
    } catch (error: any) {
      console.error('Login error:', error)
      
      let errorMessage = 'Login failed. Please try again.'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.'
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.'
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    
    try {
      await signInWithGoogle()
      toast.success('Google sign-in successful!')
      // Google sign-in will trigger the auth state change
      // The dashboard will handle the onboarding redirect
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      
      let errorMessage = 'Google sign-in failed. Please try again.'
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed. Please try again.'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up was blocked. Please allow pop-ups and try again.'
      }
      
      toast.error(errorMessage)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* User Type Selection */}
        {!userType && (
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center text-healthcare-600 hover:text-healthcare-700 mb-4 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
            
            {/* Logo Area */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-healthcare-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your FastCare account</p>
            </div>

            {/* User Type Cards */}
            <div className="space-y-4">
              <button
                onClick={() => handleUserTypeSelect('hospital')}
                className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-healthcare-300 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center group-hover:bg-healthcare-200 transition-colors duration-200">
                    <Building2 className="w-6 h-6 text-healthcare-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Hospital/Clinic</h3>
                    <p className="text-sm text-gray-600">Access patient management and analytics</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-healthcare-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </button>

              <button
                onClick={() => handleUserTypeSelect('patient')}
                className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-healthcare-300 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center group-hover:bg-healthcare-200 transition-colors duration-200">
                    <User className="w-6 h-6 text-healthcare-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient</h3>
                    <p className="text-sm text-gray-600">View medical records and manage care</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-healthcare-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full bg-white border-gray-300 hover:border-healthcare-300 hover:bg-gray-50 transition-all duration-200"
              disabled={isGoogleLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
            </Button>

            {/* Sign Up Link */}
            <div className="pt-4">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-semibold text-healthcare-600 hover:text-healthcare-700 transition-colors duration-200">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Login Form */}
        {userType && (
          <div className="animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <button
                onClick={handleBackToSelection}
                className="inline-flex items-center text-healthcare-600 hover:text-healthcare-700 mb-6 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Selection
              </button>
              
              <div className="flex items-center justify-center space-x-2 text-healthcare-600 mb-4">
                {userType === 'hospital' ? (
                  <>
                    <Building2 className="w-6 h-6" />
                    <span className="text-lg font-medium">Hospital/Clinic Login</span>
                  </>
                ) : (
                  <>
                    <User className="w-6 h-6" />
                    <span className="text-lg font-medium">Patient Login</span>
                  </>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to your FastCare account</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-end">
                  <Link href="/auth/forgot-password" className="text-sm font-medium text-healthcare-600 hover:text-healthcare-700 transition-colors duration-200">
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 bg-healthcare-600 hover:bg-healthcare-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <div className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white border-gray-300 hover:border-healthcare-300 hover:bg-gray-50 transition-all duration-200"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-semibold text-healthcare-600 hover:text-healthcare-700 transition-colors duration-200">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
