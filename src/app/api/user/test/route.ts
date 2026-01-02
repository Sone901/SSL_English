import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { level, score, total } = await request.json()
    
    if (!level || score === undefined || total === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    await kv.set(`test_progress:${userId}`, { level, score, total })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving test progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
