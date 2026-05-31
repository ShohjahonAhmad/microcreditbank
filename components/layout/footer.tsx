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
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-base font-semibold tracking-tight text-slate-950">
            {dictionary.brand.name}
          </p>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            {dictionary.footer.summary}
          </p>
          <p className="text-sm font-medium text-slate-700">{dictionary.footer.copy}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {dictionary.footer.linksLabel}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <FooterLink href={getLocalePath(locale)} label={dictionary.navigation.home} />
            <FooterLink href={getLocalePath(locale, "about")} label={dictionary.navigation.about} />
            <FooterLink href={getLocalePath(locale, "loans")} label={dictionary.navigation.loans} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
    >
      {label}
    </Link>
  );
}
