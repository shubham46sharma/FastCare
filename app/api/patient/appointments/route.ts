import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    // In a real application, you would query your database
    const appointments = [
      {
        id: '1',
        date: '2024-01-15',
        time: '10:00 AM',
        hospitalName: 'City General Hospital',
        doctorName: 'Dr. Priya Sharma',
        type: 'consultation',
        status: 'confirmed'
      },
      {
        id: '2',
        date: '2024-01-20',
        time: '2:30 PM',
        hospitalName: 'Community Health Clinic',
        doctorName: 'Dr. Amit Patel',
        type: 'follow_up',
        status: 'pending'
      },
      {
        id: '3',
        date: '2024-01-25',
        time: '11:00 AM',
        hospitalName: 'Metro Medical Center',
        doctorName: 'Dr. Rajesh Kumar',
        type: 'routine_checkup',
        status: 'confirmed'
      }
    ]

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}
