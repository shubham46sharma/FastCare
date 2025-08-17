'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Mail, Phone, User, Building2, MessageSquare, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    questions: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.questions) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      // In a real application, you would send this to your backend
      // For now, we'll simulate the email sending
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Organization: ${formData.organization || 'Not provided'}
Role: ${formData.role || 'Not provided'}
Preferred Contact: ${formData.preferredContact}

Questions/Requirements:
${formData.questions}
      `.trim()

      // Create mailto link (this will open the user's email client)
      const mailtoLink = `mailto:Shubham46sharma@gmail.com?subject=FastCare Demo Request from ${formData.name}&body=${encodeURIComponent(emailBody)}`
      
      // Open email client
      window.open(mailtoLink)
      
      toast.success('Demo request submitted successfully! We\'ll contact you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        questions: '',
        preferredContact: 'email'
      })
      
    } catch (error) {
      console.error('Demo request error:', error)
      toast.error('Failed to submit demo request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 healthcare-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Request a Demo
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            See FastCare in action and discover how our platform can transform 
            your healthcare delivery. Schedule a personalized demo today.
          </p>
        </div>
      </section>

      {/* Demo Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get Your Personalized Demo
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours 
                  to schedule a personalized demo of the FastCare platform.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization/Hospital
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your organization name"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select your role</option>
                      <option value="Hospital Administrator">Hospital Administrator</option>
                      <option value="IT Manager">IT Manager</option>
                      <option value="Healthcare Provider">Healthcare Provider</option>
                      <option value="Patient">Patient</option>
                      <option value="Government Official">Government Official</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Questions */}
                  <div>
                    <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-2">
                      Questions or Requirements *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <textarea
                        id="questions"
                        name="questions"
                        required
                        rows={4}
                        value={formData.questions}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tell us about your healthcare needs, questions, or what you'd like to see in the demo..."
                      />
                    </div>
                  </div>

                  {/* Preferred Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleInputChange}
                          className="mr-2 text-healthcare-600 focus:ring-healthcare-500"
                        />
                        <span className="text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleInputChange}
                          className="mr-2 text-healthcare-600 focus:ring-healthcare-500"
                        />
                        <span className="text-gray-700">Phone</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full py-3 bg-healthcare-600 hover:bg-healthcare-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Request Demo
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Info Sidebar */}
              <div className="space-y-8">
                <div className="bg-healthcare-50 rounded-xl p-6 border border-healthcare-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    What to Expect
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-healthcare-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Personalized 30-minute demo session</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-healthcare-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Live platform walkthrough</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-healthcare-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Q&A session with our experts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-healthcare-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Customized use case scenarios</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Demo Highlights
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Government scheme integration</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>AI-powered fraud detection</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Patient management workflows</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Claims processing automation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-healthcare-600" />
                      <span>Shubham46sharma@gmail.com</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Our team typically responds within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
