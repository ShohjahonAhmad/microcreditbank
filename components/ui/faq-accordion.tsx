"use client";

import { useState } from "react";

import { Card } from "./card";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item, index) => {
        const expanded = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <Card key={item.question} className="p-6">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 text-left"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpenIndex(expanded ? -1 : index)}
            >
              <span className="text-lg font-semibold tracking-tight text-foreground">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="mt-1 text-xl font-light leading-none text-accent transition"
              >
                {expanded ? "–" : "+"}
              </span>
            </button>

            <div
              id={panelId}
              className={`grid overflow-hidden transition-all duration-200 ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <p className="mt-4 text-sm leading-6 text-muted-strong">{item.answer}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
