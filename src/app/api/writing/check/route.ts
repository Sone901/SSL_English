import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/writing/check
 * Check writing using LanguageTool API
 */
export async function POST(request: NextRequest) {
  try {
    const { text, language = 'en-US' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Call LanguageTool API
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        language: language,
      }),
    });

    if (!response.ok) {
      throw new Error('LanguageTool API request failed');
    }

    const data = await response.json();

    // Calculate score based on errors
    const totalWords = text.split(/\s+/).filter((w: string) => w.length > 0).length;
    const errorCount = data.matches?.length || 0;
    
    // Scoring logic:
    // - Start with 100 points
    // - Deduct points based on error severity
    // - Min score is 0
    let score = 100;
    let grammarErrors = 0;
    let spellingErrors = 0;
    let styleErrors = 0;

    data.matches?.forEach((match: any) => {
      const issueType = match.rule?.issueType || 'other';
      
      if (issueType.includes('grammar') || issueType.includes('Grammar')) {
        grammarErrors++;
        score -= 5; // Deduct 5 points for grammar errors
      } else if (issueType.includes('misspelling') || issueType.includes('Spelling')) {
        spellingErrors++;
        score -= 3; // Deduct 3 points for spelling errors
      } else {
        styleErrors++;
        score -= 2; // Deduct 2 points for style issues
      }
    });

    score = Math.max(0, score); // Ensure score is not negative

    // Determine feedback level
    let feedbackLevel = 'excellent';
    let feedbackMessage = 'Xuất sắc! Bài viết của bạn rất tốt.';
    
    if (score >= 90) {
      feedbackLevel = 'excellent';
      feedbackMessage = 'Xuất sắc! Bài viết của bạn rất tốt với ít lỗi.';
    } else if (score >= 75) {
      feedbackLevel = 'good';
      feedbackMessage = 'Tốt! Bài viết của bạn khá ổn, chỉ cần chỉnh sửa nhỏ.';
    } else if (score >= 60) {
      feedbackLevel = 'fair';
      feedbackMessage = 'Khá! Bài viết cần cải thiện một số lỗi ngữ pháp và chính tả.';
    } else {
      feedbackLevel = 'needs-improvement';
      feedbackMessage = 'Cần cải thiện! Hãy xem lại các lỗi và sửa chúng.';
    }

    return NextResponse.json({
      success: true,
      score,
      totalWords,
      errorCount,
      grammarErrors,
      spellingErrors,
      styleErrors,
      feedbackLevel,
      feedbackMessage,
      matches: data.matches || [],
      language: data.language,
    });

  } catch (error) {
    console.error('Error checking writing:', error);
    return NextResponse.json(
      { error: 'Failed to check writing' },
      { status: 500 }
    );
  }
}
