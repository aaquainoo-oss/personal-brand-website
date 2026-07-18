'use client';

import { useEffect, useState } from 'react';
import { sx } from '../../../lib/style';

const TAG_STYLE = {
  'THIS WEEK': 'color:oklch(45% 0.12 255); background:oklch(94% 0.03 255);',
  PATTERN: 'color:oklch(50% 0.12 25); background:oklch(95% 0.03 25);',
  MILESTONE: 'color:oklch(50% 0.1 280); background:oklch(95% 0.02 280);',
  'COACH NOTE': 'color:oklch(45% 0.01 90); background:oklch(94% 0.008 90);',
  ENERGY: 'color:oklch(50% 0.13 155); background:oklch(94% 0.03 155);',
};

export default function CoachingPage() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    fetch('/api/coaching-cards')
      .then((r) => r.json())
      .then((d) => setCards(d.cards))
      .catch(() => setCards([]));
  }, []);

  if (!cards) {
    return <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Loading coaching feed…</div>;
  }

  return (
    <div>
      <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px;')}>Coaching Feed</h1>
      <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:0 0 24px;')}>
        Recommendations evolve automatically as new data and check-ins arrive.
      </p>
      <div style={sx('display:flex; flex-direction:column; gap:14px;')}>
        {cards.map((c, i) => (
          <div key={i} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-left:1px solid oklch(91% 0.01 90); border-radius:12px; padding:18px 20px; display:flex; gap:16px;')}>
            <div style={sx(`flex-shrink:0; align-self:flex-start; font-size:11px; font-weight:700; padding:6px 10px; border-radius:6px; ${TAG_STYLE[c.tag] || ''}`)}>{c.tag}</div>
            <div style={sx('flex:1;')}>
              <div style={sx('font-size:14px; font-weight:700; margin-bottom:4px;')}>{c.title}</div>
              <div style={sx('font-size:14px; color:oklch(35% 0.015 90); line-height:1.55;')}>{c.body}</div>
              <div style={sx('font-size:12px; color:oklch(50% 0.01 90); margin-top:8px;')}>{c.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
