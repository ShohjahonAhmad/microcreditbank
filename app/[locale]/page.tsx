import type { Metadata } from "next";
import Link from "next/link";

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
    title: dictionary.home.hero.title,
    description: dictionary.home.hero.subtitle,
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  if (!isLocale(locale)) {
    return null;
  }

  return (
    <>
      <section className="relative overflow-hidden bg-white px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative z-10 space-y-8">
            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
              {dictionary.home.hero.eyebrow}
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {dictionary.home.hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {dictionary.home.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {dictionary.home.hero.primaryCta}
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
              >
                {dictionary.home.hero.secondaryCta}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {dictionary.home.hero.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-amber-200/40 blur-2xl" />
            <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-slate-200/60 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
              <div className="rounded-[1.5rem] border border-white/70 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {dictionary.home.market.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                      {dictionary.home.market.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                    {dictionary.home.market.location}
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {dictionary.home.market.rows.map((row) => (
                    <div
                      key={row.currency}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-slate-950">
                          {row.currency}
                        </p>
                        <p className="text-sm text-slate-500">
                          {dictionary.home.market.rateLabel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-950">
                          {row.buy}
                        </p>
                        <p className="text-sm text-slate-500">{row.sell}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-[var(--brand)] p-5 text-slate-950">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                    {dictionary.home.market.calloutLabel}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {dictionary.home.market.callout}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-3">
          {dictionary.home.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-3xl font-semibold tracking-tight text-slate-950">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={dictionary.home.trust.eyebrow}
            title={dictionary.home.trust.title}
            subtitle={dictionary.home.trust.subtitle}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {dictionary.home.trust.items.map((item) => (
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

      <section id="products" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <SectionHeading
            eyebrow={dictionary.home.products.eyebrow}
            title={dictionary.home.products.title}
            subtitle={dictionary.home.products.subtitle}
          />

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {dictionary.home.products.items.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
                <div className="mt-6 grid gap-3 text-sm text-slate-600">
                  <ProductMeta label={dictionary.home.products.amountLabel} value={item.amount} />
                  <ProductMeta label={dictionary.home.products.termLabel} value={item.term} />
                  <ProductMeta label={dictionary.home.products.rateLabel} value={item.rate} />
                </div>
                <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {item.note}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <SectionHeading
              eyebrow={dictionary.home.market.eyebrow}
              title={dictionary.home.market.tableTitle}
              subtitle={dictionary.home.market.subtitle}
            />
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <div className="grid grid-cols-3 border-b border-slate-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span>{dictionary.home.market.currencyLabel}</span>
                <span>{dictionary.home.market.buyLabel}</span>
                <span>{dictionary.home.market.sellLabel}</span>
              </div>
              {dictionary.home.market.rows.map((row) => (
                <div
                  key={row.currency}
                  className="grid grid-cols-3 border-b border-slate-100 px-5 py-4 text-sm last:border-b-0"
                >
                  <span className="font-semibold text-slate-950">
                    {row.currency}
                  </span>
                  <span className="text-slate-600">{row.buy}</span>
                  <span className="text-slate-600">{row.sell}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <SectionHeading
              eyebrow={dictionary.home.calculator.eyebrow}
              title={dictionary.home.calculator.title}
              subtitle={dictionary.home.calculator.subtitle}
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {dictionary.home.calculator.inputs.amount}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  {dictionary.home.calculator.sample.amount}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {dictionary.home.calculator.inputs.term}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  {dictionary.home.calculator.sample.term}{" "}
                  {dictionary.home.calculator.months}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {dictionary.home.calculator.inputs.rate}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  {dictionary.home.calculator.sample.rate}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <ResultCard
                label={dictionary.home.calculator.outputs.monthly}
                value={dictionary.home.calculator.sample.monthly}
              />
              <ResultCard
                label={dictionary.home.calculator.outputs.total}
                value={dictionary.home.calculator.sample.total}
              />
              <ResultCard
                label={dictionary.home.calculator.outputs.interest}
                value={dictionary.home.calculator.sample.interest}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
            <SectionHeading
              eyebrow={dictionary.home.faq.eyebrow}
              title={dictionary.home.faq.title}
              subtitle={dictionary.home.faq.subtitle}
            />

            <div className="mt-8 space-y-3">
              {dictionary.home.faq.items.map((item) => (
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

          <div
            id="contact"
            className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {dictionary.home.contact.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {dictionary.home.contact.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
              {dictionary.home.contact.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`tel:${dictionary.home.contact.phoneLink}`}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {dictionary.home.contact.primaryCta}
              </Link>
              <Link
                href={`mailto:${dictionary.home.contact.email}`}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-slate-950"
              >
                {dictionary.home.contact.secondaryCta}
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ContactCard
                label={dictionary.home.contact.phoneLabel}
                value={dictionary.home.contact.phone}
              />
              <ContactCard
                label={dictionary.home.contact.emailLabel}
                value={dictionary.home.contact.email}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-slate-600">{subtitle}</p>
    </div>
  );
}

function ProductMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 last:border-b-0 last:pb-0">
      <span>{label}</span>
      <span className="font-medium text-slate-950">{value}</span>
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function ContactCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}
