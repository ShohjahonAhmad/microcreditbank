import Link from "next/link";

import { getLocalePath } from "@/lib/i18n/paths";
import { locales, type Locale } from "@/lib/i18n/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type LanguageSwitcherProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function LanguageSwitcher({ locale, dictionary }: LanguageSwitcherProps) {
  return (
    <nav
      aria-label={dictionary.languageSwitcher.label}
      className="inline-flex items-center rounded-full border border-border bg-surface-strong p-1 shadow-soft"
    >
      {locales.map((item) => {
        const active = item === locale;

        return (
          <Link
            key={item}
            href={getLocalePath(item)}
            className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
              active
                ? "bg-primary text-slate-950 shadow-[0_8px_20px_rgba(244,199,63,0.25)]"
                : "text-muted-strong hover:bg-surface-muted hover:text-foreground"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {dictionary.languageSwitcher[item]}
          </Link>
        );
      })}
    </nav>
  );
}
