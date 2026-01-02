'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/20 rounded-lg">
          {session.user.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || 'User'} 
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-yellow-400 font-semibold text-sm">{session.user.name || session.user.email}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition duration-200 text-sm"
        >
          Đăng xuất
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => router.push('/sign-in')}
      className="bg-yellow-400 text-gray-800 px-6 py-2 rounded hover:bg-yellow-500 transition duration-200 font-bold flex items-center gap-2 shadow-md cursor-pointer"
    >
      👤 Tài khoản
    </button>
  )
}
