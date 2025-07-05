// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/', '/signin', '/signup']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value
  const { pathname } = req.nextUrl

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))



  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/tasks/:path*',
    '/mining/:path*',
    '/items/:path*',
    '/transactions/:path*',
    '/users/:path*',
    '/:path*',
  ],
}
