import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/dashboard/:orgId/settings(.*)",
  "/settings(.*)",
  "/activities(.*)",
]);

const isPublicOnlyRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up", // landing page (public-only)
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // AUTHENTICATED USER ON PUBLIC ROUTE
  if (userId && isPublicOnlyRoute(req)) {
    let redirectPath = "/select-organization";
    if (orgId) {
      redirectPath = `/dashboard/${orgId}`;
    }
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // UNAUTHENTICATED USERS ON PROTECTED ROUTE
  if (isProtectedRoute(req)) await auth.protect(); //will redirect unauthenticated users to the sign-in route

  // AUTHENTICATED USER WITH NO ORGANIZATION
  if (userId && !orgId && req.nextUrl.pathname !== "/select-organization") {
    return NextResponse.redirect(new URL("/select-organization", req.url));
  }

  // REDIRECT DASHBOARD WITH ORGANIZATION ID
  if (orgId && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL(`/dashboard/${orgId}`, req.url));
  }
});

// grants you access to user authentication state throughout your app.
//Use auth.protect() if you want to redirect unauthenticated users to the sign-in route automatically.

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
