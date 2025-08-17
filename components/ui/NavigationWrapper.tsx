'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

const NavigationWrapper = () => {
  const pathname = usePathname()
  
  // Only show navigation on the homepage
  if (pathname !== '/') {
    return null
  }
  
  return <Navigation />
}

export default NavigationWrapper
