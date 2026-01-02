import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

interface TopicProgress {
  level: string
  topic: string
  score: number
  total: number
  completedAt: string
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progress = await kv.get(`vocabulary_progress:${userId}`)
    
    return NextResponse.json({ progress: progress || [] })
  } catch (error) {
    console.error('Error fetching vocabulary progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: TopicProgress[] = await request.json()

    await kv.set(`vocabulary_progress:${userId}`, body)

    return NextResponse.json({ success: true, progress: body })
  } catch (error) {
    console.error('Error saving vocabulary progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
