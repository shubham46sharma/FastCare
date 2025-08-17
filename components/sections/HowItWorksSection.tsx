import React from 'react'
import { UserPlus, Shield, FileText, CheckCircle } from 'lucide-react'

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

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How FastCare Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with FastCare is simple. Follow these four easy steps to transform 
            your healthcare delivery.
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
    </section>
  )
}
