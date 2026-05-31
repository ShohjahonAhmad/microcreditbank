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
    <nav aria-label={dictionary.languageSwitcher.label} className="flex gap-2">
      {locales.map((item) => {
        const active = item === locale;

        return (
          <Link
            key={item}
            href={getLocalePath(item)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${
              active
                ? "bg-amber-400 text-slate-950"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
