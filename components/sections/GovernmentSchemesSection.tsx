import React from 'react'
import { Shield, CheckCircle, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const schemes = [
  {
    name: 'Ayushman Bharat (AB-PMJAY)',
    code: 'AB-PMJAY',
    coverage: '₹5 Lakhs',
    description: 'Provides health coverage for secondary and tertiary care hospitalization',
    features: ['SECC score 0-7', 'Rural & urban deprived', 'No government employees', 'Family coverage']
  },
  {
    name: 'Central Government Health Scheme (CGHS)',
    code: 'CGHS',
    coverage: '₹10 Lakhs',
    description: 'Comprehensive healthcare for Central Government employees and pensioners',
    features: ['OPD consultations', 'Indoor treatment', 'Specialist consultations', 'Maternity care']
  },
  {
    name: 'Employees\' State Insurance (ESIC)',
    code: 'ESIC',
    coverage: '₹3 Lakhs',
    description: 'Social security and health insurance for Indian workers',
    features: ['Medical care', 'Sickness benefit', 'Maternity benefit', 'Disability benefit']
  },
  {
    name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    code: 'PMJDY',
    coverage: '₹30,000',
    description: 'Financial inclusion with basic health insurance coverage',
    features: ['Accident insurance', 'Life insurance', 'Basic health coverage', 'Bank account required']
  }
]

export function GovernmentSchemesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-healthcare-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Government Schemes
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FastCare supports all major government healthcare schemes, making quality healthcare 
            accessible to every Indian citizen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {schemes.map((scheme, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {scheme.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-healthcare-100 text-healthcare-800 text-xs font-medium px-2 py-1 rounded">
                      {scheme.code}
                    </span>
                    <span className="bg-success-100 text-success-800 text-xs font-medium px-2 py-1 rounded">
                      {scheme.coverage}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {scheme.description}
              </p>
              
              <div className="space-y-2">
                {scheme.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm border p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of healthcare providers and patients who trust FastCare for their 
              healthcare management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  For Hospitals
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg">
                  <Shield className="w-5 h-5 mr-2" />
                  For Patients
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
