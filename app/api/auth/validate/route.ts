import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jose'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret')

    try {
      const { payload } = await jwt.jwtVerify(token, secret)
      
      // Mock user data for demonstration
      // In a real application, you would query your database
      const user = {
        id: payload.userId as string,
        email: 'demo@fastcare.com',
        name: 'Demo User',
        role: payload.role as string,
        phone: '+91-9876543210',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      return NextResponse.json(user)
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error validating token:', error)
    return NextResponse.json(
      { error: 'Failed to validate token' },
      { status: 500 }
    )
  }
}
