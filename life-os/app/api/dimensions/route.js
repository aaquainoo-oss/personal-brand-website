import { NextResponse } from 'next/server';
import { dimNames, dimScoresBase, keyInsights } from '../../../lib/data';
import { barStyle } from '../../../lib/logic';

export async function GET() {
  const dimensions = dimNames.map((name, i) => {
    const score = dimScoresBase[i];
    return { name, score, barStyle: barStyle(score) };
  });
  return NextResponse.json({ dimensions, keyInsights, compositeScore: 78 });
}
