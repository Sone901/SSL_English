'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'
import { SPEAKING_CONTENTS, speakText } from '@/data/skillsData'

export default function SpeakingPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('A1')
  const [showSample, setShowSample] = useState<Record<number, boolean>>({})
  
  // Combine all items from all categories
  const allItems = Object.values(SPEAKING_CONTENTS).flatMap(content => content.items)
  
  // Filter items by selected level
  const filteredItems = allItems.filter(item => item.level === selectedLevel)

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5D7]">
      {/* --- CÁC HOẠT TIẾT TRANG TRÍ NỀN --- */}
      <div className="absolute top-0 -left-10 w-[300px] h-[300px] opacity-90 pointer-events-none z-0">
        <img src="/top_left.png" alt="Blossom" className="w-full h-full object-contain drop-shadow-lg" />
      </div>
      <div className="absolute top-20 right-0 w-64 h-64 opacity-90 pointer-events-none z-0">
        <img src="/top_right.png" alt="Lantern decoration" className="w-full h-full object-contain drop-shadow-lg" />
      </div>

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

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#8B0000]" style={{textShadow: '2px 2px 4px rgba(139,0,0,0.2)'}}>🗣️ Kỹ Năng Nói (Speaking)</h1>
          <Link href="/skills">
            <button className="bg-gradient-to-r from-[#8B0000] to-[#A50000] hover:from-[#A50000] hover:to-[#8B0000] text-[#FFD700] px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-300 border-2 border-[#FFD700]">
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
            Hiển thị {filteredItems.length} bài học cấp độ {selectedLevel}
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border-2 border-yellow-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Bài Tập Luyện Nói</h2>
          <p className="text-lg text-gray-600 mb-8">Luyện tập nói tiếng Anh qua các bài học đa dạng</p>

          {/* Speaking Items */}
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                {/* Prompt */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">🎤 Đề bài:</h4>
                  <p className="text-gray-700 text-lg">{item.prompt}</p>
                </div>

                {/* Show/Hide Sample Answer Button */}
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => setShowSample({ ...showSample, [item.id]: !showSample[item.id] })}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    {showSample[item.id] ? '🙈 Ẩn câu trả lời mẫu' : '👁️ Xem câu trả lời mẫu'}
                  </button>
                </div>

                {/* Sample Answer */}
                {showSample[item.id] && item.sampleAnswer && (
                  <div className="space-y-4">
                    <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">📝 Sample Answer (English):</h4>
                        <button
                          onClick={() => speakText(item.sampleAnswer || '', 'en-US')}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded transition"
                        >
                          🔊 Nghe
                        </button>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{item.sampleAnswer}</p>
                    </div>
                    {item.viSample && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">🇻🇳 Bản dịch tiếng Việt:</h4>
                        <p className="text-gray-700 leading-relaxed">{item.viSample}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tips */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-gray-800 mb-2">💡 Mẹo:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✅ Nói chậm và rõ ràng</li>
                    <li>✅ Sử dụng câu đơn giản</li>
                    <li>✅ Luyện tập nhiều lần</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
