import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'

export const metadata: Metadata = {
  title: 'SSL English - Nền tảng học tiếng Anh',
  description: 'SSL English - Nền tảng học tiếng Anh hiệu quả với Google OAuth',
  icons: {
    icon: '/favicon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="vi">
      <body className="bg-white text-gray-900">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
