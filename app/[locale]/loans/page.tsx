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
    title: `${dictionary.loans.meta.title} | ${dictionary.brand.name}`,
    description: dictionary.loans.meta.description,
    openGraph: {
      title: `${dictionary.loans.meta.title} | ${dictionary.brand.name}`,
      description: dictionary.loans.meta.description,
      type: "website",
    },
  };
}

export default async function LoansPage({ params }: PageProps) {
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
              {dictionary.loans.hero.eyebrow}
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {dictionary.loans.hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {dictionary.loans.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`mailto:${dictionary.loans.contact.email}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {dictionary.loans.hero.primaryCta}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
              >
                {dictionary.loans.hero.secondaryCta}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {dictionary.loans.hero.highlights.map((item) => (
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
            {dictionary.loans.criteria.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  {item.value}
                </p>
              </div>
            ))}
            <div className="rounded-2xl bg-[var(--brand)] p-5 text-slate-950">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                {dictionary.loans.contact.eyebrow}
              </p>
              <p className="mt-2 text-lg font-semibold">
                {dictionary.loans.contact.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={dictionary.loans.products.eyebrow}
            title={dictionary.loans.products.title}
            subtitle={dictionary.loans.products.subtitle}
          />

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {dictionary.loans.products.items.map((product) => (
              <article
                key={product.title}
                className="flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {product.description}
                </p>
                <div className="mt-6 grid gap-3 text-sm text-slate-600">
                  <MetaRow label={dictionary.loans.products.amountLabel} value={product.amount} />
                  <MetaRow label={dictionary.loans.products.termLabel} value={product.term} />
                  <MetaRow label={dictionary.loans.products.rateLabel} value={product.rate} />
                </div>
                <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {product.note}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <SectionHeading
              eyebrow={dictionary.loans.benefits.eyebrow}
              title={dictionary.loans.benefits.title}
              subtitle={dictionary.loans.benefits.subtitle}
            />
            <div className="mt-8 grid gap-4">
              {dictionary.loans.benefits.items.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-lg font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <SectionHeading
              eyebrow={dictionary.loans.criteria.eyebrow}
              title={dictionary.loans.criteria.title}
              subtitle={dictionary.loans.criteria.subtitle}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dictionary.loans.criteria.items.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={dictionary.loans.process.eyebrow}
            title={dictionary.loans.process.title}
            subtitle={dictionary.loans.process.subtitle}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {dictionary.loans.process.items.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-semibold text-slate-950">
                  {item.step}
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-slate-950">
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

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {dictionary.loans.contact.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {dictionary.loans.contact.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              {dictionary.loans.contact.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`tel:${dictionary.loans.contact.phoneLink}`}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {dictionary.loans.contact.primaryCta}
              </Link>
              <Link
                href={`mailto:${dictionary.loans.contact.email}`}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
              >
                {dictionary.loans.contact.secondaryCta}
              </Link>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard label={dictionary.loans.contact.phoneLabel} value={dictionary.loans.contact.phone} />
            <InfoCard label={dictionary.loans.contact.emailLabel} value={dictionary.loans.contact.email} />
            <InfoCard label={dictionary.loans.criteria.items[1].label} value={dictionary.loans.criteria.items[1].value} />
            <InfoCard label={dictionary.loans.criteria.items[2].label} value={dictionary.loans.criteria.items[2].value} />
          </div>
        </div>
      </section>
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 last:border-b-0 last:pb-0">
      <span>{label}</span>
      <span className="font-medium text-slate-950">{value}</span>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}
