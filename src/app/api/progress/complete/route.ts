import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { markLessonComplete } from '@/lib/progress'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { lessonId } = body

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 })
    }

    await markLessonComplete(userId, lessonId)
    
    return NextResponse.json({ ok: true, message: 'Lesson marked as complete' })
  } catch (error) {
    console.error('Error completing lesson:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
