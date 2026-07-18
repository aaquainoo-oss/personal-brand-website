import { NextResponse } from 'next/server';
import { assessmentSlugs, questionBank } from '../../../../../lib/data';
import { scoreAnswers } from '../../../../../lib/logic';

export async function POST(request, { params }) {
  const { slug } = await params;
  const name = assessmentSlugs[slug];
  if (!name) {
    return NextResponse.json({ error: 'Assessment not found.' }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const answers = Array.isArray(body.answers) ? body.answers : [];
  const expected = (questionBank[name] || []).length;

  if (answers.length !== expected || answers.some((v) => typeof v !== 'number' || v < 0 || v > 4)) {
    return NextResponse.json({ error: `Expected ${expected} answers, each an integer 0-4.` }, { status: 400 });
  }

  const result = scoreAnswers(answers);
  return NextResponse.json({ name, ...result });
}
