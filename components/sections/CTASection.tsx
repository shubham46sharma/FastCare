import React from 'react'
import { ArrowRight, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 healthcare-hero text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Healthcare?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Join the healthcare revolution and make quality healthcare accessible to every Indian citizen. 
          Start your journey with FastCare today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/signup">
            <Button size="xl" className="bg-white text-healthcare-700 hover:bg-gray-100">
              <Users className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-healthcare-700">
              <Shield className="w-5 h-5 mr-2" />
              Request Demo
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Compliant</h3>
            <p className="text-blue-100 text-sm">
              HIPAA-compliant platform with enterprise-grade security
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-blue-100 text-sm">
              Round-the-clock customer support and technical assistance
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Migration</h3>
            <p className="text-blue-100 text-sm">
              Seamless data migration from existing systems
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
