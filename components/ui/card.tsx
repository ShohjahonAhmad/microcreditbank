import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-bank border border-border bg-surface/95 shadow-bank backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
