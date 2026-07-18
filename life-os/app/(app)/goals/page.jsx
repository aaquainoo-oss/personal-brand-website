'use client';

import { useState } from 'react';
import { sx } from '../../../lib/style';
import { useLifeOSState } from '../../../context/LifeOSStateContext';
import { dimNames } from '../../../lib/data';
import { isoDate, addDays, fmtDate, daysBetween } from '../../../lib/logic';

const today = new Date();
const todayIso = isoDate(today);

export default function GoalsPage() {
  const { state, update } = useLifeOSState();
  const [goalAreaIndex, setGoalAreaIndex] = useState(0);
  const [addingGoal, setAddingGoal] = useState(false);
  const [newGoalStatement, setNewGoalStatement] = useState('');
  const [newGoalStart, setNewGoalStart] = useState(todayIso);
  const [newGoalDeadline, setNewGoalDeadline] = useState(isoDate(addDays(today, 30)));
  const [newGoalActions, setNewGoalActions] = useState(['', '', '']);
  const [suggesting, setSuggesting] = useState(false);

  const goalAreaName = dimNames[goalAreaIndex];
  const goalAreaGoalsRaw = state.goalsByArea[goalAreaName] || [];
  const canAddGoal = goalAreaGoalsRaw.length < 3;

  const allGoals = dimNames.flatMap((n) => state.goalsByArea[n] || []);
  const allActions = allGoals.flatMap((g) => g.actions);
  const allLogged = allActions.reduce((sum, a) => sum + a.log.length, 0);
  const pct = allActions.length ? Math.min(100, Math.round((allLogged / (allActions.length * 14)) * 100)) : 0;

  function selectArea(i) {
    setGoalAreaIndex(i);
    setAddingGoal(false);
  }

  function startNewGoal() {
    setAddingGoal(true);
    setNewGoalStatement('');
    setNewGoalStart(todayIso);
    setNewGoalDeadline(isoDate(addDays(today, 30)));
    setNewGoalActions(['', '', '']);
  }

  async function suggestWithAI() {
    setSuggesting(true);
    try {
      const res = await fetch('/api/goal-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ areaName: goalAreaName }),
      });
      const sug = await res.json();
      setNewGoalStatement(sug.statement);
      setNewGoalStart(sug.start);
      setNewGoalDeadline(sug.end);
      setNewGoalActions(sug.actions);
    } finally {
      setSuggesting(false);
    }
  }

  function saveNewGoal() {
    if (!newGoalStatement.trim() || !newGoalDeadline) return;
    const goal = {
      statement: newGoalStatement.trim(),
      start: newGoalStart || todayIso,
      end: newGoalDeadline,
      actions: newGoalActions.map((t) => ({ text: t.trim() || 'Untitled action', log: [] })),
    };
    update((s) => ({
      goalsByArea: { ...s.goalsByArea, [goalAreaName]: [...(s.goalsByArea[goalAreaName] || []), goal] },
    }));
    setAddingGoal(false);
  }

  function removeGoal(gi) {
    update((s) => ({
      goalsByArea: { ...s.goalsByArea, [goalAreaName]: s.goalsByArea[goalAreaName].filter((_, idx) => idx !== gi) },
    }));
  }

  function toggleAction(gi, ai) {
    update((s) => {
      const list = (s.goalsByArea[goalAreaName] || []).map((gg, idx) => {
        if (idx !== gi) return gg;
        return {
          ...gg,
          actions: gg.actions.map((aa, aidx) => {
            if (aidx !== ai) return aa;
            const has = aa.log.includes(todayIso);
            return { ...aa, log: has ? aa.log.filter((d) => d !== todayIso) : [...aa.log, todayIso] };
          }),
        };
      });
      return { goalsByArea: { ...s.goalsByArea, [goalAreaName]: list } };
    });
  }

  return (
    <div>
      <div style={sx('display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:6px;')}>
        <h1 style={sx('font-size:28px; font-weight:700; letter-spacing:-0.02em; margin:0;')}>Goals</h1>
        <div style={sx('font-size:14px; color:oklch(45% 0.01 90);')}>{pct}% of all logged actions complete</div>
      </div>
      <p style={sx('color:oklch(45% 0.01 90); font-size:14px; margin:0 0 18px;')}>
        SMART goals tied to each of the 12 Life Dimensions — up to 3 goals per area, 3 actions each.
      </p>

      <div style={sx('display:flex; gap:6px; flex-wrap:wrap; margin-bottom:22px;')}>
        {dimNames.map((name, i) => {
          const style = `font-size:12px; font-weight:600; padding:7px 12px; border-radius:7px; cursor:pointer; ${i === goalAreaIndex ? 'background:oklch(50% 0.13 255); color:white;' : 'background:white; border:1px solid oklch(88% 0.01 90); color:oklch(35% 0.015 90);'}`;
          return (
            <div key={name} onClick={() => selectArea(i)} style={sx(style)}>
              {name}
            </div>
          );
        })}
      </div>

      <div style={sx('max-width:640px;')}>
        <div style={sx('font-size:13px; text-transform:uppercase; letter-spacing:0.06em; color:oklch(50% 0.1 255); font-weight:700; margin-bottom:12px;')}>
          {goalAreaName} · {goalAreaGoalsRaw.length}/3 goals
        </div>

        {goalAreaGoalsRaw.map((g, gi) => {
          const daysLeft = daysBetween(todayIso, g.end);
          const totalDays = Math.max(1, daysBetween(g.start, g.end) + 1);
          const totalPossible = totalDays * g.actions.length;
          const totalLogged = g.actions.reduce((sum, a) => sum + a.log.length, 0);
          const goalPct = Math.min(100, Math.round((totalLogged / totalPossible) * 100));
          const daysLeftLabel = daysLeft < 0 ? `${-daysLeft} days overdue` : daysLeft === 0 ? 'Due today' : `${daysLeft} days left`;

          return (
            <div key={gi} style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:16px 18px; margin-bottom:12px;')}>
              <div style={sx('display:flex; justify-content:space-between; align-items:flex-start;')}>
                <div style={sx('font-size:14px; font-weight:700; max-width:420px;')}>{g.statement}</div>
                <div onClick={() => removeGoal(gi)} style={sx('font-size:12px; color:oklch(50% 0.01 90); cursor:pointer; flex-shrink:0;')}>Remove</div>
              </div>
              <div style={sx('font-size:12px; color:oklch(45% 0.01 90); margin:6px 0 10px;')}>
                {fmtDate(g.start)} → {fmtDate(g.end)} · {daysLeftLabel}
              </div>
              <div style={sx('height:6px; border-radius:3px; background:oklch(93% 0.008 90); overflow:hidden; margin-bottom:10px;')}>
                <div style={sx(`height:100%; width:${goalPct}%; background:oklch(55% 0.13 155); border-radius:3px;`)} />
              </div>
              <div style={sx('display:flex; flex-direction:column; gap:8px;')}>
                {g.actions.map((a, ai) => {
                  const doneToday = a.log.includes(todayIso);
                  let streak = 0;
                  for (let d = 0; d <= daysBetween(g.start, todayIso); d++) {
                    const iso = isoDate(addDays(today, -d));
                    if (a.log.includes(iso)) streak++;
                    else break;
                  }
                  const btnStyle = `flex-shrink:0; font-size:11px; font-weight:600; padding:5px 10px; border-radius:6px; cursor:pointer; white-space:nowrap; ${doneToday ? 'background:oklch(94% 0.04 155); color:oklch(40% 0.1 155);' : 'background:oklch(50% 0.13 255); color:white;'}`;
                  return (
                    <div key={ai} style={sx('display:flex; align-items:center; justify-content:space-between; gap:10px;')}>
                      <div style={sx('font-size:13px; color:oklch(25% 0.02 90); flex:1;')}>{a.text}</div>
                      <div onClick={() => toggleAction(gi, ai)} style={sx(btnStyle)}>{doneToday ? 'Logged ✓' : 'Log today'}</div>
                      <div style={sx('font-size:11px; color:oklch(50% 0.01 90); white-space:nowrap; min-width:110px; text-align:right;')}>
                        {a.log.length}/{totalDays}d · streak {streak}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {canAddGoal ? (
          addingGoal ? (
            <div style={sx('background:white; border:1px solid oklch(91% 0.01 90); border-radius:12px; padding:16px 18px;')}>
              <div onClick={() => !suggesting && suggestWithAI()} style={sx('display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:oklch(45% 0.12 255); background:oklch(96% 0.02 255 / 0.5); border:1px solid oklch(88% 0.03 255); border-radius:7px; padding:7px 12px; cursor:pointer; margin-bottom:14px;')}>
                ✨ {suggesting ? 'Thinking…' : 'Suggest with AI'}
              </div>
              <label style={sx('display:block; font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>SMART goal statement</label>
              <textarea
                value={newGoalStatement}
                onChange={(e) => setNewGoalStatement(e.target.value)}
                placeholder="Specific, measurable, achievable, relevant, time-bound goal..."
                rows={2}
                style={sx('width:100%; box-sizing:border-box; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:10px 12px; margin:6px 0 12px; resize:vertical;')}
              />
              <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>Start date</label>
              <input
                type="date"
                value={newGoalStart}
                onChange={(e) => setNewGoalStart(e.target.value)}
                style={sx('display:block; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:8px 12px; margin:6px 0 12px;')}
              />
              <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>End date</label>
              <input
                type="date"
                value={newGoalDeadline}
                onChange={(e) => setNewGoalDeadline(e.target.value)}
                style={sx('display:block; font-size:14px; border:1px solid oklch(85% 0.01 90); border-radius:8px; padding:8px 12px; margin:6px 0 12px;')}
              />
              <label style={sx('font-size:12px; font-weight:600; color:oklch(35% 0.015 90);')}>3 actions (tracked daily until end date)</label>
              {newGoalActions.map((val, i) => (
                <input
                  key={i}
                  value={val}
                  onChange={(e) => {
                    const acts = [...newGoalActions];
                    acts[i] = e.target.value;
                    setNewGoalActions(acts);
                  }}
                  placeholder={`Action ${i + 1}...`}
                  style={sx('width:100%; box-sizing:border-box; font-size:13px; border:1px solid oklch(88% 0.01 90); border-radius:7px; padding:8px 10px; margin:6px 0;')}
                />
              ))}
              <div style={sx('display:flex; gap:10px; margin-top:12px;')}>
                <div onClick={saveNewGoal} style={sx('background:oklch(50% 0.13 255); color:white; font-size:13px; font-weight:600; padding:9px 18px; border-radius:8px; cursor:pointer;')}>
                  Save Goal
                </div>
                <div onClick={() => setAddingGoal(false)} style={sx('font-size:13px; color:oklch(45% 0.01 90); padding:9px 6px; cursor:pointer;')}>
                  Cancel
                </div>
              </div>
            </div>
          ) : (
            <div onClick={startNewGoal} style={sx('display:inline-block; border:1px dashed oklch(80% 0.01 90); border-radius:9px; padding:10px 20px; font-size:13px; font-weight:600; color:oklch(50% 0.13 255); cursor:pointer;')}>
              + Add Goal
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
