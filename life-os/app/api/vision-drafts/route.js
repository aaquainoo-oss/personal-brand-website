import { NextResponse } from 'next/server';
import { dimNames } from '../../../lib/data';
import { buildAIVisionText } from '../../../lib/logic';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const areaName = body.areaName;

  if (!dimNames.includes(areaName)) {
    return NextResponse.json({ error: 'Unknown life dimension.' }, { status: 400 });
  }

  const text = buildAIVisionText(areaName);
  return NextResponse.json({ text });
}
