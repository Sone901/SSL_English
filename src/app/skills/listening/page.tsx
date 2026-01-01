'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'
import { LISTENING_CONTENTS } from '@/data/skillsData'

export default function ListeningPage() {
  const [showTranscript, setShowTranscript] = useState<Record<number, boolean>>({})
  const [selectedLevel, setSelectedLevel] = useState<string>('A1')
  
  // Combine all items from all categories
  const allItems = Object.values(LISTENING_CONTENTS).flatMap(content => content.items)
  
  // Filter items by selected level
  const filteredItems = allItems.filter(item => item.level === selectedLevel)

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

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Kỹ Năng Nghe (Listening)</h1>
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

        {/* Content Section */}
        <div className="bg-white rounded-lg p-8 border-2 border-yellow-200">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Bài Tập Luyện Nghe</h2>
          <p className="text-lg text-gray-600 mb-8">Luyện tập nghe hiểu tiếng Anh qua các bài học đa dạng</p>

          {/* Items Grid */}
          <div className="space-y-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-red-600 mb-1">{item.title}</h3>
                    {item.subtitle && <p className="text-gray-600">{item.subtitle}</p>}
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                      {item.level}
                    </span>
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6">{item.description}</p>

                {/* Video Player Section */}
                {item.videoUrl && (
                  <div className="mb-6">
                    <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={item.videoUrl}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Transcript Section */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setShowTranscript({ ...showTranscript, [item.id]: !showTranscript[item.id] })}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    {showTranscript[item.id] ? 'Ẩn nội dung' : 'Xem nội dung'}
                  </button>
                </div>

                {showTranscript[item.id] && item.transcript && (
                  <div className="mt-4 bg-white border-l-4 border-blue-500 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-3">Nội Dung (Transcript)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-blue-600 mb-2">Tiếng Anh:</p>
                        <p className="text-gray-700 whitespace-pre-line text-sm">{item.transcript}</p>
                      </div>
                      {item.viTranslation && (
                        <div>
                          <p className="font-semibold text-green-600 mb-2">Tiếng Việt:</p>
                          <p className="text-gray-700 whitespace-pre-line text-sm">{item.viTranslation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Learning Tips */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-gray-800 mb-2">Mẹo học:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✅ Xem video ít nhất 2-3 lần</li>
                    <li>✅ Tập trung vào ý chính và từ khóa</li>
                    <li>✅ Xem transcript sau khi xem để so sánh</li>
                    <li>✅ Ghi chú những từ mới bạn nghe được</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
