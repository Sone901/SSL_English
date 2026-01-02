import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { saveListeningProgress } from '@/lib/kv'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { lessonId, score, total } = await request.json()
    
    if (!lessonId || score === undefined || total === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const success = await saveListeningProgress(userId, lessonId, score, total)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error saving listening progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
