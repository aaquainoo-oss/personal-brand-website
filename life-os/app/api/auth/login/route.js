import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'life_os_session';

// Demo-mode auth: matches the design's "any email/password signs you in as
// Jordan Ellis" copy. There is no user database yet -- this just establishes
// a session cookie so the middleware gate and the rest of the app work like
// a real authenticated product. Swap this for real credential checks once a
// user store is connected.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  // Key "secure" off the actual request protocol, not NODE_ENV: `next start`
  // sets NODE_ENV=production even on plain http://localhost, and a Secure
  // cookie set over http is silently dropped by the browser.
  const isHttps = request.nextUrl.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';

  const res = NextResponse.json({ name: 'Jordan Ellis', email, coach: 'Dana Reyes' });
  res.cookies.set(SESSION_COOKIE, 'demo-session', {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
