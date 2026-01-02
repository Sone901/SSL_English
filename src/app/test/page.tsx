'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import AudioPlayer from '@/components/AudioPlayer'
import { useState, useRef } from 'react'
import { LISTENING_LESSONS } from '@/data/listeningData'
import { READING_LESSONS } from '@/data/readingData'
import vocabularyData from '@/data/vocabulary.json'
import vietnameseTranslations from '@/data/vietnameseTranslations.json'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  level: string
  tags: string[]
  audioPath?: string
  passage?: string
  groupId?: string  // Để nhóm các câu hỏi cùng audio hoặc passage
}

export default function TestPage() {
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1')
  const [quizData, setQuizData] = useState<Question[] | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const levels = [
    { id: 'A1' as const, title: 'Cấp Độ A1', description: 'Sơ cấp' },
    { id: 'A2' as const, title: 'Cấp Độ A2', description: 'Tiền trung cấp' },
    { id: 'B1' as const, title: 'Cấp Độ B1', description: 'Trung cấp' },
    { id: 'B2' as const, title: 'Cấp Độ B2', description: 'Trung cấp cao' },
  ]

  const generateQuiz = (level: 'A1' | 'A2' | 'B1' | 'B2') => {
    const questions: Question[] = []
    let questionId = 1

    // 1. Lấy 11 câu từ vựng
    const vocabLevel: any = vocabularyData[level]
    const vocabCategories = Object.keys(vocabLevel)
    const allVocabWords: string[] = []
    
    vocabCategories.forEach(category => {
      const words = vocabLevel[category]
      if (Array.isArray(words)) {
        allVocabWords.push(...words)
      }
    })
    
    // Lọc các từ có dịch nghĩa
    const wordsWithTranslations = allVocabWords.filter(
      word => vietnameseTranslations[word as keyof typeof vietnameseTranslations]
    )
    
    // Shuffle và lấy 11 từ
    const shuffledVocab = wordsWithTranslations.sort(() => Math.random() - 0.5).slice(0, 11)
    
    shuffledVocab.forEach(word => {
      const correctMeaning = vietnameseTranslations[word as keyof typeof vietnameseTranslations]
      
      // Tạo 3 nghĩa sai ngẫu nhiên
      const allMeanings = Object.values(vietnameseTranslations)
      const wrongMeanings = allMeanings
        .filter(meaning => meaning !== correctMeaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      const allOptions = [correctMeaning, ...wrongMeanings].sort(() => Math.random() - 0.5)
      
      questions.push({
        id: questionId++,
        question: `What is the meaning of "${word}"?`,
        options: allOptions,
        correctAnswer: allOptions.indexOf(correctMeaning),
        explanation: `Từ "${word}" có nghĩa là "${correctMeaning}"`,
        level: level,
        tags: ['vocabulary'],
        groupId: `vocab-${questionId}`  // Mỗi câu vocabulary là một nhóm riêng
      })
    })

    // 2. Lấy câu Listening (từ 2 audio)
    const listeningLessons = LISTENING_LESSONS.filter(lesson => lesson.level === level)
    if (listeningLessons.length > 0) {
      // Chọn 2 audio ngẫu nhiên
      const shuffledLessons = [...listeningLessons].sort(() => Math.random() - 0.5)
      const selectedAudios = shuffledLessons.slice(0, Math.min(2, shuffledLessons.length))
      
      selectedAudios.forEach(lesson => {
        // Với A1 và A2, giữ tất cả câu hỏi (kể cả "Mark your answer...")
        // Với B1 và B2, lọc ra câu hỏi có nội dung thực sự
        const validQuestions = (level === 'A1' || level === 'A2') 
          ? lesson.questions 
          : lesson.questions.filter(q => q.question !== 'Mark your answer on your answer sheet.')
        
        const audioGroupId = `listening-${lesson.id}`  // Tất cả câu hỏi từ cùng audio có cùng groupId
        
        // Lấy tất cả câu hỏi từ audio này
        validQuestions.forEach(q => {
          questions.push({
            id: questionId++,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanationVi,
            level: level,
            tags: ['listening'],
            audioPath: lesson.audioPath,
            groupId: audioGroupId
          })
        })
      })
    }

    // 3. Lấy 4 câu Reading (từ 1 đoạn văn)
    const readingLessons = READING_LESSONS.filter(lesson => lesson.level === level)
    if (readingLessons.length > 0) {
      const randomPassage = readingLessons[Math.floor(Math.random() * readingLessons.length)]
      
      randomPassage.questions.forEach(q => {
        questions.push({
          id: questionId++,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanationVi,
          level: level,
          tags: ['reading'],
          passage: randomPassage.passage,
          groupId: `reading-${questionId}`  // Mỗi câu reading là một nhóm riêng
        })
      })
    }
    
    setQuizData(questions)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  // Lấy tất cả câu hỏi trong nhóm hiện tại
  const getCurrentGroup = () => {
    if (!quizData) return []
    const currentGroupId = quizData[currentQuestion].groupId
    return quizData.map((q, idx) => ({ question: q, index: idx }))
                   .filter(item => item.question.groupId === currentGroupId)
  }

  const handleNextQuestion = () => {
    if (!quizData) return
    const currentGroupId = quizData[currentQuestion].groupId
    // Tìm câu hỏi đầu tiên của nhóm tiếp theo
    let nextIndex = currentQuestion + 1
    while (nextIndex < quizData.length && quizData[nextIndex].groupId === currentGroupId) {
      nextIndex++
    }
    if (nextIndex < quizData.length) {
      setCurrentQuestion(nextIndex)
    }
  }

  const handlePreviousQuestion = () => {
    if (!quizData || currentQuestion === 0) return
    const currentGroupId = quizData[currentQuestion].groupId
    // Tìm câu hỏi đầu tiên của nhóm trước đó
    let prevIndex = currentQuestion - 1
    while (prevIndex > 0 && quizData[prevIndex].groupId === currentGroupId) {
      prevIndex--
    }
    // Tìm câu đầu tiên của nhóm trước
    const prevGroupId = quizData[prevIndex].groupId
    while (prevIndex > 0 && quizData[prevIndex - 1].groupId === prevGroupId) {
      prevIndex--
    }
    setCurrentQuestion(prevIndex)
  }

  const handleSubmitTest = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    quizData!.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: quizData!.length,
      percentage: Math.round((correct / quizData!.length) * 100)
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
      <div className="min-h-screen bg-[#FFF5D7] font-sans text-[#4A0E0E] relative overflow-x-hidden">
        {/* --- CÁC HOẠT TIẾT TRANG TRÍ NỀN --- */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] opacity-90 pointer-events-none z-10">
          <img src="/top_left.png" alt="Blossom" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
        <div className="absolute top-20 right-0 w-64 h-64 opacity-90 pointer-events-none z-10">
          <img src="/top_right.png" alt="Lantern decoration" className="w-full h-full object-contain drop-shadow-lg" />
        </div>

        <nav className="bg-[#8B0000] text-[#FFD700] shadow-lg sticky top-0 z-50 border-b-4 border-[#FFD700]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <div className="bg-red-700 p-2 rounded-lg shadow-lg border border-yellow-400">
                  <h1 className="font-extrabold text-2xl tracking-wide text-yellow-400">SSL English</h1>
                </div>
              </Link>
              <div className="text-white font-bold text-lg">Bài Kiểm Tra - Cấp Độ {selectedLevel}</div>
              <button onClick={resetQuiz} className="bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg text-white px-6 py-3 rounded-lg font-bold">
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

          {/* Question Card - Hiển thị tất cả câu hỏi trong cùng nhóm */}
          <div className="bg-white border-2 border-yellow-200 rounded-lg p-8 mb-6">
            {(() => {
              const currentGroup = getCurrentGroup()
              const firstQuestion = currentGroup[0].question
              
              return (
                <>
                  {/* Tags */}
                  {firstQuestion.tags && firstQuestion.tags.length > 0 && (
                    <div className="mb-4 flex gap-2">
                      {firstQuestion.tags.map((tag, idx) => (
                        <span key={idx} className={`text-xs px-3 py-1 rounded-full ${
                          tag === 'reading' ? 'bg-green-100 text-green-700' : 
                          tag === 'listening' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {tag === 'reading' ? 'Reading' : tag === 'listening' ? 'Listening' : 'Vocabulary'}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Audio Player for Listening Questions - Chỉ hiển thị 1 lần cho cả nhóm */}
                  {firstQuestion.audioPath && firstQuestion.tags?.includes('listening') && (
                    <div className="mb-6">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                        <p className="text-sm text-blue-800 font-semibold mb-2">Nghe đoạn audio sau và trả lời các câu hỏi:</p>
                      </div>
                      <AudioPlayer 
                        src={firstQuestion.audioPath} 
                        title="Listening Audio"
                        showVideo={false}
                      />
                    </div>
                  )}

                  {/* Passage for Reading Questions - Chỉ hiển thị 1 lần cho cả nhóm */}
                  {firstQuestion.passage && firstQuestion.tags?.includes('reading') && (
                    <div className="mb-6">
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <h4 className="font-bold text-green-800 mb-2">Reading Passage:</h4>
                        <p className="text-gray-700 leading-relaxed">{firstQuestion.passage}</p>
                      </div>
                    </div>
                  )}

                  {/* Hiển thị tất cả câu hỏi trong nhóm */}
                  {currentGroup.map((item, groupIdx) => (
                    <div key={item.index} className={groupIdx > 0 ? 'mt-8 pt-8 border-t-2 border-gray-200' : ''}>
                      {/* Question */}
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        <span className="text-blue-600">Câu {item.index + 1}:</span> {item.question.question}
                      </h3>

                      {/* Options */}
                      <div className="space-y-3">
                        {item.question.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(item.index, optionIndex)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition ${
                              selectedAnswers[item.index] === optionIndex
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-bold mr-3">{String.fromCharCode(65 + optionIndex)}.</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )
            })()}
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
                Nộp bài
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
            <h2 className="text-3xl font-bold mb-4">Hoàn Thành!</h2>
            <div className="text-6xl font-bold mb-4">{score.percentage}%</div>
            <p className="text-xl">
              Bạn trả lời đúng <span className="font-bold">{score.correct}/{score.total}</span> câu
            </p>
            <div className="mt-6">
              {score.percentage >= 80 && <p className="text-lg">Xuất sắc! Bạn đã làm rất tốt!</p>}
              {score.percentage >= 60 && score.percentage < 80 && <p className="text-lg">Khá tốt! Tiếp tục cố gắng!</p>}
              {score.percentage < 60 && <p className="text-lg">Hãy luyện tập thêm nhé!</p>}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Chi Tiết Từng Câu:</h3>
            
            {quizData.map((q, index) => {
              const isCorrect = selectedAnswers[index] === q.correctAnswer
              
              return (
                <div key={index} className={`border-2 rounded-lg p-6 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        {q.tags?.map((tag, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-full ${
                            tag === 'reading' ? 'bg-green-200 text-green-800' : 
                            tag === 'listening' ? 'bg-blue-200 text-blue-800' :
                            'bg-purple-200 text-purple-800'
                          }`}>
                            {tag === 'reading' ? 'Reading' : tag === 'listening' ? 'Listening' : 'Vocabulary'}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-bold text-lg">Câu {index + 1}: {q.question}</h4>
                    </div>
                    <span className="text-2xl ml-4">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                  </div>

                  {/* Show passage for reading questions */}
                  {q.passage && q.tags?.includes('reading') && (
                    <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded mb-4">
                      <p className="text-sm text-gray-700 leading-relaxed">{q.passage}</p>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {q.options.map((option, optIndex) => (
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
                        {optIndex === q.correctAnswer && <span className="ml-2 text-green-700 font-bold">Đáp án đúng</span>}
                        {optIndex === selectedAnswers[index] && optIndex !== q.correctAnswer && (
                          <span className="ml-2 text-red-700 font-bold">Bạn đã chọn</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="bg-blue-100 p-3 rounded">
                      <p className="text-sm text-blue-900">
                        <span className="font-bold">Giải thích:</span> {q.explanation}
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
              Làm bài test khác
            </button>
            <button
              onClick={() => {
                setShowResults(false)
                setCurrentQuestion(0)
                setSelectedAnswers({})
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
            >
              Làm lại bài này
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Main test selection page
  return (
    <div className="min-h-screen bg-[#FFF5D7] font-sans text-[#4A0E0E] relative overflow-x-hidden">
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
              <li><Link href="/skills" className="hover:text-white transition py-2">KỸ NĂNG</Link></li>
              <li><Link href="/test" className="hover:text-white transition py-2 border-b-2 border-white">BÀI KIỂM TRA</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition py-2">LỘ TRÌNH</Link></li>
            </ul>

            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-14 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#A50000] text-center md:text-left">📝 Bài Kiểm Tra</h1>
        <p className="text-xl mb-12 text-center md:text-left">Ôn tập kiến thức qua các câu hỏi trắc nghiệm theo từng cấp độ.</p>

        {/* Level Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => (
            <div key={level.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">{level.title}</h3>
              <p className="text-gray-600 mb-4 text-center text-sm">{level.description}</p>
              <button 
                onClick={() => {
                  setSelectedLevel(level.id)
                  generateQuiz(level.id)
                }}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition"
              >
                Bắt đầu test
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">Về bài kiểm tra:</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Mỗi bài test gồm: từ vựng, listening và reading</li>
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
