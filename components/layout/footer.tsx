import Link from "next/link";

import { getLocalePath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>{dictionary.footer.copy}</p>
        <Link
          href={getLocalePath(locale)}
          className="font-medium text-slate-900 transition hover:text-slate-700"
        >
          {dictionary.navigation.home}
        </Link>
      </div>
    </footer>
  );
}
