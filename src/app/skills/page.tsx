import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#FFF5D7] font-sans text-[#4A0E0E] relative overflow-x-hidden">
      {/* --- CÁC HOẠT TIẾT TRANG TRÍ NỀN --- */}
      <div className="absolute top-0 -left-10 w-[300px] h-[300px] opacity-90 pointer-events-none z-0">
        <img src="/top_left.png" alt="Blossom" className="w-full h-full object-contain drop-shadow-lg" />
      </div>
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

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-14 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#A50000] text-center md:text-left">🎯 4 Kỹ Năng Ngôn Ngữ</h1>
        <p className="text-xl mb-12 text-center md:text-left">Phát triển 4 kỹ năng cơ bản: Nghe, Nói, Đọc, Viết.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#A50000] to-[#8B0000] border-[3px] border-[#FFD700] rounded-2xl p-8 text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_20px_rgba(139,0,0,0.3)]">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD700] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">👂</div>
              <h3 className="text-2xl font-bold mb-3 text-[#FFD700]">Nghe (Listening)</h3>
              <p className="mb-4 opacity-95">Phát triển kỹ năng nghe hiểu qua các bài tập thực tế</p>
              <p className="text-sm mb-6 bg-[#8B0000] bg-opacity-50 px-3 py-1 rounded-full inline-block">📚 40 bài học</p>
              <Link href="/skills/listening">
                <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] font-extrabold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all active:scale-95">
                  Bắt đầu học
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#A50000] to-[#8B0000] border-[3px] border-[#FFD700] rounded-2xl p-8 text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_20px_rgba(139,0,0,0.3)]">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD700] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">🗣️</div>
              <h3 className="text-2xl font-bold mb-3 text-[#FFD700]">Nói (Speaking)</h3>
              <p className="mb-4 opacity-95">Rèn luyện kỹ năng nói tiếng Anh tự tin và trôi chảy</p>
              <p className="text-sm mb-6 bg-[#8B0000] bg-opacity-50 px-3 py-1 rounded-full inline-block">📚 6 bài học</p>
              <Link href="/skills/speaking">
                <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] font-extrabold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all active:scale-95">
                  Bắt đầu học
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#A50000] to-[#8B0000] border-[3px] border-[#FFD700] rounded-2xl p-8 text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_20px_rgba(139,0,0,0.3)]">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD700] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold mb-3 text-[#FFD700]">Đọc (Reading)</h3>
              <p className="mb-4 opacity-95">Tăng tốc độ đọc và hiểu sâu các đoạn văn tiếng Anh</p>
              <p className="text-sm mb-6 bg-[#8B0000] bg-opacity-50 px-3 py-1 rounded-full inline-block">📚 20 bài học</p>
              <Link href="/skills/reading">
                <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] font-extrabold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all active:scale-95">
                  Bắt đầu học
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#A50000] to-[#8B0000] border-[3px] border-[#FFD700] rounded-2xl p-8 text-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_20px_rgba(139,0,0,0.3)]">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD700] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold mb-3 text-[#FFD700]">Viết (Writing)</h3>
              <p className="mb-4 opacity-95">Cải thiện kỹ năng viết tiếng Anh qua các bài tập sáng tạo</p>
              <p className="text-sm mb-6 bg-[#8B0000] bg-opacity-50 px-3 py-1 rounded-full inline-block">📚 6 bài học</p>
              <Link href="/skills/writing">
                <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] font-extrabold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all active:scale-95">
                  Bắt đầu học
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 w-full mt-16 relative z-10">
        <p>&copy; 2026 SSL English Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
