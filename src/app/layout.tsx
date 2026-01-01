import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'SSL English - Nền tảng học tiếng Anh',
  description: 'SSL English - Nền tảng học tiếng Anh hiệu quả với Clerk Authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="vi">
        <body className="bg-white text-gray-900">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
