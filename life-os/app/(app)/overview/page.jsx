'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sx } from '../../../lib/style';
import { useLifeOSState } from '../../../context/LifeOSStateContext';

export default function OverviewPage() {
  const { state } = useLifeOSState();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/dimensions')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ dimensions: [], keyInsights: [], compositeScore: 78 }));
  }, []);

  if (!data) {
    return <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Loading your profile…</div>;
  }

  const { dimensions, keyInsights, compositeScore } = data;
  const hasLifeStage = !!state.lifeStage;

  return (
    <div>
      <div style={sx('display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px;')}>
        <div>
          <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.08em; color:oklch(50% 0.1 255); font-weight:600;')}>
            Life Operating System Profile
          </div>
          <h1 style={sx('font-size:34px; margin:6px 0 0; font-weight:700; letter-spacing:-0.02em;')}>The Driven Builder</h1>
          <p style={sx('max-width:640px; color:oklch(38% 0.015 90); line-height:1.6; font-size:15px; margin-top:10px;')}>
            Jordan leads with structured ambition and strong self-direction, but growth is currently capped by
            under-developed emotional regulation and relationship depth. The synthesis below fills those gaps with a
            single, evolving plan rather than 15 disconnected reports.
          </p>
        </div>
        <div style={sx('text-align:center; background:white; border:1px solid oklch(90% 0.01 90); border-radius:14px; padding:20px 28px; min-width:150px;')}>
          <div style={sx('font-size:12px; color:oklch(45% 0.01 90); text-transform:uppercase; letter-spacing:0.06em;')}>Composite Score</div>
          <div style={sx('font-size:44px; font-weight:700; color:oklch(50% 0.13 255); line-height:1.1; margin-top:4px;')}>{compositeScore}</div>
          <div style={sx('font-size:12px; color:oklch(45% 0.01 90);')}>out of 100</div>
        </div>
      </div>

      {hasLifeStage ? (
        <div style={sx('display:inline-flex; align-items:center; gap:8px; background:oklch(96% 0.02 255 / 0.5); border:1px solid oklch(88% 0.03 255); border-radius:9px; padding:8px 14px; margin-bottom:20px;')}>
          <span style={sx('font-size:12px; font-weight:700; color:oklch(45% 0.12 255); text-transform:uppercase; letter-spacing:0.05em;')}>Life Stage:</span>
          <span style={sx('font-size:13px; font-weight:600;')}>{lifeStageDisplayName(state.lifeStage)}</span>
          <Link href="/life-stage" style={sx('font-size:12px; margin-left:6px;')}>retake</Link>
        </div>
      ) : (
        <Link href="/life-stage" style={sx('display:inline-flex; align-items:center; gap:8px; background:white; border:1px dashed oklch(80% 0.01 90); border-radius:9px; padding:8px 14px; margin-bottom:20px; cursor:pointer;')}>
          <span style={sx('font-size:13px; color:oklch(45% 0.01 90);')}>
            Take the 8-question Life Stage check-in to align your goals to where you actually are →
          </span>
        </Link>
      )}

      <div style={sx('display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:32px;')}>
        {keyInsights.map((k) => (
          <div key={k.label} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:16px 18px;')}>
            <div style={sx(`font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:${k.color}; font-weight:700;`)}>{k.label}</div>
            <div style={sx('font-size:15px; font-weight:600; margin-top:6px; line-height:1.3;')}>{k.value}</div>
            <div style={sx('font-size:13px; color:oklch(45% 0.01 90); margin-top:4px; line-height:1.4;')}>{k.detail}</div>
          </div>
        ))}
      </div>

      <div style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:14px; padding:24px 28px; margin-bottom:32px;')}>
        <div style={sx('font-size:16px; font-weight:700; margin-bottom:16px;')}>12 Dimensions of Life — Synthesized Balance</div>
        <div style={sx('display:grid; grid-template-columns:repeat(2,1fr); gap:12px 32px;')}>
          {dimensions.map((d) => (
            <div key={d.name}>
              <div style={sx('display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;')}>
                <span style={sx('font-weight:600;')}>{d.name}</span>
                <span style={sx('color:oklch(45% 0.01 90);')}>{d.score}</span>
              </div>
              <div style={sx('height:6px; border-radius:3px; background:oklch(93% 0.008 90); overflow:hidden;')}>
                <div style={sx(d.barStyle)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={sx('background:oklch(96% 0.02 255 / 0.5); border:1px solid oklch(88% 0.03 255); border-radius:14px; padding:22px 26px;')}>
        <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:oklch(45% 0.12 255); font-weight:700; margin-bottom:8px;')}>
          Where the platform fills the gaps
        </div>
        <p style={sx('font-size:14px; line-height:1.65; color:oklch(30% 0.02 90); margin:0;')}>
          Each of the 15 assessments alone gives a snapshot. Cross-referencing Emotional Intelligence against
          Leadership Readiness and Relationship Style revealed a consistent blind spot: Jordan optimizes for output
          before rapport. The engine flagged this pattern automatically and generated the growth plan and coaching
          cadence on the right — no separate test required.
        </p>
      </div>
    </div>
  );
}

function lifeStageDisplayName(stage) {
  const names = {
    foundation: 'Foundation Building',
    building: 'Active Building',
    leading: 'Leading & Sustaining',
    transition: 'Transition & Reinvention',
  };
  return names[stage] || '';
}
