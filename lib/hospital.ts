import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  deleteDoc
} from 'firebase/firestore'
import { db } from './firebase/config'
import { 
  HospitalProfile, 
  OnboardingData, 
  GovernmentScheme, 
  Doctor, 
  Treatment, 
  PatientImport 
} from '@/types/hospital'

// Get hospital profile by user ID
export const getHospitalProfile = async (userId: string): Promise<HospitalProfile | null> => {
  try {
    const hospitalDoc = await getDoc(doc(db, 'hospitals', userId))
    if (hospitalDoc.exists()) {
      const data = hospitalDoc.data()
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as HospitalProfile
    }
    return null
  } catch (error) {
    console.error('Error getting hospital profile:', error)
    return null
  }
}

// Create or update hospital profile
export const saveHospitalProfile = async (userId: string, profile: Partial<HospitalProfile>): Promise<boolean> => {
  try {
    const hospitalRef = doc(db, 'hospitals', userId)
    const existingDoc = await getDoc(hospitalRef)
    
    if (existingDoc.exists()) {
      // Update existing profile
      await updateDoc(hospitalRef, {
        ...profile,
        updatedAt: Timestamp.now()
      })
    } else {
      // Create new profile
      await setDoc(hospitalRef, {
        id: userId,
        ...profile,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        verified: false,
        onboarded: false
      })
    }
    return true
  } catch (error) {
    console.error('Error saving hospital profile:', error)
    return false
  }
}

// Get onboarding data for a hospital
export const getOnboardingData = async (userId: string): Promise<OnboardingData | null> => {
  try {
    const onboardingDoc = await getDoc(doc(db, 'hospitalOnboarding', userId))
    if (onboardingDoc.exists()) {
      return onboardingDoc.data() as OnboardingData
    }
    return null
  } catch (error) {
    console.error('Error getting onboarding data:', error)
    // Return a default onboarding data structure instead of null
    // This prevents the infinite redirect loop
    return {
      hospitalProfile: {},
      schemes: [],
      doctors: [],
      treatments: [],
      patients: [],
      verificationDocuments: {},
      currentStep: 1,
      completedSteps: []
    }
  }
}

// Save onboarding data
export const saveOnboardingData = async (userId: string, data: Partial<OnboardingData>): Promise<boolean> => {
  try {
    const onboardingRef = doc(db, 'hospitalOnboarding', userId)
    const existingDoc = await getDoc(onboardingRef)
    
    if (existingDoc.exists()) {
      // Update existing onboarding data
      await updateDoc(onboardingRef, {
        ...data,
        updatedAt: Timestamp.now()
      })
    } else {
      // Create new onboarding data
      await setDoc(onboardingRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
    }
    return true
  } catch (error) {
    console.error('Error saving onboarding data:', error)
    return false
  }
}

// Mark onboarding as complete
export const completeOnboarding = async (userId: string): Promise<boolean> => {
  try {
    // First ensure hospital document exists
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      await ensureHospitalDocument(userId, userData)
    }
    
    // Update hospital profile
    await updateDoc(doc(db, 'hospitals', userId), {
      onboarded: true,
      updatedAt: Timestamp.now()
    })
    
    // Update onboarding data
    await updateDoc(doc(db, 'hospitalOnboarding', userId), {
      currentStep: 6,
      completedSteps: [1, 2, 3, 4, 5, 6],
      updatedAt: Timestamp.now()
    })
    
    return true
  } catch (error) {
    console.error('Error completing onboarding:', error)
    return false
  }
}

// Save government schemes
export const saveGovernmentSchemes = async (userId: string, schemes: GovernmentScheme[]): Promise<boolean> => {
  try {
    // Save schemes to hospital's collection
    const schemesRef = collection(db, 'hospitals', userId, 'schemes')
    
    // Clear existing schemes
    const existingSchemes = await getDocs(schemesRef)
    existingSchemes.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
    
    // Add new schemes
    for (const scheme of schemes) {
      await addDoc(schemesRef, {
        ...scheme,
        createdAt: Timestamp.now()
      })
    }
    
    // Update onboarding data
    await saveOnboardingData(userId, { schemes })
    
    return true
  } catch (error) {
    console.error('Error saving government schemes:', error)
    return false
  }
}

