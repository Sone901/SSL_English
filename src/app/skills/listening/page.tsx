'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import AudioPlayer from '@/components/AudioPlayer'
import { useState } from 'react'
import { LISTENING_LESSONS, ListeningLesson } from '@/data/listeningData'

export default function ListeningPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('A1')
  const [selectedLesson, setSelectedLesson] = useState<ListeningLesson | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  
  const lessons = LISTENING_LESSONS.filter(lesson => lesson.level === selectedLevel)
  
  const backToLessons = () => {
    setSelectedLesson(null)
    setSelectedAnswers({})
    setShowResults(false)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleSubmit = () => {
    setShowResults(true)
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
              <h1 className="text-4xl font-bold text-[#8B0000]" style={{textShadow: '2px 2px 4px rgba(139,0,0,0.2)'}}>Kỹ Năng Nghe (Listening)</h1>
              <Link href="/skills">
                <button className="bg-gradient-to-r from-[#8B0000] to-[#A50000] hover:from-[#A50000] hover:to-[#8B0000] text-[#FFD700] px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-300 border-2 border-[#FFD700]">
                  ← Quay lại
                </button>
              </Link>
            </div>

            {/* Level Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-bold text-xl text-[#8B0000]">Chọn cấp độ:</span>
                {['A1', 'A2', 'B1', 'B2'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`py-3 px-8 rounded-xl font-bold transition-all duration-300 ${
                      selectedLevel === level
                        ? 'bg-gradient-to-br from-[#8B0000] to-[#A50000] text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)] border-3 border-[#FFD700] scale-105'
                        : 'bg-white text-[#8B0000] border-3 border-[#8B0000] hover:border-[#FFD700] hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-base text-[#8B0000] font-semibold mt-3">
                {lessons.length > 0 
                  ? `Hiển thị ${lessons.length} bài học cấp độ ${selectedLevel}`
                  : `Cấp độ ${selectedLevel} đang được cập nhật`
                }
              </p>
            </div>

            {/* Lessons List */}
            {lessons.length > 0 ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-4 border-[#8B0000] shadow-xl">
                <h2 className="text-3xl font-bold mb-4 text-[#8B0000]" style={{textShadow: '1px 1px 2px rgba(139,0,0,0.2)'}}>Bài Tập Luyện Nghe</h2>
                <p className="text-lg text-gray-700 mb-8">Luyện tập nghe hiểu tiếng Anh qua các bài học đa dạng</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className="bg-gradient-to-br from-white to-[#FFF5D7] border-3 border-[#8B0000] rounded-xl p-6 hover:shadow-[0_0_20px_rgba(139,0,0,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#8B0000]">{lesson.titleVi}</h3>
                        <span className="inline-block bg-gradient-to-br from-[#8B0000] to-[#A50000] text-[#FFD700] px-3 py-1 rounded-full text-sm font-bold border-2 border-[#FFD700]">
                          {lesson.level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-semibold">📝 {lesson.questions.length} câu hỏi</span>
                      </div>
                      <button className="mt-4 w-full bg-gradient-to-r from-[#8B0000] to-[#A50000] hover:from-[#A50000] hover:to-[#8B0000] text-[#FFD700] font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] border-2 border-[#FFD700]">
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={backToLessons}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  ← Danh sách
                </button>
                {hasPreviousLesson && (
                  <button 
                    onClick={goToPreviousLesson}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    ← Câu trước
                  </button>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-800">{selectedLesson.titleVi}</h1>
              {hasNextLesson && (
                <button 
                  onClick={goToNextLesson}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Câu tiếp theo →
                </button>
              )}
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-yellow-200">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-lg">{selectedLesson.title}</p>
              </div>
              
              <AudioPlayer 
                src={selectedLesson.audioPath} 
                showVideo={false}
              />

              {/* Questions Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Bài Tập</h2>
                <p className="text-sm text-gray-500 mb-4">Số câu hỏi: {selectedLesson.questions.length}</p>
                
                <div className="space-y-6">
                  {selectedLesson.questions.map((question, qIdx) => (
                    <div key={qIdx} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-lg text-gray-800 mb-4">
                        {question.questionVi}
                      </h3>
                      
                      <div className="space-y-3">
                        {question.options.map((option, oIdx) => {
                          const isSelected = selectedAnswers[qIdx] === oIdx
                          const isCorrect = question.correctAnswer === oIdx
                          const showCorrectAnswer = showResults && isCorrect
                          const showWrongAnswer = showResults && isSelected && !isCorrect
                          
                          return (
                            <button
                              key={oIdx}
                              onClick={() => !showResults && handleAnswerSelect(qIdx, oIdx)}
                              disabled={showResults}
                              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                                showCorrectAnswer
                                  ? 'bg-green-100 border-green-500 text-green-800'
                                  : showWrongAnswer
                                  ? 'bg-red-100 border-red-500 text-red-800'
                                  : isSelected
                                  ? 'bg-blue-100 border-blue-500 text-blue-800'
                                  : 'bg-white border-gray-300 hover:border-blue-400 text-gray-800'
                              } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <span className="font-semibold">{option}</span>
                              {showCorrectAnswer && <span className="ml-2">✓</span>}
                              {showWrongAnswer && <span className="ml-2">✗</span>}
                            </button>
                          )
                        })}
                      </div>

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

                {/* Submit/Reset Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                  {!showResults ? (
                    <button
                      onClick={handleSubmit}
                      disabled={Object.keys(selectedAnswers).length !== selectedLesson.questions.length}
                      className={`py-3 px-8 rounded-lg font-bold text-white transition ${
                        Object.keys(selectedAnswers).length === selectedLesson.questions.length
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Nộp bài
                    </button>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {calculateScore()} / {selectedLesson.questions.length}
                        </div>
                        <p className="text-gray-600">Số câu đúng</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedAnswers({})
                          setShowResults(false)
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
                      >
                        Làm lại
                      </button>
                      {hasNextLesson && (
                        <button
                          onClick={goToNextLesson}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
                        >
                          Câu tiếp theo →
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
