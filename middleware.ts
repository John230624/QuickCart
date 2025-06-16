// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- START: Clerk-specific adjustments ---
  // Allow Clerk's sign-in and sign-up routes to be publicly accessible
  // These routes are already configured as catch-all: /sign-in/[[...rest]] and /sign-up/[[...rest]]
  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    return NextResponse.next(); // Allow access to Clerk's auth pages without checking custom token
  }
  // --- END: Clerk-specific adjustments ---


  // Exemple: Redirection basique (Your existing logic)
  if (pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url));
  }

  // Exemple: Protection de route (Your existing authentication logic)
  const token = request.cookies.get('auth-token')?.value;

  // If there's no token AND the path is not '/login' (your custom login route), redirect to '/login'
  // Ensure your /login route is also not protected by this specific token check.
  if (!token && !pathname.startsWith('/login')) { // Using startsWith for /login to be safe
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Your matcher for protected routes
  matcher: [
    '/protected/:path*',
    // Add any other paths that should be protected by your custom token logic
    // Make sure not to include /sign-in, /sign-up, or /login here if they should be public.
  ],
};