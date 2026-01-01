import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

export default function RoadmapPage() {
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
              <li><Link href="/skills" className="hover:text-yellow-300 transition">Kỹ năng</Link></li>
              <li><Link href="/test" className="hover:text-yellow-300 transition">Bài kiểm tra</Link></li>
              <li><Link href="/roadmap" className="text-yellow-300 font-bold">Lộ trình học</Link></li>
            </ul>
            <div className="flex items-center gap-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">🗺️ Lộ Trình Học</h1>
        <p className="text-xl text-gray-600 mb-12">Theo dõi tiến độ học tập và lộ trình phát triển kỹ năng của bạn.</p>

        <div className="space-y-6">
          {[
            { level: 'A1', title: 'Sơ Cấp', progress: 0, desc: 'Bắt đầu hành trình học tiếng Anh' },
            { level: 'A2', title: 'Sơ Cấp Cao', progress: 0, desc: 'Nâng cao kiến thức cơ bản' },
            { level: 'B1', title: 'Trung Cấp', progress: 35, desc: 'Giao tiếp thành thạo' },
            { level: 'B2', title: 'Trung Cấp Cao', progress: 0, desc: 'Giao tiếp tự tin' },
            { level: 'C1', title: 'Nâng Cao', progress: 0, desc: 'Thạo lưu loát' },
            { level: 'C2', title: 'Thành Thạo', progress: 0, desc: 'Như người bản xứ' },
          ].map((level, idx) => (
            <div key={idx} className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{level.level} - {level.title}</h3>
                  <p className="text-gray-600">{level.desc}</p>
                </div>
                <span className="text-sm font-bold text-red-600">{level.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-red-600 h-3 rounded-full" style={{ width: `${level.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
