import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUserProgress } from '@/lib/progress'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progress = await getUserProgress(userId)
    
    return NextResponse.json({ 
      ok: true, 
      progress: progress || {
        userId,
        lessonsCompleted: [],
        testScores: {},
        lastActive: new Date().toISOString(),
        totalPoints: 0,
        streak: 0
      }
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
