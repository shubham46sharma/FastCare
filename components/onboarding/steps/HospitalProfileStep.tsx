'use client'

import React, { useState, useEffect } from 'react'
import { Building2, MapPin, Phone, Mail, FileText } from 'lucide-react'
import { FileUpload } from '../FileUpload'
import { HospitalProfile } from '@/types/hospital'

interface HospitalProfileStepProps {
  initialData?: Partial<HospitalProfile>
  onSave: (data: Partial<HospitalProfile>) => void
  onNext: () => void
  isLoading?: boolean
}

export function HospitalProfileStep({ 
  initialData, 
  onSave, 
  onNext, 
  isLoading = false 
}: HospitalProfileStepProps) {
  const [formData, setFormData] = useState<Partial<HospitalProfile>>({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    registrationNumber: '',
    logo: '',
    ...initialData
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Hospital name is required'
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city?.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state?.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits'
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s+\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.registrationNumber?.trim()) {
      newErrors.registrationNumber = 'Registration number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof HospitalProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleLogoUpload = (file: File) => {
    setLogoFile(file)
    // TODO: Upload to Firebase Storage and get URL
    setFormData(prev => ({ ...prev, logo: URL.createObjectURL(file) }))
  }

  const handleLogoRemove = () => {
    setLogoFile(null)
    setFormData(prev => ({ ...prev, logo: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Prepare data for saving
    const dataToSave = {
      ...formData,
      logo: logoFile ? `logo_${Date.now()}` : formData.logo // Placeholder for now
    }

    await onSave(dataToSave)
    onNext()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-healthcare-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital Profile Setup</h2>
        <p className="text-gray-600">
          Let's start by setting up your hospital's basic information and contact details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hospital Logo */}
        <div>
          <FileUpload
            label="Hospital Logo (Optional)"
            onFileSelect={handleLogoUpload}
            onFileRemove={handleLogoRemove}
            selectedFile={logoFile}
            acceptedTypes={['image/*']}
            maxSize={5}
            placeholder="Upload your hospital logo"
            preview={true}
          />
        </div>

        {/* Hospital Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Name *
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter hospital name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <textarea
              id="address"
              rows={3}
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
                errors.address ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter complete address"
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        {/* City, State, Pincode Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              value={formData.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
                errors.city ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="City"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              id="state"
              value={formData.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
                errors.state ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="State"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>

          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
              Pincode *
            </label>
            <input
              type="text"
              id="pincode"
              value={formData.pincode || ''}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              maxLength={6}
              className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
                errors.pincode ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="6 digits"
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
            )}
          </div>
        </div>

        {/* Contact Information Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>

        {/* Registration Number */}
        <div>
          <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="registrationNumber"
              value={formData.registrationNumber || ''}
              onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
                errors.registrationNumber ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter registration number"
            />
          </div>
          {errors.registrationNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-healthcare-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}
