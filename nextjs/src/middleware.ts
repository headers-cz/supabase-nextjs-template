import { updateSession } from "@/lib/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { defaultLocale, locales } from "../next-intl.config";

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: "never",
});

export async function middleware(request: NextRequest) {
  // Nejprve zpracujeme Supabase autentizaci
  const supabaseResponse = await updateSession(request);

  // Poté zpracujeme internacionalizaci
  // Vytvoříme novou instanci NextRequest, protože original request mohl být modifikován v updateSession
  const nextIntlResponse = nextIntlMiddleware(request);

  // Zkopírujeme cookies z nextIntlResponse do supabaseResponse
  nextIntlResponse.cookies.getAll().forEach((cookie) => {
    supabaseResponse.cookies.set(cookie.name, cookie.value);
  });

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
