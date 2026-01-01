/**
 * Main export file for all algorithm modules
 */

// Types
export * from '../types';

// Lesson Selection Algorithm (A)
export {
  determineLevel,
  findWeakestSkill,
  calculateSkillProficiency,
  needsReview,
  generateLessonRecommendations,
  getNextLesson,
} from './lessonSelector';

// Quiz Generator Algorithm (B)
export {
  shuffleArray,
  generateVocabularyQuiz,
  generateReverseVocabularyQuiz,
  generateMixedQuiz,
} from './quizGenerator';

// Spaced Repetition Algorithm (C)
export {
  calculateNextReview,
  updateWordAfterReview,
  getWordsToReview,
  getNewWords,
  getLearningWords,
  getMasteredWords,
  initializeWord,
  getStudyStatistics,
  getDailyStudyWords,
  calculateRetentionRate,
  calculateSM2NextReview,
} from './spacedRepetition';

// Grading System (D)
export {
  gradeMultipleChoice,
  gradeFillInBlank,
  gradeSpeaking,
  gradeQuiz,
  gradeReadingComprehension,
  levenshteinDistance,
  calculateStringSimilarity,
  calculateWordMatchPercentage,
  generateDetailedFeedback,
} from './grading';
