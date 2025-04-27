// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Define which paths require authentication
const protectedPaths = [
  '/profile',
  '/checkout',
  // Add more protected routes as needed
];

// Define public paths that should always bypass auth checks
const publicPaths = [
  '/login',
  '/signup',
  '/',
  '/api/auth/me' // Important - allow this endpoint to be called without auth
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Always allow public paths
  if (publicPaths.some(prefix => path === prefix || path.startsWith(`${prefix}`))) {
    return NextResponse.next();
  }
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(prefix => 
    path === prefix || path.startsWith(`${prefix}/`)
  );
  
  if (!isProtectedPath) {
    return NextResponse.next();
  }
  
  // Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // If no token is present, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }
  
  try {
    // Verify the token
    verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to login
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};