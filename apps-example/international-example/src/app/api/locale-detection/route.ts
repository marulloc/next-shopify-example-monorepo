import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  return Response.json({ detectedCountry: req.cookies.get('detectedCountry')?.value || '' });
}
