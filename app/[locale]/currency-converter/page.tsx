import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CurrencyConverter } from "@/components/converters/currency-converter";
import { SectionHeading } from "@/components/content/section-heading";
import { getDictionary, isLocale } from "@/lib/i18n/dictionaries";
import { mockExchangeRateProvider } from "@/lib/services/exchange-rates";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return {
    title: `${dictionary.currencyConverter.meta.title} | ${dictionary.brand.name}`,
    description: dictionary.currencyConverter.meta.description,
    openGraph: {
      title: `${dictionary.currencyConverter.meta.title} | ${dictionary.brand.name}`,
      description: dictionary.currencyConverter.meta.description,
      type: "website",
    },
  };
}

export default async function CurrencyConverterPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const rates = mockExchangeRateProvider.getRates();

  return (
    <section className="bg-white px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto w-full max-w-7xl space-y-10">
        <SectionHeading
          eyebrow={dictionary.currencyConverter.hero.eyebrow}
          title={dictionary.currencyConverter.hero.title}
          subtitle={dictionary.currencyConverter.hero.subtitle}
        />

        <div className="flex flex-wrap gap-3">
          {dictionary.currencyConverter.hero.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>

        <CurrencyConverter
          locale={locale}
          rates={rates}
          content={dictionary.currencyConverter}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {dictionary.currencyConverter.reference.items.map((item) => (
            <article
              key={item.currency}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {dictionary.currencyConverter.reference.label}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                {item.currency}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
