import type { Locale } from "./types";

export function getLocalePath(locale: Locale, path = "") {
  const normalizedPath = path.replace(/^\/+/, "");

  return normalizedPath ? `/${locale}/${normalizedPath}` : `/${locale}`;
}
