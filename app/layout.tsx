import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stefanini Produções — Ideias em objetos reais",
    template: "%s | Stefanini Produções",
  },
  description:
    "Impressão 3D premium sob medida. Casa, brinquedos, peças mecânicas, maquetes e projetos exclusivos. Você imagina. A gente cria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full scroll-smooth antialiased"
    >
      <body className="relative min-h-full overflow-x-hidden bg-neutral-50 font-sans text-neutral-900">
        <div className="global-axes-bg" aria-hidden="true">
          <span className="global-axis-x" />
          <span className="global-axis-y" />
        </div>

        <div className="relative z-10 flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
