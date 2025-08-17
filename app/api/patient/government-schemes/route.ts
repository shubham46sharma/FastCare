import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    // In a real application, you would query your database
    const governmentSchemes = [
      {
        id: '1',
        name: 'Ayushman Bharat (AB-PMJAY)',
        code: 'AB-PMJAY',
        coverageAmount: 500000,
        enrollmentDate: '2023-06-15',
        isActive: true,
        coverageUsed: 150000,
        remainingCoverage: 350000
      },
      {
        id: '2',
        name: 'Central Government Health Scheme (CGHS)',
        code: 'CGHS',
        coverageAmount: 1000000,
        enrollmentDate: '2023-03-20',
        isActive: true,
        coverageUsed: 75000,
        remainingCoverage: 925000
      }
    ]

    return NextResponse.json(governmentSchemes)
  } catch (error) {
    console.error('Error fetching government schemes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch government schemes' },
      { status: 500 }
    )
  }
}
