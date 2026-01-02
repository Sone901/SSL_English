import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

interface ListeningProgress {
  level: string
  lessonId: string
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
    const progress = await kv.get(`listening_progress:${userId}`)
    
    return NextResponse.json({ progress: progress || [] })
  } catch (error) {
    console.error('Error fetching listening progress:', error)
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
    const body: ListeningProgress[] = await request.json()

    await kv.set(`listening_progress:${userId}`, body)

    return NextResponse.json({ success: true, progress: body })
  } catch (error) {
    console.error('Error saving listening progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
