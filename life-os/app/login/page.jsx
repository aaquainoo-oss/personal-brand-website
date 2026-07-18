'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sx } from '../../lib/style';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function doLogin(e) {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Sign in failed.');
        return;
      }
      const next = searchParams.get('next') || '/overview';
      router.push(next);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={sx('min-height:100vh; display:flex; align-items:center; justify-content:center; font-family: Helvetica, Arial, sans-serif; background: oklch(98% 0.006 90);')}>
      <form
        onSubmit={doLogin}
        style={sx('width:360px; background:white; border:1px solid oklch(91% 0.01 90); border-radius:16px; padding:36px 32px;')}
      >
        <div style={sx('font-size:20px; font-weight:700; letter-spacing:-0.02em; margin-bottom:2px;')}>Life OS</div>
        <div style={sx('font-size:13px; color:oklch(45% 0.01 90); margin-bottom:24px;')}>Sign in to your Growth Intelligence Platform</div>

        <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jordan@example.com"
          style={sx('width:100%; box-sizing:border-box; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:10px 12px; margin:6px 0 16px;')}
        />

        <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={sx('width:100%; box-sizing:border-box; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:10px 12px; margin:6px 0 22px;')}
        />

        {error ? (
          <div style={sx('font-size:12px; color:oklch(55% 0.15 25); margin-bottom:14px;')}>{error}</div>
        ) : null}

        <button
          type="submit"
          data-testid="sign-in-submit"
          disabled={submitting}
          style={sx(`width:100%; text-align:center; background:oklch(50% 0.13 255); color:white; font-size:14px; font-weight:600; padding:12px; border-radius:9px; cursor:pointer; border:none; font-family:inherit; ${submitting ? 'opacity:0.7;' : ''}`)}
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
        <div style={sx('text-align:center; font-size:12px; color:oklch(50% 0.01 90); margin-top:14px;')}>
          Demo mode — any email/password signs you in as Jordan Ellis.
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
