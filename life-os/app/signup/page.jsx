'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sx } from '../../lib/style';
import { useAccount } from '../../context/AccountContext';
import { setSessionKind } from '../../lib/sessionKind';

function SignupForm() {
  const router = useRouter();
  const { account, createAccount } = useAccount();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function doSignup(e) {
    e.preventDefault();
    if (submitting) return;
    setError('');

    if (account) {
      setError('An account already exists on this device. Sign in instead.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const firstError = data.errors ? Object.values(data.errors)[0] : data.error;
        setError(firstError || 'Sign up failed.');
        return;
      }

      await createAccount({ name: data.name, email: data.email, password });

      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password }),
      });
      if (!loginRes.ok) {
        router.push('/login');
        return;
      }
      setSessionKind('account');
      router.push('/overview');
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={sx('min-height:100vh; display:flex; align-items:center; justify-content:center; font-family: Helvetica, Arial, sans-serif; background: oklch(98% 0.006 90);')}>
      <form
        onSubmit={doSignup}
        style={sx('width:380px; background:white; border:1px solid oklch(91% 0.01 90); border-radius:16px; padding:36px 32px;')}
      >
        <div style={sx('font-size:20px; font-weight:700; letter-spacing:-0.02em; margin-bottom:2px;')}>Life OS</div>
        <div style={sx('font-size:13px; color:oklch(45% 0.01 90); margin-bottom:24px;')}>Create your Growth Intelligence Platform account</div>

        <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>Full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan Ellis"
          style={sx('width:100%; box-sizing:border-box; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:10px 12px; margin:6px 0 14px;')}
        />

        <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jordan@example.com"
          style={sx('width:100%; box-sizing:border-box; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:10px 12px; margin:6px 0 14px;')}
        />

        <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          style={sx('width:100%; box-sizing:border-box; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:10px 12px; margin:6px 0 14px;')}
        />

        <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>Confirm password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Retype your password"
          style={sx('width:100%; box-sizing:border-box; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:10px 12px; margin:6px 0 22px;')}
        />

        {error ? (
          <div style={sx('font-size:12px; color:oklch(55% 0.15 25); margin-bottom:14px;')}>{error}</div>
        ) : null}

        <button
          type="submit"
          data-testid="signup-submit"
          disabled={submitting}
          style={sx(`width:100%; text-align:center; background:oklch(50% 0.13 255); color:white; font-size:14px; font-weight:600; padding:12px; border-radius:9px; cursor:pointer; border:none; font-family:inherit; ${submitting ? 'opacity:0.7;' : ''}`)}
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
        <div style={sx('text-align:center; font-size:12px; color:oklch(50% 0.01 90); margin-top:14px;')}>
          Already have an account? <Link href="/login" style={sx('font-weight:600;')}>Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
