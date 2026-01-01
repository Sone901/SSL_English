/**
 * D. Grading / Scoring System
 * 
 * Logic:
 * - Multiple choice: compare answerIndex
 * - Fill-in-blank: compare strings (lowercase, trim), optional 1-2 char errors
 * - Speaking: speech-to-text → compare with sample (% match)
 */

import { QuizQuestion, GradingResult } from '../types';

/**
 * Grade a multiple choice question
 */
export function gradeMultipleChoice(
  question: QuizQuestion,
  userAnswerIndex: number
): GradingResult {
  const isCorrect = userAnswerIndex === question.answerIndex;
  
  return {
    questionId: question.id,
    isCorrect,
    userAnswer: question.options[userAnswerIndex] || '',
    correctAnswer: question.options[question.answerIndex],
    score: isCorrect ? 1 : 0,
    feedback: isCorrect 
      ? 'Correct!' 
      : `Incorrect. The correct answer is: ${question.options[question.answerIndex]}`,
  };
}

/**
 * Calculate Levenshtein distance between two strings
 * (number of edits needed to transform one string into another)
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,     // deletion
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }

  return matrix[len1][len2];
}

/**
 * Grade a fill-in-the-blank question
 */
export function gradeFillInBlank(
  correctAnswer: string,
  userAnswer: string,
  options: {
    caseSensitive?: boolean;
    allowTypos?: boolean;
    maxTypoDistance?: number;
  } = {}
): GradingResult {
  const {
    caseSensitive = false,
    allowTypos = true,
    maxTypoDistance = 2,
  } = options;

  // Normalize strings
  let normalizedCorrect = correctAnswer.trim();
  let normalizedUser = userAnswer.trim();

  if (!caseSensitive) {
    normalizedCorrect = normalizedCorrect.toLowerCase();
    normalizedUser = normalizedUser.toLowerCase();
  }

  // Exact match
  if (normalizedCorrect === normalizedUser) {
    return {
      questionId: '',
      isCorrect: true,
      userAnswer,
      correctAnswer,
      score: 1,
      feedback: 'Perfect!',
    };
  }

  // Check for typos if allowed
  if (allowTypos) {
    const distance = levenshteinDistance(normalizedCorrect, normalizedUser);
    
    if (distance <= maxTypoDistance) {
      // Accept with minor typos
      const penaltyPercentage = distance * 0.1; // 10% penalty per typo
      const score = Math.max(0.5, 1 - penaltyPercentage);
      
      return {
        questionId: '',
        isCorrect: true,
        userAnswer,
        correctAnswer,
        score,
        feedback: `Almost correct! Small typo detected. Score: ${Math.round(score * 100)}%`,
      };
    }
  }

  // Incorrect
  return {
    questionId: '',
    isCorrect: false,
    userAnswer,
    correctAnswer,
    score: 0,
    feedback: `Incorrect. The correct answer is: ${correctAnswer}`,
  };
}

/**
 * Calculate similarity percentage between two strings
 */
export function calculateStringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 100;
  
  const distance = levenshteinDistance(longer, shorter);
  return ((longer.length - distance) / longer.length) * 100;
}

/**
 * Grade speaking exercise (speech-to-text comparison)
 */
export function gradeSpeaking(
  targetSentence: string,
  transcribedSentence: string,
  options: {
    minSimilarity?: number; // Minimum % to pass
    strictMode?: boolean;
  } = {}
): GradingResult {
  const {
    minSimilarity = 70,
    strictMode = false,
  } = options;

  // Normalize both sentences
  const normalizedTarget = targetSentence.toLowerCase().trim();
  const normalizedTranscribed = transcribedSentence.toLowerCase().trim();

  // Calculate similarity
  const similarity = calculateStringSimilarity(normalizedTarget, normalizedTranscribed);
  
  // Determine if correct
  const isCorrect = similarity >= minSimilarity;
  
  // Calculate score (0-1)
  const score = strictMode 
    ? (isCorrect ? 1 : 0) 
    : similarity / 100;

  // Generate feedback
  let feedback = '';
  if (similarity >= 95) {
    feedback = 'Excellent pronunciation!';
  } else if (similarity >= 85) {
    feedback = 'Very good! Minor differences detected.';
  } else if (similarity >= 70) {
    feedback = 'Good effort! Keep practicing.';
  } else if (similarity >= 50) {
    feedback = 'Needs improvement. Try again.';
  } else {
    feedback = 'Please try to match the target sentence more closely.';
  }

  return {
    questionId: '',
    isCorrect,
    userAnswer: transcribedSentence,
    correctAnswer: targetSentence,
    score,
    feedback: `${feedback} (Similarity: ${Math.round(similarity)}%)`,
  };
}

