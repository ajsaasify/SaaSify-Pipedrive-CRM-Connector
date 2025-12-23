import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const _PROTECTED_PATHS = new Set(["/portal", "/"]);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("appAccess")?.value;

  const skipPathsRegex = /^\/(_next|api|.*\.(.*)|locales)/;
  if (skipPathsRegex.test(pathname)) {
    return NextResponse.next();
  }

  let _decoded: any = null;
  if (token) {
    try {
      _decoded = jwt.decode(token);
    } catch {
      _decoded = null;
    }
  }

  // if (
  //   PROTECTED_PATHS.has(pathname) &&
  //   (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now())
  // ) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
