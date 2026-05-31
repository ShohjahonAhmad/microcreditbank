import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LoanCalculator } from "@/components/calculators/loan-calculator";
import { SectionHeading } from "@/components/content/section-heading";
import { getDictionary, isLocale } from "@/lib/i18n/dictionaries";

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
    title: `${dictionary.loanCalculator.meta.title} | ${dictionary.brand.name}`,
    description: dictionary.loanCalculator.meta.description,
    openGraph: {
      title: `${dictionary.loanCalculator.meta.title} | ${dictionary.brand.name}`,
      description: dictionary.loanCalculator.meta.description,
      type: "website",
    },
  };
}

export default async function LoanCalculatorPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <section className="bg-white px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto w-full max-w-7xl space-y-10">
        <SectionHeading
          eyebrow={dictionary.loanCalculator.hero.eyebrow}
          title={dictionary.loanCalculator.hero.title}
          subtitle={dictionary.loanCalculator.hero.subtitle}
        />

        <div className="flex flex-wrap gap-3">
          {dictionary.loanCalculator.hero.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>

        <LoanCalculator locale={locale} content={dictionary.loanCalculator} />

        <div className="grid gap-6 lg:grid-cols-2">
          {dictionary.loanCalculator.details.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {item.label}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                {item.title}
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
