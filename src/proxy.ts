import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
  "/profile(.*)",
  "/settings(.*)",
  "/meal-plans(.*)",
  "/exercise-plans(.*)",
  "/saved-recipes(.*)",
  "/saved-exercises(.*)",
  "/progress-tracker(.*)",
  "/notifications(.*)",
  "/api/user(.*)",
  "/api/users(.*)",
  "/api/generateMealPlan(.*)",
]);

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Redirect routes to dashboard equivalents
  const redirectRoutes: Record<string, string> = {
    "/meal-plans": "/dashboard/meal-plans",
    "/exercise-plans": "/dashboard/exercise-plans",
    "/saved-recipes": "/dashboard/saved-recipes",
    "/saved-exercises": "/dashboard/saved-exercises",
    "/progress-tracker": "/dashboard/progress-tracker",
    "/notifications": "/dashboard/notifications",
    "/profile": "/dashboard/profile",
    "/settings": "/dashboard/settings",
  };

  // Check for exact path matches and redirect
  if (redirectRoutes[pathname]) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = redirectRoutes[pathname];
    return NextResponse.redirect(redirectUrl);
  }

  // Check for paths with additional segments (e.g., /meal-plans/123)
  for (const [oldPath, newPath] of Object.entries(redirectRoutes)) {
    if (pathname.startsWith(oldPath + "/")) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = pathname.replace(oldPath, newPath);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Handle authentication
  if (isProtectedRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      // Redirect to sign-in with the original URL as a redirect parameter
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
