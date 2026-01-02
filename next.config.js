/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLERK_SIGN_IN_URL: '/sign-in',
    CLERK_SIGN_UP_URL: '/sign-up',
    CLERK_AFTER_SIGN_IN_URL: '/skills',
    CLERK_AFTER_SIGN_UP_URL: '/skills',
  },
}

module.exports = nextConfig
