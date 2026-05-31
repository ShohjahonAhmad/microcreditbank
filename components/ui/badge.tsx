import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "neutral" | "success";
};

const tones = {
  primary: "bg-primary/15 text-accent ring-1 ring-inset ring-primary/20",
  neutral: "bg-surface-muted text-muted-strong ring-1 ring-inset ring-border",
  success: "bg-success/12 text-success ring-1 ring-inset ring-success/20",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
