# SSL English - Next.js with NextAuth v5

A modern English learning platform built with Next.js 14 and NextAuth v5 for authentication.

## Features

- 🔐 Dual authentication: Google OAuth + Username/Password
- 📱 Fully responsive design
- 🎨 Beautiful UI with Tailwind CSS
- 🗣️ English learning courses (Vocabulary, Listening, Reading, Speaking, Writing)
- 👤 User account management with Vercel KV storage
- 📊 Progress tracking and activity statistics
- 🚀 Production ready with Vercel deployment

## Setup

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_secure_random_key
NEXTAUTH_URL=http://localhost:3000

# Vercel KV (Redis)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
KV_URL=your_redis_url
REDIS_URL=your_redis_url
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── sign-in/page.tsx        # Sign in page
│   ├── sign-up/page.tsx        # Sign up page
│   ├── api/
│   │   ├── auth/[...nextauth]  # NextAuth handler
│   │   ├── auth/register       # User registration
│   │   └── user/               # Progress & activity APIs
│   └── skills/                 # Learning pages
├── auth.ts                     # NextAuth configuration
└── middleware.ts               # Protected routes
```

## Technologies

- **Next.js 14** - React framework
- **NextAuth v5** - Authentication
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel KV** - Data storage
- **Google OAuth** - Social login
- **Tailwind CSS** - Styling
- **Clerk** - Authentication

## License

MIT
