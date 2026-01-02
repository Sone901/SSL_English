'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validation
    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập')
      setIsLoading(false)
      return
    }

    if (username.length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự')
      setIsLoading(false)
      return
    }

    if (!password) {
      setError('Vui lòng nhập mật khẩu')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp')
      setIsLoading(false)
      return
    }

    try {
      // Call API to register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Đăng ký thất bại')
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setUsername('')
      setPassword('')
      setConfirmPassword('')

      // Redirect to sign-in after 2 seconds
      setTimeout(() => {
        router.push('/sign-in')
      }, 2000)
    } catch (err) {
      setError('Lỗi đăng ký. Vui lòng thử lại.')
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
          Tạo tài khoản mới để bắt đầu học tập
        </div>

        {success && (
          <div style={{ marginBottom: '20px', padding: '12px', background: '#E6F4E6', border: '2px solid #4CAF50', borderRadius: '8px', color: '#4CAF50', fontSize: '14px', textAlign: 'center' }}>
            ✅ Đăng ký thành công! Chuyển hướng tới đăng nhập...
          </div>
        )}

        {error && (
          <div style={{ marginBottom: '20px', padding: '12px', background: '#FFE6E6', border: '2px solid #8B0000', borderRadius: '8px', color: '#8B0000', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} style={{ marginTop: '20px' }}>
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
              disabled={isLoading || success}
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
              disabled={isLoading || success}
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

          {/* Confirm Password Field */}
          <div style={{ marginTop: '18px', display: 'flex' }}>
            <div style={{ height: '50px', width: '50px', color: '#FFD700', fontSize: '20px', lineHeight: '50px', border: '2px solid #8B0000', borderRight: 'none', borderRadius: '8px 0 0 8px', background: '#FFF5D7', textAlign: 'center', fontWeight: 'bold' }}>
              🔐
            </div>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading || success}
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

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading || success}
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
              cursor: isLoading || success ? 'not-allowed' : 'pointer',
              opacity: isLoading || success ? 0.7 : 1,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && !success) {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 0, 0, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {isLoading ? '⏳ Đang xử lý...' : success ? '✅ Thành công!' : '📝 ĐĂNG KÝ'}
          </button>
        </form>

        {/* Login Link */}
        <div style={{ marginTop: '25px', color: '#666', textAlign: 'center', fontSize: '14px' }}>
          Đã có tài khoản?{' '}
          <a 
            href="/sign-in" 
            style={{ color: '#8B0000', textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }} 
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} 
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Đăng nhập tại đây
          </a>
        </div>
      </div>
    </div>
  )
}
