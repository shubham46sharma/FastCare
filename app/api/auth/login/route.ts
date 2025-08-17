import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jose'

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validationResult = loginSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { email, password } = validationResult.data

    // In a real application, you would:
    // 1. Query your database for the user
    // 2. Verify the password hash
    // 3. Generate a JWT token
    // 4. Return user data and token

    // Mock user data for demonstration
    const mockUser = {
      id: 'user_123',
      email: 'demo@fastcare.com',
      name: 'Demo User',
      role: 'patient' as const,
      phone: '+91-9876543210',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Mock password verification (replace with actual bcrypt comparison)
    const isValidPassword = password === 'demo123' // In real app: await bcrypt.compare(password, hashedPassword)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret')
    const token = await new jwt.SignJWT({ userId: mockUser.id, role: mockUser.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
