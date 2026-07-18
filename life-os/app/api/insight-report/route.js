import { NextResponse } from 'next/server';
import { buildInsightSections } from '../../../lib/logic';

export async function GET() {
  return NextResponse.json({ sections: buildInsightSections() });
}
