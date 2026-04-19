import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale as "fr" | "en")) {
    return NextResponse.redirect(
      new URL(`/${cookieLocale}${pathname}`, request.url)
    );
  }

  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage?.startsWith("en")) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|Louis_Savon_CV.pdf).*)"],
};
