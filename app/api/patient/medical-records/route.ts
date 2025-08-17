import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock data for demonstration
    // In a real application, you would query your database
    const medicalRecords = [
      {
        id: '1',
        title: 'Blood Test Results',
        type: 'test_result',
        description: 'Complete blood count and lipid profile results from recent health checkup.',
        date: '2024-01-10',
        tags: ['blood test', 'health checkup', 'lab results'],
        hasAttachments: true
      },
      {
        id: '2',
        title: 'Cardiology Consultation',
        type: 'consultation',
        description: 'Follow-up consultation with cardiologist regarding heart health and medication.',
        date: '2024-01-08',
        tags: ['cardiology', 'consultation', 'follow-up'],
        hasAttachments: false
      },
      {
        id: '3',
        title: 'Prescription - Diabetes Management',
        type: 'prescription',
        description: 'Updated prescription for diabetes medication and dietary recommendations.',
        date: '2024-01-05',
        tags: ['diabetes', 'medication', 'prescription'],
        hasAttachments: true
      }
    ]

    return NextResponse.json(medicalRecords)
  } catch (error) {
    console.error('Error fetching medical records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch medical records' },
      { status: 500 }
    )
  }
}