/**
 * Calculate word match percentage (for speaking exercises)
 */
export function calculateWordMatchPercentage(
  targetSentence: string,
  transcribedSentence: string
): number {
  const targetWords = targetSentence.toLowerCase().trim().split(/\s+/);
  const transcribedWords = transcribedSentence.toLowerCase().trim().split(/\s+/);

  let matches = 0;
  const maxLength = Math.max(targetWords.length, transcribedWords.length);

  for (let i = 0; i < Math.min(targetWords.length, transcribedWords.length); i++) {
    if (targetWords[i] === transcribedWords[i]) {
      matches++;
    }
  }

  return maxLength > 0 ? (matches / maxLength) * 100 : 0;
}

/**
 * Grade an entire quiz
 */
export function gradeQuiz(
  questions: QuizQuestion[],
  userAnswers: number[]
): {
  results: GradingResult[];
  totalScore: number;
  percentage: number;
  passed: boolean;
} {
  if (questions.length !== userAnswers.length) {
    throw new Error('Number of questions and answers must match');
  }

  const results: GradingResult[] = [];
  let totalScore = 0;

  for (let i = 0; i < questions.length; i++) {
    const result = gradeMultipleChoice(questions[i], userAnswers[i]);
    results.push(result);
    totalScore += result.score;
  }

  const percentage = (totalScore / questions.length) * 100;
  const passed = percentage >= 70; // 70% passing grade

  return {
    results,
    totalScore,
    percentage,
    passed,
  };
}

/**
 * Grade reading comprehension (with multiple questions)
 */
export function gradeReadingComprehension(
  questions: Array<{
    question: string;
    correctAnswer: string;
    userAnswer: string;
    type: 'multiple-choice' | 'fill-in-blank' | 'true-false';
  }>
): {
  results: GradingResult[];
  totalScore: number;
  percentage: number;
} {
  const results: GradingResult[] = [];
  let totalScore = 0;

  for (const q of questions) {
    let result: GradingResult;

    if (q.type === 'fill-in-blank') {
      result = gradeFillInBlank(q.correctAnswer, q.userAnswer);
    } else {
      // For multiple choice and true/false
      const isCorrect = q.correctAnswer.toLowerCase().trim() === 
                        q.userAnswer.toLowerCase().trim();
      result = {
        questionId: '',
        isCorrect,
        userAnswer: q.userAnswer,
        correctAnswer: q.correctAnswer,
        score: isCorrect ? 1 : 0,
        feedback: isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${q.correctAnswer}`,
      };
    }

    results.push(result);
    totalScore += result.score;
  }

  const percentage = (totalScore / questions.length) * 100;

  return {
    results,
    totalScore,
    percentage,
  };
}

/**
 * Provide detailed feedback based on performance
 */
export function generateDetailedFeedback(
  percentage: number,
  incorrectAreas: string[]
): string {
  let feedback = '';

  if (percentage >= 90) {
    feedback = 'Outstanding performance! You have excellent mastery of this topic.';
  } else if (percentage >= 80) {
    feedback = 'Great job! You have a strong understanding of the material.';
  } else if (percentage >= 70) {
    feedback = 'Good work! You passed, but there is room for improvement.';
  } else if (percentage >= 60) {
    feedback = 'You need more practice. Review the material and try again.';
  } else {
    feedback = 'More study is needed. Focus on the basics and practice regularly.';
  }

  if (incorrectAreas.length > 0) {
    feedback += `\n\nAreas to focus on: ${incorrectAreas.join(', ')}`;
  }

  return feedback;
}
