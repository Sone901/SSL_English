/**
 * Simple Test Suite for Core Algorithms
 * Run with: node --loader ts-node/esm test.ts
 * Or: npx ts-node test.ts
 */

import { strict as assert } from 'assert';
import {
  // A. Lesson Selection
  determineLevel,
  findWeakestSkill,
  generateLessonRecommendations,
  
  // B. Quiz Generator
  generateVocabularyQuiz,
  shuffleArray,
  
  // C. Spaced Repetition
  initializeWord,
  updateWordAfterReview,
  getWordsToReview,
  getStudyStatistics,
  
  // D. Grading
  gradeMultipleChoice,
  gradeFillInBlank,
  gradeSpeaking,
  levenshteinDistance,
} from './index';

import type { TestScore, VocabularyWord, QuizQuestion } from './index';

// Test counters
let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.error(`❌ ${name}`);
    console.error(`   ${error}`);
    failed++;
  }
}

console.log('╔════════════════════════════════════════╗');
console.log('║     ALGORITHM TEST SUITE              ║');
console.log('╚════════════════════════════════════════╝\n');

// ============================================
// A. LESSON SELECTION TESTS
// ============================================
console.log('📚 A. Lesson Selection Tests\n');

test('determineLevel should return correct level for score', () => {
  assert.equal(determineLevel(30), 'A1');
  assert.equal(determineLevel(50), 'A2');
  assert.equal(determineLevel(70), 'B1');
  assert.equal(determineLevel(80), 'B2');
  assert.equal(determineLevel(95), 'C1');
});

test('findWeakestSkill should return skill with lowest score', () => {
  const testScore: TestScore = {
    userId: 'test',
    testDate: new Date(),
    reading: 80,
    writing: 60,
    listening: 75,
    speaking: 55, // lowest
    vocabulary: 70,
    grammar: 65,
    totalScore: 67,
    level: 'B1',
  };
  
  assert.equal(findWeakestSkill(testScore), 'speaking');
});

test('generateLessonRecommendations should prioritize weak skills', () => {
  const testScore: TestScore = {
    userId: 'test',
    testDate: new Date(),
    reading: 70,
    writing: 50, // weakest
    listening: 70,
    speaking: 70,
    vocabulary: 70,
    grammar: 70,
    totalScore: 67,
    level: 'B1',
  };
  
  const recommendations = generateLessonRecommendations(
    testScore,
    [],
    [
      {
        lessonId: 'write1',
        title: 'Writing Lesson',
        skillType: 'writing',
        level: 'B1',
        estimatedTime: 30,
      },
      {
        lessonId: 'read1',
        title: 'Reading Lesson',
        skillType: 'reading',
        level: 'B1',
        estimatedTime: 30,
      },
    ],
    10
  );
  
  assert.ok(recommendations.length > 0);
  assert.equal(recommendations[0].priority, 'weak');
  assert.equal(recommendations[0].skillType, 'writing');
});

// ============================================
// B. QUIZ GENERATOR TESTS
// ============================================
console.log('\n📝 B. Quiz Generator Tests\n');

const testWords: VocabularyWord[] = [
  {
    id: '1',
    word: 'hello',
    vietnamese: 'xin chào',
    definition: 'greeting',
    example: 'Hello!',
    topic: 'greetings',
    level: 'A1',
    status: 'new',
    reviewCount: 0,
    nextReviewDate: new Date(),
    interval: 0,
    easeFactor: 2.5,
    consecutiveCorrect: 0,
  },
  {
    id: '2',
    word: 'goodbye',
    vietnamese: 'tạm biệt',
    definition: 'farewell',
    example: 'Goodbye!',
    topic: 'greetings',
    level: 'A1',
    status: 'new',
    reviewCount: 0,
    nextReviewDate: new Date(),
    interval: 0,
    easeFactor: 2.5,
    consecutiveCorrect: 0,
  },
  {
    id: '3',
    word: 'thank',
    vietnamese: 'cảm ơn',
    definition: 'gratitude',
    example: 'Thank you',
    topic: 'greetings',
    level: 'A1',
    status: 'new',
    reviewCount: 0,
    nextReviewDate: new Date(),
    interval: 0,
    easeFactor: 2.5,
    consecutiveCorrect: 0,
  },
  {
    id: '4',
    word: 'please',
    vietnamese: 'làm ơn',
    definition: 'polite request',
    example: 'Please',
    topic: 'greetings',
    level: 'A1',
    status: 'new',
    reviewCount: 0,
    nextReviewDate: new Date(),
    interval: 0,
    easeFactor: 2.5,
    consecutiveCorrect: 0,
  },
];

test('shuffleArray should randomize array', () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(arr);
  
  assert.equal(shuffled.length, arr.length);
  assert.ok(shuffled.every(item => arr.includes(item)));
  // Original unchanged
  assert.deepEqual(arr, [1, 2, 3, 4, 5]);
});

test('generateVocabularyQuiz should create quiz with correct structure', () => {
  const quiz = generateVocabularyQuiz(testWords, {
    level: 'A1',
    numberOfQuestions: 3,
  });
  
  assert.ok(quiz.length > 0);
  quiz.forEach(q => {
    assert.ok(q.id);
    assert.ok(q.question);
    assert.equal(q.options.length, 4);
    assert.ok(q.answerIndex >= 0 && q.answerIndex < 4);
    assert.equal(q.level, 'A1');
  });
});

