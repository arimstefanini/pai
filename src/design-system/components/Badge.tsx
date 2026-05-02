import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs bg-brand-primary text-background px-2 py-1 rounded-full animate-float">
      {children}
    </span>
  );
}
