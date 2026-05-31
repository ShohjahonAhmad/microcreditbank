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
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
              active
                ? "border-[#FFC32D] bg-[#FFC32D] text-slate-950 shadow-sm shadow-amber-200/60"
                : "border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-slate-950"
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
