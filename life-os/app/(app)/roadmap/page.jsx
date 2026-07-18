'use client';

import { useEffect, useState } from 'react';
import { sx } from '../../../lib/style';

export default function RoadmapPage() {
  const [steps, setSteps] = useState(null);

  useEffect(() => {
    fetch('/api/roadmap')
      .then((r) => r.json())
      .then((d) => setSteps(d.steps))
      .catch(() => setSteps([]));
  }, []);

  if (!steps) {
    return <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Building your roadmap…</div>;
  }

  return (
    <div style={sx('max-width:860px;')}>
      <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px;')}>12-Step Life Transformation Roadmap</h1>
      <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:0 0 24px;')}>
        Ordered by where your profile shows the biggest gap first — unique to your assessment results.
      </p>
      <div style={sx('display:flex; flex-direction:column; gap:12px;')}>
        {steps.map((r) => (
          <div key={r.stepNum} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:18px 22px;')}>
            <div style={sx('display:flex; align-items:baseline; gap:10px;')}>
              <div style={sx('font-size:22px; font-weight:700; color:oklch(50% 0.13 255);')}>{r.stepNum}</div>
              <div style={sx('font-size:16px; font-weight:700;')}>{r.objective}</div>
            </div>
            <div style={sx('font-size:13px; color:oklch(45% 0.01 90); margin:6px 0 10px;')}>
              {r.dimension} · Est. {r.estimatedTime} · Checkpoint: {r.checkpoint}
            </div>
            <div style={sx('font-size:14px; line-height:1.55; color:oklch(30% 0.02 90); margin-bottom:10px;')}><b>Why it matters:</b> {r.why}</div>
            <div style={sx('font-size:14px; line-height:1.55; color:oklch(30% 0.02 90); margin-bottom:10px;')}><b>Activities:</b> {r.activities}</div>
            <div style={sx('font-size:14px; line-height:1.55; color:oklch(30% 0.02 90); margin-bottom:10px;')}><b>Reflection:</b> {r.reflection}</div>
            <div style={sx('font-size:14px; line-height:1.55; color:oklch(30% 0.02 90); margin-bottom:10px;')}><b>Success indicators:</b> {r.successIndicators}</div>
            <div style={sx('font-size:14px; line-height:1.55; color:oklch(30% 0.02 90);')}><b>Resources:</b> {r.resources}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
