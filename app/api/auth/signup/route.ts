import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jose'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password, role } = body

    // Validate required fields
    if (!name || !email || !phone || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save user to database
    // 4. Generate JWT token

    // Mock password hashing
    const hashedPassword = await bcrypt.hash(password, 10)

    // Mock user creation
    const user = {
      id: `user_${Date.now()}`,
      email,
      name,
      role,
      phone,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Generate JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret')
    const token = await new jwt.SignJWT({ 
      userId: user.id, 
      role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: {
        user,
        token
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
