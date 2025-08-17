'use client'

import React, { useState, useEffect } from 'react'
import { Stethoscope, Plus, Info } from 'lucide-react'
import { MultiSelect } from '../MultiSelect'
import { Treatment, MOCK_TREATMENTS } from '@/types/hospital'

interface TreatmentsStepProps {
  initialData?: Treatment[]
  onSave: (data: Treatment[]) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function TreatmentsStep({ 
  initialData = [], 
  onSave, 
  onNext, 
  onBack,
  isLoading = false 
}: TreatmentsStepProps) {
  const [selectedTreatments, setSelectedTreatments] = useState<Treatment[]>(initialData)
  const [customTreatments, setCustomTreatments] = useState<Treatment[]>([])
  const [allTreatments, setAllTreatments] = useState<Treatment[]>([...MOCK_TREATMENTS])

  useEffect(() => {
    // Combine mock treatments with custom treatments
    setAllTreatments([...MOCK_TREATMENTS, ...customTreatments])
  }, [customTreatments])

  const handleTreatmentSelection = (treatments: Treatment[]) => {
    setSelectedTreatments(treatments)
  }

  const handleAddCustomTreatment = (customValue: string) => {
    const newCustomTreatment: Treatment = {
      id: `custom_${Date.now()}`,
      name: customValue,
      category: 'Custom',
      description: 'Custom treatment provided by the hospital',
      isCustom: true
    }
    
    setCustomTreatments(prev => [...prev, newCustomTreatment])
    setSelectedTreatments(prev => [...prev, newCustomTreatment])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedTreatments.length === 0) {
      // TODO: Show error message
      return
    }

    await onSave(selectedTreatments)
    onNext()
  }

  const handleBack = () => {
    // Save current selection before going back
    onSave(selectedTreatments)
    onBack()
  }

  const getTreatmentsByCategory = () => {
    const categorized: Record<string, Treatment[]> = {}
    selectedTreatments.forEach(treatment => {
      if (!categorized[treatment.category]) {
        categorized[treatment.category] = []
      }
      categorized[treatment.category].push(treatment)
    })
    return categorized
  }

  const categorizedTreatments = getTreatmentsByCategory()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-8 h-8 text-healthcare-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Treatments & Services</h2>
        <p className="text-gray-600">
          Select the treatments and medical services that your hospital provides to patients.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Treatments Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Treatments & Services *
          </label>
          <MultiSelect
            options={allTreatments}
            selectedOptions={selectedTreatments}
            onSelectionChange={handleTreatmentSelection}
            placeholder="Choose treatments your hospital provides..."
            searchPlaceholder="Search treatments..."
            allowCustom={true}
            onAddCustom={handleAddCustomTreatment}
          />
          <p className="mt-2 text-sm text-gray-500">
            You can select multiple treatments and add custom ones if needed.
          </p>
        </div>

        {/* Selected Treatments Display */}
        {selectedTreatments.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Selected Treatments ({selectedTreatments.length})
            </h3>
            
            {Object.entries(categorizedTreatments).map(([category, treatments]) => (
              <div key={category} className="mb-6 last:mb-0">
                <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
                  {category}
                </h4>
                <div className="space-y-3">
                  {treatments.map((treatment) => (
                    <div
                      key={treatment.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{treatment.name}</span>
                          {treatment.isCustom && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Custom
                            </span>
                          )}
                        </div>
                        {treatment.description && (
                          <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTreatmentSelection(selectedTreatments.filter(t => t.id !== treatment.id))}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Plus className="w-4 h-4 rotate-45" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Information Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">Why specify treatments?</p>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                <li>Help patients find the right hospital for their needs</li>
                <li>Enable better appointment scheduling and referrals</li>
                <li>Improve search and discovery on the platform</li>
                <li>Streamline insurance and claims processing</li>
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
            disabled={isLoading || selectedTreatments.length === 0}
            className="px-6 py-3 bg-healthcare-600 text-white rounded-lg font-medium hover:bg-healthcare-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save & Continue'}
          </button>
        </div>
      </form>
    </div>
  )
}
