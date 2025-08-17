'use client'

import React, { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { DashboardCard } from '@/components/ui/DashboardCard'
import { Button } from '@/components/ui/Button'
import { 
  Building2, 
  Users, 
  FileText, 
  Shield, 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  LogOut,
  UserPlus,
  ClipboardList,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { checkOnboardingStatus } from '@/lib/hospital'

interface HospitalDashboardProps {
  user: User
}

interface Patient {
  id: string
  name: string
  aadharNumber: string
  phone: string
  lastVisit: string
  status: 'active' | 'inactive'
}

interface Appointment {
  id: string
  patientName: string
  patientId: string
  date: string
  time: string
  type: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

interface Claim {
  id: string
  patientName: string
  schemeName: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  submittedDate: string
}

export function HospitalDashboard({ user }: HospitalDashboardProps) {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeAppointments: 0,
    pendingClaims: 0,
    monthlyRevenue: 0
  })
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)

  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check onboarding status and fetch dashboard data
    const initializeDashboard = async () => {
      try {
        // Check if hospital has completed onboarding
        const { needsOnboarding } = await checkOnboardingStatus(user.uid)
        
        if (needsOnboarding) {
          // Hospital needs onboarding, redirect to onboarding
          router.push('/hospital/onboarding')
          return
        }
        
        // Hospital is onboarded, fetch dashboard data
        await fetchDashboardData()
      } catch (error) {
        console.error('Error initializing dashboard:', error)
        toast.error('Failed to load dashboard data')
      }
    }

    // Simulate API calls to fetch hospital dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        // For now, we'll use mock data
        setStats({
          totalPatients: 156,
          activeAppointments: 23,
          pendingClaims: 8,
          monthlyRevenue: 450000
        })

        setPatients([
          {
            id: '1',
            name: 'Rajesh Kumar',
            aadharNumber: '123456789012',
            phone: '+91 98765 43210',
            lastVisit: '2024-01-15',
            status: 'active'
          },
          {
            id: '2',
            name: 'Priya Sharma',
            aadharNumber: '987654321098',
            phone: '+91 87654 32109',
            lastVisit: '2024-01-12',
            status: 'active'
          },
          {
            id: '3',
            name: 'Amit Patel',
            aadharNumber: '456789012345',
            phone: '+91 76543 21098',
            lastVisit: '2024-01-10',
            status: 'inactive'
          }
        ])

        setAppointments([
          {
            id: '1',
            patientName: 'Rajesh Kumar',
            patientId: '1',
            date: '2024-01-20',
            time: '10:00 AM',
            type: 'consultation',
            status: 'scheduled'
          },
          {
            id: '2',
            patientName: 'Priya Sharma',
            patientId: '2',
            date: '2024-01-20',
            time: '2:30 PM',
            type: 'follow_up',
            status: 'scheduled'
          },
          {
            id: '3',
            patientName: 'Amit Patel',
            patientId: '3',
            date: '2024-01-21',
            time: '11:00 AM',
            type: 'consultation',
            status: 'scheduled'
          }
        ])

        setClaims([
          {
            id: '1',
            patientName: 'Rajesh Kumar',
            schemeName: 'Ayushman Bharat',
            amount: 15000,
            status: 'pending',
            submittedDate: '2024-01-15'
          },
          {
            id: '2',
            patientName: 'Priya Sharma',
            schemeName: 'CGHS',
            amount: 25000,
            status: 'approved',
            submittedDate: '2024-01-10'
          },
          {
            id: '3',
            patientName: 'Amit Patel',
            schemeName: 'Ayushman Bharat',
            amount: 18000,
            status: 'rejected',
            submittedDate: '2024-01-08'
          }
        ])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [user.uid, router])

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
          <p className="mt-4 text-gray-600">Loading your hospital dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.displayName || 'Hospital'}! 🏥
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your patients, appointments, and claims with FastCare
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
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            trend="+12"
            trendUp={true}
          />
          <DashboardCard
            title="Active Appointments"
            value={stats.activeAppointments}
            icon={Calendar}
            trend="+5"
            trendUp={true}
          />
          <DashboardCard
            title="Pending Claims"
            value={stats.pendingClaims}
            icon={FileText}
            trend="+2"
            trendUp={false}
          />
          <DashboardCard
            title="Monthly Revenue"
            value={`₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            trend="+8%"
            trendUp={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Recent Patients */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-healthcare-600" />
                  Recent Patients
                </h2>
                <Button size="sm" className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Add Patient</span>
                </Button>
              </div>
              <div className="space-y-3">
                {patients.slice(0, 5).map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">Aadhar: {patient.aadharNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{patient.phone}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-healthcare-600" />
                  Upcoming Appointments
                </h2>
                <Button size="sm" variant="outline" className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Schedule</span>
                </Button>
              </div>
              <div className="space-y-3">
                {appointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Claims Overview */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-healthcare-600" />
                  Claims Overview
                </h2>
                <Button size="sm" variant="outline" className="flex items-center space-x-2">
                  <ClipboardList className="w-4 h-4" />
                  <span>View All</span>
                </Button>
              </div>
              <div className="space-y-3">
                {claims.slice(0, 5).map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{claim.patientName}</p>
                      <p className="text-sm text-gray-600">{claim.schemeName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{claim.amount.toLocaleString()}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        claim.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : claim.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {claim.status}
                      </span>
                    </div>
                  </div>
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
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register New Patient
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Claim
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Check Scheme Eligibility
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
