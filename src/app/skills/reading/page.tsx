'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'
import { READING_LESSONS, ReadingLesson } from '@/data/readingData'

export default function ReadingPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('A1')
  const [selectedLesson, setSelectedLesson] = useState<ReadingLesson | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  
  const lessons = READING_LESSONS.filter(lesson => lesson.level === selectedLevel)
  
  const backToLessons = () => {
    setSelectedLesson(null)
    setSelectedAnswers({})
    setShowResults(false)
  }

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    if (!showResults) {
      setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex })
    }
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const retryQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    if (!selectedLesson) return 0
    let correct = 0
    selectedLesson.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const goToNextLesson = () => {
    if (!selectedLesson) return
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id)
    if (currentIndex < lessons.length - 1) {
      setSelectedLesson(lessons[currentIndex + 1])
      setSelectedAnswers({})
      setShowResults(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const hasPreviousLesson = selectedLesson ? lessons.findIndex(l => l.id === selectedLesson.id) > 0 : false
  const hasNextLesson = selectedLesson ? lessons.findIndex(l => l.id === selectedLesson.id) < lessons.length - 1 : false

  const goToPreviousLesson = () => {
    if (!selectedLesson) return
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id)
    if (currentIndex > 0) {
      setSelectedLesson(lessons[currentIndex - 1])
      setSelectedAnswers({})
      setShowResults(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5D7]">
      {/* --- CÁC HOẠT TIẾT TRANG TRÍ NỀN --- */}
      <div className="absolute top-0 -left-10 w-[300px] h-[300px] opacity-90 pointer-events-none z-0">
        <img src="/top_left.png" alt="Blossom" className="w-full h-full object-contain drop-shadow-lg" />
      </div>
      <div className="absolute top-20 right-0 w-64 h-64 opacity-90 pointer-events-none z-0">
        <img src="/top_right.png" alt="Lantern decoration" className="w-full h-full object-contain drop-shadow-lg" />
      </div>

      {/* Navigation */}
      <nav className="bg-[#8B0000] text-[#FFD700] shadow-lg sticky top-0 z-50 border-b-4 border-[#FFD700] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="bg-red-700 p-2 rounded-lg shadow-lg border border-yellow-400">
                <h1 className="font-extrabold text-2xl tracking-wide text-yellow-400">SSL English</h1>
              </div>
            </Link>
            
            <ul className="hidden lg:flex space-x-6 items-center font-bold text-sm">
              <li><Link href="/" className="hover:text-white transition py-2">TRANG CHỦ</Link></li>
              <li><Link href="/vocabulary" className="hover:text-white transition py-2">TỮ VỰNG</Link></li>
              <li><Link href="/pronunciation" className="hover:text-white transition py-2">PHÁT ÂM</Link></li>
              <li><Link href="/skills" className="hover:text-white transition py-2 border-b-2 border-white">KỸ NĂNG</Link></li>
              <li><Link href="/test" className="hover:text-white transition py-2">BÀI KIỂM TRA</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition py-2">LỘ TRÌNH</Link></li>
            </ul>

            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full relative z-10">
        {!selectedLesson ? (
          <>
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-800">📖 Kỹ Năng Đọc (Reading)</h1>
              <Link href="/skills">
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition">
                  ← Quay lại
                </button>
              </Link>
            </div>

            {/* Level Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-semibold text-gray-700">Chọn cấp độ:</span>
                {['A1', 'A2', 'B1', 'B2'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`py-2 px-4 rounded-lg font-semibold transition ${
                      selectedLevel === level
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {lessons.length > 0 
                  ? `Hiển thị ${lessons.length} bài đọc cấp độ ${selectedLevel}`
                  : `Cấp độ ${selectedLevel} đang được cập nhật`
                }
              </p>
            </div>

            {/* Lessons List */}
            {lessons.length > 0 ? (
              <div className="bg-white rounded-lg p-8 border-2 border-yellow-200">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Bài Tập Luyện Đọc</h2>
                <p className="text-lg text-gray-600 mb-8">Luyện tập đọc hiểu tiếng Anh qua các bài học đa dạng</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-green-700">{lesson.titleVi}</h3>
                        <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {lesson.level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">📝 {lesson.questions.length} câu hỏi</span>
                      </div>
                      <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Bắt đầu học →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 border-2 border-yellow-200 text-center">
                <p className="text-gray-600 text-lg">Nội dung cho cấp độ này đang được cập nhật...</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Lesson Detail View */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={backToLessons}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                ← Quay lại danh sách
              </button>
              <div className="flex gap-2">
                {hasPreviousLesson && (
                  <button
                    onClick={goToPreviousLesson}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    ← Bài trước
                  </button>
                )}
                {hasNextLesson && (
                  <button
                    onClick={goToNextLesson}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Bài tiếp theo →
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-yellow-200">
              <h2 className="text-3xl font-bold text-green-700 mb-4">{selectedLesson.titleVi}</h2>
              
              {/* Passage */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-gray-800 mb-3 text-xl">📖 Reading Passage:</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedLesson.passage}</p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Câu hỏi:</h3>
                {selectedLesson.questions.map((question, qIndex) => (
                  <div key={qIndex} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                    <h4 className="font-bold text-gray-800 mb-4">{question.questionVi}</h4>
                    <div className="space-y-3">
                      {question.options.map((option, oIndex) => {
                        const isSelected = selectedAnswers[qIndex] === oIndex
                        const isCorrect = question.correctAnswer === oIndex
                        const showCorrect = showResults && isCorrect
                        const showWrong = showResults && isSelected && !isCorrect
                        
                        return (
                          <button
                            key={oIndex}
                            onClick={() => selectAnswer(qIndex, oIndex)}
                            disabled={showResults}
                            className={`w-full text-left p-4 rounded-lg border-2 transition ${
                              showCorrect
                                ? 'bg-green-100 border-green-500 text-green-800 font-semibold'
                                : showWrong
                                ? 'bg-red-100 border-red-500 text-red-800'
                                : isSelected
                                ? 'bg-blue-100 border-blue-500 text-blue-800'
                                : 'bg-white border-gray-300 hover:border-blue-400'
                            } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <span className="font-semibold mr-3">{String.fromCharCode(65 + oIndex)}.</span>
                            {option}
                          </button>
                        )
                      })}
                    </div>
                    
                    {/* Explanation */}
                    {showResults && (
                      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Giải thích:</span> {question.explanationVi}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 justify-center">
                {!showResults ? (
                  <button
                    onClick={checkAnswers}
                    disabled={Object.keys(selectedAnswers).length !== selectedLesson.questions.length}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition text-lg"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600 mb-4">
                        Điểm: {calculateScore()}/{selectedLesson.questions.length}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={retryQuiz}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg transition"
                        >
                          Làm lại
                        </button>
                        {hasNextLesson && (
                          <button
                            onClick={goToNextLesson}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
                          >
                            Bài tiếp theo →
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
