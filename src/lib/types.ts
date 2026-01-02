// Core Types for English Learning System

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type SkillType = 'reading' | 'writing' | 'listening' | 'speaking' | 'vocabulary' | 'grammar';

// User Test Score
export interface TestScore {
  userId: string;
  testDate: Date;
  reading: number;
  writing: number;
  listening: number;
  speaking: number;
  vocabulary: number;
  grammar: number;
  totalScore: number;
  level: Level;
}

// Skill History
export interface SkillHistory {
  userId: string;
  skillType: SkillType;
  lessonId: string;
  completedAt: Date;
  score: number;
  timeSpent: number; // in seconds
  mistakes: number;
}

// Lesson Recommendation
export interface LessonRecommendation {
  lessonId: string;
  title: string;
  skillType: SkillType;
  level: Level;
  priority: 'weak' | 'learn' | 'review';
  reason: string;
  estimatedTime: number; // in minutes
}

// Quiz Question
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  topic?: string;
  level: Level;
}

// Vocabulary Word with Spaced Repetition
export interface VocabularyWord {
  id: string;
  word: string;
  phonetic?: string;
  partOfSpeech?: string;
  vietnamese: string;
  definition: string;
  example: string;
  viExample?: string;
  topic: string;
  level: Level;
  
  // Spaced Repetition Fields
  status: 'new' | 'learning' | 'reviewing' | 'mastered';
  reviewCount: number;
  nextReviewDate: Date;
  interval: number; // in days
  easeFactor: number; // for SM-2 algorithm (optional)
  lastReviewDate?: Date;
  consecutiveCorrect: number;
}

// User Progress
export interface UserProgress {
  userId: string;
  level: Level;
  weakestSkill: SkillType;
  totalLessonsCompleted: number;
  totalTimeSpent: number;
  vocabularyMastered: number;
  currentStreak: number;
  lastActiveDate: Date;
}

// Grading Result
export interface GradingResult {
  questionId: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  score: number;
  feedback?: string;
}

// Writing Check Result
export interface WritingCheckResult {
  success: boolean;
  score: number;
  totalWords: number;
  errorCount: number;
  grammarErrors: number;
  spellingErrors: number;
  styleErrors: number;
  feedbackLevel: 'excellent' | 'good' | 'fair' | 'needs-improvement';
  feedbackMessage: string;
  matches: LanguageToolMatch[];
  language?: any;
}

// LanguageTool Match (Error)
export interface LanguageToolMatch {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements: Array<{ value: string }>;
  context: {
    text: string;
    offset: number;
    length: number;
  };
  rule: {
    id: string;
    description: string;
    issueType?: string;
    category: {
      id: string;
      name: string;
    };
  };
}
