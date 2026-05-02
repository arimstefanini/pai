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
        "px-6 py-3 rounded-lg font-medium transition-all",
        variant === "primary" && "bg-black text-white hover:opacity-90",
        variant === "secondary" && "bg-gray-100 text-black hover:bg-gray-200",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
