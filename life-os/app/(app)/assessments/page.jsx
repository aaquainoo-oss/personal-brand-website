'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sx } from '../../../lib/style';
import { useLifeOSState } from '../../../context/LifeOSStateContext';

export default function AssessmentsLibraryPage() {
  const { state } = useLifeOSState();
  const [assessments, setAssessments] = useState(null);

  useEffect(() => {
    fetch('/api/assessments')
      .then((r) => r.json())
      .then((d) => setAssessments(d.assessments))
      .catch(() => setAssessments([]));
  }, []);

  if (!assessments) {
    return <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Loading assessment library…</div>;
  }

  return (
    <div>
      <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px;')}>Assessment Library</h1>
      <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:0 0 24px;')}>
        All 15 inputs feeding the single Life OS profile. Take or retake any assessment below.
      </p>
      <div style={sx('display:grid; grid-template-columns:repeat(3,1fr); gap:14px;')}>
        {assessments.map((a) => {
          const overrideScore = state.completedScores[a.name];
          const taken = overrideScore !== undefined;
          const badgeStyle = taken
            ? 'font-size:11px; font-weight:700; color:oklch(45% 0.1 155); background:oklch(94% 0.04 155); padding:3px 8px; border-radius:6px; white-space:nowrap;'
            : 'font-size:11px; font-weight:700; color:oklch(50% 0.01 90); background:oklch(94% 0.006 90); padding:3px 8px; border-radius:6px; white-space:nowrap;';

          return (
            <div key={a.slug} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:16px 18px; display:flex; flex-direction:column;')}>
              <div style={sx('display:flex; justify-content:space-between; align-items:flex-start;')}>
                <div style={sx('font-size:14px; font-weight:700; line-height:1.3; max-width:160px;')}>{a.name}</div>
                <div style={sx(badgeStyle)}>{taken ? 'Complete' : 'Not Started'}</div>
              </div>
              {taken ? (
                <div style={sx('font-size:22px; font-weight:700; color:oklch(50% 0.13 255); margin-top:10px;')}>{overrideScore}</div>
              ) : null}
              <div style={sx('font-size:13px; color:oklch(45% 0.01 90); margin-top:6px; line-height:1.4; flex:1;')}>
                {taken ? a.baselineInsight : 'Not started yet — take this assessment to add it to your profile.'}
              </div>
              <Link
                href={`/assessments/${a.slug}`}
                style={sx('margin-top:12px; text-align:center; font-size:13px; font-weight:600; color:oklch(50% 0.13 255); border:1px solid oklch(85% 0.05 255); border-radius:8px; padding:8px; cursor:pointer;')}
              >
                {taken ? 'Retake Assessment' : 'Take Assessment'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
