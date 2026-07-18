import { NextResponse } from 'next/server';
import { coachingCardsData } from '../../../lib/data';

export async function GET() {
  return NextResponse.json({ cards: coachingCardsData });
}
