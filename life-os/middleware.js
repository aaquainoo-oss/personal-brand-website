import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'life_os_session';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.svg'
  ) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get(SESSION_COOKIE);
  if (!hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
