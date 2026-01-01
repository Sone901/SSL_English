/**
 * A. Lesson Selection / Roadmap Algorithm (Rule-Based)
 * 
 * Input: Test scores + lesson history
 * Logic:
 * - Determine level (A1/A2/B1) based on score threshold
 * - Find weakest skill
 * - Suggest next lessons prioritizing: weak → learn → review
 * Output: nextLessons[]
 */

import { TestScore, SkillHistory, LessonRecommendation, Level, SkillType } from '../types';

// Level determination thresholds
const LEVEL_THRESHOLDS = {
  A1: { min: 0, max: 40 },
  A2: { min: 41, max: 60 },
  B1: { min: 61, max: 75 },
  B2: { min: 76, max: 85 },
  C1: { min: 86, max: 100 },
};

/**
 * Determine user level based on total score
 */
export function determineLevel(totalScore: number): Level {
  if (totalScore <= LEVEL_THRESHOLDS.A1.max) return 'A1';
  if (totalScore <= LEVEL_THRESHOLDS.A2.max) return 'A2';
  if (totalScore <= LEVEL_THRESHOLDS.B1.max) return 'B1';
  if (totalScore <= LEVEL_THRESHOLDS.B2.max) return 'B2';
  return 'C1';
}

/**
 * Find the weakest skill from test scores
 */
export function findWeakestSkill(testScore: TestScore): SkillType {
  const skills = [
    { type: 'reading' as SkillType, score: testScore.reading },
    { type: 'writing' as SkillType, score: testScore.writing },
    { type: 'listening' as SkillType, score: testScore.listening },
    { type: 'speaking' as SkillType, score: testScore.speaking },
    { type: 'vocabulary' as SkillType, score: testScore.vocabulary },
    { type: 'grammar' as SkillType, score: testScore.grammar },
  ];

  skills.sort((a, b) => a.score - b.score);
  return skills[0].type;
}

/**
 * Calculate skill proficiency based on recent history
 */
export function calculateSkillProficiency(
  skillType: SkillType,
  history: SkillHistory[]
): number {
  const skillHistory = history
    .filter(h => h.skillType === skillType)
    .slice(-5); // Last 5 attempts

  if (skillHistory.length === 0) return 0;

  const avgScore = skillHistory.reduce((sum, h) => sum + h.score, 0) / skillHistory.length;
  return avgScore;
}

/**
 * Check if a lesson needs review (completed >7 days ago)
 */
export function needsReview(lessonId: string, history: SkillHistory[]): boolean {
  const lessonHistory = history.find(h => h.lessonId === lessonId);
  if (!lessonHistory) return false;

  const daysSinceCompletion = Math.floor(
    (Date.now() - lessonHistory.completedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysSinceCompletion >= 7;
}

/**
 * Main function: Generate lesson recommendations
 */
export function generateLessonRecommendations(
  testScore: TestScore,
  history: SkillHistory[],
  availableLessons: Array<{
    lessonId: string;
    title: string;
    skillType: SkillType;
    level: Level;
    estimatedTime: number;
  }>,
  maxRecommendations: number = 10
): LessonRecommendation[] {
  const userLevel = determineLevel(testScore.totalScore);
  const weakestSkill = findWeakestSkill(testScore);
  const recommendations: LessonRecommendation[] = [];

  // 1. Priority: WEAK SKILL lessons (not completed yet)
  const weakSkillLessons = availableLessons.filter(
    lesson =>
      lesson.skillType === weakestSkill &&
      lesson.level === userLevel &&
      !history.some(h => h.lessonId === lesson.lessonId)
  );

  weakSkillLessons.forEach(lesson => {
    recommendations.push({
      ...lesson,
      priority: 'weak',
      reason: `Focus on ${weakestSkill} - your weakest skill`,
    });
  });

  // 2. Priority: LEARN new lessons at current level
  const newLessons = availableLessons.filter(
    lesson =>
      lesson.level === userLevel &&
      !history.some(h => h.lessonId === lesson.lessonId) &&
      lesson.skillType !== weakestSkill
  );

  newLessons.forEach(lesson => {
    recommendations.push({
      ...lesson,
      priority: 'learn',
      reason: `New lesson at ${userLevel} level`,
    });
  });

  // 3. Priority: REVIEW old lessons that need review
  const reviewLessons = availableLessons.filter(lesson =>
    needsReview(lesson.lessonId, history)
  );

  reviewLessons.forEach(lesson => {
    recommendations.push({
      ...lesson,
      priority: 'review',
      reason: 'Time to review this lesson',
    });
  });

  // Sort by priority and limit
  const priorityOrder = { weak: 1, learn: 2, review: 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations.slice(0, maxRecommendations);
}

/**
 * Get next suggested lesson (single)
 */
export function getNextLesson(
  testScore: TestScore,
  history: SkillHistory[],
  availableLessons: Array<{
    lessonId: string;
    title: string;
    skillType: SkillType;
    level: Level;
    estimatedTime: number;
  }>
): LessonRecommendation | null {
  const recommendations = generateLessonRecommendations(
    testScore,
    history,
    availableLessons,
    1
  );

  return recommendations.length > 0 ? recommendations[0] : null;
}
