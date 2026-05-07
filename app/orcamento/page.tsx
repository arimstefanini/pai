import type { Metadata } from "next";
import Image from "next/image";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Orçamento sob medida",
  description:
    "Descreva seu projeto. Recebemos sua ideia e respondemos com orçamento.",
};

type Props = {
  searchParams: Promise<{ produto?: string }>;
};

export default async function OrcamentoPage({ searchParams }: Props) {
  const { produto } = await searchParams;
  const suggestion = produto
    ? `Quero algo parecido com: ${produto}\nDetalhes que imagino: `
    : "";

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-700 bg-neutral-800/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
              Orçamento sob medida
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-200 sm:text-4xl">
              Envie sua ideia
            </h1>
            <p className="mt-4 leading-relaxed text-neutral-300">
              Preencha o formulário com os detalhes do projeto. Quanto mais contexto,
              mais rápido conseguimos te responder com uma proposta.
            </p>
            <p className="mt-4 text-sm text-neutral-400">
              Resposta por WhatsApp em horário comercial.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800/50">
            <Image
              src="/image/pai_bancada.jpeg"
              alt="Projeto de impressão 3D em bancada"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="w-full">
          <QuoteRequestForm initialMessage={suggestion} />
        </div>
      </div>
    </section>
  );
}
