import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-red-600 hover:bg-red-700',
              footerActionLink: 'text-red-600 hover:text-red-700',
            },
          }}
        />
      </div>
    </div>
  )
}
