'use client'

import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/vocabulary'

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: true,
        callbackUrl: callbackUrl
      })

      if (result?.error) {
        setError('Đăng nhập không thành công')
      }
    } catch (err) {
      setError('Lỗi đăng nhập')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', {
        redirect: true,
        callbackUrl: callbackUrl
      })
    } catch (err) {
      setError('Lỗi Google OAuth')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #FFF5D7, #FFE6CC)', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ position: 'relative', width: '420px', height: 'auto', background: 'white', padding: '50px 40px 60px', boxSizing: 'border-box', border: '4px solid #8B0000', borderRadius: '15px', boxShadow: '0 10px 40px rgba(139, 0, 0, 0.2)' }}>
        <div style={{ fontSize: '32px', color: '#8B0000', fontWeight: 700, letterSpacing: '2px', marginBottom: '10px', textAlign: 'center' }}>
          SSL English
        </div>
        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '30px' }}>
          Đăng nhập để tiếp tục học tập
        </div>

        {error && (
          <div style={{ marginBottom: '20px', padding: '12px', background: '#FFE6E6', border: '2px solid #8B0000', borderRadius: '8px', color: '#8B0000', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleCredentialsSignIn} style={{ marginTop: '20px' }}>
          {/* Username Field */}
          <div style={{ marginTop: '18px', display: 'flex' }}>
            <div style={{ height: '50px', width: '50px', color: '#FFD700', fontSize: '20px', lineHeight: '50px', border: '2px solid #8B0000', borderRight: 'none', borderRadius: '8px 0 0 8px', background: '#FFF5D7', textAlign: 'center', fontWeight: 'bold' }}>
              👤
            </div>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                height: '50px',
                width: '100%',
                outline: 'none',
                fontSize: '15px',
                color: '#333',
                padding: '0 15px',
                borderRadius: '0 8px 8px 0',
                border: '2px solid #8B0000',
                background: '#FFFBF5',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = '#FFF9F0'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 0, 0, 0.2)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = '#FFFBF5'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginTop: '18px', display: 'flex' }}>
            <div style={{ height: '50px', width: '50px', color: '#FFD700', fontSize: '20px', lineHeight: '50px', border: '2px solid #8B0000', borderRight: 'none', borderRadius: '8px 0 0 8px', background: '#FFF5D7', textAlign: 'center', fontWeight: 'bold' }}>
              🔒
            </div>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                height: '50px',
                width: '100%',
                outline: 'none',
                fontSize: '15px',
                color: '#333',
                padding: '0 15px',
                borderRadius: '0 8px 8px 0',
                border: '2px solid #8B0000',
                background: '#FFFBF5',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = '#FFF9F0'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(139, 0, 0, 0.2)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = '#FFFBF5'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '30px',
              height: '50px',
              width: '100%',
              outline: 'none',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'white',
              padding: '0 15px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 0, 0, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {isLoading ? '⏳ Đang xử lý...' : '🔓 ĐĂNG NHẬP'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ margin: '25px 0', textAlign: 'center', color: '#ccc', position: 'relative' }}>
          <div style={{ borderBottom: '2px solid #FFD700' }}></div>
          <span style={{ background: 'white', padding: '0 10px', position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', color: '#8B0000', fontWeight: 'bold' }}>HOẶC</span>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          type="button"
          style={{
            marginTop: '30px',
            height: '50px',
            width: '100%',
            outline: 'none',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '1px',
            color: '#8B0000',
            padding: '0 15px',
            borderRadius: '8px',
            border: '2px solid #8B0000',
            background: '#FFF5D7',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = '#FFE6CC'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 0, 0, 0.2)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFF5D7'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Đăng nhập với Google
        </button>

        {/* Signup Link */}
        <div style={{ marginTop: '25px', color: '#666', textAlign: 'center', fontSize: '14px' }}>
          Chưa có tài khoản?{' '}
          <a href="/sign-up" style={{ color: '#8B0000', textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  )
}
