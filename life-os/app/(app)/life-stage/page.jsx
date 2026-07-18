'use client';

import { useState } from 'react';
import { sx } from '../../../lib/style';
import { useLifeOSState } from '../../../context/LifeOSStateContext';
import { lifeStageQuestions, lifeStageInfo } from '../../../lib/data';

export default function LifeStagePage() {
  const { state, update } = useLifeOSState();
  const [lsIndex, setLsIndex] = useState(0);
  const [lsAnswers, setLsAnswers] = useState([]);

  const lifeStage = state.lifeStage;

  function selectOption(stage) {
    const answers = [...lsAnswers, stage];
    const nextIndex = lsIndex + 1;
    if (nextIndex >= lifeStageQuestions.length) {
      const counts = {};
      answers.forEach((st) => { counts[st] = (counts[st] || 0) + 1; });
      const winner = Object.keys(counts).reduce((a, b) => (counts[a] >= counts[b] ? a : b));
      update({ lifeStage: winner });
      setLsAnswers(answers);
      setLsIndex(nextIndex);
      return;
    }
    setLsAnswers(answers);
    setLsIndex(nextIndex);
  }

  function retake() {
    update({ lifeStage: null });
    setLsIndex(0);
    setLsAnswers([]);
  }

  if (!lifeStage) {
    const question = lifeStageQuestions[lsIndex];
    const lsBarStyle = `height:100%; width:${(lsIndex / lifeStageQuestions.length) * 100}%; background:oklch(50% 0.13 255); border-radius:3px;`;

    return (
      <div style={sx('max-width:640px;')}>
        <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0 0 4px;')}>Life Stage Check-In</h1>
        <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:0 0 20px;')}>
          A quick 8-question check so your goals and roadmap match where you actually are in life — not a generic
          template.
        </p>
        <div style={sx('font-size:13px; color:oklch(45% 0.01 90); margin-bottom:10px;')}>
          Question {lsIndex + 1} of {lifeStageQuestions.length}
        </div>
        <div style={sx('height:6px; border-radius:3px; background:oklch(93% 0.008 90); overflow:hidden; margin-bottom:24px;')}>
          <div style={sx(lsBarStyle)} />
        </div>
        <div style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:14px; padding:28px 30px;')}>
          <div style={sx('font-size:18px; font-weight:600; line-height:1.4; margin-bottom:24px;')}>{question.text}</div>
          <div style={sx('display:flex; flex-direction:column; gap:8px;')}>
            {question.options.map((opt) => (
              <div
                key={opt.label}
                data-testid="life-stage-option"
                onClick={() => selectOption(opt.stage)}
                style={sx('border:1px solid oklch(88% 0.01 90); border-radius:9px; padding:12px 16px; font-size:14px; cursor:pointer;')}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const info = lifeStageInfo[lifeStage];
  return (
    <div style={sx('max-width:640px;')}>
      <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:oklch(50% 0.1 255); font-weight:600;')}>
        Your Life Stage
      </div>
      <h2 style={sx('font-size:28px; font-weight:700; margin:8px 0 10px;')}>{info.name}</h2>
      <p style={sx('font-size:14px; line-height:1.65; color:oklch(35% 0.015 90); margin:0 0 18px;')}>{info.description}</p>
      <div style={sx('background:oklch(96% 0.02 255 / 0.5); border:1px solid oklch(88% 0.03 255); border-radius:12px; padding:16px 20px; margin-bottom:18px;')}>
        <div style={sx('font-size:13px; font-weight:700; color:oklch(45% 0.12 255); margin-bottom:6px;')}>How this shapes your plan</div>
        <div style={sx('font-size:14px; line-height:1.6; color:oklch(30% 0.02 90);')}>{info.impact}</div>
      </div>
      <div onClick={retake} style={sx('display:inline-block; font-size:13px; font-weight:600; color:oklch(50% 0.13 255); cursor:pointer;')}>
        Retake check-in
      </div>
    </div>
  );
}
