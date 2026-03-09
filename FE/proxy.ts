import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Pages that authenticated users should not access
const AUTH_ROUTES = ['/login', '/signup'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get('jwt');

  // Remove locale prefix (/en/login → /login, /tr/signup → /signup)
  const pathnameWithoutLocale = pathname.replace(/^\/(en|tr)/, '') || '/';

  // If user is logged in (has jwt cookie) and goes to auth page → redirect to home page
  if (jwt && AUTH_ROUTES.some((route) => pathnameWithoutLocale.startsWith(route))) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)',]
};