import { PropsWithChildren } from "react";

type AxesBackgroundProps = PropsWithChildren<{
  className?: string;
  variant?: "center" | "offset";
}>;

export function AxesBackground({
  children,
  className = "",
  variant = "center",
}: AxesBackgroundProps) {
  return (
    <div
      className={`axes-background ${variant === "offset" ? "axes-background--offset" : ""} ${className}`}
    >
      {/* Conteudo fica acima das linhas dos eixos */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
