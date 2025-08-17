'use client'

import React, { useState, useEffect } from 'react'
import { Users, Upload, Plus, FileText, Download, Trash2, Edit2 } from 'lucide-react'
import { FileUpload } from '../FileUpload'
import { PatientImport, GovernmentScheme } from '@/types/hospital'

interface PatientImportStepProps {
  initialData?: PatientImport[]
  availableSchemes?: GovernmentScheme[]
  onSave: (data: PatientImport[]) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function PatientImportStep({ 
  initialData = [], 
  availableSchemes = [],
  onSave, 
  onNext, 
  onBack,
  isLoading = false 
}: PatientImportStepProps) {
  const [patients, setPatients] = useState<PatientImport[]>(initialData)
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [editingPatientId, setEditingPatientId] = useState<string | null>(null)
  const [importMethod, setImportMethod] = useState<'manual' | 'csv' | 'excel'>('manual')
  const [formData, setFormData] = useState<Partial<PatientImport>>({
    name: '',
    age: 0,
    gender: '',
    phone: '',
    schemeEnrolled: '',
    diagnosis: '',
    notes: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Patient name is required'
    }

    if (!formData.age || formData.age < 0 || formData.age > 150) {
      newErrors.age = 'Please enter a valid age (0-150)'
    }

    if (!formData.gender?.trim()) {
      newErrors.gender = 'Gender is required'
    }

    if (!formData.schemeEnrolled?.trim()) {
      newErrors.schemeEnrolled = 'Scheme enrollment is required'
    }

    if (!formData.diagnosis?.trim()) {
      newErrors.diagnosis = 'Diagnosis is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof PatientImport, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      age: 0,
      gender: '',
      phone: '',
      schemeEnrolled: '',
      diagnosis: '',
      notes: ''
    })
    setErrors({})
    setEditingPatientId(null)
  }

  const handleAddPatient = () => {
    setIsAddingPatient(true)
    resetForm()
  }

  const handleEditPatient = (patient: PatientImport) => {
    setFormData(patient)
    setEditingPatientId(patient.id)
    setIsAddingPatient(true)
  }

  const handleDeletePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (editingPatientId) {
      // Update existing patient
      setPatients(prev => prev.map(p => 
        p.id === editingPatientId 
          ? { ...p, ...formData }
          : p
      ))
    } else {
      // Add new patient
      const newPatient: PatientImport = {
        id: `patient_${Date.now()}`,
        ...formData as PatientImport
      }
      setPatients(prev => [...prev, newPatient])
    }

