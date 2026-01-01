import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

export default function SkillsPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-gray-800">🎯 4 Kỹ Năng Ngôn Ngữ</h1>
        <p className="text-xl text-gray-600 mb-12">Phát triển 4 kỹ năng cơ bản: Nghe, Nói, Đọc, Viết.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="text-6xl mb-4">👂</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Nghe (Listening)</h3>
            <p className="text-gray-600 mb-4">Phát triển kỹ năng nghe hiểu qua các bài tập thực tế</p>
            <p className="text-sm text-gray-500 mb-6">📝 6 bài học</p>
            <Link href="/skills/listening">
              <button className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700 transition">
                Bắt đầu học
              </button>
            </Link>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="text-6xl mb-4">🗣️</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Nói (Speaking)</h3>
            <p className="text-gray-600 mb-4">Rèn luyện kỹ năng nói tiếng Anh tự tin và trôi chảy</p>
            <p className="text-sm text-gray-500 mb-6">📝 6 bài học</p>
            <Link href="/skills/speaking">
              <button className="w-full bg-orange-600 text-white py-2 rounded font-bold hover:bg-orange-700 transition">
                Bắt đầu học
              </button>
            </Link>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Đọc (Reading)</h3>
            <p className="text-gray-600 mb-4">Tăng tốc độ đọc và hiểu sâu các đoạn văn tiếng Anh</p>
            <p className="text-sm text-gray-500 mb-6">📝 6 bài học</p>
            <Link href="/skills/reading">
              <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">
                Bắt đầu học
              </button>
            </Link>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="text-6xl mb-4">✍️</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Viết (Writing)</h3>
            <p className="text-gray-600 mb-4">Cải thiện kỹ năng viết tiếng Anh qua các bài tập sáng tạo</p>
            <p className="text-sm text-gray-500 mb-6">📝 6 bài học</p>
            <Link href="/skills/writing">
              <button className="w-full bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700 transition">
                Bắt đầu học
              </button>
            </Link>
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
