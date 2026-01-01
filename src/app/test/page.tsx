'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [quizData, setQuizData] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const testTypes = [
    { id: 'vocabulary', title: 'Kiểm Tra Từ Vựng', type: 'Từ vựng', questions: 10, time: '15 phút', icon: '📚' },
    { id: 'listening', title: 'Kiểm Tra Nghe', type: 'Listening', questions: 10, time: '20 phút', icon: '👂' },
    { id: 'reading', title: 'Kiểm Tra Đọc', type: 'Reading', questions: 10, time: '20 phút', icon: '📖' },
    { id: 'grammar', title: 'Kiểm Tra Ngữ Pháp', type: 'Grammar', questions: 10, time: '15 phút', icon: '✍️' },
  ]

  // ============================================
  // AI INTEGRATION: Quiz Generation API
  // ============================================
  // Function này sử dụng Gemini AI API qua server-side route
  // để generate quiz questions dựa trên nội dung đã học
  const generateQuiz = async (testType: string) => {
    setLoading(true)

    try {
      // Gọi API route thay vì gọi trực tiếp Gemini
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: testType === 'vocabulary' ? 'Daily vocabulary' : 
                 testType === 'listening' ? 'Listening comprehension' :
                 testType === 'reading' ? 'Reading comprehension' : 'Grammar',
          level: 'A1-B2',
          type: testType
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API request failed: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.ok || !data.quiz) {
        throw new Error('Invalid response from server')
      }

      // Transform API response to match existing quiz format
      const transformedQuiz = data.quiz.map((q: any, idx: number) => ({
        id: idx + 1,
        question: q.question,
        options: q.options,
        correctAnswer: q.answerIndex,
        explanation: q.explanation,
        tags: q.tags
      }))

      setQuizData(transformedQuiz)
      setSelectedTest(testType)
      setCurrentQuestion(0)
      setSelectedAnswers({})
      setShowResults(false)
    } catch (error) {
      console.error('Error generating quiz:', error)
      alert(`Lỗi tạo quiz: ${error instanceof Error ? error.message : 'Unknown error'}\n\nVui lòng kiểm tra:\n- API key đã được cấu hình trong .env.local\n- Generative Language API đã được bật trong Google Cloud Console\n- Kết nối internet`)
      setQuizData(null)
      setSelectedTest(null)
    } finally {
      setLoading(false)
    }
  }
  // ============================================

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    quizData.forEach((q: any, index: number) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: quizData.length,
      percentage: Math.round((correct / quizData.length) * 100)
    }
  }

  const resetQuiz = () => {
    setSelectedTest(null)
    setQuizData(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  // Nếu đang làm bài test
  if (selectedTest && quizData && !showResults) {
    const question = quizData[currentQuestion]
    const progress = ((currentQuestion + 1) / quizData.length) * 100

    return (
      <div className="min-h-screen flex flex-col">
        <nav className="bg-amber-900 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-2xl font-bold text-white hover:text-yellow-300">SSL English</Link>
              </div>
              <div className="text-white font-bold">Bài Kiểm Tra {selectedTest}</div>
              <button onClick={resetQuiz} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                Thoát
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Câu hỏi {currentQuestion + 1}/{quizData.length}</span>
              <span>{Math.round(progress)}% hoàn thành</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white border-2 border-yellow-200 rounded-lg p-8 mb-6">
            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="mb-4 flex gap-2">
                {question.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Question */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold"
            >
              ← Câu trước
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Đã trả lời: {Object.keys(selectedAnswers).length}/{quizData.questions.length}
              </p>
            </div>

            {currentQuestion < quizData.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
              >
                Câu tiếp →
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                disabled={Object.keys(selectedAnswers).length < quizData.length}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold"
              >
                ✓ Nộp bài
              </button>
            )}
          </div>
        </main>
      </div>
    )
  }

  // Nếu đang xem kết quả
  if (showResults && quizData) {
    const score = calculateScore()
    
    return (
      <div className="min-h-screen flex flex-col">
        <nav className="bg-amber-900 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-2xl font-bold text-white hover:text-yellow-300">SSL English</Link>
              </div>
              <div className="text-white font-bold">Kết Quả Bài Kiểm Tra</div>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {/* Score Card */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-8 mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Hoàn Thành!</h2>
            <div className="text-6xl font-bold mb-4">{score.percentage}%</div>
            <p className="text-xl">
              Bạn trả lời đúng <span className="font-bold">{score.correct}/{score.total}</span> câu
            </p>
            <div className="mt-6">
              {score.percentage >= 80 && <p className="text-lg">✨ Xuất sắc! Bạn đã làm rất tốt!</p>}
              {score.percentage >= 60 && score.percentage < 80 && <p className="text-lg">👍 Khá tốt! Tiếp tục cố gắng!</p>}
              {score.percentage < 60 && <p className="text-lg">💪 Hãy luyện tập thêm nhé!</p>}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">📊 Chi Tiết Từng Câu:</h3>
            
            {quizData.map((q: any, index: number) => {
              const isCorrect = selectedAnswers[index] === q.correctAnswer
              
              return (
                <div key={index} className={`border-2 rounded-lg p-6 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-lg">Câu {index + 1}: {q.question}</h4>
                    <span className={`text-2xl ${isCorrect ? '✅' : '❌'}`}>
                      {isCorrect ? '✅' : '❌'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {q.options.map((option: string, optIndex: number) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded ${
                          optIndex === q.correctAnswer
                            ? 'bg-green-200 border-2 border-green-600'
                            : optIndex === selectedAnswers[index]
                            ? 'bg-red-200 border-2 border-red-600'
                            : 'bg-white'
                        }`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                        {option}
                        {optIndex === q.correctAnswer && <span className="ml-2 text-green-700 font-bold">✓ Đáp án đúng</span>}
                        {optIndex === selectedAnswers[index] && optIndex !== q.correctAnswer && (
                          <span className="ml-2 text-red-700 font-bold">✗ Bạn đã chọn</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="bg-blue-100 p-3 rounded">
                      <p className="text-sm text-blue-900">
                        <span className="font-bold">💡 Giải thích:</span> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
            >
              🔄 Làm bài test khác
            </button>
            <button
              onClick={() => {
                setShowResults(false)
                setCurrentQuestion(0)
                setSelectedAnswers({})
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
            >
              📝 Làm lại bài này
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Main test selection page
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-amber-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-2xl font-bold text-white hover:text-yellow-300">SSL English</Link>
            </div>
            <ul className="hidden md:flex space-x-8 text-white">
              <li><Link href="/" className="hover:text-yellow-300 transition">Trang chủ</Link></li>
              <li><Link href="/vocabulary" className="hover:text-yellow-300 transition">Từ vựng</Link></li>
              <li><Link href="/pronunciation" className="hover:text-yellow-300 transition">Phát âm</Link></li>
              <li><Link href="/skills" className="hover:text-yellow-300 transition">Kỹ năng</Link></li>
              <li><Link href="/test" className="text-yellow-300 font-bold">Bài kiểm tra</Link></li>
              <li><Link href="/roadmap" className="hover:text-yellow-300 transition">Lộ trình học</Link></li>
            </ul>
            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">📋 Bài Kiểm Tra</h1>
        <p className="text-xl text-gray-600 mb-4">Đánh giá kỹ năng tiếng Anh của bạn thông qua các bài test.</p>
        
        {/* ============================================ */}
        {/* AI INTEGRATION: Quiz Generation */}
        {/* Tất cả câu hỏi được tạo 100% bởi Gemini AI */}
        {/* Mỗi lần làm bài = câu hỏi unique mới */}
        {/* ============================================ */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-12">
          <p className="text-blue-900">
            <span className="font-bold">🤖 100% AI-Generated Quiz:</span> Tất cả câu hỏi được tạo tự động bởi Gemini AI. Mỗi lần làm bài sẽ có nội dung hoàn toàn khác nhau!
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-xl text-gray-600">Đang tạo bài kiểm tra...</p>
            <p className="text-sm text-gray-500 mt-2">AI đang chuẩn bị câu hỏi cho bạn</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testTypes.map((test) => (
              <div key={test.id} className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{test.icon}</div>
                <div className="text-sm font-bold text-red-600 mb-2">🏷️ {test.type}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{test.title}</h3>
                <p className="text-gray-600 mb-4">
                  <span className="block">📝 {test.questions} câu hỏi</span>
                  <span className="block">⏱️ {test.time}</span>
                  <span className="block text-sm text-blue-600 mt-2">🤖 Được tạo bởi AI</span>
                </p>
                <button 
                  onClick={() => generateQuiz(test.id)}
                  className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700 transition"
                >
                  Bắt đầu test
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
