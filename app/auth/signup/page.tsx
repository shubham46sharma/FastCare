'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Building2, User, Shield, Mail, Lock, Phone, MapPin, FileText, Calendar, CreditCard } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Updated schema to include user type and role-specific fields
const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  userType: z.enum(['hospital', 'patient']),
  // Hospital-specific fields
  hospitalName: z.string().optional(),
  licenseNumber: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  // Patient-specific fields
  fullName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  aadharNumber: z.string().optional(),
  patientAddress: z.string().optional(),
  patientPhone: z.string().optional(),
  emergencyContact: z.string().optional(),
  bloodGroup: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  medicalHistory: z.string().optional()
}).refine((data) => {
  if (data.userType === 'hospital') {
    return data.hospitalName && data.licenseNumber && data.address && data.phone
  }
  if (data.userType === 'patient') {
    return data.fullName && data.dateOfBirth && data.aadharNumber && data.patientAddress
  }
  return true
}, {
  message: 'Please fill in all required fields for your selected user type'
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [userType, setUserType] = useState<'hospital' | 'patient' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const watchedUserType = watch('userType')

  const onSubmit = async (data: SignupFormData) => {
    if (!userType) {
      toast.error('Please select a user type')
      return
    }

    setIsLoading(true)
    try {
      // Prepare profile data based on user type
      const profileData = userType === 'hospital' ? {
        hospitalName: data.hospitalName,
        licenseNumber: data.licenseNumber,
        address: data.address,
        phone: data.phone,
        specialties: data.specialties || []
      } : {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        aadharNumber: data.aadharNumber,
        patientAddress: data.patientAddress,
        ...(data.patientPhone && { patientPhone: data.patientPhone }),
        ...(data.emergencyContact && { emergencyContact: data.emergencyContact }),
        ...(data.bloodGroup && { bloodGroup: data.bloodGroup }),
        ...(data.allergies && data.allergies.length > 0 && { allergies: data.allergies }),
        ...(data.medicalHistory && { medicalHistory: data.medicalHistory })
      }

      await signup(data.email, data.password, data.displayName, userType, profileData)
      
      toast.success(`Welcome to FastCare! Your ${userType} account has been created successfully.`)
      
      // Redirect to appropriate dashboard
      if (userType === 'hospital') {
        router.push('/dashboard/hospital')
      } else {
        router.push('/dashboard/patient')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error(error.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserTypeSelect = (type: 'hospital' | 'patient') => {
    setUserType(type)
    setValue('userType', type)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-50 to-healthcare-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-healthcare-600 hover:text-healthcare-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join FastCare and revolutionize healthcare together
          </p>
        </div>

        {/* User Type Selection */}
        {!userType && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 text-center">I am a...</h3>
            
            <Button
              onClick={() => handleUserTypeSelect('hospital')}
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:border-healthcare-300 hover:bg-healthcare-50"
            >
              <Building2 className="w-8 h-8 text-healthcare-600" />
              <div>
                <div className="font-semibold text-gray-900">Hospital/Clinic</div>
                <div className="text-sm text-gray-500">Manage patients, claims, and referrals</div>
              </div>
            </Button>

            <Button
              onClick={() => handleUserTypeSelect('patient')}
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:border-healthcare-300 hover:bg-healthcare-50"
            >
              <User className="w-8 h-8 text-healthcare-600" />
              <div>
                <div className="font-semibold text-gray-900">Patient</div>
                <div className="text-sm text-gray-500">Access medical records and find care</div>
              </div>
            </Button>
          </div>
        )}

        {/* Signup Form */}
        {userType && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              {/* User Type Display */}
              <div className="flex items-center justify-center space-x-2 text-healthcare-600">
                {userType === 'hospital' ? (
                  <>
                    <Building2 className="w-5 h-5" />
                    <span className="font-medium">Hospital/Clinic Account</span>
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5" />
                    <span className="font-medium">Patient Account</span>
                  </>
                )}
              </div>

              {/* Basic Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register('password')}
                      type="password"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register('displayName')}
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                      placeholder="Enter your display name"
                    />
                  </div>
                  {errors.displayName && (
                    <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
                  )}
                </div>
              </div>

              {/* Role-Specific Fields */}
              {userType === 'hospital' && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-healthcare-600" />
                    Hospital Information
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital/Clinic Name *
                    </label>
                    <input
                      {...register('hospitalName')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                      placeholder="Enter hospital name"
                    />
                    {errors.hospitalName && (
                      <p className="mt-1 text-sm text-red-600">{errors.hospitalName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Number *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('licenseNumber')}
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                        placeholder="Enter license number"
                      />
                    </div>
                    {errors.licenseNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('address')}
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                        placeholder="Enter hospital address"
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              )}

              {userType === 'patient' && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <User className="w-4 h-4 mr-2 text-healthcare-600" />
                    Patient Information
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register('fullName')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('dateOfBirth')}
                        type="date"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aadhar Number *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('aadharNumber')}
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                        placeholder="Enter Aadhar number"
                        maxLength={12}
                      />
                    </div>
                    {errors.aadharNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.aadharNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('patientAddress')}
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                        placeholder="Enter your address"
                      />
                    </div>
                    {errors.patientAddress && (
                      <p className="mt-1 text-sm text-red-600">{errors.patientAddress.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('patientPhone')}
                        type="tel"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Back Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setUserType(null)}
              >
                Back to Selection
              </Button>
            </div>
          </form>
        )}

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-healthcare-600 hover:text-healthcare-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
