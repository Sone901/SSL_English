'use client'

import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { useState } from 'react'

interface LevelLesson {
  id: string
  title: string
  type: 'vocabulary' | 'listening' | 'reading' | 'speaking' | 'writing'
  link: string
}

interface LevelDetail {
  level: string
  title: string
  icon: string
  description: string
  color: string
  objectives: string[]
  vocabulary: number
  estimatedTime: string
  skills: {
    listening: string[]
    reading: string[]
    speaking: string[]
    writing: string[]
  }
  lessons: LevelLesson[]
}

const roadmapData: LevelDetail[] = [
  {
    level: 'A1',
    title: 'Sơ Cấp - Beginner',
    icon: '🌱',
    description: 'Bắt đầu hành trình học tiếng Anh với những kiến thức cơ bản nhất',
    color: 'from-green-400 to-green-600',
    objectives: [
      'Giới thiệu bản thân và người khác',
      'Hỏi và trả lời các câu hỏi đơn giản về bản thân',
      'Hiểu và sử dụng các cụm từ quen thuộc hàng ngày',
      'Giao tiếp trong các tình huống đơn giản'
    ],
    vocabulary: 500,
    estimatedTime: '2-3 tháng',
    skills: {
      listening: ['Nghe hiểu các hội thoại đơn giản', 'Nhận biết từ vựng cơ bản'],
      reading: ['Đọc hiểu văn bản ngắn', 'Hiểu thông tin cơ bản'],
      speaking: ['Giới thiệu bản thân', 'Trả lời câu hỏi đơn giản'],
      writing: ['Viết câu đơn giản', 'Điền form cơ bản']
    },
    lessons: [
      { id: '1', title: 'Vocabulary: Daily Routine', type: 'vocabulary', link: '/vocabulary' },
      { id: '2', title: 'Listening: Level A1', type: 'listening', link: '/skills/listening' },
      { id: '3', title: 'Reading: My Daily Routine', type: 'reading', link: '/skills/reading' },
      { id: '4', title: 'Speaking: Self Introduction', type: 'speaking', link: '/skills/speaking' },
      { id: '5', title: 'Writing: About Yourself', type: 'writing', link: '/skills/writing' }
    ]
  },
  {
    level: 'A2',
    title: 'Sơ Cấp Cao - Elementary',
    icon: '🌿',
    description: 'Nâng cao kiến thức cơ bản và mở rộng vốn từ vựng',
    color: 'from-lime-400 to-lime-600',
    objectives: [
      'Hiểu các câu và cụm từ thường dùng',
      'Giao tiếp trong các tình huống quen thuộc',
      'Mô tả bản thân, gia đình và môi trường xung quanh',
      'Nói về các nhu cầu cơ bản'
    ],
    vocabulary: 1000,
    estimatedTime: '3-4 tháng',
    skills: {
      listening: ['Hiểu thông tin chính trong hội thoại', 'Nghe hiểu các thông báo đơn giản'],
      reading: ['Đọc hiểu bài viết ngắn', 'Hiểu email và tin nhắn cơ bản'],
      speaking: ['Mô tả kinh nghiệm và sự kiện', 'Giải thích ý kiến ngắn gọn'],
      writing: ['Viết đoạn văn ngắn', 'Viết thư cá nhân']
    },
    lessons: [
      { id: '6', title: 'Vocabulary: Family & Friends', type: 'vocabulary', link: '/vocabulary' },
      { id: '7', title: 'Listening: Level A2', type: 'listening', link: '/skills/listening' },
      { id: '8', title: 'Reading: A Visit to the Zoo', type: 'reading', link: '/skills/reading' },
      { id: '9', title: 'Speaking: Describe Your Family', type: 'speaking', link: '/skills/speaking' },
      { id: '10', title: 'Writing: Daily Routine', type: 'writing', link: '/skills/writing' }
    ]
  },
  {
    level: 'B1',
    title: 'Trung Cấp - Intermediate',
    icon: '🌳',
    description: 'Giao tiếp thành thạo trong hầu hết các tình huống',
    color: 'from-teal-400 to-teal-600',
    objectives: [
      'Hiểu nội dung chính của văn bản phức tạp',
      'Giao tiếp tự nhiên với người bản xứ',
      'Viết văn bản rõ ràng về nhiều chủ đề',
      'Giải thích và bảo vệ quan điểm'
    ],
    vocabulary: 2000,
    estimatedTime: '4-6 tháng',
    skills: {
      listening: ['Hiểu các chương trình TV/Radio', 'Theo dõi bài giảng'],
      reading: ['Đọc hiểu bài báo', 'Hiểu văn học đơn giản'],
      speaking: ['Thảo luận ý kiến', 'Trình bày về chủ đề quen thuộc'],
      writing: ['Viết bài luận ngắn', 'Viết báo cáo']
    },
    lessons: [
      { id: '11', title: 'Vocabulary: Advanced Topics', type: 'vocabulary', link: '/vocabulary' },
      { id: '12', title: 'Listening: Level B1', type: 'listening', link: '/skills/listening' },
      { id: '13', title: 'Reading: The Benefits of Reading', type: 'reading', link: '/skills/reading' },
      { id: '14', title: 'Speaking: Daily Topics', type: 'speaking', link: '/skills/speaking' },
      { id: '15', title: 'Writing: My Best Friend', type: 'writing', link: '/skills/writing' }
    ]
  },
  {
    level: 'B2',
    title: 'Trung Cấp Cao - Upper Intermediate',
    icon: '🌲',
    description: 'Giao tiếp tự tin trong nhiều tình huống phức tạp',
    color: 'from-cyan-400 to-cyan-600',
    objectives: [
      'Hiểu nội dung chính của văn bản phức tạp',
      'Tương tác lưu loát với người bản xứ',
      'Viết văn bản chi tiết về nhiều chủ đề',
      'Tranh luận về ưu/nhược điểm'
    ],
    vocabulary: 3000,
    estimatedTime: '6-8 tháng',
    skills: {
      listening: ['Hiểu phim không phụ đề', 'Theo dõi tranh luận phức tạp'],
      reading: ['Đọc hiểu văn bản chuyên ngành', 'Phân tích bài báo'],
      speaking: ['Tranh luận hiệu quả', 'Trình bày chi tiết'],
      writing: ['Viết bài luận dài', 'Viết báo cáo chuyên nghiệp']
    },
    lessons: [
      { id: '16', title: 'Vocabulary: Professional Topics', type: 'vocabulary', link: '/vocabulary' },
      { id: '17', title: 'Listening: Level B2', type: 'listening', link: '/skills/listening' },
      { id: '18', title: 'Reading: Advanced Articles', type: 'reading', link: '/skills/reading' },
      { id: '19', title: 'Speaking: Advanced Topics', type: 'speaking', link: '/skills/speaking' },
      { id: '20', title: 'Writing: Essays', type: 'writing', link: '/skills/writing' }
    ]
  }
]

