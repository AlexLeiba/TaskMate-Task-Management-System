import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/organization(.*)",
  "/new-organization(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
  },
  {
    organizationSyncOptions: {
      organizationPatterns: [
        "/dashboard/", // Match the org slug
        "/select-organization/(.*)", // Wildcard match for optional trailing path segments
      ],
    },
  }
);
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
