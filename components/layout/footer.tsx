import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getLocalePath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { LanguageSwitcher } from "./language-switcher";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const navItems = [
    { href: getLocalePath(locale), label: dictionary.navigation.home },
    { href: `${getLocalePath(locale)}#strengths`, label: dictionary.navigation.strengths },
    { href: `${getLocalePath(locale)}#products`, label: dictionary.navigation.products },
    { href: `${getLocalePath(locale)}#faq`, label: dictionary.navigation.faq },
    { href: `${getLocalePath(locale)}#contact`, label: dictionary.navigation.contact },
  ];

  return (
    <footer className="border-t border-border/80 bg-surface/95">
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr_auto] lg:items-start">
        <div className="space-y-4">
          <Link href={getLocalePath(locale)} className="inline-flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary text-sm font-black uppercase tracking-[0.3em] text-slate-950 shadow-[0_12px_30px_rgba(244,199,63,0.3)]">
              MB
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {dictionary.brand.name}
            </span>
          </Link>
          <p className="max-w-md text-sm leading-6 text-muted-strong">{dictionary.footer.description}</p>
          <p className="text-sm font-medium text-accent">{dictionary.footer.copy}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {dictionary.footer.linksLabel}
          </p>
          <nav aria-label={dictionary.navigation.label} className="mt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-strong transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {dictionary.languageSwitcher.label}
          </p>
          <div className="mt-4">
            <LanguageSwitcher locale={locale} dictionary={dictionary} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
