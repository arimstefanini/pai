import type { InputHTMLAttributes } from "react";

import { cn } from "../utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full border border-border bg-background text-text-primary rounded-[var(--radius-lg)] px-4 py-3",
        "focus:outline-none focus:ring-2 focus:ring-brand-primary",
        className,
      )}
    />
  );
}
