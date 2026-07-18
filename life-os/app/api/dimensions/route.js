import { NextResponse } from 'next/server';
import { barStyle, computeCompositeScore, computeDimensionScores, computeKeyInsights } from '../../../lib/logic';

// POST (not GET) because it's computed from the caller's own completed
// assessment scores, which live client-side (no database yet -- see
// context/LifeOSStateContext.jsx) and can't be sent as a GET body.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const completedScores =
    body.completedScores && typeof body.completedScores === 'object' && !Array.isArray(body.completedScores)
      ? body.completedScores
      : {};

  const dimensions = computeDimensionScores(completedScores).map((d) => ({ ...d, barStyle: barStyle(d.score) }));
  const compositeScore = computeCompositeScore(dimensions);
  const keyInsights = computeKeyInsights(completedScores);

  return NextResponse.json({ dimensions, keyInsights, compositeScore });
}
