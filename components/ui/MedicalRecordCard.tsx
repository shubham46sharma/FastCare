import React from 'react'
import { FileText, Calendar, Tag, Download } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface MedicalRecord {
  id: string
  title: string
  type: string
  description: string
  date: string
  tags: string[]
  hasAttachments: boolean
}

interface MedicalRecordCardProps {
  record: MedicalRecord
}

export function MedicalRecordCard({ record }: MedicalRecordCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'test_result':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'prescription':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'discharge_summary':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-healthcare-600" />
          <h3 className="text-sm font-medium text-gray-900">{record.title}</h3>
        </div>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium border capitalize",
          getTypeColor(record.type)
        )}>
          {record.type.replace('_', ' ')}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
        {record.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-3 h-3 text-gray-500" />
          <span className="text-xs text-gray-600">{formatDate(record.date)}</span>
        </div>
        
        {record.hasAttachments && (
          <button className="flex items-center space-x-1 text-xs text-healthcare-600 hover:text-healthcare-700">
            <Download className="w-3 h-3" />
            <span>View</span>
          </button>
        )}
      </div>
      
      {record.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {record.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {record.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
              +{record.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
