import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getDictionary, isLocale } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { notFound } from "next/navigation";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "en" }, { locale: "ru" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const normalizedLocale = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <Header locale={normalizedLocale} dictionary={dictionary} />
      <main className="flex-1">{children}</main>
      <Footer locale={normalizedLocale} dictionary={dictionary} />
    </div>
  );
}
