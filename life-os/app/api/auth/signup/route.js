import { NextResponse } from 'next/server';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Collects and validates signup data server-side -- the authoritative check
// before the account itself is created. There is no database connected yet,
// so the account record is created and persisted client-side afterward (see
// context/AccountContext.jsx); this endpoint never receives or stores the
// password anywhere durable, it only validates the submission the same way
// a real user-creation endpoint would.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  const errors = {};
  if (!name) errors.name = 'Name is required.';
  if (!email || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters.';

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  return NextResponse.json({ name, email });
}
