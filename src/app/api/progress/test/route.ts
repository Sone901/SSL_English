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
    const { level, score } = body

    if (!level || score === undefined) {
      return NextResponse.json({ error: 'Level and score required' }, { status: 400 })
    }

    await kv.set(`test_progress:${userId}`, { level, score })
    
    return NextResponse.json({ ok: true, message: 'Test score saved' })
  } catch (error) {
    console.error('Error saving test score:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
