import { NextResponse } from 'next/server';
import { buildRoadmap } from '../../../lib/logic';

export async function GET() {
  return NextResponse.json({ steps: buildRoadmap() });
}
