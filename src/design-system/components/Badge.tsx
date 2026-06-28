import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "attention";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "text-xs bg-brand-primary text-background px-2 py-1 rounded-full animate-float",
    attention: "text-xs bg-neutral-900 text-white px-2 py-1 rounded-full font-semibold",
  };

  return (
    <span className={variants[variant]}>
      {children}
    </span>
  );
}
