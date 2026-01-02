import { kv } from '@vercel/kv'

export interface UserProgress {
  userId: string
  lessonsCompleted: string[]
  testScores: Record<string, number>
  lastActive: string
  totalPoints: number
  streak: number
}

export interface VocabularyProgress {
  level: string
  topic: string
  score: number
  total: number
  completedAt: string
}

export interface ListeningProgress {
  level: string
  lessonId: string
  score: number
  total: number
  completedAt: string
}

export interface ReadingProgress {
  level: string
  lessonId: string
  score: number
  total: number
  completedAt: string
}

export interface TestProgress {
  level: string
  score: number
  total: number
  completedAt: string
}

export interface UserStats {
  vocabularyCompleted: number
  listeningCompleted: number
  readingCompleted: number
  testCompleted: number
  totalVocabularyWords: number
  totalListeningScore: number
  totalReadingScore: number
}

/**
 * Save vocabulary progress to Vercel KV
 */
export async function saveVocabularyProgress(progress: VocabularyProgress[]): Promise<boolean> {
  try {
    const response = await fetch('/api/user/vocabulary-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress)
    })
    return response.ok
  } catch (error) {
    console.error('Error saving vocabulary progress:', error)
    return false
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

// Save lesson completion
export async function markLessonComplete(userId: string, lessonId: string): Promise<void> {
  try {
    const progress = await getUserProgress(userId) || {
      userId,
      lessonsCompleted: [],
      testScores: {},
      lastActive: new Date().toISOString(),
      totalPoints: 0,
      streak: 0
    }

    if (!progress.lessonsCompleted.includes(lessonId)) {
      progress.lessonsCompleted.push(lessonId)
      progress.totalPoints += 10
      progress.lastActive = new Date().toISOString()
      
      await kv.set(`user:${userId}:progress`, progress)
    }
  } catch (error) {
    console.error('Error marking lesson complete:', error)
  }
}

// Save test score
export async function saveTestScore(userId: string, level: string, score: number): Promise<void> {
  try {
    const progress = await getUserProgress(userId) || {
      userId,
      lessonsCompleted: [],
      testScores: {},
      lastActive: new Date().toISOString(),
      totalPoints: 0,
      streak: 0
    }

    progress.testScores[level] = score
    progress.totalPoints += score > 80 ? 50 : 20
    progress.lastActive = new Date().toISOString()
    
    await kv.set(`user:${userId}:progress`, progress)
  } catch (error) {
    console.error('Error saving test score:', error)
  }
}

// Calculate level progress
export function calculateLevelProgress(lessonsCompleted: string[], level: string): number {
  const levelLessons = lessonsCompleted.filter(id => id.startsWith(level))
  const totalLessonsPerLevel = 20 // Estimated
  return Math.min(100, Math.round((levelLessons.length / totalLessonsPerLevel) * 100))
}
/**
 * Fetch all user progress and calculate statistics
 */
export async function fetchUserStats(): Promise<UserStats> {
  try {
    const [vocabRes, listeningRes, readingRes, testRes] = await Promise.all([
      fetch('/api/user/vocabulary-progress'),
      fetch('/api/user/listening-progress'),
      fetch('/api/user/reading-progress'),
      fetch('/api/user/test-progress')
    ])

    const vocabData = await vocabRes.json()
    const listeningData = await listeningRes.json()
    const readingData = await readingRes.json()
    const testData = await testRes.json()

    const vocabularyProgress: VocabularyProgress[] = Array.isArray(vocabData.progress) ? vocabData.progress : []
    const listeningProgress: ListeningProgress[] = Array.isArray(listeningData.progress) ? listeningData.progress : []
    const readingProgress: ReadingProgress[] = Array.isArray(readingData.progress) ? readingData.progress : []
    const testProgress: TestProgress[] = Array.isArray(testData.progress) ? testData.progress : []

    // Calculate statistics
    let totalVocabularyWords = 0
    let totalListeningScore = 0
    let totalReadingScore = 0

    vocabularyProgress.forEach(p => {
      totalVocabularyWords += p.score
    })

    listeningProgress.forEach(p => {
      totalListeningScore += p.score
    })

    readingProgress.forEach(p => {
      totalReadingScore += p.score
    })

    return {
      vocabularyCompleted: vocabularyProgress.length,
      listeningCompleted: listeningProgress.length,
      readingCompleted: readingProgress.length,
      testCompleted: testProgress.length,
      totalVocabularyWords,
      totalListeningScore,
      totalReadingScore
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return {
      vocabularyCompleted: 0,
      listeningCompleted: 0,
      readingCompleted: 0,
      testCompleted: 0,
      totalVocabularyWords: 0,
      totalListeningScore: 0,
      totalReadingScore: 0
    }
  }
}