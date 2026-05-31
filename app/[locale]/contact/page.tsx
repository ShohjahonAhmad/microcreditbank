import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/content/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
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
    title: dictionary.contact.meta.title,
    description: dictionary.contact.meta.description,
  };
}

export default async function LocaleContactPage({ params }: LocalePageProps) {
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
            {dictionary.contact.hero.eyebrow}
          </div>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {dictionary.contact.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              {dictionary.contact.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
            <SectionHeading
              eyebrow={dictionary.contact.details.eyebrow}
              title={dictionary.contact.details.title}
              subtitle={dictionary.contact.details.subtitle}
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dictionary.contact.details.items.map((item) => (
                <InfoCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  href={"href" in item ? item.href : undefined}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {dictionary.contact.form.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {dictionary.contact.form.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {dictionary.contact.form.subtitle}
            </p>

            <ContactForm content={dictionary.contact.form} />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      {href ? (
        <Link href={href} className="mt-3 block text-base font-semibold text-slate-950">
          {value}
        </Link>
      ) : (
        <p className="mt-3 whitespace-pre-line text-base font-semibold leading-7 text-slate-950">
          {value}
        </p>
      )}
    </div>
  );
}
