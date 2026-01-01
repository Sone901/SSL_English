/**
 * USAGE EXAMPLES
 * 
 * This file demonstrates how to use all 4 core algorithms
 */

import {
  // Types
  TestScore,
  SkillHistory,
  VocabularyWord,
  QuizQuestion,
  Level,
  
  // A. Lesson Selection
  generateLessonRecommendations,
  determineLevel,
  findWeakestSkill,
  
  // B. Quiz Generator
  generateVocabularyQuiz,
  generateReverseVocabularyQuiz,
  
  // C. Spaced Repetition
  initializeWord,
  updateWordAfterReview,
  getWordsToReview,
  getDailyStudyWords,
  getStudyStatistics,
  
  // D. Grading
  gradeMultipleChoice,
  gradeFillInBlank,
  gradeSpeaking,
  gradeQuiz,
} from './index';

// ============================================
// A. LESSON SELECTION EXAMPLE
// ============================================

export function exampleLessonSelection() {
  // User's test score
  const testScore: TestScore = {
    userId: 'user123',
    testDate: new Date(),
    reading: 65,
    writing: 55,
    listening: 70,
    speaking: 60,
    vocabulary: 58,
    grammar: 62,
    totalScore: 62,
    level: 'B1',
  };

  // User's learning history
  const history: SkillHistory[] = [
    {
      userId: 'user123',
      skillType: 'reading',
      lessonId: 'lesson_read_01',
      completedAt: new Date('2025-12-20'),
      score: 80,
      timeSpent: 1200,
      mistakes: 2,
    },
    {
      userId: 'user123',
      skillType: 'vocabulary',
      lessonId: 'lesson_vocab_01',
      completedAt: new Date('2025-12-25'),
      score: 75,
      timeSpent: 900,
      mistakes: 3,
    },
  ];

  // Available lessons
  const availableLessons = [
    {
      lessonId: 'lesson_write_01',
      title: 'Writing Basics: Paragraph Structure',
      skillType: 'writing' as const,
      level: 'B1' as Level,
      estimatedTime: 30,
    },
    {
      lessonId: 'lesson_vocab_02',
      title: 'Vocabulary: Travel Words',
      skillType: 'vocabulary' as const,
      level: 'B1' as Level,
      estimatedTime: 20,
    },
    {
      lessonId: 'lesson_speak_01',
      title: 'Speaking Practice: Introductions',
      skillType: 'speaking' as const,
      level: 'B1' as Level,
      estimatedTime: 25,
    },
  ];

  // Generate recommendations
  const recommendations = generateLessonRecommendations(
    testScore,
    history,
    availableLessons,
    10
  );

  console.log('=== LESSON RECOMMENDATIONS ===');
  console.log('User Level:', determineLevel(testScore.totalScore));
  console.log('Weakest Skill:', findWeakestSkill(testScore));
  console.log('\nRecommended Lessons:');
  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}`);
    console.log(`   Reason: ${rec.reason}`);
    console.log(`   Time: ${rec.estimatedTime} min\n`);
  });

  return recommendations;
}

// ============================================
// B. QUIZ GENERATOR EXAMPLE
// ============================================

export function exampleQuizGenerator() {
  // Sample vocabulary words
  const vocabularyWords: VocabularyWord[] = [
    {
      id: 'word_001',
      word: 'hello',
      vietnamese: 'xin chào',
      definition: 'A greeting',
      example: 'Hello, how are you?',
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
      id: 'word_002',
      word: 'thank',
      vietnamese: 'cảm ơn',
      definition: 'To express gratitude',
      example: 'Thank you very much',
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
      id: 'word_003',
      word: 'goodbye',
      vietnamese: 'tạm biệt',
      definition: 'A farewell expression',
      example: 'Goodbye, see you later',
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
      id: 'word_004',
      word: 'please',
      vietnamese: 'làm ơn',
      definition: 'Polite request word',
      example: 'Please help me',
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

  // Generate English → Vietnamese quiz
  const quiz1 = generateVocabularyQuiz(vocabularyWords, {
    level: 'A1',
    topic: 'greetings',
    numberOfQuestions: 3,
    noDuplicateAnswers: true,
  });

  console.log('\n=== VOCABULARY QUIZ (EN → VI) ===');
  quiz1.forEach((q, index) => {
    console.log(`\nQuestion ${index + 1}: ${q.question}`);
    q.options.forEach((opt, i) => {
      console.log(`  ${i + 1}. ${opt} ${i === q.answerIndex ? '✓' : ''}`);
    });
  });

  // Generate Vietnamese → English quiz
  const quiz2 = generateReverseVocabularyQuiz(vocabularyWords, {
    level: 'A1',
    numberOfQuestions: 2,
  });

  console.log('\n=== REVERSE QUIZ (VI → EN) ===');
  quiz2.forEach((q, index) => {
    console.log(`\nQuestion ${index + 1}: ${q.question}`);
    q.options.forEach((opt, i) => {
      console.log(`  ${i + 1}. ${opt} ${i === q.answerIndex ? '✓' : ''}`);
    });
  });

  return { quiz1, quiz2 };
}

// ============================================
// C. SPACED REPETITION EXAMPLE
// ============================================

export function exampleSpacedRepetition() {
  // Initialize a new word
  let word = initializeWord({
    id: 'word_100',
    word: 'environment',
    vietnamese: 'môi trường',
    definition: 'Natural surroundings',
    example: 'Protect the environment',
    topic: 'nature',
    level: 'B1',
  });

  console.log('\n=== SPACED REPETITION DEMO ===');
  console.log('Initial word status:', word.status);
  console.log('Next review:', word.nextReviewDate.toDateString());

  // Simulate study sessions
  console.log('\n--- Session 1: Correct Answer ---');
  word = updateWordAfterReview(word, true);
  console.log('Status:', word.status);
  console.log('Review count:', word.reviewCount);
  console.log('Interval:', word.interval, 'days');
  console.log('Next review:', word.nextReviewDate.toDateString());

  console.log('\n--- Session 2: Correct Answer ---');
  word = updateWordAfterReview(word, true);
  console.log('Status:', word.status);
  console.log('Interval:', word.interval, 'days');
  console.log('Consecutive correct:', word.consecutiveCorrect);

  console.log('\n--- Session 3: Wrong Answer ---');
  word = updateWordAfterReview(word, false);
  console.log('Status:', word.status);
  console.log('Interval reset to:', word.interval, 'day(s)');
  console.log('Consecutive correct reset to:', word.consecutiveCorrect);

  // Get words to review today
  const allWords = [word];
  const todayWords = getWordsToReview(allWords);
  const dailyWords = getDailyStudyWords(allWords, 10);
  const stats = getStudyStatistics(allWords);

  console.log('\n--- Study Statistics ---');
  console.log('Total words:', stats.total);
  console.log('New:', stats.new);
  console.log('Learning:', stats.learning);
  console.log('Due today:', stats.dueToday);

  return { word, stats };
}

// ============================================
// D. GRADING SYSTEM EXAMPLE
// ============================================

export function exampleGrading() {
  console.log('\n=== GRADING EXAMPLES ===');

  // 1. Multiple Choice Grading
  const mcQuestion: QuizQuestion = {
    id: 'q1',
    question: 'What does "hello" mean?',
    options: ['xin chào', 'tạm biệt', 'cảm ơn', 'làm ơn'],
    answerIndex: 0,
    level: 'A1',
  };

  const mcResult = gradeMultipleChoice(mcQuestion, 0);
  console.log('\n--- Multiple Choice ---');
  console.log('Question:', mcQuestion.question);
  console.log('User answer:', mcResult.userAnswer);
  console.log('Correct:', mcResult.isCorrect);
  console.log('Feedback:', mcResult.feedback);

  // 2. Fill-in-Blank Grading
  const fillResult1 = gradeFillInBlank('environment', 'environment');
  console.log('\n--- Fill-in-Blank (Exact Match) ---');
  console.log('Correct:', fillResult1.isCorrect);
  console.log('Score:', fillResult1.score);
  console.log('Feedback:', fillResult1.feedback);

  const fillResult2 = gradeFillInBlank('environment', 'enviroment', {
    allowTypos: true,
    maxTypoDistance: 2,
  });
  console.log('\n--- Fill-in-Blank (With Typo) ---');
  console.log('Correct:', fillResult2.isCorrect);
  console.log('Score:', fillResult2.score);
  console.log('Feedback:', fillResult2.feedback);

  // 3. Speaking Grading
  const speakResult = gradeSpeaking(
    'Hello, how are you today?',
    'Hello, how are you today',
    { minSimilarity: 70 }
  );
  console.log('\n--- Speaking Exercise ---');
  console.log('Target:', speakResult.correctAnswer);
  console.log('Transcribed:', speakResult.userAnswer);
  console.log('Correct:', speakResult.isCorrect);
  console.log('Score:', speakResult.score);
  console.log('Feedback:', speakResult.feedback);

  // 4. Grade entire quiz
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'What is "hello" in Vietnamese?',
      options: ['xin chào', 'tạm biệt', 'cảm ơn', 'làm ơn'],
      answerIndex: 0,
      level: 'A1',
    },
    {
      id: 'q2',
      question: 'What is "thank you" in Vietnamese?',
      options: ['xin chào', 'tạm biệt', 'cảm ơn', 'làm ơn'],
      answerIndex: 2,
      level: 'A1',
    },
  ];

  const userAnswers = [0, 2]; // Both correct
  const quizResult = gradeQuiz(questions, userAnswers);

  console.log('\n--- Full Quiz Results ---');
  console.log('Total Score:', quizResult.totalScore, '/', questions.length);
  console.log('Percentage:', quizResult.percentage.toFixed(1), '%');
  console.log('Passed:', quizResult.passed);

  return {
    mcResult,
    fillResult1,
    fillResult2,
    speakResult,
    quizResult,
  };
}

// ============================================
// RUN ALL EXAMPLES
// ============================================

export function runAllExamples() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  ENGLISH LEARNING ALGORITHMS DEMO     ║');
  console.log('╚════════════════════════════════════════╝');

  exampleLessonSelection();
  exampleQuizGenerator();
  exampleSpacedRepetition();
  exampleGrading();

  console.log('\n✅ All examples completed!');
}

// Uncomment to run:
// runAllExamples();
