'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface InputFieldProps {
  label: string
  id: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'textarea'
  value: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  required?: boolean
  error?: string
  disabled?: boolean
  icon?: LucideIcon
  rows?: number
  maxLength?: number
  min?: number
  max?: number
  className?: string
}

export function InputField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  icon: Icon,
  rows = 3,
  maxLength,
  min,
  max,
  className = ''
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = type === 'number' ? Number(e.target.value) : e.target.value
    onChange(newValue)
  }

  const baseClasses = `w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200 ${
    error ? 'border-red-300' : 'border-gray-300'
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  const inputClasses = Icon ? `pl-10 ${baseClasses}` : baseClasses

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        )}
        
        {type === 'textarea' ? (
          <textarea
            id={id}
            value={value}
            onChange={handleChange}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            min={min}
            max={max}
            className={inputClasses}
          />
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
