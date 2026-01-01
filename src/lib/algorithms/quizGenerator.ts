/**
 * B. Random Vocabulary Quiz Generator (10 Questions)
 * 
 * Logic:
 * - Filter by topic/level
 * - Shuffle word list
 * - Select 10 words as questions
 * - Each question: 1 correct + 3 distractors (other words)
 * - Shuffle options, save answerIndex
 * - (Optional) No duplicate questions & no duplicate answers
 */

import { QuizQuestion, VocabularyWord, Level } from '../types';

/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate a random vocabulary quiz
 * 
 * @param words - All available vocabulary words
 * @param options - Configuration options
 * @returns Array of quiz questions
 */
export function generateVocabularyQuiz(
  words: VocabularyWord[],
  options: {
    topic?: string;
    level?: Level;
    numberOfQuestions?: number;
    noDuplicateAnswers?: boolean;
  } = {}
): QuizQuestion[] {
  const {
    topic,
    level,
    numberOfQuestions = 10,
    noDuplicateAnswers = true,
  } = options;

  // 1. Filter by topic and level
  let filteredWords = [...words];
  
  if (topic) {
    filteredWords = filteredWords.filter(w => w.topic === topic);
  }
  
  if (level) {
    filteredWords = filteredWords.filter(w => w.level === level);
  }

  // Ensure we have enough words
  if (filteredWords.length < 4) {
    throw new Error('Not enough vocabulary words to generate quiz (minimum 4 required)');
  }

  // 2. Shuffle and select words for questions
  const shuffledWords = shuffleArray(filteredWords);
  const questionsCount = Math.min(numberOfQuestions, shuffledWords.length);
  const selectedWords = shuffledWords.slice(0, questionsCount);

  // Track used answers to prevent duplicates
  const usedAnswers = new Set<string>();
  const questions: QuizQuestion[] = [];

  // 3. Generate each question
  for (const word of selectedWords) {
    // Get potential distractors (excluding the current word)
    const potentialDistractors = filteredWords.filter(
      w => w.id !== word.id && (!noDuplicateAnswers || !usedAnswers.has(w.vietnamese))
    );

    // Ensure we have enough distractors
    if (potentialDistractors.length < 3) {
      // Fall back: use any word except current
      const fallbackDistractors = filteredWords.filter(w => w.id !== word.id);
      if (fallbackDistractors.length < 3) {
        continue; // Skip this question if not enough options
      }
      
      const selectedDistractors = shuffleArray(fallbackDistractors).slice(0, 3);
      const options = shuffleArray([
        word.vietnamese,
        ...selectedDistractors.map(d => d.vietnamese),
      ]);

      questions.push({
        id: `q_${word.id}_${Date.now()}_${Math.random()}`,
        question: `What is the meaning of "${word.word}"?`,
        options,
        answerIndex: options.indexOf(word.vietnamese),
        explanation: word.definition,
        topic: word.topic,
        level: word.level,
      });

      if (noDuplicateAnswers) {
        usedAnswers.add(word.vietnamese);
      }
      continue;
    }

    // Select 3 random distractors
    const selectedDistractors = shuffleArray(potentialDistractors).slice(0, 3);

    // 4. Combine correct answer + distractors
    const options = [
      word.vietnamese,
      ...selectedDistractors.map(d => d.vietnamese),
    ];

    // 5. Shuffle options
    const shuffledOptions = shuffleArray(options);

    // 6. Find correct answer index
    const answerIndex = shuffledOptions.indexOf(word.vietnamese);

    // 7. Create question object
    questions.push({
      id: `q_${word.id}_${Date.now()}_${Math.random()}`,
      question: `What is the meaning of "${word.word}"?`,
      options: shuffledOptions,
      answerIndex,
      explanation: word.definition,
      topic: word.topic,
      level: word.level,
    });

    // Track used answer
    if (noDuplicateAnswers) {
      usedAnswers.add(word.vietnamese);
    }
  }

  return questions;
}

/**
 * Generate a reverse quiz (Vietnamese → English)
 */
export function generateReverseVocabularyQuiz(
  words: VocabularyWord[],
  options: {
    topic?: string;
    level?: Level;
    numberOfQuestions?: number;
    noDuplicateAnswers?: boolean;
  } = {}
): QuizQuestion[] {
  const {
    topic,
    level,
    numberOfQuestions = 10,
    noDuplicateAnswers = true,
  } = options;

  let filteredWords = [...words];
  
  if (topic) {
    filteredWords = filteredWords.filter(w => w.topic === topic);
  }
  
  if (level) {
    filteredWords = filteredWords.filter(w => w.level === level);
  }

  if (filteredWords.length < 4) {
    throw new Error('Not enough vocabulary words to generate quiz');
  }

  const shuffledWords = shuffleArray(filteredWords);
  const questionsCount = Math.min(numberOfQuestions, shuffledWords.length);
  const selectedWords = shuffledWords.slice(0, questionsCount);
  const usedAnswers = new Set<string>();
  const questions: QuizQuestion[] = [];

  for (const word of selectedWords) {
    const potentialDistractors = filteredWords.filter(
      w => w.id !== word.id && (!noDuplicateAnswers || !usedAnswers.has(w.word))
    );

    if (potentialDistractors.length < 3) {
      const fallbackDistractors = filteredWords.filter(w => w.id !== word.id);
      if (fallbackDistractors.length < 3) continue;
      
      const selectedDistractors = shuffleArray(fallbackDistractors).slice(0, 3);
      const options = shuffleArray([
        word.word,
        ...selectedDistractors.map(d => d.word),
      ]);

      questions.push({
        id: `q_rev_${word.id}_${Date.now()}_${Math.random()}`,
        question: `Choose the English word for "${word.vietnamese}"`,
        options,
        answerIndex: options.indexOf(word.word),
        explanation: word.definition,
        topic: word.topic,
        level: word.level,
      });

      if (noDuplicateAnswers) {
        usedAnswers.add(word.word);
      }
      continue;
    }

    const selectedDistractors = shuffleArray(potentialDistractors).slice(0, 3);
    const options = shuffleArray([
      word.word,
      ...selectedDistractors.map(d => d.word),
    ]);
    const answerIndex = options.indexOf(word.word);

    questions.push({
      id: `q_rev_${word.id}_${Date.now()}_${Math.random()}`,
      question: `Choose the English word for "${word.vietnamese}"`,
      options,
      answerIndex,
      explanation: word.definition,
      topic: word.topic,
      level: word.level,
    });

    if (noDuplicateAnswers) {
      usedAnswers.add(word.word);
    }
  }

  return questions;
}

/**
 * Get random quiz questions from multiple topics
 */
export function generateMixedQuiz(
  words: VocabularyWord[],
  level: Level,
  numberOfQuestions: number = 10
): QuizQuestion[] {
  return generateVocabularyQuiz(words, {
    level,
    numberOfQuestions,
    noDuplicateAnswers: true,
  });
}
