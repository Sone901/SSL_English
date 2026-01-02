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
          <nav className="bg-[#8B0000] text-[#FFD700] shadow-lg sticky top-0 z-50 border-b-4 border-[#FFD700]">
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
                  <li><Link href="/pronunciation" className="hover:text-white transition py-2 border-b-2 border-white">PHÁT ÂM</Link></li>
                  <li><Link href="/skills" className="hover:text-white transition py-2">KỸ NĂNG</Link></li>
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
    <div className="min-h-screen bg-[#FFF5D7] font-sans text-[#4A0E0E] relative overflow-x-hidden">
      
      {/* --- CÁC HOẠT TIẾT TRANG TRÍ NỀN --- */}
      {/* 1. Cành đào/mai góc trên trái */}
      <div className="absolute top-0 -left-10 w-[300px] h-[300px] opacity-90 pointer-events-none z-0">
        <img src="/top_left.png" alt="Blossom" className="w-full h-full object-contain drop-shadow-lg" />
      </div>
      {/* 2. Đèn lồng góc trên phải */}
      <div className="absolute top-20 right-0 w-64 h-64 opacity-90 pointer-events-none z-0">
        <img src="/top_right.png" alt="Lantern decoration" className="w-full h-full object-contain drop-shadow-lg" />
      </div>

      {/* --- NAVBAR --- */}
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
              <li><Link href="/pronunciation" className="hover:text-white transition py-2 border-b-2 border-white">PHÁT ÂM</Link></li>
              <li><Link href="/skills" className="hover:text-white transition py-2">KỸ NĂNG</Link></li>
              <li><Link href="/test" className="hover:text-white transition py-2">BÀI KIỂM TRA</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition py-2">LỘ TRÌNH</Link></li>
            </ul>

            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-14 relative z-10">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center md:justify-start gap-3 mb-3 text-[#A50000]">
            🎤 Phát Âm
          </h1>
          <p className="text-xl opacity-90 font-medium">Học cách phát âm chuẩn xác như người bản xứ.</p>
        </header>

        {/* Section 1: Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {courseData.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-[#A50000] to-[#8B0000] border-[3px] border-[#FFD700] rounded-2xl p-6 text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_20px_rgba(139,0,0,0.3)]">
              {/* Hiệu ứng ánh sáng vàng bên trong card */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD700] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#FFD700]">{item.title}</h3>
                  {/* Icon trang trí nhỏ góc card */}
                  <div className="text-[#FFD700] opacity-50">◆</div>
                </div>
              
                <p className="text-md mb-6 opacity-95">{item.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-sm flex items-center gap-2 font-medium bg-[#8B0000] bg-opacity-50 px-3 py-1 rounded-full">
                    📚 {item.lessons} bài học
                  </p>
                </div>
                
                <button 
                  onClick={() => setSelectedCourse(item.id)}
                  className="w-full mt-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] font-extrabold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all active:scale-95"
                >
                  Bắt đầu học
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: AI Practice (Giao diện cuộn thư + Ngựa) */}
        <section className="mt-16 relative">
          {/* --- HÌNH ẢNH NGỰA TRANG TRÍ --- */}
          {/* Ngựa trái - Ẩn trên mobile, hiện trên màn hình lớn */}
          <div className="hidden lg:block absolute -left-32 bottom-0 w-80 h-auto pointer-events-none z-20">
            <img src="/botton_left.png" alt="Horse left" className="w-full h-auto object-contain drop-shadow-xl" />
          </div>
          {/* Ngựa phải */}
          <div className="hidden lg:block absolute -right-32 bottom-0 w-80 h-auto pointer-events-none z-20">
            <img src="/botton_right.png" alt="Horse right" className="w-full h-auto object-contain drop-shadow-xl" />
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center text-[#A50000]">Luyện Phát Âm Với AI</h2>
          <p className="text-center mb-10 text-lg">Nhấn nút và nói theo từ mà AI đưa ra. Nhận phản hồi ngay lập tức.</p>

          {/* Khung Cuộn Thư */}
          <div className="relative max-w-3xl mx-auto z-10">
            {/* Trục cuốn thư (Scroll Handles) */}
            <div className="absolute -left-3 top-[-20px] bottom-[-20px] w-8 bg-gradient-to-b from-[#8B4513] to-[#5C2E0B] rounded-full border-4 border-[#FFD700] shadow-lg hidden md:block"></div>
            <div className="absolute -right-3 top-[-20px] bottom-[-20px] w-8 bg-gradient-to-b from-[#8B4513] to-[#5C2E0B] rounded-full border-4 border-[#FFD700] shadow-lg hidden md:block"></div>

            {/* Nội dung bên trong cuộn thư */}
            <div className="bg-[#FFFBE6] border-y-8 border-[#8B4513] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.2)] text-center relative mx-2 md:mx-6 rounded-lg">
              <SpeechRecognitionComponent 
                targetWord="example" 
                targetPhonetic="/ɪɡˈzæmpəl/" 
              />
            </div>
          </div>
        </section>
      </main>

      {/* --- HOẠT TIẾT CHÂN TRANG (MÂY) --- */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-repeat-x opacity-60 pointer-events-none z-0" 
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cloud-pattern.png")',
          maskImage: 'linear-gradient(to top, black, transparent)'
        }}>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16 relative z-10">
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

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        const confidence = event.results[0][0].confidence

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
    <div className="text-center">
      {/* Word to Pronounce - Thiết kế giống trong ảnh */}
      <p className="text-[#8B0000] mb-2 font-medium">Hãy phát âm từ này:</p>
      <h3 className="text-6xl font-black text-[#A50000] mb-2 tracking-wide">{targetWord}</h3>
      <p className="text-2xl text-gray-600 mb-10 font-serif">{targetPhonetic}</p>

      {/* Listening Button */}
      {!isListening ? (
        <button
          onClick={startListening}
          className="w-full md:w-2/3 mx-auto bg-gradient-to-r from-[#A50000] to-[#FF4500] text-white py-4 rounded-full font-bold text-xl flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-red-600/40 shadow-md active:scale-95 transition-all"
        >
        Nhấn để phát âm
        </button>
      ) : (
        <button
          onClick={stopListening}
          className="w-full md:w-2/3 mx-auto bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-full font-bold text-xl flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-gray-600/40 shadow-md active:scale-95 transition-all"
        >
         Dừng lại
        </button>
      )}

      {/* Listening Indicator */}
      {isListening && (
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-semibold">⚠️ Lỗi</p>
          <p>{error}</p>
        </div>
      )}

      {/* Result - Hiển thị trong textbox giống ảnh */}
      {result && (
        <div className="mt-8 bg-white p-6 rounded-xl border-2 border-[#8B4513] text-left">
          <h4 className="text-lg font-bold text-[#8B0000] mb-4">📊 Kết quả phát âm</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#FFF5D7] p-4 rounded-lg border border-[#FFD700]">
              <p className="text-sm text-gray-600 mb-1">Từ chuẩn:</p>
              <p className="text-lg font-bold text-[#A50000]">{result.word}</p>
            </div>
            <div className="bg-[#FFF5D7] p-4 rounded-lg border border-[#FFD700]">
              <p className="text-sm text-gray-600 mb-1">Bạn phát âm:</p>
              <p className="text-lg font-bold text-[#A50000]">{result.transcript}</p>
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
          <div className="text-center p-4 bg-[#FFD700] bg-opacity-20 rounded-lg border-2 border-[#FFD700]">
            <p className="text-lg font-bold text-[#8B0000]">{result.feedback}</p>
          </div>

          {/* Buttons */}
          {onNextWord && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setResult(null)
                  startListening()
                }}
                className="flex-1 bg-gradient-to-r from-[#A50000] to-[#8B0000] hover:shadow-lg text-white font-bold py-2 rounded-lg transition"
              >
                🔄 Thử lại
              </button>
              <button
                onClick={onNextWord}
                className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:shadow-lg text-[#8B0000] font-bold py-2 rounded-lg transition"
              >
                ➜ Từ tiếp theo
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mẹo */}
      <div className="mt-8 bg-[#FFD700] bg-opacity-20 p-4 rounded-xl border border-[#FFD700] text-sm font-medium text-[#8B0000] inline-block">
        💡 Mẹo: Nói rõ ràng, tự nhiên và lắng nghe âm thanh của mình trước khi nhấn nút.
      </div>
    </div>
  )
}
