import Link from "next/link";

import { getLocalePath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

import { LanguageSwitcher } from "./language-switcher";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Header({ locale, dictionary }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={getLocalePath(locale)}
          className="text-lg font-semibold tracking-tight text-slate-950"
        >
          {dictionary.brand.name}
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label={dictionary.navigation.label} className="hidden sm:block">
            <Link
              href={getLocalePath(locale)}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {dictionary.navigation.home}
            </Link>
          </nav>

          <LanguageSwitcher locale={locale} dictionary={dictionary} />
        </div>
      </div>
    </header>
  );
}
