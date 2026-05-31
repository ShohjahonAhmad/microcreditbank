import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import uz from "@/messages/uz.json";

import { defaultLocale, locales, type Locale } from "./types";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ru,
  uz,
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}
