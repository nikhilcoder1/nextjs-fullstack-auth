import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const publicPaths = ['/login', '/signup', '/verifyemail']
  const isPublicPath = publicPaths.includes(path)

  const token = request.cookies.get('token')?.value

  // user logged in → block login/signup pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // user not logged in → block protected pages
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // otherwise allow
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}