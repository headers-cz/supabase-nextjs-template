import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "cs"];
export const defaultLocale = "cs";

export default getRequestConfig(async ({ locale }) => {
  // Definování locale jako non-undefined string
  const safeLocale = locale ?? defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`./src/messages/${safeLocale}/index.json`)).default,
  };
});