    setIsAddingPatient(false)
    resetForm()
  }

  const handleCancel = () => {
    setIsAddingPatient(false)
    resetForm()
  }

  const handleCSVUpload = (file: File) => {
    // TODO: Implement CSV parsing
    console.log('CSV file uploaded:', file.name)
    // For now, just add a placeholder patient
    const newPatient: PatientImport = {
      id: `patient_${Date.now()}`,
      name: `Imported from ${file.name}`,
      age: 0,
      gender: 'Unknown',
      phone: '',
      schemeEnrolled: 'Unknown',
      diagnosis: 'To be updated',
      notes: `Imported from ${file.name}`
    }
    setPatients(prev => [...prev, newPatient])
  }

  const handleExcelUpload = (file: File) => {
    // TODO: Implement Excel parsing
    console.log('Excel file uploaded:', file.name)
    // For now, just add a placeholder patient
    const newPatient: PatientImport = {
      id: `patient_${Date.now()}`,
      name: `Imported from ${file.name}`,
      age: 0,
      gender: 'Unknown',
      phone: '',
      schemeEnrolled: 'Unknown',
      diagnosis: 'To be updated',
      notes: `Imported from ${file.name}`
    }
    setPatients(prev => [...prev, newPatient])
  }

  const downloadCSVTemplate = () => {
    const csvContent = 'Name,Age,Gender,Phone,Scheme Enrolled,Diagnosis,Notes\nJohn Doe,35,Male,1234567890,PMJAY,Hypertension,Patient notes here'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'patient_import_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleSaveAndContinue = async () => {
    await onSave(patients)
    onNext()
  }

  const handleBack = () => {
    // Save current data before going back
    onSave(patients)
    onBack()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-healthcare-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Data Import</h2>
        <p className="text-gray-600">
          Import existing patient data or add patients manually to get started quickly.
        </p>
      </div>

      {/* Import Methods */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Import Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setImportMethod('csv')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              importMethod === 'csv'
                ? 'border-healthcare-500 bg-healthcare-50 text-healthcare-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <div className="font-medium">CSV Import</div>
            <div className="text-sm text-gray-600">Upload CSV file</div>
          </button>

          <button
            type="button"
            onClick={() => setImportMethod('excel')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              importMethod === 'excel'
                ? 'border-healthcare-500 bg-healthcare-50 text-healthcare-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <div className="font-medium">Excel Import</div>
            <div className="text-sm text-gray-600">Upload Excel file</div>
          </button>

          <button
            type="button"
            onClick={() => setImportMethod('manual')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              importMethod === 'manual'
                ? 'border-healthcare-500 bg-healthcare-50 text-healthcare-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Plus className="w-8 h-8 mx-auto mb-2" />
            <div className="font-medium">Manual Entry</div>
            <div className="text-sm text-gray-600">Add one by one</div>
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      {importMethod === 'csv' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-blue-900 mb-4">CSV Import</h3>
          <div className="flex items-center gap-4 mb-4">
            <button
              type="button"
              onClick={downloadCSVTemplate}
              className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </button>
          </div>
          <FileUpload
            label="Upload CSV File"
            onFileSelect={handleCSVUpload}
            onFileRemove={() => {}}
            selectedFile={null}
            acceptedTypes={['.csv', 'text/csv']}
            maxSize={10}
            placeholder="Drag & drop CSV file or click to browse"
          />
          <p className="text-sm text-blue-700 mt-2">
            Make sure your CSV follows the template format for successful import.
          </p>
        </div>
      )}

      {importMethod === 'excel' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-green-900 mb-4">Excel Import</h3>
          <FileUpload
            label="Upload Excel File"
            onFileSelect={handleExcelUpload}
            onFileRemove={() => {}}
            selectedFile={null}
            acceptedTypes={['.xlsx', '.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']}
            maxSize={10}
            placeholder="Drag & drop Excel file or click to browse"
          />
          <p className="text-sm text-green-700 mt-2">
            Supported formats: .xlsx, .xls
          </p>
        </div>
      )}

      {/* Current Patients List */}
      {patients.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Imported Patients ({patients.length})
          </h3>
          <div className="grid gap-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{patient.name}</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {patient.age} years
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-healthcare-100 text-healthcare-800">
                        {patient.gender}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Scheme:</span> {patient.schemeEnrolled}
                      </div>
                      <div>
                        <span className="font-medium">Diagnosis:</span> {patient.diagnosis}
                      </div>
                      {patient.phone && (
                        <div>
                          <span className="font-medium">Phone:</span> {patient.phone}
                        </div>
                      )}
                    </div>
                    {patient.notes && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {patient.notes}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      type="button"
                      onClick={() => handleEditPatient(patient)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePatient(patient.id)}
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

      {/* Add/Edit Patient Form */}
      {isAddingPatient && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingPatientId ? 'Edit Patient' : 'Add New Patient'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter patient's full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  min="0"
                  max="150"
                  value={formData.age || 0}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.age ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  value={formData.gender || ''}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.gender ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="schemeEnrolled" className="block text-sm font-medium text-gray-700 mb-2">
                  Scheme Enrolled *
                </label>
                <select
                  id="schemeEnrolled"
                  value={formData.schemeEnrolled || ''}
                  onChange={(e) => handleInputChange('schemeEnrolled', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.schemeEnrolled ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select scheme</option>
                  {availableSchemes.map((scheme) => (
                    <option key={scheme.id} value={scheme.name}>
                      {scheme.name}
                    </option>
                  ))}
                  <option value="None">None</option>
                  <option value="Other">Other</option>
                </select>
                {errors.schemeEnrolled && (
                  <p className="mt-1 text-sm text-red-600">{errors.schemeEnrolled}</p>
                )}
              </div>

              <div>
                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis *
                </label>
                <input
                  type="text"
                  id="diagnosis"
                  value={formData.diagnosis || ''}
                  onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent ${
                    errors.diagnosis ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter diagnosis"
                />
                {errors.diagnosis && (
                  <p className="mt-1 text-sm text-red-600">{errors.diagnosis}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                placeholder="Enter any additional notes about the patient"
              />
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
                {editingPatientId ? 'Update Patient' : 'Add Patient'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Patient Button */}
      {!isAddingPatient && (
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={handleAddPatient}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-healthcare-600 hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Patient Manually
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
          disabled={isLoading}
          className="px-6 py-3 bg-healthcare-600 text-white rounded-lg font-medium hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save & Continue'}
        </button>
      </div>
    </div>
  )
}
