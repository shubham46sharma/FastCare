import React from 'react'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { formatDate, formatDateTime } from '@/lib/utils'

interface Appointment {
  id: string
  date: string
  time: string
  hospitalName: string
  doctorName: string
  type: string
  status: string
}

interface AppointmentCardProps {
  appointment: Appointment
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-success-100 text-success-800 border-success-200'
      case 'pending':
        return 'bg-warning-100 text-warning-800 border-warning-200'
      case 'cancelled':
        return 'bg-danger-100 text-danger-800 border-danger-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-healthcare-600" />
          <span className="text-sm font-medium text-gray-900">
            {formatDate(appointment.date)}
          </span>
        </div>
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium border",
          getStatusColor(appointment.status)
        )}>
          {appointment.status}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{appointment.time}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{appointment.hospitalName}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">Dr. {appointment.doctorName}</span>
        </div>
        
        <div className="text-xs text-gray-500 capitalize">
          Type: {appointment.type.replace('_', ' ')}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
