import { authMiddleware } from "@clerk/nextjs/server";

// Configure public routes
export default authMiddleware({
  publicRoutes: ["/api/uploadthing"],
  ignoredRoutes : ["/api/webhook"]

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
