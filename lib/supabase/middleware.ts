import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Routes } from "../routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user && request.nextUrl.pathname === Routes.Home) {
    return NextResponse.redirect(new URL(Routes.JobOpening, request.url));
  }
  if (user && request.nextUrl.pathname === Routes.Home) {
    return NextResponse.redirect(new URL(Routes.JobList, request.url));
  }

  if (!user && request.nextUrl.pathname === Routes.JobList) {
    return NextResponse.redirect(new URL(Routes.SignIn, request.url));
  }

  return supabaseResponse;
}
