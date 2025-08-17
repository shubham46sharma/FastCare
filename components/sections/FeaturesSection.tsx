import React from 'react'
import { 
  Shield, 
  Users, 
  FileText, 
  Building2, 
  Brain, 
  Globe,
  Clock,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'AI-Powered Fraud Detection',
    description: 'Advanced machine learning algorithms detect suspicious claims and prevent healthcare fraud in real-time.'
  },
  {
    icon: Users,
    title: 'Patient Network Management',
    description: 'Connect with patients across your network and share medical records securely for better care coordination.'
  },
  {
    icon: FileText,
    title: 'Automated Claims Processing',
    description: 'Submit claims to government schemes automatically with built-in validation and error checking.'
  },
  {
    icon: Building2,
    title: 'Government Scheme Integration',
    description: 'Support for Ayushman Bharat, CGHS, ESIC, and other government healthcare schemes.'
  },
  {
    icon: Brain,
    title: 'Smart Analytics',
    description: 'Comprehensive insights into patient care, claims processing, and operational efficiency.'
  },
  {
    icon: Globe,
    title: 'Multi-Location Support',
    description: 'Manage multiple hospital locations and clinics from a single unified platform.'
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'Instant notifications for claim status, appointments, and important healthcare updates.'
  },
  {
    icon: CheckCircle,
    title: 'Compliance & Security',
    description: 'HIPAA-compliant platform with enterprise-grade security and data protection.'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose FastCare?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with healthcare expertise to deliver 
            the most comprehensive healthcare management solution for India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-healthcare-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-healthcare-200 transition-colors duration-200">
                <feature.icon className="w-8 h-8 text-healthcare-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
