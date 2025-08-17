import React from 'react'
import { UserPlus, Shield, FileText, CheckCircle, Search, Calendar, FileText as FileTextIcon, Heart } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Join the Network',
    description: 'Hospitals and clinics register with FastCare to become part of our healthcare network.',
    step: '01'
  },
  {
    icon: Shield,
    title: 'Verify & Onboard',
    description: 'We verify your credentials and onboard you to support government healthcare schemes.',
    step: '02'
  },
  {
    icon: FileText,
    title: 'Start Managing',
    description: 'Begin managing patients, appointments, and claims through our intuitive platform.',
    step: '03'
  },
  {
    icon: CheckCircle,
    title: 'Scale & Grow',
    description: 'Expand your reach and improve patient care with our comprehensive tools.',
    step: '04'
  }
]

const patientSteps = [
  {
    icon: Search,
    title: 'Find Healthcare',
    description: 'Search for verified hospitals and clinics in your area that support government schemes.',
    step: '01'
  },
  {
    icon: Calendar,
    title: 'Book Appointments',
    description: 'Schedule appointments with healthcare providers through our easy-to-use platform.',
    step: '02'
  },
  {
    icon: FileTextIcon,
    title: 'Access Benefits',
    description: 'Utilize government scheme benefits and track your healthcare coverage in real-time.',
    step: '03'
  },
  {
    icon: Heart,
    title: 'Receive Care',
    description: 'Get quality healthcare with transparent pricing and secure medical record management.',
    step: '04'
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How FastCare Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FastCare simplifies healthcare for both providers and patients. Discover how our platform 
            transforms healthcare delivery through streamlined processes and innovative technology.
          </p>
        </div>

        {/* Hospital Journey */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              For Hospitals & Clinics
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your healthcare operations and join our network of verified providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-healthcare-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="bg-healthcare-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="w-10 h-10 text-healthcare-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Connection Lines */}
          <div className="hidden lg:block mt-16">
            <div className="flex justify-center">
              {steps.slice(0, -1).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 h-0.5 bg-gray-300"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full mx-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Journey */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              For Patients
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access quality healthcare and government scheme benefits with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {patientSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="w-10 h-10 text-blue-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Connection Lines */}
          <div className="hidden lg:block mt-16">
            <div className="flex justify-center">
              {patientSteps.slice(0, -1).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 h-0.5 bg-blue-300"></div>
                  <div className="w-3 h-3 bg-blue-300 rounded-full mx-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
