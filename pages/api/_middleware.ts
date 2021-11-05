import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

export function middleware(request: NextRequest) {
  const headerKey = request.headers.get('api-secret');
  const { pathname } = request.nextUrl;

  // List APIs that require authentication
  if (
    pathname.includes('smarthome') ||
    pathname.includes('control-count') ||
    pathname.includes('running') ||
    pathname.includes('now-playing') ||
    pathname.includes('top-artists') ||
    pathname.includes('top-tracks')
  ) {
    if (headerKey !== apiSecret) {
      return new Response(null, { status: 401 });
    }
  }

  return NextResponse.next();
}
