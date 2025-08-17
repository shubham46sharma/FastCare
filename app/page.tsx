import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { GovernmentSchemesSection } from '@/components/sections/GovernmentSchemesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>
      
      {/* Government Schemes Section */}
      <section id="government-schemes">
        <GovernmentSchemesSection />
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      
      {/* CTA Section */}
      <section id="cta">
        <CTASection />
      </section>
    </div>
  )
}
