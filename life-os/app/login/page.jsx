'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { sx } from '../../lib/style';
import { useAccount } from '../../context/AccountContext';
import { setSessionKind } from '../../lib/sessionKind';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { account, verifyCredentials } = useAccount();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function establishSession(loginEmail, loginPassword, kind) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Sign in failed.');
      return;
    }
    setSessionKind(kind);
    const next = searchParams.get('next') || '/overview';
    router.push(next);
    router.refresh();
  }

  async function doLogin(e) {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      if (!account) {
        setError('No account exists on this device yet. Sign up below, or continue in demo mode.');
        return;
      }
      const result = await verifyCredentials({ email, password });
      if (!result.ok) {
        setError(result.reason === 'bad-password' ? 'Incorrect password.' : 'No account found for that email.');
        return;
      }
      await establishSession(email, password, 'account');
    } finally {
      setSubmitting(false);
    }
  }

  async function continueAsDemo() {
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await establishSession('demo@lifeos.app', 'demo-mode', 'demo');
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
          type="email"
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
          {account ? (
            <>New here? <Link href="/signup" style={sx('font-weight:600;')}>Create an account</Link></>
          ) : (
            <>No account yet? <Link href="/signup" style={sx('font-weight:600;')}>Sign up</Link></>
          )}
        </div>
        <div
          onClick={continueAsDemo}
          data-testid="continue-demo"
          style={sx('text-align:center; font-size:12px; color:oklch(50% 0.13 255); font-weight:600; margin-top:10px; cursor:pointer;')}
        >
          Continue in demo mode →
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
