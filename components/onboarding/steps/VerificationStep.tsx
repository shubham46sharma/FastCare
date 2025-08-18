'use client'

import React, { useState } from 'react'
import { Shield, CheckCircle, AlertCircle, Upload, FileText, Building2, Clock } from 'lucide-react'
import { FileUpload } from '../FileUpload'

interface VerificationStepProps {
  onComplete: () => void
  onBack: () => void
  isLoading?: boolean
}

interface VerificationDocument {
  id: string
  name: string
  type: 'registration' | 'license' | 'certification' | 'other'
  file: File
  uploadedAt: Date
  status: 'pending' | 'uploading' | 'uploaded' | 'error'
}

export function VerificationStep({ 
  onComplete, 
  onBack,
  isLoading = false 
}: VerificationStepProps) {
  const [documents, setDocuments] = useState<VerificationDocument[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const requiredDocuments = [
    {
      id: 'registration',
      name: 'Hospital Registration Certificate',
      type: 'registration' as const,
      description: 'Official registration certificate from health authorities',
      required: true
    },
    {
      id: 'license',
      name: 'Medical License',
      type: 'license' as const,
      description: 'Valid medical practice license',
      required: true
    },
    {
      id: 'certification',
      name: 'Quality Certifications (Optional)',
      type: 'certification' as const,
      description: 'ISO, NABH, or other quality certifications',
      required: false
    }
  ]

  const handleFileUpload = async (file: File, documentType: string) => {
    const documentInfo = requiredDocuments.find(doc => doc.id === documentType)
    if (!documentInfo) return

    const newDocument: VerificationDocument = {
      id: `${documentType}_${Date.now()}`,
      name: documentInfo.name,
      type: documentInfo.type,
      file,
      uploadedAt: new Date(),
      status: 'uploading'
    }

    setDocuments(prev => [...prev.filter(d => d.type !== documentType), newDocument])
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate file upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setUploadProgress(i)
      }

      // TODO: Implement actual file upload to Firebase Storage
      // const downloadUrl = await uploadFile(file, `verification/${documentType}/${file.name}`)
      
      setDocuments(prev => prev.map(doc => 
        doc.id === newDocument.id 
          ? { ...doc, status: 'uploaded' }
          : doc
      ))

      setUploadProgress(100)
      setTimeout(() => setUploadProgress(0), 1000)
    } catch (error) {
      console.error('Upload failed:', error)
      setDocuments(prev => prev.map(doc => 
        doc.id === newDocument.id 
          ? { ...doc, status: 'error' }
          : doc
      ))
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileRemove = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId))
  }

  const getDocumentStatus = (documentType: string) => {
    const doc = documents.find(d => d.type === documentType)
    if (!doc) return 'missing'
    return doc.status
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'uploading':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'Uploaded'
      case 'uploading':
        return 'Uploading...'
      case 'error':
        return 'Upload Failed'
      default:
        return 'Not Uploaded'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'uploading':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-500 bg-gray-50 border-gray-200'
    }
  }

  const canComplete = () => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required)
    return requiredDocs.every(doc => getDocumentStatus(doc.id) === 'uploaded')
  }

  const handleComplete = async () => {
    if (!canComplete()) return
    
    // TODO: Mark hospital as verified = false (pending admin approval)
    // await updateHospitalVerificationStatus(userId, false)
    
    onComplete()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-healthcare-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification & Submission</h2>
        <p className="text-gray-600">
          Upload required documents to complete your hospital's verification process.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-900">Verification Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {requiredDocuments.map((doc) => {
            const status = getDocumentStatus(doc.id)
            return (
              <div
                key={doc.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getStatusColor(status)}`}
              >
                {getStatusIcon(status)}
                <div className="flex-1">
                  <div className="text-sm font-medium">{doc.name}</div>
                  <div className="text-xs opacity-75">
                    {doc.required ? 'Required' : 'Optional'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Document Upload Sections */}
      <div className="space-y-6 mb-8">
        {requiredDocuments.map((doc) => {
          const uploadedDoc = documents.find(d => d.type === doc.type)
          const status = getDocumentStatus(doc.id)
          
          return (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                    {doc.required && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{doc.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(status)}
                  <span className={`text-sm font-medium ${getStatusColor(status).split(' ')[0]}`}>
                    {getStatusText(status)}
                  </span>
                </div>
              </div>

              {status === 'uploaded' && uploadedDoc ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900">{uploadedDoc.file.name}</div>
                        <div className="text-sm text-green-700">
                          Uploaded on {uploadedDoc.uploadedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFileRemove(uploadedDoc.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Upload className="w-4 h-4 rotate-45" />
                    </button>
                  </div>
                </div>
              ) : (
                <FileUpload
                  label={`Upload ${doc.name}`}
                  onFileSelect={(file) => handleFileUpload(file, doc.id)}
                  onFileRemove={() => {}}
                  selectedFile={null}
                  acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']}
                  maxSize={10}
                  placeholder={`Drag & drop ${doc.name.toLowerCase()} or click to browse`}
                  disabled={isUploading}
                />
              )}

              {/* Upload Progress */}
              {status === 'uploading' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm text-blue-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Additional Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-2">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your hospital will be marked as "Pending Verification" until admin approval</li>
              <li>You can start using the platform while verification is in progress</li>
              <li>We'll notify you once verification is complete</li>
              <li>Keep your documents up to date for continued access</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-all duration-200 disabled:opacity-50"
        >
          Back
        </button>
        
        <button
          type="button"
          onClick={handleComplete}
          disabled={isLoading || !canComplete()}
          className="px-6 py-3 bg-healthcare-600 text-white rounded-lg font-medium hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Complete Onboarding'}
        </button>
      </div>

      {/* Completion Message */}
      {canComplete() && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">All required documents uploaded! You can now complete onboarding.</span>
          </div>
        </div>
      )}
    </div>
  )
}
