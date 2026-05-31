import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["uz", "en", "ru"] as const;
const DEFAULT_LOCALE = "uz";

function isSupportedLocale(locale: string) {
  return SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number]);
}

function redirectToDefaultLocale(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}`;
  return NextResponse.redirect(url);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return redirectToDefaultLocale(request);
  }

  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (!firstSegment || !isSupportedLocale(firstSegment)) {
    return redirectToDefaultLocale(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
