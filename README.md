# SSL English - Next.js with Clerk Authentication

A modern English learning platform built with Next.js and Clerk for authentication.

## Features

- 🔐 Secure authentication with Clerk
- 📱 Fully responsive design
- 🎨 Beautiful UI with Tailwind CSS
- 🗣️ English learning courses
- 👤 User profile management
- 🤖 AI Integration:
  - Text-to-Speech for Listening practice
  - Speech Recognition for Pronunciation practice
  - Dictionary API for Vocabulary
  - Grammar Check for Writing practice

## Setup

### Environment Variables

Create a `.env.local` file in the root directory with your Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with Clerk provider
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global styles
│   ├── sign-in/[...index]/page.tsx    # Sign in page
│   └── sign-up/[...index]/page.tsx    # Sign up page
├── components/          # Reusable components
└── middleware.ts        # Clerk middleware
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Clerk** - Authentication

## License

MIT
