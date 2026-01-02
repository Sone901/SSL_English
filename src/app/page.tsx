'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useEffect, useState } from 'react'
import { fetchUserStats, UserStats } from '@/lib/progress'
import vocabularyData from '@/data/vocabulary.json'
import vietnameseTranslations from '@/data/vietnameseTranslations.json'

interface TopicProgress {
  level: string
  topic: string
  score: number
  total: number
  completedAt: string
}

export default function Home() {
  const [wordOfDay, setWordOfDay] = useState({
    word: 'Loading...',
    vietnamese: '',
    definition: '',
    example: ''
  })

  const [stats, setStats] = useState<UserStats>({
    vocabularyCompleted: 0,
    listeningCompleted: 0,
    readingCompleted: 0,
    testCompleted: 0,
    totalVocabularyWords: 0,
    totalListeningScore: 0,
    totalReadingScore: 0
  })
  const [activity, setActivity] = useState<any>({
    totalAttempts: 0,
    vocabularyAttempts: 0,
    readingAttempts: 0,
    listeningAttempts: 0,
    testAttempts: 0,
    lastActivityAt: null
  })
  const [loadingStats, setLoadingStats] = useState(true)
  const [completionDates, setCompletionDates] = useState<Set<number>>(new Set())

  // Word of the Day data - changes daily (random from vocabulary)
  const allWords = Object.values(vocabularyData as Record<string, Record<string, string[]>>)
    .flatMap(level => Object.values(level).flat())

  // Get random word of day based on current date
  const getRandomWordOfDay = () => {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 0)
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / 1000 / 60 / 60 / 24)
    
    const randomIndex = dayOfYear % allWords.length
    const selectedWord = allWords[randomIndex]
    const vietnamese = vietnameseTranslations[selectedWord.toLowerCase()] || selectedWord
    
    // Fetch pronunciation from dictionary API
    return { word: selectedWord, pronunciation: '', meaning: vietnamese }
  }

  // Initialize word of day and fetch pronunciation
  useEffect(() => {
    const initWordOfDay = async () => {
      const word = getRandomWordOfDay()
      
      // Fetch full definition from Dictionary API
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.word}`)
        const data = await response.json()
        
        if (data && data[0]) {
          const entry = data[0]
          const meaning = entry.meanings?.[0]
          const definition = meaning?.definitions[0]
          
          setWordOfDay({
            word: entry.word,
            vietnamese: word.meaning,
            definition: definition?.definition || 'No definition available',
            example: definition?.example || ''
          })
        } else {
          setWordOfDay({
            word: word.word,
            vietnamese: word.meaning,
            definition: 'Từ không tìm thấy định nghĩa',
            example: ''
          })
        }
      } catch (error) {
        console.error('Error fetching word definition:', error)
        setWordOfDay({
          word: word.word,
          vietnamese: word.meaning,
          definition: 'Không thể tải định nghĩa',
          example: ''
        })
      }
    }
    initWordOfDay()
  }, [])

  // Fetch user stats and track completion dates
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true)
      const userStats = await fetchUserStats()
      setStats(userStats)
      
      // Fetch activity data
      try {
        const activityRes = await fetch('/api/user/attempts')
        if (activityRes.ok) {
          const activityData = await activityRes.json()
          setActivity(activityData.attempts?.length > 0 
            ? { totalAttempts: activityData.totalAttempts } 
            : activity)
        }
      } catch (error) {
        console.error('Error fetching activity:', error)
      }
      
      // Extract completion dates from all progress
      const dates = new Set<number>()
      try {
        const [vocabRes, listeningRes, readingRes, testRes] = await Promise.all([
          fetch('/api/user/vocabulary-progress'),
          fetch('/api/user/listening-progress'),
          fetch('/api/user/reading-progress'),
          fetch('/api/user/test-progress')
        ])

        const allData = await Promise.all([
          vocabRes.json(),
          listeningRes.json(),
          readingRes.json(),
          testRes.json()
        ])

        // Collect all completion dates
        allData.forEach(data => {
          const progress = data.progress || []
          if (Array.isArray(progress)) {
            progress.forEach((item: any) => {
              const completedDate = new Date(item.completedAt)
              const today = new Date()
              
              // Only count dates in current month
              if (completedDate.getFullYear() === today.getFullYear() && 
                  completedDate.getMonth() === today.getMonth()) {
                dates.add(completedDate.getDate())
              }
            })
          }
        })
        
        setCompletionDates(dates)
      } catch (error) {
        console.error('Error fetching completion dates:', error)
      }
      
      setLoadingStats(false)
    }

    fetchStats()
  }, [])

  // Refetch stats when page comes into focus
  useEffect(() => {
    const handleFocus = async () => {
      const userStats = await fetchUserStats()
      setStats(userStats)
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Create flower elements dynamically
  useEffect(() => {
    const flowersContainer = document.createElement('div')
    flowersContainer.className = 'flowers-container'
    flowersContainer.setAttribute('aria-hidden', 'true')
    
    for (let i = 0; i < 12; i++) {
      const flower = document.createElement('img')
      flower.src = '/flower.svg'
      flower.alt = ''
      flower.className = 'flower'
      flower.style.left = `${(i * 8) + 5}%`
      flower.style.animationDelay = `${Math.random() * 8}s, ${Math.random() * 3}s`
      flowersContainer.appendChild(flower)
    }
    
    document.body.appendChild(flowersContainer)
    
    return () => {
      if (flowersContainer.parentNode) {
        flowersContainer.parentNode.removeChild(flowersContainer)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5D7] relative overflow-x-hidden">
      {/* --- CÁC HOẠT TIẾT TRANG TRÍ NỀN --- */}
      <div className="absolute top-0 -left-10 w-[300px] h-[300px] opacity-90 pointer-events-none z-0">
        <img src="/top_left.png" alt="Blossom" className="w-full h-full object-contain drop-shadow-lg" />
      </div>
      <div className="absolute top-20 right-0 w-64 h-64 opacity-90 pointer-events-none z-0">
        <img src="/top_right.png" alt="Lantern decoration" className="w-full h-full object-contain drop-shadow-lg" />
      </div>

      {/* Navigation - Theme Tết */}
      <nav className="bg-[#8B0000] text-[#FFD700] shadow-lg sticky top-0 z-50 border-b-4 border-[#FFD700] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="bg-red-700 p-2 rounded-lg shadow-lg border border-yellow-400">
                <h1 className="font-extrabold text-2xl tracking-wide text-yellow-400">SSL English</h1>
              </div>
            </Link>

            <ul className="hidden lg:flex space-x-6 items-center font-bold text-sm">
              <li><Link href="/" className="hover:text-white transition py-2 border-b-2 border-transparent hover:border-white">TRANG CHỦ</Link></li>
              <li><Link href="/vocabulary" className="hover:text-white transition py-2">TỪ VỰNG</Link></li>
              <li><Link href="/pronunciation" className="hover:text-white transition py-2">PHÁT ÂM</Link></li>
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

      {/* Hero Section with Background Image - Giữ nguyên */}
      <section 
        className="text-white py-16 md:py-24 px-4 relative overflow-hidden shadow-md"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(185, 28, 28, 0.6) 0%, rgba(234, 88, 12, 0.6) 100%), url('/image1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-yellow-500/20 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-yellow-300 text-sm font-bold mb-4 border border-yellow-300/30">
            <span className="mr-2">🌟</span> Chúc Mừng Năm Mới
          </div>
          <h2 className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-md">Năm Mới Bính Ngọ 2026</h2>
          <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-2xl mx-auto font-light">
            Năm mới, mục tiêu mới. Cùng <span className="font-bold text-yellow-300">SSL English</span> chinh phục đỉnh cao tiếng Anh!
          </p>
          <Link href="/skills">
            <button className="bg-yellow-400 text-red-700 font-extrabold py-4 px-10 rounded-full shadow-xl hover:bg-yellow-300 hover:shadow-2xl hover:-translate-y-1 transition transform duration-300 flex items-center mx-auto">
              <span className="mr-3">🚀</span> Bắt đầu học ngay
            </button>
          </Link>
        </div>
      </section>

      {/* Main Content - 3 columns layout */}
      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Sidebar - Word of Day & Calendar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Word of the Day Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 border-t-8 border-t-red-500 relative overflow-hidden group hover:shadow-2xl transition">
                <div className="absolute -right-6 -top-6 bg-red-100 w-24 h-24 rounded-full group-hover:scale-150 transition duration-500"></div>
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">Mới</span>
                
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Từ của ngày</p>
                <h2 className="text-4xl font-extrabold text-gray-800 mb-1 break-words">{wordOfDay.word}</h2>
                <p className="text-[#8B0000] font-bold mb-4 text-lg">{wordOfDay.vietnamese}</p>
                
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-4">
                  <p className="text-gray-800 font-medium text-sm">{wordOfDay.definition}</p>
                  {wordOfDay.example && (
                    <p className="text-gray-700 italic text-sm mt-2">"{wordOfDay.example}"</p>
                  )}
                </div>
                
                <Link href="/vocabulary" className="text-red-600 font-bold hover:text-red-700 flex items-center group-hover:translate-x-2 transition">
                  Chi tiết <span className="ml-2">→</span>
                </Link>
              </div>

              {/* Calendar Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600 mr-3">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Điểm danh tháng</h3>
                    <p className="text-xs text-gray-400">Tiến độ học tập của bạn</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <span key={i} className="text-xs font-bold text-gray-400">{day}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }).map((_, i) => {
                      const date = i + 1
                      const isCompleted = completionDates.has(date)
                      const today = new Date().getDate()
                      const isToday = date === today
                      
                      return (
                        <div 
                          key={i} 
                          className={`aspect-square flex items-center justify-center text-xs rounded-lg font-bold transition-all ${
                            isCompleted 
                              ? 'bg-green-500 text-white shadow-md' 
                              : isToday
                              ? 'bg-yellow-400 text-gray-800 border-2 border-orange-500'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                          title={isCompleted ? 'Hoàn thành' : ''}
                        >
                          {date}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main Content - Suggestions */}
            <div className="lg:col-span-2">
              
              <div className="flex items-center mb-6 px-2">
                <div className="bg-yellow-500 w-2 h-8 rounded-full mr-3"></div>
                <h2 className="text-2xl font-extrabold text-gray-800 uppercase tracking-wide">Gợi ý hôm nay</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/vocabulary" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group hover:border-orange-300">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl mr-5 shadow-lg group-hover:rotate-12 transition">
                      🎲
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition">10 Từ Ngẫu Nhiên</h4>
                      <p className="text-sm text-gray-500 mt-1">Thử thách mỗi ngày</p>
                    </div>
                  </div>
                </Link>

                <Link href="/skills/listening" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group hover:border-green-300">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl mr-5 shadow-lg group-hover:rotate-12 transition">
                      🎧
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-800 group-hover:text-green-600 transition">Kỹ Năng Nghe</h4>
                      <p className="text-sm text-gray-500 mt-1">Luyện nghe cơ bản</p>
                    </div>
                  </div>
                </Link>

                <Link href="/skills/reading" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group hover:border-purple-300">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl mr-5 shadow-lg group-hover:rotate-12 transition">
                      📖
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition">Kỹ Năng Đọc</h4>
                      <p className="text-sm text-gray-500 mt-1">Đọc hiểu văn bản</p>
                    </div>
                  </div>
                </Link>

                <Link href="/test" className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group hover:border-blue-300">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl mr-5 shadow-lg group-hover:rotate-12 transition">
                      🎓
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition">Bài Kiểm Tra</h4>
                      <p className="text-sm text-gray-500 mt-1">Đánh giá trình độ</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Activity/Stats placeholder */}
              <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-extrabold text-gray-800 text-lg">
                    <span className="mr-2">📊</span>Hoạt động Học Tập
                  </h3>
                </div>

                                {loadingStats ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-500 text-sm mt-2">Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 p-4 rounded-xl hover:shadow-md transition">
                        <div className="text-3xl font-bold text-blue-600">{stats.listeningCompleted}</div>
                        <p className="text-sm text-gray-600 mt-1">Listening</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl hover:shadow-md transition">
                        <div className="text-3xl font-bold text-green-600">{stats.readingCompleted}</div>
                        <p className="text-sm text-gray-600 mt-1">Reading</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl hover:shadow-md transition">
                        <div className="text-3xl font-bold text-purple-600">{stats.totalVocabularyWords}</div>
                        <p className="text-sm text-gray-600 mt-1">Vocabulary</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                      <p className="text-center text-sm text-gray-700 font-semibold">
                        ✅ {stats.vocabularyCompleted} chủ đề từ vựng
                      </p>
                      {stats.testCompleted > 0 && (
                        <p className="text-center text-sm text-gray-700 font-semibold">
                          🎓 {stats.testCompleted} bài kiểm tra
                        </p>
                      )}
                    </div>
                  </>
                )}

                <p className="text-center text-xs text-gray-400 mt-4 italic">
                  Tiếp tục học hôm nay để cập nhật tiến độ!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 SSL English Platform. Thiết kế cho năm mới thành công!</p>
          <p className="text-sm mt-2">Contact: contact@sslenglish.com</p>
        </div>
      </footer>
    </div>
  )
}
