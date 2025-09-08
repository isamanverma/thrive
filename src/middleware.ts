import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding(.*)',
  '/profile(.*)',
  '/settings(.*)',
  '/meal-plans(.*)',
  '/exercise-plans(.*)',
  '/saved-recipes(.*)',
  '/saved-exercises(.*)',
  '/progress-tracker(.*)',
  '/notifications(.*)',
  '/recipe-explorer(.*)',
  '/exercise-explorer(.*)',
  '/api/user(.*)',
  '/api/users(.*)',
  '/api/generateMealPlan(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  
  // Redirect routes to dashboard equivalents
  const redirectRoutes: Record<string, string> = {
    '/meal-plans': '/dashboard/meal-plans',
    '/exercise-plans': '/dashboard/exercise-plans',
    '/saved-recipes': '/dashboard/saved-recipes',
    '/saved-exercises': '/dashboard/saved-exercises',
    '/progress-tracker': '/dashboard/progress-tracker',
    '/notifications': '/dashboard/notifications',
    '/recipe-explorer': '/dashboard/recipe-explorer',
    '/exercise-explorer': '/dashboard/exercise-explorer',
    '/profile': '/dashboard/profile',
    '/settings': '/dashboard/settings',
  };

  // Check for exact path matches and redirect
  if (redirectRoutes[pathname]) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = redirectRoutes[pathname];
    return NextResponse.redirect(redirectUrl);
  }

  // Check for paths with additional segments (e.g., /meal-plans/123)
  for (const [oldPath, newPath] of Object.entries(redirectRoutes)) {
    if (pathname.startsWith(oldPath + '/')) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathname.replace(oldPath, newPath);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};