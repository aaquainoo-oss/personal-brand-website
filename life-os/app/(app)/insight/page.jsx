'use client';

import { useEffect, useState } from 'react';
import { sx } from '../../../lib/style';

export default function InsightPage() {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    fetch('/api/insight-report')
      .then((r) => r.json())
      .then((d) => setSections(d.sections))
      .catch(() => setSections([]));
  }, []);

  if (!sections) {
    return <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Synthesizing your report…</div>;
  }

  return (
    <div style={sx('max-width:820px;')}>
      <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px;')}>Personalized Insight Report</h1>
      <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:0 0 24px;')}>
        Synthesized from all 15 assessments and the 12 Dimensions of Life. Regenerates as new data comes in.
      </p>
      {sections.map((s) => (
        <div key={s.title} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:18px 22px; margin-bottom:12px;')}>
          <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:oklch(50% 0.1 255); font-weight:700; margin-bottom:8px;')}>{s.title}</div>
          {s.isList ? (
            <div style={sx('display:flex; flex-direction:column; gap:6px;')}>
              {s.items.map((it, i) => (
                <div key={i} style={sx('font-size:14px; line-height:1.55; color:oklch(30% 0.02 90); display:flex; gap:8px;')}>
                  <span style={sx('color:oklch(50% 0.1 255); font-weight:700;')}>•</span>
                  <span>{it}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={sx('font-size:14px; line-height:1.65; color:oklch(30% 0.02 90); margin:0;')}>{s.text}</p>
          )}
        </div>
      ))}
    </div>
  );
}
