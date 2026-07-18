import { NextResponse } from 'next/server';
import { buildVisionPriority } from '../../../lib/logic';

export async function GET() {
  return NextResponse.json({ priority: buildVisionPriority() });
}
