import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getLocalePath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

import { LanguageSwitcher } from "./language-switcher";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Header({ locale, dictionary }: HeaderProps) {
  const navItems = [
    { href: getLocalePath(locale), label: dictionary.navigation.home },
    { href: `${getLocalePath(locale)}#strengths`, label: dictionary.navigation.strengths },
    { href: `${getLocalePath(locale)}#products`, label: dictionary.navigation.products },
    { href: `${getLocalePath(locale)}#faq`, label: dictionary.navigation.faq },
    { href: `${getLocalePath(locale)}#contact`, label: dictionary.navigation.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/90 backdrop-blur-xl">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link
          href={getLocalePath(locale)}
          className="flex items-center gap-3"
        >
          <span className="grid size-11 place-items-center rounded-2xl bg-primary text-sm font-black uppercase tracking-[0.3em] text-slate-950 shadow-[0_12px_30px_rgba(244,199,63,0.3)]">
            MB
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {dictionary.brand.tagline}
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {dictionary.brand.name}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav
            aria-label={dictionary.navigation.label}
            className="hidden rounded-full border border-border bg-surface-strong p-1 shadow-soft lg:block"
          >
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-muted-strong transition hover:bg-surface-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher locale={locale} dictionary={dictionary} />
        </div>
      </Container>
    </header>
  );
}
