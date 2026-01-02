// Vercel KV helper functions for user progress storage
import { kv } from '@vercel/kv'

export interface UserProgress {
  userId: string
  vocabulary: {
    [key: string]: { // level_topic format (e.g., "A1_animals")
      score: number
      total: number
      completedAt: string
      attempts: number
    }
  }
  listening: {
    [lessonId: string]: {
      score: number
      total: number
      completedAt: string
      attempts: number
    }
  }
  reading: {
    [lessonId: string]: {
      score: number
      total: number
      completedAt: string
      attempts: number
    }
  }
  speaking: {
    [itemId: string]: {
      completedAt: string
      attempts: number
    }
  }
  writing: {
    [itemId: string]: {
      completedAt: string
      attempts: number
      lastText: string
    }
  }
  test: {
    [testKey: string]: { // level_date format
      score: number
      total: number
      completedAt: string
    }
  }
}

// Get user progress
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  try {
    const progress = await kv.get<UserProgress>(`user:${userId}:progress`)
    return progress
  } catch (error) {
    console.error('Error getting user progress:', error)
    return null
  }
}

// Save user progress
export async function saveUserProgress(userId: string, progress: Partial<UserProgress>): Promise<boolean> {
  try {
    const existing = await getUserProgress(userId) || {
      userId,
      vocabulary: {},
      listening: {},
      reading: {},
      speaking: {},
      writing: {},
      test: {}
    }
    
    const updated = {
      ...existing,
      ...progress,
      vocabulary: { ...existing.vocabulary, ...progress.vocabulary },
      listening: { ...existing.listening, ...progress.listening },
      reading: { ...existing.reading, ...progress.reading },
      speaking: { ...existing.speaking, ...progress.speaking },
      writing: { ...existing.writing, ...progress.writing },
      test: { ...existing.test, ...progress.test },
    }
    
    await kv.set(`user:${userId}:progress`, updated)
    return true
  } catch (error) {
    console.error('Error saving user progress:', error)
    return false
  }
}

// Save vocabulary progress
export async function saveVocabularyProgress(
  userId: string,
  level: string,
  topic: string,
  score: number,
  total: number
): Promise<boolean> {
  try {
    const existing = await getUserProgress(userId)
    const key = `${level}_${topic}`
    
    const vocabularyProgress = {
      ...(existing?.vocabulary || {}),
      [key]: {
        score,
        total,
        completedAt: new Date().toISOString(),
        attempts: ((existing?.vocabulary?.[key]?.attempts || 0) + 1)
      }
    }
    
    return await saveUserProgress(userId, { vocabulary: vocabularyProgress })
  } catch (error) {
    console.error('Error saving vocabulary progress:', error)
    return false
  }
}

// Save listening progress
export async function saveListeningProgress(
  userId: string,
  lessonId: string,
  score: number,
  total: number
): Promise<boolean> {
  try {
    const existing = await getUserProgress(userId)
    
    const listeningProgress = {
      ...(existing?.listening || {}),
      [lessonId]: {
        score,
        total,
        completedAt: new Date().toISOString(),
        attempts: ((existing?.listening?.[lessonId]?.attempts || 0) + 1)
      }
    }
    
    return await saveUserProgress(userId, { listening: listeningProgress })
  } catch (error) {
    console.error('Error saving listening progress:', error)
    return false
  }
}

// Save test progress
export async function saveTestProgress(
  userId: string,
  level: string,
  score: number,
  total: number
): Promise<boolean> {
  try {
    const existing = await getUserProgress(userId)
    const key = `${level}_${new Date().toISOString().split('T')[0]}`
    
    const testProgress = {
      ...(existing?.test || {}),
      [key]: {
        score,
        total,
        completedAt: new Date().toISOString()
      }
    }
    
    return await saveUserProgress(userId, { test: testProgress })
  } catch (error) {
    console.error('Error saving test progress:', error)
    return false
  }
}
