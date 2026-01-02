import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

interface AttemptRecord {
  type: 'vocabulary' | 'reading' | 'listening' | 'test'
  level?: string
  topic?: string
  score: number
  total: number
  completedAt: string
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const attempts = await kv.get(`user:${userId}:attempts`)
    
    return NextResponse.json({ 
      attempts: attempts || [],
      totalAttempts: Array.isArray(attempts) ? attempts.length : 0
    })
  } catch (error) {
    console.error('Error fetching attempts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const attempt: AttemptRecord = await request.json()

    // Get existing attempts
    const existingAttempts = await kv.get(`user:${userId}:attempts`) || []
    const updatedAttempts = Array.isArray(existingAttempts) 
      ? [...existingAttempts, attempt] 
      : [attempt]

    // Save to Vercel KV
    await kv.set(`user:${userId}:attempts`, updatedAttempts)

    // Update general activity count
    const activity: any = await kv.get(`user:${userId}:activity`) || {
      totalAttempts: 0,
      vocabularyAttempts: 0,
      readingAttempts: 0,
      listeningAttempts: 0,
      testAttempts: 0,
      lastActivityAt: new Date().toISOString()
    }

    activity.totalAttempts += 1
    activity[`${attempt.type}Attempts`] = (activity[`${attempt.type}Attempts`] || 0) + 1
    activity.lastActivityAt = new Date().toISOString()

    await kv.set(`user:${userId}:activity`, activity)

    return NextResponse.json({ 
      success: true, 
      attempt,
      activity,
      message: 'Attempt recorded successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error recording attempt:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
