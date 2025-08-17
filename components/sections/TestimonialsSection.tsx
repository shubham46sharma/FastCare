import React from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Chief Medical Officer',
    hospital: 'City General Hospital, Mumbai',
    content: 'FastCare has revolutionized how we manage our healthcare operations. The AI-powered fraud detection has saved us countless hours and improved our claim processing efficiency.',
    rating: 5
  },
  {
    name: 'Rajesh Kumar',
    role: 'Patient',
    location: 'Delhi',
    content: 'Thanks to FastCare, I can easily find hospitals that support Ayushman Bharat in my area. The platform is user-friendly and has made healthcare access much simpler.',
    rating: 5
  },
  {
    name: 'Dr. Amit Patel',
    role: 'Medical Director',
    hospital: 'Community Health Clinic, Bangalore',
    content: 'The government scheme integration is seamless. We can now process claims for multiple schemes from a single platform, which has significantly improved our patient care.',
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of healthcare providers and patients who trust FastCare for their 
            healthcare management needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6 relative">
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 bg-healthcare-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <Quote className="w-4 h-4" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.role}
                  {testimonial.hospital && (
                    <span>, {testimonial.hospital}</span>
                  )}
                  {testimonial.location && (
                    <span>, {testimonial.location}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-healthcare-600 mb-2">500+</div>
              <div className="text-gray-600">Hospitals & Clinics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-healthcare-600 mb-2">50,000+</div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-healthcare-600 mb-2">15+</div>
              <div className="text-gray-600">Government Schemes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-healthcare-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
