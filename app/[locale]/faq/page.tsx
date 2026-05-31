import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/content/section-heading";
import { getDictionary, isLocale } from "@/lib/i18n/dictionaries";
import { getLocalePath } from "@/lib/i18n/paths";

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
    title: dictionary.faq.meta.title,
    description: dictionary.faq.meta.description,
  };
}

export default async function LocaleFaqPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  if (!isLocale(locale)) {
    return null;
  }

  return (
    <>
      <section className="bg-white px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
            {dictionary.faq.hero.eyebrow}
          </div>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {dictionary.faq.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              {dictionary.faq.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
            <SectionHeading
              eyebrow={dictionary.faq.hero.eyebrow}
              title={dictionary.faq.hero.title}
              subtitle={dictionary.faq.hero.subtitle}
            />

            <div className="mt-8 space-y-3">
              {dictionary.faq.items.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-slate-950">
                    {item.question}
                    <span className="text-2xl font-light text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {dictionary.contact.hero.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {dictionary.contact.hero.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {dictionary.contact.hero.subtitle}
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href={getLocalePath(locale, "contact")}
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {dictionary.navigation.contact}
              </Link>
              <Link
                href="tel:+998710000000"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
              >
                {dictionary.contact.details.items[1].value}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
