'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Building2, User, Shield, Mail, Lock, Phone, MapPin, FileText, Calendar, CreditCard, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-healthcare-600 hover:text-healthcare-700 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          {/* Logo Area */}
          <div className="w-16 h-16 bg-healthcare-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join FastCare</h1>
          <p className="text-gray-600">Create your account and revolutionize healthcare together</p>
        </div>

        {/* User Type Selection */}
        {!userType && (
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
                  <p className="text-sm text-gray-600">Manage patients, claims, and referrals with advanced tools</p>
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
                  <p className="text-sm text-gray-600">Access medical records, book appointments, and manage care</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-healthcare-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </button>
          </div>
        )}

        {/* Signup Form */}
        {userType && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* User Type Display */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 text-healthcare-600 mb-2">
                  {userType === 'hospital' ? (
                    <>
                      <Building2 className="w-6 h-6" />
                      <span className="text-lg font-medium">Hospital/Clinic Account</span>
                    </>
                  ) : (
                    <>
                      <User className="w-6 h-6" />
                      <span className="text-lg font-medium">Patient Account</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setUserType(null)}
                  className="text-sm text-healthcare-600 hover:text-healthcare-700 transition-colors duration-200"
                >
                  ← Change selection
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('password')}
                        type="password"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Create a password"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('displayName')}
                        type="text"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
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
                  <div className="space-y-4 border-t pt-6">
                    <h4 className="font-semibold text-gray-900 flex items-center text-lg">
                      <Building2 className="w-5 h-5 mr-2 text-healthcare-600" />
                      Hospital Information
                    </h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital/Clinic Name *
                      </label>
                      <input
                        {...register('hospitalName')}
                        type="text"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter hospital name"
                      />
                      {errors.hospitalName && (
                        <p className="mt-1 text-sm text-red-600">{errors.hospitalName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Number *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('licenseNumber')}
                          type="text"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter license number"
                        />
                      </div>
                      {errors.licenseNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('address')}
                          type="text"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter hospital address"
                        />
                      </div>
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
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
                  <div className="space-y-4 border-t pt-6">
                    <h4 className="font-semibold text-gray-900 flex items-center text-lg">
                      <User className="w-5 h-5 mr-2 text-healthcare-600" />
                      Patient Information
                    </h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('fullName')}
                        type="text"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('dateOfBirth')}
                          type="date"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhar Number *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('aadharNumber')}
                          type="text"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter Aadhar number"
                          maxLength={12}
                        />
                      </div>
                      {errors.aadharNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.aadharNumber.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('patientPhone')}
                          type="tel"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('patientAddress')}
                          type="text"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your address"
                        />
                      </div>
                      {errors.patientAddress && (
                        <p className="mt-1 text-sm text-red-600">{errors.patientAddress.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 bg-healthcare-600 hover:bg-healthcare-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-semibold text-healthcare-600 hover:text-healthcare-700 transition-colors duration-200">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
