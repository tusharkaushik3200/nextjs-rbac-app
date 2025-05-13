import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });
  const url = req.nextUrl.pathname;

  if (!token && ["/profile", "/articles", "/admin"].some(p => url.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (url.startsWith("/admin") && token?.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/articles", "/admin/:path*"],
};
