import { Claim, AnomalyDetection, RiskFactor } from '@/types'

export interface AnomalyDetectionConfig {
  riskThresholds: {
    low: number
    medium: number
    high: number
    critical: number
  }
  weights: {
    amount: number
    frequency: number
    location: number
    timing: number
    provider: number
    patient: number
    procedure: number
  }
}

export class AnomalyDetectionEngine {
  private config: AnomalyDetectionConfig

  constructor(config?: Partial<AnomalyDetectionConfig>) {
    this.config = {
      riskThresholds: {
        low: 0.3,
        medium: 0.5,
        high: 0.7,
        critical: 0.9
      },
      weights: {
        amount: 0.25,
        frequency: 0.20,
        location: 0.15,
        timing: 0.15,
        provider: 0.15,
        patient: 0.05,
        procedure: 0.05
      },
      ...config
    }
  }

  /**
   * Analyze a claim for potential anomalies and fraud
   */
  async analyzeClaim(claim: Claim, historicalData: any): Promise<AnomalyDetection> {
    const riskFactors: RiskFactor[] = []
    let totalRiskScore = 0

    // 1. Amount Analysis
    const amountRisk = this.analyzeAmount(claim.amount, historicalData.amounts)
    if (amountRisk.score > 0) {
      riskFactors.push({
        factor: 'Unusual Claim Amount',
        weight: amountRisk.score,
        description: amountRisk.description,
        severity: this.getSeverity(amountRisk.score)
      })
      totalRiskScore += amountRisk.score * this.config.weights.amount
    }

    // 2. Frequency Analysis
    const frequencyRisk = this.analyzeFrequency(claim, historicalData.frequency)
    if (frequencyRisk.score > 0) {
      riskFactors.push({
        factor: 'Unusual Claim Frequency',
        weight: frequencyRisk.score,
        description: frequencyRisk.description,
        severity: this.getSeverity(frequencyRisk.score)
      })
      totalRiskScore += frequencyRisk.score * this.config.weights.frequency
    }

    // 3. Location Analysis
    const locationRisk = this.analyzeLocation(claim, historicalData.locations)
    if (locationRisk.score > 0) {
      riskFactors.push({
        factor: 'Geographic Anomaly',
        weight: locationRisk.score,
        description: locationRisk.description,
        severity: this.getSeverity(locationRisk.score)
      })
      totalRiskScore += locationRisk.score * this.config.weights.location
    }

    // 4. Timing Analysis
    const timingRisk = this.analyzeTiming(claim, historicalData.timing)
    if (timingRisk.score > 0) {
      riskFactors.push({
        factor: 'Temporal Anomaly',
        weight: timingRisk.score,
        description: timingRisk.description,
        severity: this.getSeverity(timingRisk.score)
      })
      totalRiskScore += timingRisk.score * this.config.weights.timing
    }

    // 5. Provider Analysis
    const providerRisk = this.analyzeProvider(claim, historicalData.providers)
    if (providerRisk.score > 0) {
      riskFactors.push({
        factor: 'Provider Risk',
        weight: providerRisk.score,
        description: providerRisk.description,
        severity: this.getSeverity(providerRisk.score)
      })
      totalRiskScore += providerRisk.score * this.config.weights.provider
    }

    // 6. Patient Analysis
    const patientRisk = this.analyzePatient(claim, historicalData.patients)
    if (patientRisk.score > 0) {
      riskFactors.push({
        factor: 'Patient Risk',
        weight: patientRisk.score,
        description: patientRisk.description,
        severity: this.getSeverity(patientRisk.score)
      })
      totalRiskScore += patientRisk.score * this.config.weights.patient
    }

    // 7. Procedure Analysis
    const procedureRisk = this.analyzeProcedure(claim, historicalData.procedures)
    if (procedureRisk.score > 0) {
      riskFactors.push({
        factor: 'Procedure Anomaly',
        weight: procedureRisk.score,
        description: procedureRisk.description,
        severity: this.getSeverity(procedureRisk.score)
      })
      totalRiskScore += procedureRisk.score * this.config.weights.procedure
    }

    // Normalize risk score to 0-1 range
    const normalizedRiskScore = Math.min(totalRiskScore, 1)
    const confidence = this.calculateConfidence(riskFactors, normalizedRiskScore)

    return {
      id: `anomaly_${claim.id}`,
      claimId: claim.id,
      riskScore: normalizedRiskScore,
      riskFactors,
      confidence,
      isFlagged: normalizedRiskScore > this.config.riskThresholds.medium,
      aiModel: 'FastCare-Anomaly-Detection-v1.0',
      createdAt: new Date()
    }
  }

