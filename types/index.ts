// User Types
export type UserType = 'hospital' | 'patient'

// Base User Profile
export interface BaseUserProfile {
  uid: string
  email: string
  displayName: string
  userType: UserType
  createdAt: Date
  updatedAt?: Date
}

// Hospital Profile
export interface HospitalProfile extends BaseUserProfile {
  userType: 'hospital'
  hospitalName: string
  licenseNumber: string
  address: string
  phone: string
  specialties?: string[]
  isVerified?: boolean
  verificationDate?: Date
}

// Patient Profile
export interface PatientProfile extends BaseUserProfile {
  userType: 'patient'
  fullName: string
  dateOfBirth: string
  aadharNumber: string
  patientAddress: string
  patientPhone?: string
  emergencyContact?: string
  bloodGroup?: string
  allergies?: string[]
  medicalHistory?: string[]
}

// Union type for all user profiles
export type UserProfile = HospitalProfile | PatientProfile

// Authentication Context
export interface AuthContextType {
  user: any // Firebase User
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string, userType: UserType, profileData?: any) => Promise<void>
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

// Dashboard Stats
export interface DashboardStats {
  // Common stats
  totalItems: number
  recentActivity: number
  
  // Hospital-specific stats
  totalPatients?: number
  activeAppointments?: number
  pendingClaims?: number
  monthlyRevenue?: number
  
  // Patient-specific stats
  appointments?: number
  claims?: number
  medicalRecords?: number
  governmentSchemes?: number
}

// Patient Data
export interface Patient {
  id: string
  name: string
  aadharNumber: string
  phone: string
  lastVisit: string
  status: 'active' | 'inactive'
  email?: string
  address?: string
  emergencyContact?: string
}

// Appointment Data
export interface Appointment {
  id: string
  patientName: string
  patientId: string
  hospitalName?: string
  doctorName?: string
  date: string
  time: string
  type: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending'
  notes?: string
  cost?: number
}

// Medical Record Data
export interface MedicalRecord {
  id: string
  title: string
  type: string
  description: string
  date: string
  tags: string[]
  hasAttachments: boolean
  hospitalName?: string
  doctorName?: string
  cost?: number
  schemeUsed?: string
}

// Government Scheme Data
export interface GovernmentScheme {
  id: string
  name: string
  code: string
  coverageAmount: number
  enrollmentDate: string
  isActive: boolean
  coverageUsed: number
  remainingCoverage: number
  description?: string
  eligibilityCriteria?: string[]
  coveredServices?: string[]
}

// Claim Data
export interface Claim {
  id: string
  patientName: string
  patientId: string
  hospitalName: string
  schemeName: string
  amount: number
  status: 'pending' | 'approved' | 'rejected' | 'under_review'
  submittedDate: string
  processedDate?: string
  notes?: string
  documents?: string[]
  rejectionReason?: string
}

// Hospital Data
export interface Hospital {
  id: string
  name: string
  licenseNumber: string
  address: string
  phone: string
  email: string
  specialties: string[]
  isVerified: boolean
  verificationDate?: Date
  rating?: number
  totalPatients?: number
  totalClaims?: number
  successRate?: number
}

// Form Data Types
export interface SignupFormData {
  email: string
  password: string
  displayName: string
  userType: UserType
  
  // Hospital-specific fields
  hospitalName?: string
  licenseNumber?: string
  address?: string
  phone?: string
  specialties?: string[]
  
  // Patient-specific fields
  fullName?: string
  dateOfBirth?: string
  aadharNumber?: string
  patientAddress?: string
  patientPhone?: string
  emergencyContact?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Pagination Types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Search and Filter Types
export interface SearchFilters {
  query?: string
  userType?: UserType
  status?: string
  dateRange?: {
    start: Date
    end: Date
  }
  location?: string
  specialty?: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: Date
  actionUrl?: string
}

// Analytics Types
export interface AnalyticsData {
  period: string
  metrics: {
    [key: string]: number
  }
  trends: {
    [key: string]: {
      value: number
      change: number
      changePercent: number
    }
  }
}

// Settings Types
export interface UserSettings {
  userId: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends'
    showContactInfo: boolean
    showMedicalHistory: boolean
  }
  preferences: {
    language: string
    timezone: string
    currency: string
  }
}
