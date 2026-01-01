/**
 * C. Spaced Repetition System (Simple Implementation)
 * 
 * Logic:
 * - Each word has: status + reviewCount + nextReviewDate
 * - Correct answer → increase interval (1d → 3d → 7d → 14d)
 * - Wrong answer → decrease interval (review sooner)
 * - Daily fetch words to review based on nextReviewDate
 */

import { VocabularyWord } from '../types';

// Review intervals in days
const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60, 120];

// Minimum interval (in days) when answer is wrong
const MIN_INTERVAL = 1;

/**
 * Calculate next review date based on current state and answer correctness
 */
export function calculateNextReview(
  word: VocabularyWord,
  isCorrect: boolean
): {
  nextReviewDate: Date;
  interval: number;
  reviewCount: number;
  status: VocabularyWord['status'];
  consecutiveCorrect: number;
} {
  const now = new Date();
  let newInterval: number;
  let newReviewCount = word.reviewCount + 1;
  let newConsecutiveCorrect = isCorrect ? word.consecutiveCorrect + 1 : 0;
  let newStatus = word.status;

  if (isCorrect) {
    // Increase interval
    const currentIntervalIndex = REVIEW_INTERVALS.indexOf(word.interval);
    
    if (currentIntervalIndex === -1) {
      // Not in standard intervals, use next standard interval
      newInterval = REVIEW_INTERVALS[0];
    } else if (currentIntervalIndex < REVIEW_INTERVALS.length - 1) {
      // Move to next interval
      newInterval = REVIEW_INTERVALS[currentIntervalIndex + 1];
    } else {
      // Already at max interval, double it (cap at 365 days)
      newInterval = Math.min(word.interval * 2, 365);
    }

    // Update status based on progress
    if (newConsecutiveCorrect >= 5) {
      newStatus = 'mastered';
    } else if (newReviewCount >= 3) {
      newStatus = 'reviewing';
    } else {
      newStatus = 'learning';
    }
  } else {
    // Wrong answer: reset interval to minimum
    newInterval = MIN_INTERVAL;
    newStatus = word.status === 'new' ? 'learning' : word.status;
    
    // If was mastered, downgrade to reviewing
    if (word.status === 'mastered') {
      newStatus = 'reviewing';
    }
  }

  // Calculate next review date
  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    nextReviewDate,
    interval: newInterval,
    reviewCount: newReviewCount,
    status: newStatus,
    consecutiveCorrect: newConsecutiveCorrect,
  };
}

/**
 * Update word after review
 */
export function updateWordAfterReview(
  word: VocabularyWord,
  isCorrect: boolean
): VocabularyWord {
  const updates = calculateNextReview(word, isCorrect);

  return {
    ...word,
    ...updates,
    lastReviewDate: new Date(),
  };
}

/**
 * Get words due for review today
 */
export function getWordsToReview(
  words: VocabularyWord[],
  date: Date = new Date()
): VocabularyWord[] {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);

  return words.filter(word => {
    const reviewDate = new Date(word.nextReviewDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate <= today;
  });
}

/**
 * Get new words (never reviewed)
 */
export function getNewWords(words: VocabularyWord[]): VocabularyWord[] {
  return words.filter(word => word.status === 'new');
}

/**
 * Get words currently being learned
 */
export function getLearningWords(words: VocabularyWord[]): VocabularyWord[] {
  return words.filter(word => word.status === 'learning');
}

/**
 * Get mastered words
 */
export function getMasteredWords(words: VocabularyWord[]): VocabularyWord[] {
  return words.filter(word => word.status === 'mastered');
}

/**
 * Initialize a new vocabulary word for spaced repetition
 */
export function initializeWord(
  word: Omit<VocabularyWord, 'status' | 'reviewCount' | 'nextReviewDate' | 'interval' | 'easeFactor' | 'consecutiveCorrect'>
): VocabularyWord {
  const now = new Date();
  
  return {
    ...word,
    status: 'new',
    reviewCount: 0,
    nextReviewDate: now, // Available for review immediately
    interval: 0,
    easeFactor: 2.5, // Default ease factor for SM-2 algorithm
    consecutiveCorrect: 0,
  };
}

/**
 * Get study statistics for a user
 */
export function getStudyStatistics(words: VocabularyWord[]): {
  total: number;
  new: number;
  learning: number;
  reviewing: number;
  mastered: number;
  dueToday: number;
} {
  const today = new Date();
  const dueWords = getWordsToReview(words, today);

  return {
    total: words.length,
    new: words.filter(w => w.status === 'new').length,
    learning: words.filter(w => w.status === 'learning').length,
    reviewing: words.filter(w => w.status === 'reviewing').length,
    mastered: words.filter(w => w.status === 'mastered').length,
    dueToday: dueWords.length,
  };
}

/**
 * Get recommended daily words to study (mix of new and review)
 */
export function getDailyStudyWords(
  words: VocabularyWord[],
  maxNew: number = 10,
  date: Date = new Date()
): VocabularyWord[] {
  const dueWords = getWordsToReview(words, date);
  const newWords = getNewWords(words);

  // Prioritize due words, then add new words
  const studyWords = [...dueWords];
  
  if (studyWords.length < maxNew) {
    const remainingSlots = maxNew - studyWords.length;
    studyWords.push(...newWords.slice(0, remainingSlots));
  }

  return studyWords;
}

/**
 * Calculate retention rate
 */
export function calculateRetentionRate(words: VocabularyWord[]): number {
  const reviewedWords = words.filter(w => w.reviewCount > 0);
  if (reviewedWords.length === 0) return 0;

  const masteredAndReviewing = words.filter(
    w => w.status === 'mastered' || w.status === 'reviewing'
  ).length;

  return (masteredAndReviewing / reviewedWords.length) * 100;
}

/**
 * Advanced: SM-2 Algorithm implementation (optional, more sophisticated)
 * 
 * The SM-2 algorithm uses an ease factor that adjusts based on performance
 */
export function calculateSM2NextReview(
  word: VocabularyWord,
  quality: number // 0-5, where 0 = complete blackout, 5 = perfect response
): {
  nextReviewDate: Date;
  interval: number;
  easeFactor: number;
  reviewCount: number;
} {
  let newEaseFactor = word.easeFactor;
  let newInterval: number;
  const newReviewCount = word.reviewCount + 1;

  // Update ease factor based on quality
  newEaseFactor = Math.max(
    1.3,
    newEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Calculate interval
  if (quality < 3) {
    // Failed recall, restart
    newInterval = 1;
  } else {
    if (newReviewCount === 1) {
      newInterval = 1;
    } else if (newReviewCount === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(word.interval * newEaseFactor);
    }
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    nextReviewDate,
    interval: newInterval,
    easeFactor: newEaseFactor,
    reviewCount: newReviewCount,
  };
}
