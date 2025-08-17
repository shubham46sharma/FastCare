import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    // In a real application, you would query your database
    const stats = {
      totalAppointments: 12,
      upcomingAppointments: 3,
      completedAppointments: 9,
      totalClaims: 8,
      pendingClaims: 2,
      approvedClaims: 6
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
