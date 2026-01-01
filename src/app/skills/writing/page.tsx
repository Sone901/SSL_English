'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'
import { WRITING_CONTENTS } from '@/data/skillsData'

export default function WritingPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('A1')
  const [showSample, setShowSample] = useState<Record<number, boolean>>({})
  const [userText, setUserText] = useState<Record<number, string>>({})
  
  // Combine all items from all categories
  const allItems = Object.values(WRITING_CONTENTS).flatMap(content => content.items)
  
  // Filter items by selected level
  const filteredItems = allItems.filter(item => item.level === selectedLevel)

  return (
    <div className="min-h-screen flex flex-col">
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
              <li><Link href="/skills" className="text-yellow-300 font-bold">Kỹ năng</Link></li>
              <li><Link href="/test" className="hover:text-yellow-300 transition">Bài kiểm tra</Link></li>
              <li><Link href="/roadmap" className="hover:text-yellow-300 transition">Lộ trình học</Link></li>
            </ul>
            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">✍️ Kỹ Năng Viết (Writing)</h1>
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
            Hiển thị {filteredItems.length} bài học cấp độ {selectedLevel}
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border-2 border-yellow-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Bài Tập Luyện Viết</h2>
          <p className="text-lg text-gray-600 mb-8">Luyện tập viết tiếng Anh qua các bài học đa dạng</p>

          {/* Writing Items */}
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-600 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                      {item.level}
                    </span>
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      📝 {item.wordCount}
                    </span>
                  </div>
                </div>

                {/* Prompt */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">✏️ Đề bài:</h4>
                  <p className="text-gray-700 text-lg">{item.prompt}</p>
                </div>

                {/* Writing Area */}
                <div className="mb-4">
                  <label className="font-semibold text-gray-800 mb-2 block">✍️ Viết câu trả lời của bạn:</label>
                  <textarea
                    value={userText[item.id] || ''}
                    onChange={(e) => setUserText({ ...userText, [item.id]: e.target.value })}
                    placeholder="Start writing here..."
                    className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Số từ: {(userText[item.id] || '').split(/\s+/).filter(w => w.length > 0).length}
                  </p>
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
                      <h4 className="font-bold text-gray-800 mb-2">📝 Sample Answer (English):</h4>
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
                    <li>✅ Kiểm tra ngữ pháp trước khi hoàn thành</li>
                    <li>✅ Sử dụng từ vựng phong phú</li>
                    <li>✅ Viết câu rõ ràng và mạch lạc</li>
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
