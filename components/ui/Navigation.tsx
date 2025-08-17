'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Government Schemes', id: 'government-schemes' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Get Started', id: 'cta' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Right Side */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/logos/fastcare.png"
                alt="FastCare Logo"
                width={40}
                height={40}
                className="w-10 h-10 lg:w-12 lg:h-12"
              />
              <span className={`font-bold text-xl lg:text-2xl transition-colors duration-300 ${
                isScrolled ? 'text-healthcare-600' : 'text-white'
              }`}>
                FastCare
              </span>
            </Link>
          </div>

          {/* Navigation Links - Left Side */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium transition-colors duration-300 hover:text-healthcare-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/auth/login">
              <button className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-healthcare-600' 
                  : 'text-white hover:text-healthcare-200'
              }`}>
                Login
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-4 py-2 bg-healthcare-600 text-white rounded-lg font-medium hover:bg-healthcare-700 transition-colors duration-300">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-gray-700 font-medium hover:text-healthcare-600 transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link href="/auth/login">
                  <button className="block w-full text-left text-gray-700 font-medium hover:text-healthcare-600 transition-colors duration-300">
                    Login
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="block w-full text-left px-4 py-2 bg-healthcare-600 text-white rounded-lg font-medium hover:bg-healthcare-700 transition-colors duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
