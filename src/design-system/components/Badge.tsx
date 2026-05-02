import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
      {children}
    </span>
  );
}