test('generateVocabularyQuiz should not have duplicate answers when enabled', () => {
  const quiz = generateVocabularyQuiz(testWords, {
    numberOfQuestions: 3,
    noDuplicateAnswers: true,
  });
  
  const allAnswers = quiz.map(q => q.options[q.answerIndex]);
  const uniqueAnswers = new Set(allAnswers);
  assert.equal(allAnswers.length, uniqueAnswers.size);
});

// ============================================
// C. SPACED REPETITION TESTS
// ============================================
console.log('\n🔁 C. Spaced Repetition Tests\n');

test('initializeWord should create word with default SRS values', () => {
  const word = initializeWord({
    id: 'test',
    word: 'test',
    vietnamese: 'test',
    definition: 'test',
    example: 'test',
    topic: 'test',
    level: 'A1',
  });
  
  assert.equal(word.status, 'new');
  assert.equal(word.reviewCount, 0);
  assert.equal(word.interval, 0);
  assert.equal(word.consecutiveCorrect, 0);
});

test('updateWordAfterReview should increase interval on correct answer', () => {
  let word = initializeWord({
    id: 'test',
    word: 'test',
    vietnamese: 'test',
    definition: 'test',
    example: 'test',
    topic: 'test',
    level: 'A1',
  });
  
  word = updateWordAfterReview(word, true); // correct
  assert.equal(word.reviewCount, 1);
  assert.ok(word.interval > 0);
  assert.equal(word.consecutiveCorrect, 1);
});

test('updateWordAfterReview should reset interval on wrong answer', () => {
  let word = initializeWord({
    id: 'test',
    word: 'test',
    vietnamese: 'test',
    definition: 'test',
    example: 'test',
    topic: 'test',
    level: 'A1',
  });
  
  // First correct
  word = updateWordAfterReview(word, true);
  const oldInterval = word.interval;
  
  // Then wrong
  word = updateWordAfterReview(word, false);
  assert.equal(word.interval, 1); // reset to 1 day
  assert.equal(word.consecutiveCorrect, 0); // reset
});

test('getWordsToReview should return words due today', () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const words = [
    { ...testWords[0], nextReviewDate: today },
    { ...testWords[1], nextReviewDate: tomorrow },
  ];
  
  const due = getWordsToReview(words, today);
  assert.equal(due.length, 1);
});

test('getStudyStatistics should return correct stats', () => {
  const words = [
    { ...testWords[0], status: 'new' as const },
    { ...testWords[1], status: 'learning' as const },
    { ...testWords[2], status: 'mastered' as const },
  ];
  
  const stats = getStudyStatistics(words);
  assert.equal(stats.total, 3);
  assert.equal(stats.new, 1);
  assert.equal(stats.learning, 1);
  assert.equal(stats.mastered, 1);
});

// ============================================
// D. GRADING TESTS
// ============================================
console.log('\n✏️ D. Grading Tests\n');

test('gradeMultipleChoice should grade correctly', () => {
  const question: QuizQuestion = {
    id: 'q1',
    question: 'Test?',
    options: ['A', 'B', 'C', 'D'],
    answerIndex: 2,
    level: 'A1',
  };
  
  const correctResult = gradeMultipleChoice(question, 2);
  assert.equal(correctResult.isCorrect, true);
  assert.equal(correctResult.score, 1);
  
  const wrongResult = gradeMultipleChoice(question, 0);
  assert.equal(wrongResult.isCorrect, false);
  assert.equal(wrongResult.score, 0);
});

test('levenshteinDistance should calculate edit distance', () => {
  assert.equal(levenshteinDistance('hello', 'hello'), 0);
  assert.equal(levenshteinDistance('hello', 'helo'), 1);
  assert.equal(levenshteinDistance('hello', 'world'), 4);
});

test('gradeFillInBlank should accept exact match', () => {
  const result = gradeFillInBlank('environment', 'environment');
  assert.equal(result.isCorrect, true);
  assert.equal(result.score, 1);
});

test('gradeFillInBlank should accept typos within tolerance', () => {
  const result = gradeFillInBlank('environment', 'enviroment', {
    allowTypos: true,
    maxTypoDistance: 2,
  });
  assert.equal(result.isCorrect, true);
  assert.ok(result.score > 0.5); // Partial credit
});

test('gradeFillInBlank should reject typos exceeding tolerance', () => {
  const result = gradeFillInBlank('environment', 'envirnmnt', {
    allowTypos: true,
    maxTypoDistance: 2,
  });
  assert.equal(result.isCorrect, false);
});

test('gradeSpeaking should calculate similarity correctly', () => {
  const result = gradeSpeaking(
    'Hello, how are you?',
    'Hello, how are you?',
    { minSimilarity: 70 }
  );
  assert.equal(result.isCorrect, true);
  assert.ok(result.score >= 0.95);
});

test('gradeSpeaking should fail on low similarity', () => {
  const result = gradeSpeaking(
    'Hello, how are you?',
    'Goodbye',
    { minSimilarity: 70 }
  );
  assert.equal(result.isCorrect, false);
});

// ============================================
// RESULTS
// ============================================
console.log('\n╔════════════════════════════════════════╗');
console.log('║          TEST RESULTS                  ║');
console.log('╚════════════════════════════════════════╝');
console.log(`\n✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total:  ${passed + failed}\n`);

if (failed === 0) {
  console.log('🎉 All tests passed!\n');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed.\n');
  process.exit(1);
}
