import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
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
      <section id="top" className="scroll-mt-28 pt-12 sm:pt-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <Badge tone="primary" className="w-fit">
                {dictionary.home.hero.kicker}
              </Badge>

              <div className="space-y-5">
                <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {dictionary.home.hero.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-strong sm:text-xl">
                  {dictionary.home.hero.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button href="#products">{dictionary.home.hero.primaryAction}</Button>
                <Button href="#contact" variant="secondary">
                  {dictionary.home.hero.secondaryAction}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {dictionary.home.hero.panelHighlights.map((highlight) => (
                  <Badge key={highlight}>{highlight}</Badge>
                ))}
              </div>
            </div>

            <Card className="relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-primary/30 to-transparent" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <Badge tone="success">{dictionary.home.hero.panelBadge}</Badge>
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                    {dictionary.brand.tagline}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                    {dictionary.home.hero.panelTitle}
                  </p>
                  <p className="max-w-md text-2xl font-semibold tracking-tight text-foreground">
                    {dictionary.home.hero.panelDescription}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {dictionary.home.strengths.items.slice(0, 2).map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.1rem] border border-border bg-surface-muted p-4"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-strong">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section id="strengths" className="scroll-mt-28 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.strengths.eyebrow}
            title={dictionary.home.strengths.title}
            description={dictionary.home.strengths.description}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dictionary.home.strengths.items.map((item, index) => (
              <Card key={item.title} className="p-6">
                <Badge tone="primary">{String(index + 1).padStart(2, "0")}</Badge>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-strong">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="products" className="scroll-mt-28 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.products.eyebrow}
            title={dictionary.home.products.title}
            description={dictionary.home.products.description}
          />

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {dictionary.home.products.items.map((product) => (
              <Card key={product.name} className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                      {product.rate}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                      {product.name}
                    </h3>
                  </div>
                  <Badge tone="neutral">{product.duration}</Badge>
                </div>

                <p className="mt-4 text-base leading-7 text-muted-strong">{product.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge>{product.amount}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="stats" className="scroll-mt-28 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.stats.eyebrow}
            title={dictionary.home.stats.title}
            description={dictionary.home.stats.description}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dictionary.home.stats.items.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} hint={stat.hint} />
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-28 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={dictionary.home.faq.eyebrow}
            title={dictionary.home.faq.title}
            description={dictionary.home.faq.description}
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {dictionary.home.faq.items.map((item) => (
              <Card key={item.question} className="p-6">
                <details className="group">
                  <summary className="cursor-pointer list-none text-lg font-semibold tracking-tight text-foreground">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-sm leading-6 text-muted-strong">{item.answer}</p>
                </details>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-28 pb-16 pt-4 sm:pb-20">
        <Container>
          <Card className="overflow-hidden p-8 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-center">
              <SectionHeading
                eyebrow={dictionary.home.contact.eyebrow}
                title={dictionary.home.contact.title}
                description={dictionary.home.contact.description}
              />

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button href="#top">{dictionary.home.contact.primaryAction}</Button>
                <Button href="#faq" variant="secondary">
                  {dictionary.home.contact.secondaryAction}
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}
