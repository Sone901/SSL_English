import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progress = await kv.get(`user_progress:${userId}`)
    
    return NextResponse.json({ progress: progress || {} })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
