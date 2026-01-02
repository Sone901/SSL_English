import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUserProgress } from '@/lib/kv'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progress = await getUserProgress(userId)
    
    return NextResponse.json({ progress: progress || {} })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