  /**
   * Analyze claim amount for anomalies
   */
  private analyzeAmount(amount: number, historicalAmounts: number[]): { score: number; description: string } {
    if (historicalAmounts.length === 0) return { score: 0, description: '' }

    const mean = historicalAmounts.reduce((a, b) => a + b, 0) / historicalAmounts.length
    const stdDev = Math.sqrt(
      historicalAmounts.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / historicalAmounts.length
    )
    
    const zScore = Math.abs((amount - mean) / stdDev)
    
    if (zScore > 3) {
      return {
        score: 0.9,
        description: `Claim amount (₹${amount}) is ${zScore.toFixed(1)} standard deviations above mean (₹${mean.toFixed(0)})`
      }
    } else if (zScore > 2) {
      return {
        score: 0.6,
        description: `Claim amount (₹${amount}) is ${zScore.toFixed(1)} standard deviations above mean (₹${mean.toFixed(0)})`
      }
    } else if (zScore > 1.5) {
      return {
        score: 0.3,
        description: `Claim amount (₹${amount}) is ${zScore.toFixed(1)} standard deviations above mean (₹${mean.toFixed(0)})`
      }
    }

    return { score: 0, description: '' }
  }

  /**
   * Analyze claim frequency for anomalies
   */
  private analyzeFrequency(claim: Claim, historicalFrequency: any): { score: number; description: string } {
    const patientClaims = historicalFrequency[claim.patientId] || []
    const recentClaims = patientClaims.filter((c: any) => {
      const claimDate = new Date(c.createdAt)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return claimDate > thirtyDaysAgo
    })

    if (recentClaims.length > 5) {
      return {
        score: 0.8,
        description: `Patient has ${recentClaims.length} claims in the last 30 days`
      }
    } else if (recentClaims.length > 3) {
      return {
        score: 0.5,
        description: `Patient has ${recentClaims.length} claims in the last 30 days`
      }
    }

    return { score: 0, description: '' }
  }

  /**
   * Analyze location patterns for anomalies
   */
  private analyzeLocation(claim: Claim, historicalLocations: any): { score: number; description: string } {
    // This would analyze geographic patterns, distance from patient's usual location, etc.
    // For now, returning a basic implementation
    return { score: 0, description: '' }
  }

  /**
   * Analyze timing patterns for anomalies
   */
  private analyzeTiming(claim: Claim, historicalTiming: any): { score: number; description: string } {
    // This would analyze temporal patterns, unusual hours, etc.
    // For now, returning a basic implementation
    return { score: 0, description: '' }
  }

  /**
   * Analyze provider patterns for anomalies
   */
  private analyzeProvider(claim: Claim, historicalProviders: any): { score: number; description: string } {
    // This would analyze provider risk scores, history, etc.
    // For now, returning a basic implementation
    return { score: 0, description: '' }
  }

  /**
   * Analyze patient patterns for anomalies
   */
  private analyzePatient(claim: Claim, historicalPatients: any): { score: number; description: string } {
    // This would analyze patient risk scores, history, etc.
    // For now, returning a basic implementation
    return { score: 0, description: '' }
  }

  /**
   * Analyze procedure patterns for anomalies
   */
  private analyzeProcedure(claim: Claim, historicalProcedures: any): { score: number; description: string } {
    // This would analyze procedure patterns, cost variations, etc.
    // For now, returning a basic implementation
    return { score: 0, description: '' }
  }

  /**
   * Get severity level based on risk score
   */
  private getSeverity(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= this.config.riskThresholds.critical) return 'critical'
    if (score >= this.config.riskThresholds.high) return 'high'
    if (score >= this.config.riskThresholds.medium) return 'medium'
    return 'low'
  }

  /**
   * Calculate confidence score based on risk factors and data quality
   */
  private calculateConfidence(riskFactors: RiskFactor[], riskScore: number): number {
    if (riskFactors.length === 0) return 0.9 // High confidence when no risks detected
    
    const factorConfidence = riskFactors.reduce((acc, factor) => acc + factor.weight, 0) / riskFactors.length
    const dataQualityConfidence = 0.8 // This could be based on data completeness, recency, etc.
    
    return Math.min((factorConfidence + dataQualityConfidence) / 2, 1)
  }

  /**
   * Get risk level description
   */
  getRiskLevel(riskScore: number): string {
    if (riskScore >= this.config.riskThresholds.critical) return 'Critical Risk'
    if (riskScore >= this.config.riskThresholds.high) return 'High Risk'
    if (riskScore >= this.config.riskThresholds.medium) return 'Medium Risk'
    if (riskScore >= this.config.riskThresholds.low) return 'Low Risk'
    return 'No Risk'
  }

  /**
   * Get recommended actions based on risk level
   */
  getRecommendedActions(riskScore: number): string[] {
    if (riskScore >= this.config.riskThresholds.critical) {
      return [
        'Immediate manual review required',
        'Hold payment processing',
        'Contact patient and provider for verification',
        'Escalate to fraud investigation team'
      ]
    } else if (riskScore >= this.config.riskThresholds.high) {
      return [
        'Manual review recommended',
        'Request additional documentation',
        'Verify with provider',
        'Monitor closely for future claims'
      ]
    } else if (riskScore >= this.config.riskThresholds.medium) {
      return [
        'Enhanced review recommended',
        'Verify claim details',
        'Monitor for patterns'
      ]
    } else if (riskScore >= this.config.riskThresholds.low) {
      return [
        'Standard processing',
        'Routine monitoring'
      ]
    }
    
    return ['Standard processing']
  }
}

// Export singleton instance
export const anomalyDetectionEngine = new AnomalyDetectionEngine()
