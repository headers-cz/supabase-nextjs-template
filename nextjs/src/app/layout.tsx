import CookieConsent from "@/components/Cookies";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PRODUCTNAME,
  description: "The best way to build your SaaS product.",
};

// Označení stránek jako dynamic pro podporu jazyka
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme = process.env.NEXT_PUBLIC_THEME;
  if (!theme) {
    theme = "theme-sass3";
  }
  const gaID = process.env.NEXT_PUBLIC_GOOGLE_TAG;

  // Získání zpráv pro aktuální jazyk
  const locale = "en"; // Defaultní hodnota
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={theme}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <CookieConsent />
        {gaID && <GoogleAnalytics gaId={gaID} />}
      </body>
    </html>
  );
}
