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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={getLocalePath(locale)} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFC32D] text-sm font-bold text-slate-950 shadow-sm shadow-amber-200/60">
            MB
          </span>
          <span className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-slate-950">
              {dictionary.brand.name}
            </span>
            <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Uzbekistan
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label={dictionary.navigation.label} className="hidden sm:block">
            <Link
              href={getLocalePath(locale)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
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
