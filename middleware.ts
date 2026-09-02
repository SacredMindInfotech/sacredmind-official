import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // 1. Agar request admin.sacredmind.in se aaye
  if (hostname.startsWith('admin.')) {
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 2. Agar request trainer.sacredmind.in se aaye
  if (hostname.startsWith('trainer.')) {
    if (!url.pathname.startsWith('/trainer')) {
      url.pathname = `/trainer${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
  ],
};
