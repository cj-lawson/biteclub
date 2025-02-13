import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const protectedRoutes = ["/dashboard"];
  const guestRoutes = ["/login", "/signup", "/"];

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isGuestRoute = guestRoutes.includes(pathname);

  const session = await supabase.auth.getUser();
  console.log(session);

  if (isProtectedRoute && session.error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isGuestRoute && session?.data?.user?.id) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}
