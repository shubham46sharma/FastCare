'use client'

import React, { useState, useEffect } from 'react'
import { Shield, Plus, Info } from 'lucide-react'
import { MultiSelect } from '../MultiSelect'
import { GovernmentScheme, MOCK_GOVERNMENT_SCHEMES } from '@/types/hospital'

interface GovernmentSchemesStepProps {
  initialData?: GovernmentScheme[]
  onSave: (data: GovernmentScheme[]) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function GovernmentSchemesStep({ 
  initialData = [], 
  onSave, 
  onNext, 
  onBack,
  isLoading = false 
}: GovernmentSchemesStepProps) {
  const [selectedSchemes, setSelectedSchemes] = useState<GovernmentScheme[]>(initialData)
  const [customSchemes, setCustomSchemes] = useState<GovernmentScheme[]>([])
  const [allSchemes, setAllSchemes] = useState<GovernmentScheme[]>([...MOCK_GOVERNMENT_SCHEMES])

  useEffect(() => {
    // Combine mock schemes with custom schemes
    setAllSchemes([...MOCK_GOVERNMENT_SCHEMES, ...customSchemes])
  }, [customSchemes])

  const handleSchemeSelection = (schemes: GovernmentScheme[]) => {
    setSelectedSchemes(schemes)
  }

  const handleAddCustomScheme = (customValue: string) => {
    const newCustomScheme: GovernmentScheme = {
      id: `custom_${Date.now()}`,
      name: customValue,
      code: `CUSTOM_${customValue.toUpperCase().replace(/\s+/g, '_')}`,
      description: 'Custom government scheme',
      coverage: 'Custom coverage',
      isCustom: true
    }
    
    setCustomSchemes(prev => [...prev, newCustomScheme])
    setSelectedSchemes(prev => [...prev, newCustomScheme])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedSchemes.length === 0) {
      // TODO: Show error message
      return
    }

    await onSave(selectedSchemes)
    onNext()
  }

  const handleBack = () => {
    // Save current selection before going back
    onSave(selectedSchemes)
    onBack()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-healthcare-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Government Schemes</h2>
        <p className="text-gray-600">
          Select the government healthcare schemes that your hospital accepts and supports.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Schemes Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Government Schemes *
          </label>
          <MultiSelect
            options={allSchemes}
            selectedOptions={selectedSchemes}
            onSelectionChange={handleSchemeSelection}
            placeholder="Choose schemes your hospital accepts..."
            searchPlaceholder="Search schemes..."
            allowCustom={true}
            onAddCustom={handleAddCustomScheme}
          />
          <p className="mt-2 text-sm text-gray-500">
            You can select multiple schemes and add custom ones if needed.
          </p>
        </div>

        {/* Selected Schemes Display */}
        {selectedSchemes.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Selected Schemes ({selectedSchemes.length})
            </h3>
            <div className="space-y-3">
              {selectedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{scheme.name}</span>
                      {scheme.isCustom && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Custom
                        </span>
                      )}
                    </div>
                    {scheme.description && (
                      <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      {scheme.code && <span>Code: {scheme.code}</span>}
                      {scheme.coverage && <span>Coverage: {scheme.coverage}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSchemeSelection(selectedSchemes.filter(s => s.id !== scheme.id))}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Plus className="w-4 h-4 rotate-45" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Why select government schemes?</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Enable patients to use their scheme benefits</li>
                <li>Streamline claims processing and reimbursements</li>
                <li>Increase patient accessibility to your services</li>
                <li>Comply with government healthcare regulations</li>
              </ul>
            </div>
          </div>
        </div>

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
            type="submit"
            disabled={isLoading || selectedSchemes.length === 0}
            className="px-6 py-3 bg-healthcare-600 text-white rounded-lg font-medium hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}
