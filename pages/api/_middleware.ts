import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

export function middleware(request: NextRequest) {
  const headerKey = request.headers.get('api-secret');

  if (headerKey === apiSecret) {
    return NextResponse.next();
  }

  return new Response(null, { status: 401 });
}
