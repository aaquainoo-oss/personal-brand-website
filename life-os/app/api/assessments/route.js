import { NextResponse } from 'next/server';
import { assessmentsData, questionBank, slugify } from '../../../lib/data';

// Library metadata only. Per-user completion state (scores taken) lives
// client-side and is merged in on the frontend.
export async function GET() {
  const items = assessmentsData.map((a) => ({
    slug: slugify(a.name),
    name: a.name,
    baselineScore: a.score,
    baselineInsight: a.insight,
    questionCount: (questionBank[a.name] || []).length,
  }));
  return NextResponse.json({ assessments: items });
}
