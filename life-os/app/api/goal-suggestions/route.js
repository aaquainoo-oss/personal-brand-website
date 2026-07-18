import { NextResponse } from 'next/server';
import { dimNames } from '../../../lib/data';
import { buildAIGoalSuggestion, isoDate } from '../../../lib/logic';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const areaName = body.areaName;

  if (!dimNames.includes(areaName)) {
    return NextResponse.json({ error: 'Unknown life dimension.' }, { status: 400 });
  }

  const todayIso = isoDate(new Date());
  const suggestion = buildAIGoalSuggestion(areaName, todayIso);
  return NextResponse.json(suggestion);
}
