'use client'

import React, { useState, useEffect } from 'react'
import { User, Plus, X, Edit2, Trash2 } from 'lucide-react'
import { Doctor } from '@/types/hospital'

interface DoctorsStepProps {
  initialData?: Doctor[]
  onSave: (data: Doctor[]) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function DoctorsStep({ 
  initialData = [], 
  onSave, 
  onNext, 
  onBack,
  isLoading = false 
}: DoctorsStepProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialData)
  const [isAddingDoctor, setIsAddingDoctor] = useState(false)
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Doctor>>({
    name: '',
    specialization: '',
    qualification: '',
    phone: '',
    email: '',
    experience: 0,
    registrationNumber: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Doctor name is required'
    }

    if (!formData.specialization?.trim()) {
      newErrors.specialization = 'Specialization is required'
    }

    if (!formData.qualification?.trim()) {
      newErrors.qualification = 'Qualification is required'
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

  const handleInputChange = (field: keyof Doctor, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      qualification: '',
      phone: '',
      email: '',
      experience: 0,
      registrationNumber: ''
    })
    setErrors({})
    setEditingDoctorId(null)
  }

  const handleAddDoctor = () => {
    setIsAddingDoctor(true)
    resetForm()
  }

  const handleEditDoctor = (doctor: Doctor) => {
    setFormData(doctor)
    setEditingDoctorId(doctor.id)
    setIsAddingDoctor(true)
  }

  const handleDeleteDoctor = (doctorId: string) => {
    setDoctors(prev => prev.filter(d => d.id !== doctorId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (editingDoctorId) {
      // Update existing doctor
      setDoctors(prev => prev.map(d => 
        d.id === editingDoctorId 
          ? { ...d, ...formData }
          : d
      ))
    } else {
      // Add new doctor
      const newDoctor: Doctor = {
        id: `doctor_${Date.now()}`,
        ...formData as Omit<Doctor, 'id'>
      }
      setDoctors(prev => [...prev, newDoctor])
    }

    setIsAddingDoctor(false)
    resetForm()
  }

  const handleCancel = () => {
    setIsAddingDoctor(false)
    resetForm()
  }

  const handleSaveAndContinue = async () => {
    await onSave(doctors)
    onNext()
  }

  const handleBack = () => {
    // Save current data before going back
    onSave(doctors)
    onBack()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-healthcare-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctors & Medical Staff</h2>
        <p className="text-gray-600">
          Add information about the doctors and medical staff working at your hospital.
        </p>
      </div>

      {/* Current Doctors List */}
      {doctors.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Current Doctors ({doctors.length})
          </h3>
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{doctor.name}</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-healthcare-100 text-healthcare-800">
                        {doctor.specialization}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Qualification:</span> {doctor.qualification}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span> {doctor.experience} years
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {doctor.phone}
                      </div>
                      <div>
                        <span className="font-medium">Reg. No:</span> {doctor.registrationNumber}
                      </div>
                    </div>
                    {doctor.email && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {doctor.email}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      type="button"
                      onClick={() => handleEditDoctor(doctor)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Doctor Form */}
      {isAddingDoctor && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingDoctorId ? 'Edit Doctor' : 'Add New Doctor'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter doctor's full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization *
                </label>
                <input
                  type="text"
                  id="specialization"
                  value={formData.specialization || ''}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.specialization ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Cardiology, Orthopedics"
                />
                {errors.specialization && (
                  <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification *
                </label>
                <input
                  type="text"
                  id="qualification"
                  value={formData.qualification || ''}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.qualification ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., MBBS, MD, MS"
                />
                {errors.qualification && (
                  <p className="mt-1 text-sm text-red-600">{errors.qualification}</p>
                )}
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  min="0"
                  max="50"
                  value={formData.experience || 0}
                  onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Medical Council Registration Number *
              </label>
              <input
                type="text"
                id="registrationNumber"
                value={formData.registrationNumber || ''}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                  errors.registrationNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter registration number"
              />
              {errors.registrationNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-healthcare-600 text-white rounded-lg hover:bg-healthcare-700 transition-colors"
              >
                {editingDoctorId ? 'Update Doctor' : 'Add Doctor'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Doctor Button */}
      {!isAddingDoctor && (
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={handleAddDoctor}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-healthcare-600 hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={handleBack}
          disabled={isLoading}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-all duration-200 disabled:opacity-50"
        >
          Back
        </button>
        
        <button
          type="button"
          onClick={handleSaveAndContinue}
          disabled={isLoading || doctors.length === 0}
          className="px-6 py-3 bg-healthcare-600 text-white rounded-lg font-medium hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  )
}
