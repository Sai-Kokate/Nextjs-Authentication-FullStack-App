import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/forgotpassword' || path === '/resetpassword'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    console.log("Inside middleware - public")
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    console.log("Inside middleware - private")
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/resetpassword',
    '/forgotpassword'
  ]
}