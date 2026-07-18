// Client-side account helpers. There is no database connected yet, so real
// accounts live in the browser (localStorage) rather than on the server --
// see context/AccountContext.jsx. Passwords are salted + hashed with
// Web Crypto (SHA-256) before they ever touch storage, but this is still
// browser-local, not a substitute for real server-side auth: anyone with
// devtools access to that browser profile can see the hash. Treat this as a
// meaningfully better demo, not production-grade security.

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

export function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const digest = await crypto.subtle.digest('SHA-256', enc.encode(`${saltHex}:${password}`));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
