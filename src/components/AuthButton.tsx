'use client'

import { useAuth } from '@clerk/nextjs'
import { UserButton, SignInButton } from '@clerk/nextjs'

export default function AuthButton() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return (
      <UserButton afterSignOutUrl="/" appearance={{
        elements: {
          avatarBox: "w-10 h-10",
          userButtonPopoverActionButton: "hover:bg-red-100",
        }
      }} />
    )
  }

  return (
    <SignInButton mode="modal">
      <button className="bg-yellow-400 text-gray-800 px-6 py-2 rounded hover:bg-yellow-500 transition duration-200 font-bold flex items-center gap-2 shadow-md cursor-pointer">
        👤 Tài khoản
      </button>
    </SignInButton>
  )
}
