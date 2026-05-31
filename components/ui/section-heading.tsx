import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  centered,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", centered && "items-center text-center", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      ) : null}
      <div className={cn("space-y-3", centered && "max-w-3xl")}>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-7 text-muted-strong sm:text-lg">{description}</p>
        ) : null}
      </div>
      {action ? <div className={cn(centered && "pt-2")}>{action}</div> : null}
    </div>
  );
}
