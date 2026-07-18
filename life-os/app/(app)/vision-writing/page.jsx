'use client';

import { useEffect, useState } from 'react';
import { sx } from '../../../lib/style';
import { useLifeOSState } from '../../../context/LifeOSStateContext';
import { dimNames } from '../../../lib/data';

const PRIORITY_COLOR = { High: 'oklch(55% 0.15 25)', Medium: 'oklch(60% 0.13 90)', Low: 'oklch(55% 0.13 155)' };

export default function VisionWritingPage() {
  const { state, update } = useLifeOSState();
  const [priority, setPriority] = useState(null);
  const [vwAreaIndex, setVwAreaIndex] = useState(-1);
  const [drafting, setDrafting] = useState(false);

  useEffect(() => {
    fetch('/api/vision-priority')
      .then((r) => r.json())
      .then((d) => setPriority(d.priority))
      .catch(() => setPriority([]));
  }, []);

  if (!priority) {
    return <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Loading…</div>;
  }

  const isSummary = vwAreaIndex === -1;
  const currentPriority = vwAreaIndex >= 0 ? priority[vwAreaIndex] : null;
  const suggestedOrder = [...priority].sort((a, b) => a.avg - b.avg);

  async function aiHelp() {
    const areaName = dimNames[vwAreaIndex];
    setDrafting(true);
    try {
      const res = await fetch('/api/vision-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ areaName }),
      });
      const data = await res.json();
      update((s) => ({ visionTexts: { ...s.visionTexts, [areaName]: data.text } }));
    } finally {
      setDrafting(false);
    }
  }

  function setText(areaName, text) {
    update((s) => ({ visionTexts: { ...s.visionTexts, [areaName]: text } }));
  }

  return (
    <div style={sx('max-width:760px;')}>
      <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px;')}>Vision Writing</h1>
      <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:0 0 18px;')}>
        Write your vision for each of the 12 life dimensions, one page at a time, then read the compiled summary.
      </p>

      <div style={sx('display:flex; gap:6px; flex-wrap:wrap; margin-bottom:22px;')}>
        <PillTab label="Summary" active={isSummary} onClick={() => setVwAreaIndex(-1)} />
        {dimNames.map((name, i) => {
          const pri = priority.find((p) => p.name === name);
          return (
            <PillTab
              key={name}
              label={name}
              active={i === vwAreaIndex}
              dotColor={pri ? PRIORITY_COLOR[pri.tier] : null}
              onClick={() => setVwAreaIndex(i)}
            />
          );
        })}
      </div>

      {!isSummary ? (
        <div>
          <div style={sx('display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;')}>
            <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:oklch(50% 0.1 255); font-weight:700;')}>
              {dimNames[vwAreaIndex]}
            </div>
            <div
              onClick={() => !drafting && aiHelp()}
              style={sx('display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:oklch(45% 0.12 255); background:oklch(96% 0.02 255 / 0.5); border:1px solid oklch(88% 0.03 255); border-radius:7px; padding:7px 12px; cursor:pointer;')}
            >
              ✨ {drafting ? 'Writing…' : 'Help me write this'}
            </div>
          </div>
          {currentPriority ? (
            <div style={sx('display:flex; align-items:center; gap:10px; background:oklch(97% 0.008 90); border:1px solid oklch(91% 0.01 90); border-radius:9px; padding:10px 14px; margin-bottom:14px;')}>
              <div style={sx(`display:inline-block; font-size:11px; font-weight:700; padding:3px 9px; border-radius:6px; color:white; background:${PRIORITY_COLOR[currentPriority.tier]};`)}>
                {currentPriority.tier} Priority
              </div>
              <div style={sx('font-size:12px; color:oklch(45% 0.01 90);')}>
                Guided by: {currentPriority.linked.map((n, i) => `${n.replace(' Assessment', '').replace(' Profile', '')} (${currentPriority.scores[i] !== undefined ? currentPriority.scores[i] : '—'})`).join(', ')}
              </div>
            </div>
          ) : null}
          <textarea
            value={state.visionTexts[dimNames[vwAreaIndex]] || ''}
            onChange={(e) => setText(dimNames[vwAreaIndex], e.target.value)}
            placeholder="What do you want this area of your life to look like? Write freely, or use Help me write this to get an AI-drafted starting point..."
            rows={12}
            style={sx('width:100%; box-sizing:border-box; font-size:15px; line-height:1.6; border:1px solid oklch(88% 0.01 90); border-radius:12px; padding:18px; resize:vertical; font-family:inherit;')}
          />
        </div>
      ) : (
        <div>
          <div style={sx('background:oklch(96% 0.02 255 / 0.5); border:1px solid oklch(88% 0.03 255); border-radius:12px; padding:16px 20px; margin-bottom:20px;')}>
            <div style={sx('font-size:13px; font-weight:700; color:oklch(45% 0.12 255); margin-bottom:10px;')}>
              Suggested writing order — based on your 15 assessments
            </div>
            <div style={sx('display:flex; flex-direction:column; gap:8px;')}>
              {suggestedOrder.map((p, i) => (
                <div key={p.name} onClick={() => setVwAreaIndex(dimNames.indexOf(p.name))} style={sx('display:flex; align-items:center; gap:10px; cursor:pointer;')}>
                  <div style={sx(`font-size:11px; font-weight:700; padding:3px 9px; border-radius:6px; color:white; background:${PRIORITY_COLOR[p.tier]};`)}>{p.tier}</div>
                  <div style={sx('font-size:13px; color:oklch(30% 0.02 90);')}>{i + 1}. {p.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sx('display:flex; flex-direction:column; gap:14px;')}>
            {dimNames.map((name) => (
              <div key={name} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:16px 20px;')}>
                <div style={sx('font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:oklch(50% 0.1 255); font-weight:700; margin-bottom:6px;')}>{name}</div>
                <p style={sx('font-size:14px; line-height:1.6; color:oklch(30% 0.02 90); margin:0; white-space:pre-wrap;')}>
                  {state.visionTexts[name] || '(not written yet)'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PillTab({ label, active, onClick, dotColor }) {
  const style = `display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; padding:7px 12px; border-radius:7px; cursor:pointer; ${active ? 'background:oklch(50% 0.13 255); color:white;' : 'background:white; border:1px solid oklch(88% 0.01 90); color:oklch(35% 0.015 90);'}`;
  return (
    <div onClick={onClick} data-testid="vw-pill" data-label={label} style={sx(style)}>
      {dotColor ? <span style={sx(`width:7px; height:7px; border-radius:50%; background:${dotColor}; display:inline-block;`)} /> : null}
      <span>{label}</span>
    </div>
  );
}
