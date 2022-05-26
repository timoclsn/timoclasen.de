/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rewrites
  if (pathname === '/bee.js') {
    return NextResponse.rewrite('https://cdn.splitbee.io/sb.js');
  }

  if (pathname.includes('_hive/')) {
    const params = pathname.split('_hive/')[1];
    return NextResponse.rewrite(`https://hive.splitbee.io/${params}`);
  }

  if (pathname.startsWith('/api')) {
    // List APIs that require authentication
    if (
      pathname.includes('smarthome') ||
      pathname.includes('control-count') ||
      pathname.includes('running') ||
      pathname.includes('now-playing') ||
      pathname.includes('top-artists') ||
      pathname.includes('top-tracks')
    ) {
      const headerKey = request.headers.get('api-secret');
      if (headerKey !== apiSecret) {
        return new Response(null, { status: 401 });
      }
    }
  }

  // Security headers
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com;
    child-src *.youtube.com *.google.com *.twitter.com;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self';
  `;

  const response = NextResponse.next();

  response.headers.set(
    'Content-Security-Policy',
    ContentSecurityPolicy.replace(/\n/g, '')
  );
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}
