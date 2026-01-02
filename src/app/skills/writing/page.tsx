'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'
import { WRITING_CONTENTS } from '@/data/skillsData'
import { WritingCheckResult, LanguageToolMatch } from '@/lib/types'

export default function WritingPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('A1')
  const [showSample, setShowSample] = useState<Record<number, boolean>>({})
  const [userText, setUserText] = useState<Record<number, string>>({})
  const [checkResult, setCheckResult] = useState<Record<number, WritingCheckResult | null>>({})
  const [isChecking, setIsChecking] = useState<Record<number, boolean>>({})

  // Handle check writing
  const handleCheckWriting = async (itemId: number) => {
    const text = userText[itemId]
    
    if (!text || text.trim().length === 0) {
      alert('Vui lòng viết câu trả lời trước khi kiểm tra!')
      return
    }

    setIsChecking({ ...isChecking, [itemId]: true })

    try {
      const response = await fetch('/api/writing/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Failed to check writing')
      }

      const result = await response.json()
      setCheckResult({ ...checkResult, [itemId]: result })
    } catch (error) {
      console.error('Error checking writing:', error)
      alert('Có lỗi xảy ra khi kiểm tra bài viết. Vui lòng thử lại!')
    } finally {
      setIsChecking({ ...isChecking, [itemId]: false })
    }
  }

  // Highlight errors in text
  const highlightErrors = (text: string, matches: LanguageToolMatch[]) => {
    if (!matches || matches.length === 0) return text

    let highlighted = text
    const sortedMatches = [...matches].sort((a, b) => b.offset - a.offset)

    sortedMatches.forEach((match) => {
      const before = highlighted.substring(0, match.offset)
      const error = highlighted.substring(match.offset, match.offset + match.length)
      const after = highlighted.substring(match.offset + match.length)
      
      const replacement = match.replacements?.[0]?.value || ''
      const issueType = match.rule?.issueType || 'other'
      
      let colorClass = 'bg-red-200 border-b-2 border-red-500'
      if (issueType.includes('misspelling')) {
        colorClass = 'bg-red-200 border-b-2 border-red-500'
      } else if (issueType.includes('grammar')) {
        colorClass = 'bg-yellow-200 border-b-2 border-yellow-500'
      } else {
        colorClass = 'bg-blue-200 border-b-2 border-blue-500'
      }

      highlighted = before + `<span class="${colorClass} cursor-help" title="${match.message}${replacement ? ' → ' + replacement : ''}">${error}</span>` + after
    })

    return highlighted
  }
  
  // Combine all items from all categories
  const allItems = Object.values(WRITING_CONTENTS).flatMap(content => content.items)
  
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
              <li><Link href="/vocabulary" className="hover:text-white transition py-2">TỪ VỰNG</Link></li>
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
          <h1 className="text-4xl font-bold text-[#8B0000]" style={{textShadow: '2px 2px 4px rgba(139,0,0,0.2)'}}>Kỹ Năng Viết (Writing)</h1>
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
                </div>

                {/* Prompt */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-gray-800 mb-2">Đề bài:</h4>
                  <p className="text-gray-700 text-lg">{item.prompt}</p>
                </div>

                {/* Writing Area */}
                <div className="mb-4">
                  <label className="font-semibold text-gray-800 mb-2 block">Viết câu trả lời của bạn:</label>
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

                {/* Check Writing Button */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => handleCheckWriting(item.id)}
                    disabled={isChecking[item.id]}
                    className={`font-bold py-2 px-6 rounded-lg transition ${
                      isChecking[item.id]
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {isChecking[item.id] ? 'Đang kiểm tra...' : 'Kiểm tra bài viết'}
                  </button>
                  <button
                    onClick={() => setShowSample({ ...showSample, [item.id]: !showSample[item.id] })}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    {showSample[item.id] ? 'Ẩn câu trả lời mẫu' : 'Xem câu trả lời mẫu'}
                  </button>
                </div>

                {/* Check Result */}
                {checkResult[item.id] && (
                  <div className="mb-4 space-y-4">
                    {/* Score Summary */}
                    <div className={`p-4 rounded-lg border-2 ${
                      checkResult[item.id]!.feedbackLevel === 'excellent' ? 'bg-green-50 border-green-500' :
                      checkResult[item.id]!.feedbackLevel === 'good' ? 'bg-blue-50 border-blue-500' :
                      checkResult[item.id]!.feedbackLevel === 'fair' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-red-50 border-red-500'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-800">
                          Kết quả: {checkResult[item.id]!.score}/100 điểm
                        </h4>
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Tổng lỗi: {checkResult[item.id]!.errorCount}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{checkResult[item.id]!.feedbackMessage}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-red-600">Ngữ pháp: {checkResult[item.id]!.grammarErrors}</span>
                        <span className="text-orange-600">Chính tả: {checkResult[item.id]!.spellingErrors}</span>
                        <span className="text-blue-600">Phong cách: {checkResult[item.id]!.styleErrors}</span>
                      </div>
                    </div>

                    {/* Error Details */}
                    {checkResult[item.id]!.matches.length > 0 && (
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h4 className="font-bold text-gray-800 mb-3">Chi tiết lỗi:</h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {checkResult[item.id]!.matches.map((match, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded border-l-4 border-red-500">
                              <p className="text-sm font-semibold text-gray-800 mb-1">
                                <span className="bg-red-100 px-2 py-1 rounded">
                                  {match.context.text.substring(match.context.offset, match.context.offset + match.context.length)}
                                </span>
                              </p>
                              <p className="text-sm text-gray-700 mb-1">
                                <span className="font-semibold">Lỗi:</span> {match.message}
                              </p>
                              {match.replacements && match.replacements.length > 0 && (
                                <p className="text-sm text-green-700">
                                  <span className="font-semibold">Gợi ý:</span>{' '}
                                  {match.replacements.slice(0, 3).map(r => r.value).join(', ')}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                {match.rule.category.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Perfect Score Message */}
                    {checkResult[item.id]!.errorCount === 0 && (
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold">Hoàn hảo!</p>
                        <p>Bài viết của bạn không có lỗi nào!</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Sample Answer */}
                {showSample[item.id] && item.sampleAnswer && (
                  <div className="space-y-4">
                    <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Sample Answer (English):</h4>
                      <p className="text-gray-700 leading-relaxed">{item.sampleAnswer}</p>
                    </div>
                    {item.viSample && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">Bản dịch tiếng Việt:</h4>
                        <p className="text-gray-700 leading-relaxed">{item.viSample}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tips */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-gray-800 mb-2">Mẹo:</p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Kiểm tra ngữ pháp trước khi hoàn thành</li>
                    <li>Sử dụng từ vựng phong phú</li>
                    <li>Viết câu rõ ràng và mạch lạc</li>
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
