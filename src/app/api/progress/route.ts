import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const progress = await kv.get(`user:${userId}:progress`)
    
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

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { action, data } = body

    // Get current progress
    let progress: any = await kv.get(`user:${userId}:progress`) || {
      userId,
      lessonsCompleted: [],
      testScores: {},
      lastActive: new Date().toISOString(),
      totalPoints: 0,
      streak: 0
    }

    // Handle different actions
    if (action === 'complete-lesson') {
      const lesson = data.lesson
      if (!progress.lessonsCompleted.includes(lesson)) {
        progress.lessonsCompleted.push(lesson)
        progress.totalPoints += data.points || 10
        progress.lastActive = new Date().toISOString()
      }
    } else if (action === 'test-score') {
      progress.testScores[data.testId] = {
        score: data.score,
        completedAt: new Date().toISOString()
      }
      progress.totalPoints += data.score
      progress.lastActive = new Date().toISOString()
    } else if (action === 'update-streak') {
      progress.streak = data.streak
      progress.lastActive = new Date().toISOString()
    }

    // Save progress
    await kv.set(`user:${userId}:progress`, progress)

    return NextResponse.json({ 
      ok: true, 
      progress
    })
  } catch (error) {
    console.error('Error updating progress:', error)
  }
}
