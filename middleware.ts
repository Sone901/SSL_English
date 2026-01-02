import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/'])

export default clerkMiddleware((auth, req) => {
  const path = req.nextUrl.pathname
  console.log('🔍 Middleware checking:', path)
  
  if (!isPublicRoute(req)) {
    console.log('🔒 Protected route, checking auth...')
    try {
      auth().protect()
      console.log('✅ User authenticated')
    } catch (error) {
      console.log('❌ User not authenticated, should redirect')
      throw error
    }
  } else {
    console.log('🌐 Public route, allowing access')
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
