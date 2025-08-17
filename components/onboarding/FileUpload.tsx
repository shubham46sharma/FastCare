'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, File, Image, Check } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  selectedFile?: File | null
  acceptedTypes?: string[]
  maxSize?: number // in MB
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  preview?: boolean
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  acceptedTypes = ['image/*', '.pdf', '.doc', '.docx'],
  maxSize = 10, // 10MB default
  placeholder = "Click to upload or drag and drop",
  label,
  required = false,
  disabled = false,
  preview = true
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setError(null)
    
    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      if (type.endsWith('/*')) {
        const baseType = type.replace('/*', '')
        return file.type.startsWith(baseType)
      }
      return file.type === type
    })

    if (!isValidType) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`)
      return
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size too large. Maximum size: ${maxSize}MB`)
      return
    }

    onFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="w-8 h-8 text-gray-400" />
    
    if (selectedFile.type.startsWith('image/')) {
      return <Image className="w-8 h-8 text-healthcare-600" />
    }
    
    return <File className="w-8 h-8 text-healthcare-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isImageFile = selectedFile && selectedFile.type.startsWith('image/')

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200
          ${isDragOver 
            ? 'border-healthcare-500 bg-healthcare-50' 
            : selectedFile 
              ? 'border-healthcare-300 bg-healthcare-50' 
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        {selectedFile ? (
          <div className="space-y-4">
            {/* File Preview */}
            {preview && isImageFile && (
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="max-h-32 max-w-full rounded-lg object-contain"
                />
              </div>
            )}
            
            {/* File Info */}
            <div className="flex items-center justify-center space-x-2">
              {getFileIcon()}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onFileRemove()
              }}
              disabled={disabled}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 disabled:opacity-50"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {getFileIcon()}
            <div>
              <p className="text-sm font-medium text-gray-900">{placeholder}</p>
              <p className="text-xs text-gray-500 mt-1">
                {acceptedTypes.join(', ')} up to {maxSize}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <X className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}

      {/* Success Message */}
      {selectedFile && !error && (
        <p className="mt-2 text-sm text-green-600 flex items-center">
          <Check className="w-4 h-4 mr-1" />
          File uploaded successfully
        </p>
      )}
    </div>
  )
}
