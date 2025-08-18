'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, X, Plus } from 'lucide-react'

interface Option {
  id: string
  name: string
  description?: string
  code?: string
  category?: string
  isCustom?: boolean
}

interface MultiSelectProps<T extends Option = Option> {
  options: T[]
  selectedOptions: T[]
  onSelectionChange: (options: T[]) => void
  placeholder?: string
  searchPlaceholder?: string
  allowCustom?: boolean
  onAddCustom?: (customValue: string) => void
  maxSelections?: number
  disabled?: boolean
}

export function MultiSelect<T extends Option = Option>({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search options...",
  allowCustom = false,
  onAddCustom,
  maxSelections,
  disabled = false
}: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [customValue, setCustomValue] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
        setCustomValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (option.description && option.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (option.code && option.code.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const isOptionSelected = (option: T) => 
    selectedOptions.some(selected => selected.id === option.id)

  const toggleOption = (option: T) => {
    if (isOptionSelected(option)) {
      onSelectionChange(selectedOptions.filter(selected => selected.id !== option.id))
    } else {
      if (maxSelections && selectedOptions.length >= maxSelections) {
        return // Don't add more options
      }
      onSelectionChange([...selectedOptions, option])
    }
  }

  const removeOption = (optionToRemove: Option) => {
    onSelectionChange(selectedOptions.filter(option => option.id !== optionToRemove.id))
  }

  const handleAddCustom = () => {
    if (customValue.trim() && onAddCustom) {
      onAddCustom(customValue.trim())
      setCustomValue('')
      setSearchTerm('')
    }
  }

  const canAddMore = !maxSelections || selectedOptions.length < maxSelections

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Options Display */}
      <div className="min-h-[44px] p-2 border border-gray-300 rounded-lg bg-white">
        {selectedOptions.length === 0 ? (
          <div className="text-gray-500 text-sm">{placeholder}</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-2 bg-healthcare-100 text-healthcare-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{option.name}</span>
                <button
                  type="button"
                  onClick={() => removeOption(option)}
                  className="text-healthcare-600 hover:text-healthcare-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Dropdown Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
            />
          </div>

          {/* Options List */}
          <div className="py-2">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-sm">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => toggleOption(option)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                    isOptionSelected(option) ? 'bg-healthcare-50' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.name}</div>
                    {option.description && (
                      <div className="text-sm text-gray-500">{option.description}</div>
                    )}
                    {option.code && (
                      <div className="text-xs text-gray-400">Code: {option.code}</div>
                    )}
                  </div>
                  {isOptionSelected(option) && (
                    <Check className="w-5 h-5 text-healthcare-600" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Custom Option Input */}
          {allowCustom && onAddCustom && (
            <div className="p-3 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom option..."
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
                />
                <button
                  type="button"
                  onClick={handleAddCustom}
                  disabled={!customValue.trim()}
                  className="px-3 py-2 bg-healthcare-600 text-white rounded-md hover:bg-healthcare-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Max Selections Warning */}
          {maxSelections && (
            <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-200">
              {selectedOptions.length}/{maxSelections} options selected
            </div>
          )}
        </div>
      )}
    </div>
  )
}
