import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/cn";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-[var(--radius-lg)] font-medium transition-all duration-200 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50",
        variant === "primary" &&
          "bg-brand-primary text-background hover:opacity-90 active:opacity-80",
        variant === "secondary" &&
          "bg-surface text-text-primary border border-border hover:bg-background",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
