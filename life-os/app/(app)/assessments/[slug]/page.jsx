'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { sx } from '../../../../lib/style';
import { useLifeOSState } from '../../../../context/LifeOSStateContext';
import { likertLabels } from '../../../../lib/data';

export default function AssessmentFlowPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { update } = useLifeOSState();

  const [assessment, setAssessment] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    fetch(`/api/assessments/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found');
        return r.json();
      })
      .then(setAssessment)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <p style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Assessment not found.</p>
        <Link href="/assessments" style={sx('font-size:13px; color:oklch(50% 0.13 255);')}>← Back to library</Link>
      </div>
    );
  }

  if (!assessment) {
    return <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>Loading…</div>;
  }

  const { name, questions } = assessment;

  async function selectAnswer(val) {
    const next = [...answers];
    next[qIndex] = val;
    setAnswers(next);
    const nextIndex = qIndex + 1;
    if (nextIndex >= questions.length) {
      setScoring(true);
      try {
        const res = await fetch(`/api/assessments/${slug}/score`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: next }),
        });
        const data = await res.json();
        setResult(data);
      } finally {
        setScoring(false);
      }
    } else {
      setQIndex(nextIndex);
    }
  }

  function goBack() {
    if (result) {
      setResult(null);
      setQIndex(questions.length - 1);
      return;
    }
    setQIndex((i) => Math.max(0, i - 1));
  }

  function saveAndReturn() {
    if (!result) return;
    update((s) => ({ completedScores: { ...s.completedScores, [name]: result.score } }));
    router.push('/assessments');
  }

  if (result) {
    return (
      <div style={sx('max-width:640px;')}>
        <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:oklch(50% 0.1 255); font-weight:600;')}>
          {name} — Complete
        </div>
        <h2 style={sx('font-size:26px; font-weight:700; margin:8px 0 4px;')}>{result.band}</h2>
        <div style={sx('font-size:46px; font-weight:700; color:oklch(50% 0.13 255); margin:8px 0;')}>{result.score}</div>
        <p style={sx('font-size:14px; line-height:1.6; color:oklch(35% 0.015 90); max-width:520px;')}>{result.insight}</p>
        <div style={sx('display:flex; gap:14px; align-items:center; margin-top:18px;')}>
          <div onClick={saveAndReturn} style={sx('background:oklch(50% 0.13 255); color:white; font-size:14px; font-weight:600; padding:11px 22px; border-radius:9px; cursor:pointer;')}>
            Save to Profile &amp; Return
          </div>
          <div onClick={goBack} style={sx('font-size:13px; font-weight:600; color:oklch(45% 0.01 90); cursor:pointer;')}>
            ← Back to last question
          </div>
        </div>
      </div>
    );
  }

  const flowBarStyle = `height:100%; width:${(qIndex / questions.length) * 100}%; background:oklch(50% 0.13 255); border-radius:3px;`;
  const currentAnswer = answers[qIndex];

  return (
    <div style={sx('max-width:640px;')}>
      <Link href="/assessments" style={sx('font-size:13px; color:oklch(45% 0.01 90); cursor:pointer; margin-bottom:16px; display:inline-block;')}>
        ← Back to library
      </Link>
      <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:oklch(50% 0.1 255); font-weight:600;')}>{name}</div>
      <div style={sx('font-size:14px; color:oklch(45% 0.01 90); margin:6px 0 14px;')}>
        Question {qIndex + 1} of {questions.length}
      </div>
      <div style={sx('height:6px; border-radius:3px; background:oklch(93% 0.008 90); overflow:hidden; margin-bottom:28px;')}>
        <div style={sx(flowBarStyle)} />
      </div>
      <div style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:14px; padding:28px 30px;')}>
        <div style={sx('font-size:18px; font-weight:600; line-height:1.4; margin-bottom:24px;')}>
          {scoring ? 'Scoring…' : questions[qIndex]}
        </div>
        <div style={sx('display:flex; flex-direction:column; gap:8px;')}>
          {likertLabels.map((label, val) => {
            const active = val === currentAnswer;
            const optionStyle = `border:1px solid ${active ? 'oklch(50% 0.13 255)' : 'oklch(88% 0.01 90)'}; background:${active ? 'oklch(96% 0.03 255)' : 'white'}; border-radius:9px; padding:12px 16px; font-size:14px; cursor:pointer;`;
            return (
              <div key={label} data-testid="likert-option" onClick={() => !scoring && selectAnswer(val)} style={sx(optionStyle)}>
                {label}
              </div>
            );
          })}
        </div>
        {qIndex > 0 ? (
          <div onClick={goBack} style={sx('display:inline-block; margin-top:20px; font-size:13px; font-weight:600; color:oklch(45% 0.01 90); cursor:pointer;')}>
            ← Back
          </div>
        ) : null}
      </div>
    </div>
  );
}
