// Pure business logic ported from the design prototype's `Component` class.
// These run server-side (API routes) so the "intelligence" of the platform
// lives on the backend, while the frontend only renders results.
import {
  assessmentsData,
  dimNames,
  dimScoresBase,
  areaAssessmentMap,
  likertLabels,
} from './data';

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

export function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

export function barStyle(score) {
  const color = score >= 75 ? 'oklch(58% 0.13 155)' : score >= 60 ? 'oklch(60% 0.13 90)' : 'oklch(58% 0.15 25)';
  return `height:100%; width:${score}%; background:${color}; border-radius:3px;`;
}

// Scores a completed Likert flow (values 0-4 per question) into a 0-100 score + band + insight copy.
export function scoreAnswers(answers) {
  const answered = answers.filter((v) => v !== undefined && v !== null);
  if (!answered.length) {
    return { score: 0, band: 'Growth Area', insight: '' };
  }
  const total = answered.reduce((sum, v) => sum + v, 0);
  const maxTotal = answered.length * (likertLabels.length - 1);
  const score = Math.round((total / maxTotal) * 100);
  const band = score >= 80 ? 'Strong' : score >= 60 ? 'Developing' : 'Growth Area';
  const insight =
    score >= 80
      ? 'This is a clear strength area. Your Life OS plan will lean on this as a foundation rather than a focus.'
      : score >= 60
      ? 'Solid but uneven. This will feed into your growth plan as a supporting focus over the next cycle.'
      : 'This surfaced as a primary gap. Expect this assessment to weight heavily in your next growth plan and coaching feed.';
  return { score, band, insight };
}

export function sortedDimensionsByGap() {
  return dimNames
    .map((name, i) => ({ name, score: dimScoresBase[i] }))
    .sort((a, b) => a.score - b.score);
}

export function buildInsightSections() {
  const sortedByGap = sortedDimensionsByGap();
  const byScoreDesc = [...assessmentsData].sort((a, b) => b.score - a.score);
  const top5 = byScoreDesc.slice(0, 5);
  const bottom5 = byScoreDesc.slice(-5).reverse();
  const weakest = sortedByGap[0];
  const secondWeakest = sortedByGap[1];
  const strongest = sortedByGap[sortedByGap.length - 1];

  return [
    { title: 'Executive Summary', isText: true, text: `Jordan presents as a high-capability, high-momentum individual whose composite score of 78/100 places them in the Emerging Leader tier. The profile is uneven by design: ${strongest.name} is a genuine strength (${strongest.score}), while ${weakest.name} (${weakest.score}) and ${secondWeakest.name} (${secondWeakest.score}) are actively capping overall growth. This report treats those two dimensions as the highest-leverage places to invest next.` },
    { title: 'Current Life Snapshot', isText: true, text: 'Jordan is in a building phase — established enough to lead and produce at a high level, but still forming the emotional and relational habits that sustain leadership over time. Career-adjacent dimensions are strong; personal and interpersonal dimensions lag behind.' },
    { title: 'Top Five Strengths', isList: true, items: top5.map((a) => `${a.name.replace(' Assessment', '').replace(' Profile', '')} (${a.score}) — ${a.insight}`) },
    { title: 'Top Five Growth Areas', isList: true, items: bottom5.map((a) => `${a.name.replace(' Assessment', '').replace(' Profile', '')} (${a.score}) — ${a.insight}`) },
    { title: 'Hidden Opportunities', isList: true, items: [
      `${strongest.name} is strong enough to mentor others through — an unused leadership lever.`,
      `Cross-training ${weakest.name} against ${strongest.name} habits (structure, repetition) is faster than starting from scratch.`,
      'Existing Productivity strength can be redirected toward relationship and wellness routines, not just output.',
    ]},
    { title: 'Key Risks if Nothing Changes', isList: true, items: [
      `${weakest.name} stays the ceiling on every leadership opportunity Jordan is otherwise ready for.`,
      'Relationship debt compounds quietly — it doesn\'t show up in performance reviews until it does.',
      'Burnout risk rises if wellness stays deprioritized while ambition increases.',
    ]},
    { title: 'Recommended Priorities', isList: true, items: [
      `1. Close the ${weakest.name} gap — this is the plan's primary lever.`,
      `2. Rebuild consistency in ${secondWeakest.name}.`,
      `3. Protect and extend the ${strongest.name} strength rather than letting it drift.`,
    ]},
    { title: 'Personalized Success Strategy', isText: true, text: `Rather than working every dimension evenly, the plan concentrates 60% of effort on ${weakest.name} and ${secondWeakest.name}, 30% on maintaining ${strongest.name}, and 10% on periodic full-profile check-ins. This matches how Jordan actually improves — through focused, structured reps rather than broad awareness alone.` },
    { title: 'Daily Habits', isList: true, items: [
      'One 10-second pause before responding in any tense conversation.',
      'One logged rep toward today\'s life-area goal (see 12 Goals tab).',
      '5 minutes of reflection before ending the workday.',
    ]},
    { title: 'Weekly Action Plan', isList: true, items: [
      'One no-agenda 1:1 with a direct report or close relationship.',
      'One review of calendar-vs-values alignment.',
      'One rest or recovery block protected on the calendar.',
    ]},
    { title: 'Monthly Milestones', isList: true, items: [
      `Retake the ${weakest.name} to confirm movement off ${weakest.score}.`,
      'Review streaks across all 12 goals with your coach.',
      'Update the Vision Board one-liners if priorities have shifted.',
    ]},
  ];
}