// Save doctors
export const saveDoctors = async (userId: string, doctors: Doctor[]): Promise<boolean> => {
  try {
    // Save doctors to hospital's collection
    const doctorsRef = collection(db, 'hospitals', userId, 'doctors')
    
    // Clear existing doctors
    const existingDoctors = await getDocs(doctorsRef)
    existingDoctors.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
    
    // Add new doctors
    for (const doctor of doctors) {
      await addDoc(doctorsRef, {
        ...doctor,
        createdAt: Timestamp.now()
      })
    }
    
    // Update onboarding data
    await saveOnboardingData(userId, { doctors })
    
    return true
  } catch (error) {
    console.error('Error saving doctors:', error)
    return false
  }
}

// Save treatments
export const saveTreatments = async (userId: string, treatments: Treatment[]): Promise<boolean> => {
  try {
    // Save treatments to hospital's collection
    const treatmentsRef = collection(db, 'hospitals', userId, 'treatments')
    
    // Clear existing treatments
    const existingTreatments = await getDocs(treatmentsRef)
    existingTreatments.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
    
    // Add new treatments
    for (const treatment of treatments) {
      await addDoc(treatmentsRef, {
        ...treatment,
        createdAt: Timestamp.now()
      })
    }
    
    // Update onboarding data
    await saveOnboardingData(userId, { treatments })
    
    return true
  } catch (error) {
    console.error('Error saving treatments:', error)
    return false
  }
}

// Save patients
export const savePatients = async (userId: string, patients: PatientImport[]): Promise<boolean> => {
  try {
    // Save patients to hospital's collection
    const patientsRef = collection(db, 'hospitals', userId, 'patients')
    
    // Clear existing patients
    const existingPatients = await getDocs(patientsRef)
    existingPatients.forEach(async (doc) => {
      await deleteDoc(doc.ref)
    })
    
    // Add new patients
    for (const patient of patients) {
      await addDoc(patientsRef, {
        ...patient,
        createdAt: Timestamp.now()
      })
    }
    
    // Update onboarding data
    await saveOnboardingData(userId, { patients })
    
    return true
  } catch (error) {
    console.error('Error saving patients:', error)
    return false
  }
}

// Check if hospital needs onboarding
export const checkOnboardingStatus = async (userId: string): Promise<{ needsOnboarding: boolean; currentStep: number }> => {
  try {
    const hospitalProfile = await getHospitalProfile(userId)
    
    if (!hospitalProfile) {
      return { needsOnboarding: true, currentStep: 1 }
    }
    
    if (!hospitalProfile.onboarded) {
      const onboardingData = await getOnboardingData(userId)
      return { 
        needsOnboarding: true, 
        currentStep: onboardingData?.currentStep || 1 
      }
    }
    
    return { needsOnboarding: false, currentStep: 6 }
  } catch (error) {
    console.error('Error checking onboarding status:', error)
    // Try to check hospital profile directly as fallback
    try {
      const hospitalDoc = await getDoc(doc(db, 'hospitals', userId))
      if (hospitalDoc.exists()) {
        const hospitalData = hospitalDoc.data()
        if (hospitalData.onboarded === true) {
          return { needsOnboarding: false, currentStep: 6 }
        }
      }
    } catch (fallbackError) {
      console.error('Fallback error checking hospital profile:', fallbackError)
    }
    
    return { needsOnboarding: true, currentStep: 1 }
  }
}

// Upload file to Firebase Storage (placeholder for now)
export const uploadFile = async (file: File, path: string): Promise<string> => {
  // TODO: Implement Firebase Storage upload
  // For now, return a placeholder URL
  return `https://placeholder.com/${path}/${file.name}`
}

// Ensure hospital document exists (create if missing)
export const ensureHospitalDocument = async (userId: string, userData: any): Promise<boolean> => {
  try {
    const hospitalRef = doc(db, 'hospitals', userId)
    const hospitalDoc = await getDoc(hospitalRef)
    
    if (!hospitalDoc.exists()) {
      // Create hospital document if it doesn't exist
      const hospitalProfile = {
        uid: userId,
        email: userData.email,
        displayName: userData.displayName,
        hospitalName: userData.hospitalName || 'Hospital Name',
        licenseNumber: userData.licenseNumber || 'License Number',
        address: userData.address || 'Address',
        phone: userData.phone || 'Phone',
        specialties: userData.specialties || [],
        onboarded: false,
        verified: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
      
      await setDoc(hospitalRef, hospitalProfile)
      console.log('Created missing hospital document for user:', userId)
    }
    
    return true
  } catch (error) {
    console.error('Error ensuring hospital document:', error)
    return false
  }
}
