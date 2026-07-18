'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { sx } from '../lib/style';

const NAV_ITEMS = [
  { href: '/overview', label: 'Home' },
  { href: '/life-stage', label: 'Life Stage' },
  { href: '/assessments', label: '15 Assessments' },
  { href: '/vision-writing', label: 'Vision Writing' },
  { href: '/vision-board', label: 'Vision Board' },
  { href: '/goals', label: 'Goals' },
  { href: '/roadmap', label: '12-Step Roadmap' },
  { href: '/insight', label: 'Insight Report' },
  { href: '/coaching', label: 'Coaching Feedback' },
];

const NAV_BASE = 'padding:10px 12px; border-radius:8px; font-size:14px; cursor:pointer; transition:background 0.15s; display:block;';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <div style={sx('width:240px; flex-shrink:0; background: oklch(20% 0.02 260); color: oklch(96% 0.01 90); display:flex; flex-direction:column; padding:28px 20px; gap:32px; min-height:100vh;')}>
      <div>
        <div style={sx('font-size:20px; font-weight:700; letter-spacing:-0.02em;')}>Life OS</div>
        <div style={sx('font-size:12px; opacity:0.55; margin-top:2px;')}>Growth Intelligence Platform</div>
      </div>

      <div style={sx('display:flex; flex-direction:column; gap:4px; overflow-y:auto;')}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          const style = sx(
            NAV_BASE +
              (active
                ? 'background: oklch(96% 0.01 90 / 0.12); color: white; font-weight:600;'
                : 'color: oklch(80% 0.01 90);')
          );
          return (
            <Link key={item.href} href={item.href} style={style}>
              {item.label}
            </Link>
          );
        })}
      </div>

      <div style={sx('margin-top:auto; padding-top:20px; border-top:1px solid oklch(40% 0.02 260);')}>
        <div style={sx('font-size:12px; opacity:0.5; margin-bottom:6px;')}>Signed in as</div>
        <div style={sx('font-size:14px; font-weight:600;')}>Jordan Ellis</div>
        <div style={sx('font-size:12px; opacity:0.55; margin-bottom:10px;')}>Coach: Dana Reyes</div>
        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={sx('font-size:12px;')}>
          Sign out
        </a>
      </div>
    </div>
  );
}