export default function RoadmapPage() {
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null)

  const toggleLevel = (level: string) => {
    setExpandedLevel(expandedLevel === level ? null : level)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return '📚'
      case 'listening': return '🎧'
      case 'reading': return '📖'
      case 'speaking': return '🗣️'
      case 'writing': return '✍️'
      default: return '📝'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'bg-purple-100 text-purple-700'
      case 'listening': return 'bg-blue-100 text-blue-700'
      case 'reading': return 'bg-green-100 text-green-700'
      case 'speaking': return 'bg-orange-100 text-orange-700'
      case 'writing': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

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
              <li><Link href="/vocabulary" className="hover:text-white transition py-2">TỪ VỰNG</Link></li>
              <li><Link href="/pronunciation" className="hover:text-white transition py-2">PHÁT ÂM</Link></li>
              <li><Link href="/skills" className="hover:text-white transition py-2">KỸ NĂNG</Link></li>
              <li><Link href="/test" className="hover:text-white transition py-2">BÀI KIỂM TRA</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition py-2 border-b-2 border-white">LỘ TRÌNH</Link></li>
            </ul>

            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-14 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#A50000] text-center md:text-left">🗺️ Lộ Trình Học</h1>
        <p className="text-xl mb-12 text-center md:text-left">Khám phá lộ trình học từ A1 đến B2 với các mục tiêu cụ thể cho từng cấp độ</p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-teal-400 to-cyan-400 hidden md:block"></div>

          {/* Level Cards */}
          <div className="space-y-8">
            {roadmapData.map((level, index) => (
              <div key={level.level} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-500 hidden md:block"></div>

                {/* Card */}
                <div className="md:ml-24">
                  <div 
                    className={`bg-gradient-to-br from-[#A50000] to-[#8B0000] border-[3px] border-[#FFD700] text-white rounded-2xl p-6 shadow-[0_10px_20px_rgba(139,0,0,0.3)] cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all relative overflow-hidden group`}
                    onClick={() => toggleLevel(level.level)}
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD700] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{level.icon}</span>
                        <div>
                          <h2 className="text-3xl font-bold text-[#FFD700]">{level.level}</h2>
                          <p className="text-xl opacity-95">{level.title}</p>
                        </div>
                      </div>
                      <button className="text-3xl hover:scale-110 transition text-[#FFD700]">
                        {expandedLevel === level.level ? '▼' : '▶'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedLevel === level.level && (
                    <div className="mt-4 bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg">
                      {/* Description */}
                      <p className="text-gray-700 text-lg mb-6">{level.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-600 font-semibold">Từ vựng cần học</p>
                          <p className="text-3xl font-bold text-blue-700">{level.vocabulary}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-green-600 font-semibold">Thời gian dự kiến</p>
                          <p className="text-3xl font-bold text-green-700">{level.estimatedTime}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-purple-600 font-semibold">Số bài học</p>
                          <p className="text-3xl font-bold text-purple-700">{level.lessons.length}</p>
                        </div>
                      </div>

                      {/* Objectives */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Mục tiêu:</h3>
                        <ul className="space-y-2">
                          {level.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-600 mt-1">✓</span>
                              <span className="text-gray-700">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-bold text-blue-700 mb-2">🎧 Listening:</h4>
                          <ul className="text-sm space-y-1">
                            {level.skills.listening.map((skill, idx) => (
                              <li key={idx} className="text-gray-700">• {skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-bold text-green-700 mb-2">📖 Reading:</h4>
                          <ul className="text-sm space-y-1">
                            {level.skills.reading.map((skill, idx) => (
                              <li key={idx} className="text-gray-700">• {skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-bold text-orange-700 mb-2">🗣️ Speaking:</h4>
                          <ul className="text-sm space-y-1">
                            {level.skills.speaking.map((skill, idx) => (
                              <li key={idx} className="text-gray-700">• {skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h4 className="font-bold text-red-700 mb-2">✍️ Writing:</h4>
                          <ul className="text-sm space-y-1">
                            {level.skills.writing.map((skill, idx) => (
                              <li key={idx} className="text-gray-700">• {skill}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Lessons List */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">📚 Danh sách bài học:</h3>
                        <div className="space-y-2">
                          {level.lessons.map((lesson) => (
                            <Link key={lesson.id} href={lesson.link}>
                              <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{getTypeIcon(lesson.type)}</span>
                                  <div>
                                    <p className="font-semibold text-gray-800">{lesson.title}</p>
                                    <span className={`text-xs px-2 py-1 rounded ${getTypeColor(lesson.type)}`}>
                                      {lesson.type.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition">
                                  Học ngay →
                                </button>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-[#FFF5D7] to-[#FFE4B5] border-l-4 border-[#FFD700] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#A50000] mb-3">💡 Lời khuyên:</h3>
          <ul className="space-y-2 text-[#4A0E0E]">
            <li>✅ Học theo thứ tự từ A1 → A2 → B1 → B2 để xây dựng nền tảng vững chắc</li>
            <li>✅ Dành ít nhất 30-60 phút mỗi ngày để luyện tập</li>
            <li>✅ Cân bằng cả 4 kỹ năng: Listening, Reading, Speaking, Writing</li>
            <li>✅ Làm bài kiểm tra sau mỗi level để đánh giá tiến độ</li>
            <li>✅ Ôn tập thường xuyên để không quên kiến thức đã học</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16 relative z-10">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
