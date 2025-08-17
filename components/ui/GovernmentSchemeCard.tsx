import React from 'react'
import { Shield, Calendar, DollarSign, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface GovernmentScheme {
  id: string
  name: string
  code: string
  coverageAmount: number
  enrollmentDate: string
  isActive: boolean
  coverageUsed: number
  remainingCoverage: number
}

interface GovernmentSchemeCardProps {
  scheme: GovernmentScheme
}

export function GovernmentSchemeCard({ scheme }: GovernmentSchemeCardProps) {
  const coveragePercentage = (scheme.coverageUsed / scheme.coverageAmount) * 100

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-900">{scheme.name}</h3>
        </div>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium border",
          scheme.isActive 
            ? "bg-success-100 text-success-800 border-success-200" 
            : "bg-gray-100 text-gray-800 border-gray-200"
        )}>
          {scheme.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="text-xs text-gray-600">
          Code: <span className="font-medium">{scheme.code}</span>
        </div>
        
        <div className="text-xs text-gray-600">
          Enrollment: <span className="font-medium">{scheme.enrollmentDate}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Coverage:</span>
          <span className="font-medium text-gray-900">{formatCurrency(scheme.coverageAmount)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Used:</span>
          <span className="font-medium text-gray-900">{formatCurrency(scheme.coverageUsed)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Remaining:</span>
          <span className="font-medium text-success-600">{formatCurrency(scheme.remainingCoverage)}</span>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Coverage Usage</span>
          <span>{coveragePercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(coveragePercentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
