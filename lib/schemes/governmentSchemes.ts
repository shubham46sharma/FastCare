import { GovernmentScheme } from '@/types'

export interface SchemeEligibility {
  patientId: string
  schemeId: string
  isEligible: boolean
  reasons: string[]
  coverageAmount: number
  restrictions: string[]
}

export class GovernmentSchemesManager {
  private schemes: Map<string, GovernmentScheme> = new Map()

  constructor() {
    this.initializeDefaultSchemes()
  }

  /**
   * Initialize default government schemes
   */
  private initializeDefaultSchemes() {
    const defaultSchemes: GovernmentScheme[] = [
      {
        id: 'ayushman-bharat',
        name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
        code: 'AB-PMJAY',
        description: 'Provides health coverage up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization',
        coverageAmount: 500000,
        eligibilityCriteria: [
          'Families identified as deprived rural households',
          'Occupational categories of urban workers\' families',
          'Total SECC (Socio-Economic Caste Census) score of 0-7',
          'No member of the family should be a government employee'
        ],
        supportedProcedures: [
          'Cardiac procedures',
          'Cancer treatment',
          'Orthopedic procedures',
          'Neurological procedures',
          'General surgery',
          'Gynecological procedures',
          'Pediatric procedures'
        ],
        isActive: true,
        launchDate: new Date('2018-09-23'),
        maxAge: 100,
        minAge: 0,
        gender: 'all',
        incomeLimit: 100000,
        locationRestrictions: []
      },
      {
        id: 'cg-hs',
        name: 'Central Government Health Scheme (CGHS)',
        code: 'CGHS',
        description: 'Comprehensive health care facility for Central Government employees and pensioners',
        coverageAmount: 1000000,
        eligibilityCriteria: [
          'Central Government employees',
          'Central Government pensioners',
          'Dependents of employees and pensioners'
        ],
        supportedProcedures: [
          'OPD consultations',
          'Indoor treatment',
          'Specialist consultations',
          'Laboratory investigations',
          'X-ray and imaging',
          'Dental treatment',
          'Maternity care'
        ],
        isActive: true,
        launchDate: new Date('1954-01-01'),
        maxAge: 100,
        minAge: 0,
        gender: 'all',
        locationRestrictions: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad']
      },
      {
        id: 'esic',
        name: 'Employees\' State Insurance Scheme (ESIC)',
        code: 'ESIC',
        description: 'Social security and health insurance scheme for Indian workers',
        coverageAmount: 300000,
        eligibilityCriteria: [
          'Employees earning up to ₹21,000 per month',
          'Employees working in factories and establishments',
          'Dependents of insured persons'
        ],
        supportedProcedures: [
          'Medical care',
          'Sickness benefit',
          'Maternity benefit',
          'Disability benefit',
          'Dependents\' benefit',
          'Funeral expenses'
        ],
        isActive: true,
        launchDate: new Date('1952-02-24'),
        maxAge: 100,
        minAge: 18,
        gender: 'all',
        locationRestrictions: []
      },
      {
        id: 'pmjdy',
        name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
        code: 'PMJDY',
        description: 'National Mission for Financial Inclusion including health insurance',
        coverageAmount: 30000,
        eligibilityCriteria: [
          'Indian citizens',
          'No existing bank account',
          'Aadhar number required'
        ],
        supportedProcedures: [
          'Accident insurance',
          'Life insurance',
          'Basic health coverage'
        ],
        isActive: true,
        launchDate: new Date('2014-08-28'),
        maxAge: 100,
        minAge: 0,
        gender: 'all',
        locationRestrictions: []
      }
    ]

    defaultSchemes.forEach(scheme => {
      this.schemes.set(scheme.id, scheme)
    })
  }

  /**
   * Get all available schemes
   */
  getAllSchemes(): GovernmentScheme[] {
    return Array.from(this.schemes.values())
  }

  /**
   * Get scheme by ID
   */
  getSchemeById(schemeId: string): GovernmentScheme | undefined {
    return this.schemes.get(schemeId)
  }

  /**
   * Get schemes by location
   */
  getSchemesByLocation(state: string, city?: string): GovernmentScheme[] {
    return Array.from(this.schemes.values()).filter(scheme => {
      if (scheme.locationRestrictions.length === 0) return true
      return scheme.locationRestrictions.includes(state) || 
             (city && scheme.locationRestrictions.includes(city))
    })
  }

  /**
   * Get schemes by patient eligibility
   */
  getEligibleSchemes(patientData: any): GovernmentScheme[] {
    const eligibleSchemes: GovernmentScheme[] = []

    for (const scheme of this.schemes.values()) {
      if (this.isPatientEligible(patientData, scheme)) {
        eligibleSchemes.push(scheme)
      }
    }

    return eligibleSchemes
  }

