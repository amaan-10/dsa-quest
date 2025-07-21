import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/demo', '/auth/register', '/auth/login', '/leaderboard', '/about', '/levels'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get('authToken')?.value;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (authToken) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/auth/login', request.url));
}
