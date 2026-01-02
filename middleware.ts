import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Chỉ trang chủ và trang đăng nhập/đăng ký là công khai
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Tất cả các route khác đều yêu cầu xác thực
  if (!isPublicRoute(req)) {
    const { userId } = await auth()
    if (!userId) {
      return auth.redirectToSignIn()
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
