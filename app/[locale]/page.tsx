import type { Metadata } from "next";

import { getDictionary, isLocale } from "@/lib/i18n/dictionaries";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.home.title,
    description: dictionary.home.subtitle,
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  if (!isLocale(locale)) {
    return null;
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">
        {dictionary.home.kicker}
      </p>
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {dictionary.home.title}
        </h1>
        <p className="text-lg leading-8 text-slate-600">
          {dictionary.home.subtitle}
        </p>
      </div>
    </section>
  );
}