export function buildRoadmap() {
  const sortedByGap = sortedDimensionsByGap();
  const timeframes = ['2 weeks', '3 weeks', '3 weeks', '4 weeks', '4 weeks', '3 weeks', '2 weeks', '4 weeks', '3 weeks', '2 weeks', '4 weeks', 'Ongoing'];
  return sortedByGap.map((d, i) => {
    const tier = d.score < 65 ? 'foundational' : d.score < 80 ? 'developing' : 'refining';
    return {
      stepNum: `Step ${i + 1}`,
      dimension: d.name,
      objective: tier === 'foundational'
        ? `Build a working baseline in ${d.name}`
        : tier === 'developing'
        ? `Strengthen consistency in ${d.name}`
        : `Refine and sustain your edge in ${d.name}`,
      why: tier === 'foundational'
        ? `${d.name} scored ${d.score} — your biggest single point of leverage. Every other dimension is easier once this one is stable.`
        : tier === 'developing'
        ? `${d.name} scored ${d.score} — solid but inconsistent; small structural changes compound quickly here.`
        : `${d.name} scored ${d.score} — already a strength; the risk here is complacency, not deficiency.`,
      activities: tier === 'foundational'
        ? `Daily 10-15 minute practice tied to ${d.name}, tracked in your 12 Goals tab; weekly check-in with your coach on what's blocking progress.`
        : `2-3x/week structured practice in ${d.name}; monthly review of what's working.`,
      reflection: `What would "good" in ${d.name} look and feel like in 90 days? What has stopped you from getting there so far?`,
      successIndicators: `A visible streak in your ${d.name} goal log, and a retaken assessment score above ${Math.min(95, d.score + 12)}.`,
      estimatedTime: timeframes[i],
      resources: `Relevant assessment: the ${d.name === '12 Dimensions of Life' ? '12 Dimensions of Life Assessment' : d.name + ' Assessment'}; coaching session with Dana Reyes.`,
      checkpoint: `Coach review at week ${(i + 1) * 2}`,
    };
  });
}

export function buildAIGoalSuggestion(areaName, todayIso) {
  const idx = dimNames.indexOf(areaName);
  const score = dimScoresBase[idx];
  const tier = score < 65 ? 'foundational' : score < 80 ? 'developing' : 'refining';
  const durationDays = tier === 'foundational' ? 30 : tier === 'developing' ? 60 : 45;
  const statements = {
    foundational: `Raise my ${areaName} score from ${score} to ${Math.min(95, score + 15)} over the next ${durationDays} days by building one consistent daily habit.`,
    developing: `Move ${areaName} from inconsistent (${score}) to a reliable strength by practicing a structured routine ${durationDays} days straight.`,
    refining: `Protect and extend my ${areaName} strength (${score}) so it doesn't quietly slip while I focus elsewhere.`,
  };
  const actionsBank = {
    foundational: [`Spend 10-15 minutes daily on a core ${areaName} habit`, `Track one small win in ${areaName} each evening`, `Weekly check-in with coach on ${areaName} blockers`],
    developing: [`Do a structured ${areaName} practice 3x/week, logged daily`, `Remove one recurring obstacle to ${areaName} consistency`, `Review ${areaName} progress every Sunday`],
    refining: [`Mentor someone else in ${areaName} once a week`, `Do a monthly audit to catch ${areaName} drift early`, `Keep the habit that built this strength — don't let it lapse`],
  };
  return {
    statement: statements[tier],
    actions: actionsBank[tier],
    start: todayIso,
    end: isoDate(addDays(new Date(todayIso), durationDays)),
  };
}

export function buildVisionPriority() {
  const scoreByName = {};
  assessmentsData.forEach((a) => { scoreByName[a.name] = a.score; });
  return dimNames.map((name) => {
    const linked = areaAssessmentMap[name] || [];
    const scores = linked.map((n) => scoreByName[n]).filter((s) => s !== undefined);
    const avg = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 75;
    const tier = avg < 65 ? 'High' : avg < 80 ? 'Medium' : 'Low';
    return { name, linked, scores, avg, tier };
  });
}

export function buildAIVisionText(areaName) {
  const idx = dimNames.indexOf(areaName);
  const score = dimScoresBase[idx];
  const tier = score < 65 ? 'foundational' : score < 80 ? 'developing' : 'refining';
  const drafts = {
    foundational: `A year from now, ${areaName} feels stable and intentional instead of reactive. I've built one small daily habit that compounds, I know what "good" looks like here, and I check in on this area often enough that it never quietly slides. Progress here doesn't need to be dramatic — just consistent.`,
    developing: `${areaName} becomes a genuine strength, not just an occasional focus. I have a routine I trust, I can see real momentum month over month, and the small inconsistencies that used to derail me no longer do. This area supports the rest of my life instead of competing with it.`,
    refining: `${areaName} stays a source of strength I actively protect rather than take for granted. I use what I've built here to help others, I keep the habits that got me here, and I stay alert to the complacency that could let this slip.`,
  };
  return drafts[tier];
}