  /**
   * Check if patient is eligible for a specific scheme
   */
  isPatientEligible(patientData: any, scheme: GovernmentScheme): boolean {
    // Age check
    const age = this.calculateAge(patientData.dateOfBirth)
    if (age < scheme.minAge || age > scheme.maxAge) {
      return false
    }

    // Gender check
    if (scheme.gender !== 'all' && patientData.gender !== scheme.gender) {
      return false
    }

    // Income check
    if (scheme.incomeLimit && patientData.income > scheme.incomeLimit) {
      return false
    }

    // Location check
    if (scheme.locationRestrictions.length > 0) {
      const patientLocation = patientData.address?.state
      if (!patientLocation || !scheme.locationRestrictions.includes(patientLocation)) {
        return false
      }
    }

    // Additional eligibility criteria checks
    for (const criteria of scheme.eligibilityCriteria) {
      if (!this.checkEligibilityCriteria(patientData, criteria)) {
        return false
      }
    }

    return true
  }

  /**
   * Check specific eligibility criteria
   */
  private checkEligibilityCriteria(patientData: any, criteria: string): boolean {
    // This is a simplified implementation
    // In a real system, this would be more sophisticated
    
    if (criteria.includes('SECC score')) {
      // Check SECC score logic
      return patientData.seccScore !== undefined && patientData.seccScore <= 7
    }
    
    if (criteria.includes('government employee')) {
      return !patientData.isGovernmentEmployee
    }
    
    if (criteria.includes('Aadhar number')) {
      return patientData.aadharNumber && patientData.aadharNumber.length === 12
    }
    
    // Default to true for other criteria
    return true
  }

  /**
   * Calculate patient age
   */
  private calculateAge(birthDate: string | Date): number {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  /**
   * Add new scheme dynamically
   */
  addScheme(scheme: GovernmentScheme): void {
    if (this.schemes.has(scheme.id)) {
      throw new Error(`Scheme with ID ${scheme.id} already exists`)
    }
    
    this.schemes.set(scheme.id, scheme)
  }

  /**
   * Update existing scheme
   */
  updateScheme(schemeId: string, updates: Partial<GovernmentScheme>): void {
    const existingScheme = this.schemes.get(schemeId)
    if (!existingScheme) {
      throw new Error(`Scheme with ID ${schemeId} not found`)
    }
    
    const updatedScheme = { ...existingScheme, ...updates }
    this.schemes.set(schemeId, updatedScheme)
  }

  /**
   * Deactivate scheme
   */
  deactivateScheme(schemeId: string): void {
    const scheme = this.schemes.get(schemeId)
    if (scheme) {
      scheme.isActive = false
      this.schemes.set(schemeId, scheme)
    }
  }

  /**
   * Get scheme statistics
   */
  getSchemeStatistics(): any {
    const totalSchemes = this.schemes.size
    const activeSchemes = Array.from(this.schemes.values()).filter(s => s.isActive).length
    const totalCoverage = Array.from(this.schemes.values()).reduce((sum, s) => sum + s.coverageAmount, 0)
    
    return {
      totalSchemes,
      activeSchemes,
      inactiveSchemes: totalSchemes - activeSchemes,
      totalCoverage,
      averageCoverage: totalCoverage / totalSchemes
    }
  }

  /**
   * Search schemes by criteria
   */
  searchSchemes(query: string, filters?: any): GovernmentScheme[] {
    let results = Array.from(this.schemes.values())
    
    // Text search
    if (query) {
      const searchTerm = query.toLowerCase()
      results = results.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm) ||
        scheme.description.toLowerCase().includes(searchTerm) ||
        scheme.code.toLowerCase().includes(searchTerm)
      )
    }
    
    // Apply filters
    if (filters) {
      if (filters.isActive !== undefined) {
        results = results.filter(scheme => scheme.isActive === filters.isActive)
      }
      
      if (filters.minCoverage) {
        results = results.filter(scheme => scheme.coverageAmount >= filters.minCoverage)
      }
      
      if (filters.maxCoverage) {
        results = results.filter(scheme => scheme.coverageAmount <= filters.maxCoverage)
      }
      
      if (filters.state) {
        results = results.filter(scheme => 
          scheme.locationRestrictions.length === 0 || 
          scheme.locationRestrictions.includes(filters.state)
        )
      }
    }
    
    return results
  }
}

// Export singleton instance
export const governmentSchemesManager = new GovernmentSchemesManager()
