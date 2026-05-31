import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type LinkButtonProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-slate-950 shadow-[0_12px_30px_rgba(244,200,74,0.28)] hover:bg-primary-strong",
  secondary:
    "border border-border bg-surface-strong text-foreground hover:bg-surface-muted",
  ghost: "text-muted-strong hover:bg-surface-muted hover:text-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
};

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const { href, children, className, variant = "primary", size = "md", ...rest } = props;

    const classes = cn(
      "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      variants[variant],
      sizes[size],
      className,
    );

    return (
      <Link className={classes} href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, className, variant = "primary", size = "md", type = "button", ...rest } =
    props as NativeButtonProps;

  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant],
    sizes[size],
    className,
  );

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  );
}
