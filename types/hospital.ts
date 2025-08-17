export interface HospitalProfile {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  email: string
  logo?: string
  registrationNumber: string
  verified: boolean
  onboarded: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GovernmentScheme {
  id: string
  name: string
  code: string
  description: string
  coverage: string
  isCustom: boolean
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  qualification: string
  phone: string
  email: string
  experience: number
  registrationNumber: string
}

export interface Treatment {
  id: string
  name: string
  category: string
  description: string
  isCustom: boolean
}

export interface PatientImport {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  phone: string
  aadharNumber: string
  schemeEnrolled: string
  diagnosis: string
  address: string
}

export interface OnboardingData {
  hospitalProfile: Partial<HospitalProfile>
  schemes: GovernmentScheme[]
  doctors: Doctor[]
  treatments: Treatment[]
  patients: PatientImport[]
  verificationDocuments: {
    registrationCertificate?: string
    otherDocuments?: string[]
  }
  currentStep: number
  completedSteps: number[]
}

export interface OnboardingStep {
  id: number
  title: string
  description: string
  component: string
  isCompleted: boolean
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Hospital Profile',
    description: 'Basic hospital information and contact details',
    component: 'HospitalProfile',
    isCompleted: false
  },
  {
    id: 2,
    title: 'Government Schemes',
    description: 'Select schemes your hospital accepts',
    component: 'GovernmentSchemes',
    isCompleted: false
  },
  {
    id: 3,
    title: 'Doctors & Staff',
    description: 'Add doctors and medical staff information',
    component: 'Doctors',
    isCompleted: false
  },
  {
    id: 4,
    title: 'Treatments',
    description: 'Select treatments your hospital provides',
    component: 'Treatments',
    isCompleted: false
  },
  {
    id: 5,
    title: 'Patient Import',
    description: 'Import existing patient data or add manually',
    component: 'PatientImport',
    isCompleted: false
  },
  {
    id: 6,
    title: 'Verification',
    description: 'Upload verification documents',
    component: 'Verification',
    isCompleted: false
  }
]

// Mock data for government schemes
export const MOCK_GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: '1',
    name: 'Ayushman Bharat (AB-PMJAY)',
    code: 'AB-PMJAY',
    description: 'Provides health coverage for secondary and tertiary care hospitalization',
    coverage: '₹5 Lakhs',
    isCustom: false
  },
  {
    id: '2',
    name: 'Central Government Health Scheme (CGHS)',
    code: 'CGHS',
    description: 'Comprehensive healthcare for Central Government employees and pensioners',
    coverage: '₹10 Lakhs',
    isCustom: false
  },
  {
    id: '3',
    name: 'Employees\' State Insurance (ESIC)',
    code: 'ESIC',
    description: 'Social security and health insurance for Indian workers',
    coverage: '₹3 Lakhs',
    isCustom: false
  },
  {
    id: '4',
    name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    code: 'PMJDY',
    description: 'Financial inclusion with basic health insurance coverage',
    coverage: '₹30,000',
    isCustom: false
  }
]

// Mock data for standard treatments
export const MOCK_TREATMENTS: Treatment[] = [
  {
    id: '1',
    name: 'General Consultation',
    category: 'OPD',
    description: 'General health checkup and consultation',
    isCustom: false
  },
  {
    id: '2',
    name: 'Cardiology',
    category: 'Specialty',
    description: 'Heart-related treatments and procedures',
    isCustom: false
  },
  {
    id: '3',
    name: 'Orthopedics',
    category: 'Specialty',
    description: 'Bone and joint related treatments',
    isCustom: false
  },
  {
    id: '4',
    name: 'Pediatrics',
    category: 'Specialty',
    description: 'Child healthcare and treatments',
    isCustom: false
  },
  {
    id: '5',
    name: 'Gynecology',
    category: 'Specialty',
    description: 'Women\'s health and reproductive care',
    isCustom: false
  },
  {
    id: '6',
    name: 'Emergency Care',
    category: 'Emergency',
    description: '24/7 emergency medical services',
    isCustom: false
  }
]
