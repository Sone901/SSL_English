import { kv } from "@vercel/kv"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check credentials against stored data
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Get user from KV
          const user = await kv.get(`user:${credentials.username}:credentials`)
          
          if (!user) {
            return null
          }

          // Simple password check (in production, use bcrypt comparison)
          if ((user as any).password !== credentials.password) {
            return null
          }

          return {
            id: String(credentials.username),
            email: `${credentials.username}@ssl-english.local`,
            name: String(credentials.username),
            image: null,
          } as any
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as any).id = (token as any).id
      }
      return session
    },
    async signIn({ user, account, profile, credentials }) {
      // Store user in Vercel KV
      try {
        const userId = user.id || user.email
        if (userId) {
          // Lưu thông tin người dùng
          await kv.set(`user:${userId}:profile`, {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account?.provider || 'credentials',
            createdAt: new Date().toISOString(),
          })
          
          // Nếu đăng nhập bằng credentials, lưu username thêm vào
          if (credentials?.username) {
            await kv.set(`user:${credentials.username}:credentials`, {
              username: credentials.username,
              provider: 'credentials',
              lastLogin: new Date().toISOString(),
            })
          }
        }
      } catch (error) {
        console.error("Error storing user in KV:", error)
      }
      return true
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signOut() {
      // Cleanup if needed
    },
  },
}
