import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { kv } from '@vercel/kv'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { lessonId } = body

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 })
    }

    await kv.set(`lesson_complete:${userId}:${lessonId}`, true)
    
    return NextResponse.json({ ok: true, message: 'Lesson marked as complete' })
  } catch (error) {
    console.error('Error completing lesson:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
