'use client'

import React, { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { DashboardCard } from '@/components/ui/DashboardCard'
import { AppointmentCard } from '@/components/ui/AppointmentCard'
import { MedicalRecordCard } from '@/components/ui/MedicalRecordCard'
import { GovernmentSchemeCard } from '@/components/ui/GovernmentSchemeCard'
import { Calendar, FileText, Shield, Users, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface PatientDashboardProps {
  user: User
}

interface Appointment {
  id: string
  date: string
  time: string
  hospitalName: string
  doctorName: string
  type: string
  status: string
}

interface MedicalRecord {
  id: string
  title: string
  type: string
  description: string
  date: string
  tags: string[]
  hasAttachments: boolean
}

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

export function PatientDashboard({ user }: PatientDashboardProps) {
  const [stats, setStats] = useState({
    appointments: 0,
    claims: 0,
    medicalRecords: 0,
    governmentSchemes: 0
  })
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [governmentSchemes, setGovernmentSchemes] = useState<GovernmentScheme[]>([])
  const [loading, setLoading] = useState(true)

  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Simulate API calls to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        // For now, we'll use mock data
        setStats({
          appointments: 3,
          claims: 2,
          medicalRecords: 8,
          governmentSchemes: 2
        })

        setAppointments([
          {
            id: '1',
            date: '2024-01-15',
            time: '10:00 AM',
            hospitalName: 'City General Hospital',
            doctorName: 'Dr. Priya Sharma',
            type: 'consultation',
            status: 'confirmed'
          },
          {
            id: '2',
            date: '2024-01-20',
            time: '2:30 PM',
            hospitalName: 'Community Health Clinic',
            doctorName: 'Dr. Amit Patel',
            type: 'follow_up',
            status: 'pending'
          }
        ])

        setMedicalRecords([
          {
            id: '1',
            title: 'Annual Health Checkup',
            type: 'consultation',
            description: 'Comprehensive health assessment including blood work and physical examination',
            date: '2024-01-10',
            tags: ['checkup', 'blood work', 'physical'],
            hasAttachments: true
          },
          {
            id: '2',
            title: 'Blood Test Results',
            type: 'test_result',
            description: 'Complete blood count and metabolic panel results within normal ranges',
            date: '2024-01-08',
            tags: ['blood test', 'CBC', 'metabolic panel'],
            hasAttachments: true
          }
        ])

        setGovernmentSchemes([
          {
            id: '1',
            name: 'Ayushman Bharat (AB-PMJAY)',
            code: 'AB-PMJAY',
            coverageAmount: 500000,
            enrollmentDate: '2023-06-15',
            isActive: true,
            coverageUsed: 15000,
            remainingCoverage: 485000
          },
          {
            id: '2',
            name: 'Central Government Health Scheme (CGHS)',
            code: 'CGHS',
            coverageAmount: 1000000,
            enrollmentDate: '2023-08-20',
            isActive: true,
            coverageUsed: 25000,
            remainingCoverage: 975000
          }
        ])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-healthcare-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.displayName || 'Patient'}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your healthcare journey with FastCare
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Signed in as</p>
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Upcoming Appointments"
            value={stats.appointments}
            icon={Calendar}
            trend="+2"
            trendUp={true}
          />
          <DashboardCard
            title="Active Claims"
            value={stats.claims}
            icon={FileText}
            trend="+1"
            trendUp={true}
          />
          <DashboardCard
            title="Medical Records"
            value={stats.medicalRecords}
            icon={FileText}
            trend="+3"
            trendUp={true}
          />
          <DashboardCard
            title="Government Schemes"
            value={stats.governmentSchemes}
            icon={Shield}
            trend="Active"
            trendUp={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-healthcare-600" />
                Upcoming Appointments
              </h2>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </div>

            {/* Recent Medical Records */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-healthcare-600" />
                Recent Medical Records
              </h2>
              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <MedicalRecordCard
                    key={record.id}
                    record={record}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Government Schemes */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-healthcare-600" />
                Government Schemes
              </h2>
              <div className="space-y-4">
                {governmentSchemes.map((scheme) => (
                  <GovernmentSchemeCard
                    key={scheme.id}
                    scheme={scheme}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Medical Record
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Check Scheme Eligibility
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Find Healthcare Provider
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
