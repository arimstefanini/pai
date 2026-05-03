import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background border border-border rounded-[var(--radius-lg)] p-4 hover:shadow-md transition animate-fade-in">
      {children}
    </div>
  );
}
