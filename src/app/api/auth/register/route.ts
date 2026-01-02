import { kv } from "@vercel/kv"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username và password là bắt buộc' },
        { status: 400 }
      )
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username phải có ít nhất 3 ký tự' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password phải có ít nhất 6 ký tự' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await kv.get(`user:${username}:credentials`)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username đã tồn tại' },
        { status: 409 }
      )
    }

    // Store user credentials in Vercel KV
    // In production, password should be hashed with bcrypt
    await kv.set(`user:${username}:credentials`, {
      username,
      password, // TODO: Hash this in production
      provider: 'credentials',
      createdAt: new Date().toISOString(),
    })

    // Also store user profile
    await kv.set(`user:${username}:profile`, {
      id: username,
      email: `${username}@ssl-english.local`,
      name: username,
      image: null,
      provider: 'credentials',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: 'Đăng ký thành công' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Lỗi đăng ký. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}
