import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { Routes } from "./lib/routes";

export async function proxy(request: NextRequest) {
  // update user's auth session
  const user = await updateSession(request);
  if (!user && request.nextUrl.pathname === Routes.Home) {
    return NextResponse.redirect(new URL(Routes.JobOpening, request.url));
  }
  if (user && request.nextUrl.pathname === Routes.Home) {
    return NextResponse.redirect(new URL(Routes.JobList, request.url));
  }

  if (!user && request.nextUrl.pathname === Routes.JobList) {
    return NextResponse.redirect(new URL(Routes.SignIn, request.url));
  }
  return user;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
