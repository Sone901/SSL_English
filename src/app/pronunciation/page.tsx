'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState, useRef } from 'react'

interface SpeechRecognitionResult {
  word: string
  phonetic: string
  transcript: string
  accuracy: number
  feedback: string
}

export default function PronunciationPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const courseData = [
    { 
      id: 1, 
      title: 'Âm Vị Tiếng Anh', 
      lessons: 8, 
      desc: 'Các âm cơ bản trong tiếng Anh',
      words: [
        { word: 'apple', phonetic: '/ˈæpl/', description: 'Âm /æ/ - như trong "cat"' },
        { word: 'eat', phonetic: '/iːt/', description: 'Âm /iː/ - như trong "see"' },
        { word: 'book', phonetic: '/bʊk/', description: 'Âm /ʊ/ - như trong "put"' },
        { word: 'cat', phonetic: '/kæt/', description: 'Âm /æ/ - như trong "apple"' },
        { word: 'dog', phonetic: '/dɔːɡ/', description: 'Âm /ɔː/ - như trong "ball"' },
        { word: 'up', phonetic: '/ʌp/', description: 'Âm /ʌ/ - như trong "love"' },
        { word: 'about', phonetic: '/əˈbaʊt/', description: 'Âm /ə/ - schwa sound' },
        { word: 'ear', phonetic: '/ɪr/', description: 'Âm /ɪ/ - như trong "sit"' },
      ]
    },
    { 
      id: 2, 
      title: 'Phát Âm Nguyên Âm', 
      lessons: 6, 
      desc: 'Luyện phát âm các nguyên âm',
      words: [
        { word: 'be', phonetic: '/biː/', description: 'Nguyên âm dài /iː/' },
        { word: 'sit', phonetic: '/sɪt/', description: 'Nguyên âm ngắn /ɪ/' },
        { word: 'set', phonetic: '/set/', description: 'Nguyên âm /e/' },
        { word: 'sat', phonetic: '/sæt/', description: 'Nguyên âm /æ/' },
        { word: 'boat', phonetic: '/boʊt/', description: 'Nguyên âm dài /oʊ/' },
        { word: 'but', phonetic: '/bʌt/', description: 'Nguyên âm /ʌ/' },
      ]
    },
    { 
      id: 3, 
      title: 'Phát Âm Phụ Âm', 
      lessons: 7, 
      desc: 'Luyện phát âm các phụ âm',
      words: [
        { word: 'think', phonetic: '/θɪŋk/', description: 'Phụ âm /θ/ - như "th" trong "thing"' },
        { word: 'this', phonetic: '/ðɪs/', description: 'Phụ âm /ð/ - như "th" trong "the"' },
        { word: 'ship', phonetic: '/ʃɪp/', description: 'Phụ âm /ʃ/ - như "sh"' },
        { word: 'measure', phonetic: '/ˈmeʒər/', description: 'Phụ âm /ʒ/ - như "s" trong "measure"' },
        { word: 'choose', phonetic: '/tʃuːz/', description: 'Phụ âm /tʃ/ - như "ch"' },
        { word: 'jungle', phonetic: '/ˈdʒʌŋɡəl/', description: 'Phụ âm /dʒ/ - như "j"' },
        { word: 'sing', phonetic: '/sɪŋ/', description: 'Phụ âm /ŋ/ - như "ng"' },
      ]
    },
  ]

  if (selectedCourse) {
    const course = courseData.find(c => c.id === selectedCourse)
    if (course) {
      const currentWord = course.words[currentWordIndex]
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
                  <li><Link href="/pronunciation" className="text-yellow-300 font-bold">Phát âm</Link></li>
                  <li><Link href="/skills" className="hover:text-yellow-300 transition">Kỹ năng</Link></li>
                  <li><Link href="/test" className="hover:text-yellow-300 transition">Bài kiểm tra</Link></li>
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
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
                <p className="text-gray-600 mt-2">{currentWordIndex + 1} / {course.words.length}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCourse(null)
                  setCurrentWordIndex(0)
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                ← Quay lại
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentWordIndex + 1) / course.words.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Course Description */}
            <p className="text-lg text-gray-600 mb-8">{course.desc}</p>

            {/* Speech Recognition Component */}
            <SpeechRecognitionComponent 
              targetWord={currentWord.word}
              targetPhonetic={currentWord.phonetic}
              description={currentWord.description}
              onNextWord={() => {
                if (currentWordIndex < course.words.length - 1) {
                  setCurrentWordIndex(currentWordIndex + 1)
                } else {
                  // Course completed
                  alert('🎉 Hoàn thành khóa học này! Chúc mừng!')
                  setSelectedCourse(null)
                  setCurrentWordIndex(0)
                }
              }}
            />

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setCurrentWordIndex(Math.max(0, currentWordIndex - 1))}
                disabled={currentWordIndex === 0}
                className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
                  currentWordIndex === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                ← Từ trước
              </button>
              <button
                onClick={() => setCurrentWordIndex(Math.min(course.words.length - 1, currentWordIndex + 1))}
                disabled={currentWordIndex === course.words.length - 1}
                className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
                  currentWordIndex === course.words.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Từ tiếp theo →
              </button>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
            <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
          </footer>
        </div>
      )
    }
  }

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
              <li><Link href="/pronunciation" className="text-yellow-300 font-bold">Phát âm</Link></li>
              <li><Link href="/skills" className="hover:text-yellow-300 transition">Kỹ năng</Link></li>
              <li><Link href="/test" className="hover:text-yellow-300 transition">Bài kiểm tra</Link></li>
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
        <h1 className="text-4xl font-bold mb-8 text-gray-800">🎤 Phát Âm</h1>
        <p className="text-xl text-gray-600 mb-12">Học cách phát âm chuẩn xác như người bản xứ.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((course) => (
            <div key={course.id} className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.desc}</p>
              <p className="text-sm text-gray-500 mb-4">📝 {course.lessons} bài học</p>
              <button 
                onClick={() => setSelectedCourse(course.id)}
                className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700 transition"
              >
                Bắt đầu học
              </button>
            </div>
          ))}
        </div>

        {/* ============================================ */}
        {/* AI INTEGRATION: Speech Recognition Component */}
        {/* Component này sử dụng Web Speech API để nhận diện */}
        {/* và đánh giá phát âm của người dùng */}
        {/* ============================================ */}
        {/* Speech Recognition Component */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Luyện Phát Âm Với AI</h2>
          <p className="text-lg text-gray-600 mb-4">Nhấn nút và nói theo từ mà AI đưa ra. Nhận phản hồi ngay lập tức về độ chính xác của bạn.</p>
          
          <SpeechRecognitionComponent 
            targetWord="example" 
            targetPhonetic="/ɪɡˈzæmpəl/" 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

function SpeechRecognitionComponent({ 
  targetWord, 
  targetPhonetic,
  description,
  onNextWord
}: { 
  targetWord: string
  targetPhonetic: string
  description?: string
  onNextWord?: () => void
}) {
  const [isListening, setIsListening] = useState(false)
  const [result, setResult] = useState<SpeechRecognitionResult | null>(null)
  const [error, setError] = useState<string>('')
  const recognitionRef = useRef<any>(null)

  const calculateAccuracy = (spoken: string, target: string): number => {
    const spokenLower = spoken.toLowerCase()
    const targetLower = target.toLowerCase()
    
    if (spokenLower === targetLower) return 100
    
    // Tính toán độ tương đồng giữa hai chuỗi
    let matches = 0
    const maxLength = Math.max(spokenLower.length, targetLower.length)
    
    for (let i = 0; i < Math.min(spokenLower.length, targetLower.length); i++) {
      if (spokenLower[i] === targetLower[i]) matches++
    }
    
    return Math.round((matches / maxLength) * 100)
  }

  const getFeedback = (accuracy: number): string => {
    if (accuracy >= 95) return '✅ Phát âm hoàn hảo!'
    if (accuracy >= 85) return '👍 Rất tốt! Chỉ cần nhỏ chỉnh thêm'
    if (accuracy >= 70) return '📝 Tốt, nhưng cần cải thiện'
    if (accuracy >= 50) return '⚠️ Cần luyện tập thêm'
    return '❌ Hãy thử lại và lắng nghe kỹ lưỡi'
  }

  // ============================================
  // AI INTEGRATION: Speech Recognition API
  // ============================================
  // Function này sử dụng Web Speech API để nhận diện giọng nói của người dùng
  // So sánh với từ mục tiêu và đưa ra phản hồi về độ chính xác
  const startListening = () => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError('Trình duyệt của bạn không hỗ trợ Speech Recognition')
      return
    }

    try {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.lang = 'en-US'
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.maxAlternatives = 1

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setError('')
        setResult(null)
      }

      // Xử lý kết quả nhận diện giọng nói
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        const confidence = event.results[0][0].confidence

        // Tính toán độ chính xác bằng cách so sánh với từ mục tiêu
        const accuracy = calculateAccuracy(transcript, targetWord)
        const feedback = getFeedback(accuracy)

        setResult({
          word: targetWord,
          phonetic: targetPhonetic,
          transcript: transcript,
          accuracy: accuracy,
          feedback: feedback
        })

        console.log('Bạn nói:', transcript)
        console.log('Độ chính xác:', accuracy + '%')
        console.log('Độ tin cậy:', Math.round(confidence * 100) + '%')
      }

      recognitionRef.current.onerror = (event: any) => {
        setError(`Lỗi: ${event.error}`)
        console.error('Speech Recognition Error:', event.error)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.start()
    } catch (err) {
      setError('Không thể khởi động nhận diện giọng nói')
      console.error('Error:', err)
    }
  }
  // ============================================

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 90) return 'text-green-600'
    if (accuracy >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
      {/* Word to Pronounce */}
      <div className="mb-6 text-center">
        <h3 className="text-sm text-gray-600 mb-2">Hãy phát âm từ này:</h3>
        <div className="bg-white rounded-lg p-4 mb-3">
          <p className="text-3xl font-bold text-blue-600">{targetWord}</p>
          <p className="text-lg text-gray-500 font-mono">{targetPhonetic}</p>
        </div>
        {description && (
          <p className="text-sm text-gray-700 bg-blue-100 p-3 rounded mt-3 italic">
            📚 {description}
          </p>
        )}
      </div>

      {/* Listening Button */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition text-white flex items-center justify-center gap-2 ${
            isListening
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 active:scale-95'
          }`}
        >
          🎤 {isListening ? 'Đang lắng nghe...' : 'Nhấn để phát âm'}
        </button>
        {isListening && (
          <button
            onClick={stopListening}
            className="py-3 px-6 rounded-lg font-bold bg-gray-600 hover:bg-gray-700 text-white transition"
          >
            ⏹️ Dừng
          </button>
        )}
      </div>

      {/* Listening Indicator */}
      {isListening && (
        <div className="mb-6 flex justify-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-semibold">⚠️ Lỗi</p>
          <p>{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
          <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Kết quả phát âm</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Từ chuẩn:</p>
              <p className="text-lg font-bold text-blue-600">{result.word}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Bạn phát âm:</p>
              <p className="text-lg font-bold text-purple-600">{result.transcript}</p>
            </div>
          </div>

          {/* Accuracy Meter */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-700">Độ chính xác:</p>
              <p className={`text-2xl font-bold ${getAccuracyColor(result.accuracy)}`}>
                {result.accuracy}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  result.accuracy >= 90
                    ? 'bg-green-500'
                    : result.accuracy >= 70
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${result.accuracy}%` }}
              ></div>
            </div>
          </div>

          {/* Feedback */}
          <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-lg font-bold text-gray-800">{result.feedback}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                setResult(null)
                startListening()
              }}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
            >
              🔄 Thử lại
            </button>
            {onNextWord && (
              <button
                onClick={onNextWord}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition"
              >
                ➜ Từ tiếp theo
              </button>
            )}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 text-sm text-gray-600 bg-white p-3 rounded-lg">
        <p>💡 Mẹo: Nói rõ ràng, tự nhiên và lắng nghe âm thanh của mình trước khi nhấn nút</p>
      </div>
    </div>
  )
}
