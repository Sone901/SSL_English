'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import vocabularyData from '@/data/vocabulary.json'
import vietnameseTranslations from '@/data/vietnameseTranslations.json'
import topicsData from '@/data/topics.json'

// Interfaces
interface QuizQuestion {
  id: number
  type: 'en-to-vi' | 'vi-to-en' | 'def-to-en' | 'fill-in'
  question: string
  correctAnswer: string
  options?: string[]
  userAnswer?: string
}

interface TopicProgress {
  level: string
  topic: string
  score: number
  total: number
  completedAt: string
}

interface VocabularyWord {
  word: string
  phonetic: string
  partOfSpeech: string
  vietnamese: string
  definition: string
  example: string
  level: string
  topic: string
  audio: string
}

// Type-safe access to imported JSON
const WORD_BANK = vocabularyData as Record<string, Record<string, string[]>>
const VIETNAMESE_TRANSLATIONS = vietnameseTranslations as Record<string, string>
const TOPICS = topicsData as Record<string, { name: string }>

export default function VocabularyPracticePage() {
  const params = useParams()
  const router = useRouter()
  const level = params.level as string
  const topic = params.topic as string

  const [vocabularyList, setVocabularyList] = useState<VocabularyWord[]>([])
  const [loading, setLoading] = useState(true)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [fillInAnswer, setFillInAnswer] = useState('')
  const [progress, setProgress] = useState<TopicProgress[]>([])

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('vocabulary_progress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Fetch vocabulary data
  useEffect(() => {
    const fetchVocabulary = async () => {
      setLoading(true)
      
      const words = WORD_BANK[level]?.[topic] || []
      if (words.length === 0) {
        setLoading(false)
        return
      }

      const vocabPromises = words.map(async (word) => {
        try {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          const data = await response.json()
          const entry = data[0]
          const meaning = entry.meanings?.[0]
          const definition = meaning?.definitions[0]

          return {
            word: entry.word,
            phonetic: entry.phonetic || entry.phonetics?.[0]?.text || '',
            partOfSpeech: meaning?.partOfSpeech || '',
            vietnamese: VIETNAMESE_TRANSLATIONS[word.toLowerCase()] || word,
            definition: definition?.definition || 'No definition available',
            example: definition?.example || `This is an example using ${word}.`,
            level: level,
            topic: topic,
            audio: entry.phonetics?.find((p: any) => p.audio)?.audio || ''
          }
        } catch (error) {
          return null
        }
      })

      const vocabResults = await Promise.all(vocabPromises)
      const validVocab = vocabResults.filter((v): v is VocabularyWord => v !== null)
      
      setVocabularyList(validVocab)
      setLoading(false)
      
      // Auto-generate quiz after loading
      if (validVocab.length >= 4) {
        generateQuiz(validVocab)
      }
    }

    fetchVocabulary()
  }, [level, topic])

  // Shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  // Generate quiz
  const generateQuiz = (vocabList: VocabularyWord[]) => {
    if (vocabList.length < 4) return

    const questions: QuizQuestion[] = []
    const shuffledVocab = shuffleArray(vocabList)
    const numQuestions = Math.min(10, vocabList.length)

    for (let i = 0; i < numQuestions; i++) {
      const word = shuffledVocab[i]
      const questionTypes: QuizQuestion['type'][] = ['en-to-vi', 'vi-to-en', 'def-to-en']
      
      if (Math.random() < 0.3) {
        questionTypes.push('fill-in')
      }

      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)]

      if (questionType === 'fill-in') {
        questions.push({
          id: i,
          type: 'fill-in',
          question: `Điền từ tiếng Anh cho: "${word.vietnamese}"`,
          correctAnswer: word.word.toLowerCase()
        })
      } else {
        const otherWords = shuffledVocab.filter(w => w.word !== word.word).slice(0, 3)
        let question = ''
        let correctAnswer = ''
        let options: string[] = []

        if (questionType === 'en-to-vi') {
          question = `"${word.word}" có nghĩa là gì?`
          correctAnswer = word.vietnamese
          options = shuffleArray([word.vietnamese, ...otherWords.map(w => w.vietnamese)])
        } else if (questionType === 'vi-to-en') {
          question = `"${word.vietnamese}" trong tiếng Anh là gì?`
          correctAnswer = word.word
          options = shuffleArray([word.word, ...otherWords.map(w => w.word)])
        } else if (questionType === 'def-to-en') {
          question = `Từ nào có nghĩa: "${word.definition}"?`
          correctAnswer = word.word
          options = shuffleArray([word.word, ...otherWords.map(w => w.word)])
        }

        questions.push({
          id: i,
          type: questionType,
          question,
          correctAnswer,
          options
        })
      }
    }

    setQuizQuestions(questions)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setShowResults(false)
    setFillInAnswer('')
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer })
  }

  // Handle fill-in submit
  const handleFillInSubmit = () => {
    if (fillInAnswer.trim()) {
      setUserAnswers({ ...userAnswers, [currentQuestionIndex]: fillInAnswer.toLowerCase().trim() })
      setFillInAnswer('')
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        calculateScore()
      }
    }
  }

  // Next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateScore()
    }
  }

  // Calculate score
  const calculateScore = () => {
    let score = 0
    quizQuestions.forEach((q) => {
      const userAnswer = userAnswers[q.id]
      if (userAnswer && userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()) {
        score++
      }
    })
    setQuizScore(score)
    setShowResults(true)

    // Save progress
    const newProgress: TopicProgress = {
      level,
      topic,
      score,
      total: quizQuestions.length,
      completedAt: new Date().toISOString()
    }

    const updatedProgress = [...progress.filter(p => !(p.level === level && p.topic === topic)), newProgress]
    setProgress(updatedProgress)
    localStorage.setItem('vocabulary_progress', JSON.stringify(updatedProgress))
  }

  // Restart quiz
  const restartQuiz = () => {
    setShowResults(false)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setFillInAnswer('')
    if (vocabularyList.length >= 4) {
      generateQuiz(vocabularyList)
    }
  }

  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex]
  const hasAnswered = currentQuestion && userAnswers[currentQuestion.id] !== undefined

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài kiểm tra...</p>
        </div>
      </div>
    )
  }

  if (vocabularyList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy từ vựng</h2>
          <p className="text-gray-600 mb-6">Chủ đề này chưa có từ vựng.</p>
          <Link
            href="/vocabulary"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    )
  }

  if (showResults) {
    const percentage = (quizScore / quizQuestions.length) * 100
    const emoji = percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : percentage >= 40 ? '😐' : '😢'

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <Link
                href="/vocabulary"
                className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
              >
                ← Quay lại
              </Link>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {TOPICS[topic]?.name}
                </h1>
                <p className="text-gray-600 text-sm">Cấp độ: {level}</p>
              </div>
              <div className="w-20"></div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{emoji}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Kết quả</h2>
              <div className="text-5xl font-bold text-indigo-600 mb-2">
                {quizScore}/{quizQuestions.length}
              </div>
              <p className="text-xl text-gray-600">Đúng {percentage.toFixed(0)}%</p>
            </div>

            {/* Review answers */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Xem lại đáp án</h3>
              {quizQuestions.map((q, index) => {
                const userAnswer = userAnswers[q.id]
                const isCorrect = userAnswer?.toLowerCase() === q.correctAnswer.toLowerCase()
                
                return (
                  <div key={q.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{isCorrect ? '✅' : '❌'}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2">Câu {index + 1}: {q.question}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700">
                            <span className="font-semibold">Bạn trả lời:</span>{' '}
                            <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {userAnswer || '(không trả lời)'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-gray-700">
                              <span className="font-semibold">Đáp án đúng:</span>{' '}
                              <span className="text-green-700">{q.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                🔄 Làm lại
              </button>
              <Link
                href="/vocabulary"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Về danh sách
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Đang tạo bài kiểm tra...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/vocabulary"
              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
            >
              ← Quay lại
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {TOPICS[topic]?.name}
              </h1>
              <p className="text-gray-600 text-sm">Cấp độ: {level}</p>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Progress bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Câu hỏi {currentQuestionIndex + 1}/{quizQuestions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              {currentQuestion.type === 'en-to-vi' && 'Dịch sang tiếng Việt'}
              {currentQuestion.type === 'vi-to-en' && 'Dịch sang tiếng Anh'}
              {currentQuestion.type === 'def-to-en' && 'Chọn từ theo định nghĩa'}
              {currentQuestion.type === 'fill-in' && 'Điền từ'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQuestion.question}</h2>
          </div>

          {/* Answer options */}
          {currentQuestion.type === 'fill-in' ? (
            <div className="space-y-4">
              <input
                type="text"
                value={fillInAnswer}
                onChange={(e) => setFillInAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFillInSubmit()}
                placeholder="Nhập câu trả lời..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              <button
                onClick={handleFillInSubmit}
                disabled={!fillInAnswer.trim()}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Xác nhận
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    userAnswers[currentQuestion.id] === option
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-semibold text-gray-700">{String.fromCharCode(65 + index)}.</span>{' '}
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          {currentQuestion.type !== 'fill-in' && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                ← Câu trước
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={!hasAnswered}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? 'Hoàn thành' : 'Câu tiếp →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
