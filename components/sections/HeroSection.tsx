import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  Heart, 
  Shield, 
  Users, 
  Building2, 
  Stethoscope,
  CheckCircle 
} from 'lucide-react'

export function HeroSection() {
  return (
    <section className="healthcare-hero text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-healthcare">
            Revolutionizing Healthcare in India
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Connect patients with verified hospitals and clinics supporting government schemes like Ayushman Bharat. 
            Streamlined healthcare delivery with AI-powered fraud detection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button size="xl" className="bg-white text-healthcare-700 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-healthcare-700">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold">500+</h3>
              <p className="text-sm text-blue-100">Hospitals</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold">50,000+</h3>
              <p className="text-sm text-blue-100">Patients</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold">15+</h3>
              <p className="text-sm text-blue-100">Govt Schemes</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold">99.9%</h3>
              <p className="text-sm text-blue-100">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
