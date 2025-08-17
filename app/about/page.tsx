import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  Shield, 
  Users, 
  FileText, 
  Building2, 
  Brain, 
  Globe,
  Clock,
  CheckCircle,
  Heart,
  Award,
  Zap,
  Target
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 healthcare-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About FastCare
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing healthcare delivery in India through innovative technology, 
            government scheme integration, and AI-powered solutions that connect patients 
            with quality healthcare providers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="xl" className="bg-white text-healthcare-700 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-healthcare-700">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                FastCare is dedicated to making quality healthcare accessible to every Indian citizen 
                by bridging the gap between patients and healthcare providers through innovative 
                technology and government scheme integration.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  The Healthcare Challenge in India
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  India faces significant healthcare challenges including limited access to quality care, 
                  fragmented healthcare systems, and complex government scheme processes. Many citizens 
                  struggle to navigate the healthcare landscape and access the benefits they're entitled to.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  FastCare addresses these challenges by creating a unified platform that simplifies 
                  healthcare access, streamlines government scheme utilization, and ensures transparency 
                  in healthcare delivery.
                </p>
              </div>
              <div className="bg-healthcare-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-healthcare-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">500+</h4>
                    <p className="text-sm text-gray-600">Hospitals</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-healthcare-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">50,000+</h4>
                    <p className="text-sm text-gray-600">Patients</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-healthcare-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">15+</h4>
                    <p className="text-sm text-gray-600">Govt Schemes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-healthcare-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">99.9%</h4>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Key Features & Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FastCare combines cutting-edge technology with healthcare expertise to deliver 
              the most comprehensive healthcare management solution for India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-healthcare-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Fraud Detection</h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms detect suspicious claims and prevent 
                healthcare fraud in real-time, ensuring scheme integrity.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-healthcare-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Network Management</h3>
              <p className="text-gray-600">
                Connect with patients across your network and share medical records securely 
                for better care coordination.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-healthcare-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Claims Processing</h3>
              <p className="text-gray-600">
                Submit claims to government schemes automatically with built-in validation 
                and error checking for faster reimbursements.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-healthcare-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Government Scheme Integration</h3>
              <p className="text-gray-600">
                Support for Ayushman Bharat, CGHS, ESIC, and other government healthcare 
                schemes with seamless integration.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-healthcare-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Location Support</h3>
              <p className="text-gray-600">
                Manage multiple hospital locations and clinics from a single unified platform 
                with centralized control.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-healthcare-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-healthcare-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Instant notifications for claim status, appointments, and important healthcare 
                updates to keep everyone informed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Benefits for Healthcare Stakeholders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FastCare delivers value to all participants in the healthcare ecosystem, 
              from providers to patients and government agencies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-healthcare-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Hospitals & Clinics</h3>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Streamlined patient management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Faster claim processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reduced administrative overhead</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Access to government schemes</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-healthcare-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Patients</h3>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Easy access to healthcare</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Government scheme benefits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Secure medical records</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-healthcare-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-healthcare-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Government</h3>
              <ul className="text-gray-600 space-y-3 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fraud prevention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Transparent reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Efficient scheme delivery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-healthcare-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Data-driven insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 healthcare-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join thousands of healthcare providers and patients who are already 
            experiencing the benefits of FastCare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="xl" className="bg-white text-healthcare-700 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-healthcare-700">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
