'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'
import { READING_CONTENTS, SPEAKING_CONTENTS, WRITING_CONTENTS } from '@/data/skillsData'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  level: string
  tags?: string[]
}

export default function TestPage() {
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1')
  const [quizData, setQuizData] = useState<Question[] | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const levels = [
    { id: 'A1' as const, title: 'Cấp Độ A1', description: 'Sơ cấp', icon: '🌱' },
    { id: 'A2' as const, title: 'Cấp Độ A2', description: 'Tiền trung cấp', icon: '🌿' },
    { id: 'B1' as const, title: 'Cấp Độ B1', description: 'Trung cấp', icon: '🌳' },
    { id: 'B2' as const, title: 'Cấp Độ B2', description: 'Trung cấp cao', icon: '🌲' },
  ]

  const generateQuiz = (level: 'A1' | 'A2' | 'B1' | 'B2') => {
    const questions: Question[] = []
    let questionId = 1

    // Lấy nội dung từ Reading
    Object.values(READING_CONTENTS).forEach(category => {
      category.items
        .filter(item => item.level === level)
        .forEach(item => {
          if (item.transcript) {
            // Câu hỏi về nội dung đọc
            questions.push({
              id: questionId++,
              question: `Read the text: "${item.transcript.substring(0, 100)}..." What is this text about?`,
              options: [
                item.description,
                'A different topic',
                'Weather forecast',
                'Sports news'
              ],
              correctAnswer: 0,
              explanation: `The text is about: ${item.description}`,
              level: item.level
            })

            // Câu hỏi từ vựng từ reading
            const words = item.transcript.split(' ').filter(w => w.length > 5)
            if (words.length > 0) {
              const word = words[Math.floor(Math.random() * Math.min(words.length, 10))]
              questions.push({
                id: questionId++,
                question: `In the text about "${item.title}", what type of content is it?`,
                options: [
                  'Reading comprehension',
                  'Math problem',
                  'Science experiment',
                  'History lesson'
                ],
                correctAnswer: 0,
                explanation: 'This is a reading comprehension text.',
                level: item.level
              })
            }
          }
        })
    })

    // Lấy câu hỏi từ Speaking
    Object.values(SPEAKING_CONTENTS).forEach(category => {
      category.items
        .filter(item => item.level === level)
        .forEach(item => {
          if (item.sampleAnswer) {
            questions.push({
              id: questionId++,
              question: `${item.prompt} - Which is a good answer?`,
              options: [
                item.sampleAnswer,
                'I don\'t know',
                'Maybe tomorrow',
                'Yes, it is blue'
              ],
              correctAnswer: 0,
              explanation: `A good answer would be: ${item.sampleAnswer}`,
              level: item.level
            })
          }
        })
    })

    // Lấy câu hỏi từ Writing
    Object.values(WRITING_CONTENTS).forEach(category => {
      category.items
        .filter(item => item.level === level)
        .forEach(item => {
          if (item.sampleAnswer) {
            questions.push({
              id: questionId++,
              question: `For the topic "${item.title}", which is the best example?`,
              options: [
                item.sampleAnswer.substring(0, 80) + '...',
                'Hello. Goodbye.',
                'One two three.',
                'Red blue green.'
              ],
              correctAnswer: 0,
              explanation: `This is a good example for: ${item.title}`,
              level: item.level
            })
          }
        })
    })

    // Trộn câu hỏi và lấy 10 câu
    const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 10)
    
    setQuizData(shuffled)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

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
    setQuizData(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  // Nếu đang làm bài test
  if (quizData && !showResults) {
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
              <div className="text-white font-bold">Bài Kiểm Tra - Cấp Độ {selectedLevel}</div>
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
                Đã trả lời: {Object.keys(selectedAnswers).length}/{quizData.length}
              </p>
            </div>

            {currentQuestion < quizData.length - 1 ? (
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
        <p className="text-xl text-gray-600 mb-12">Ôn tập kiến thức qua các câu hỏi trắc nghiệm theo từng cấp độ.</p>

        {/* Level Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => (
            <div key={level.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-5xl mb-4 text-center">{level.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">{level.title}</h3>
              <p className="text-gray-600 mb-4 text-center text-sm">{level.description}</p>
              <button 
                onClick={() => generateQuiz(level.id)}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition"
              >
                Bắt đầu test
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">10 câu hỏi • ~15 phút</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">📚 Về bài kiểm tra:</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Câu hỏi được lấy từ các bài học trong phần Luyện kỹ năng</li>
            <li>• Mỗi bài test có 10 câu hỏi trắc nghiệm</li>
            <li>• Nội dung bao gồm Reading, Speaking và Writing</li>
            <li>• Sau khi hoàn thành, bạn sẽ thấy đáp án và giải thích chi tiết</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
