import { NextResponse } from 'next/server';
import { assessmentSlugs, questionBank } from '../../../../lib/data';

export async function GET(request, { params }) {
  const { slug } = await params;
  const name = assessmentSlugs[slug];
  if (!name) {
    return NextResponse.json({ error: 'Assessment not found.' }, { status: 404 });
  }
  return NextResponse.json({ name, questions: questionBank[name] || [] });
}
