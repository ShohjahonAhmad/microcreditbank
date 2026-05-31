import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    title: `${dictionary.about.meta.title} | ${dictionary.brand.name}`,
    description: dictionary.about.meta.description,
    openGraph: {
      title: `${dictionary.about.meta.title} | ${dictionary.brand.name}`,
      description: dictionary.about.meta.description,
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <>
      <section className="bg-white px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
              {dictionary.about.hero.eyebrow}
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {dictionary.about.hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {dictionary.about.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/loans`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {dictionary.about.hero.primaryCta}
              </Link>
              <Link
                href="mailto:info@microcreditbank.uz"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
              >
                {dictionary.about.hero.secondaryCta}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {dictionary.about.hero.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            {dictionary.about.overview.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-white/70 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {fact.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  {fact.value}
                </p>
              </div>
            ))}
            <div className="rounded-2xl bg-[var(--brand)] p-5 text-slate-950">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                {dictionary.about.mission.eyebrow}
              </p>
              <p className="mt-2 text-lg font-semibold">
                {dictionary.about.mission.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeading
              eyebrow={dictionary.about.overview.eyebrow}
              title={dictionary.about.overview.title}
              subtitle={dictionary.about.overview.description}
            />
          </article>

          <div className="grid gap-6">
            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {dictionary.about.vision.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                {dictionary.about.vision.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {dictionary.about.vision.text}
              </p>
            </article>

            <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {dictionary.about.mission.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                {dictionary.about.mission.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {dictionary.about.mission.text}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={dictionary.about.values.eyebrow}
            title={dictionary.about.values.title}
            subtitle={dictionary.about.values.subtitle}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dictionary.about.values.items.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="h-1.5 w-16 rounded-full bg-[var(--brand)]" />
                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={dictionary.about.history.eyebrow}
            title={dictionary.about.history.title}
            subtitle={dictionary.about.history.subtitle}
          />

          <div className="space-y-4">
            {dictionary.about.history.items.map((item) => (
              <div
                key={`${item.year}-${item.title}`}
                className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[120px_1fr] md:items-start"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-semibold text-slate-950">
                  {item.year}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-950">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={dictionary.about.leadership.eyebrow}
            title={dictionary.about.leadership.title}
            subtitle={dictionary.about.leadership.subtitle}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {dictionary.about.leadership.items.map((person) => (
              <article
                key={person.name}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {person.role}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  {person.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {person.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
