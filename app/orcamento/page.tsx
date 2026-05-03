import type { Metadata } from "next";
import { CustomOrderForm } from "@/components/CustomOrderForm";

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
    <section className="py-8 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-6 px-3 sm:gap-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:items-start">
        <div className="">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Orçamento personalizado
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-neutral-600">
            Não precisa encontrar pronto. Se você consegue imaginar, dá pra criar.
          </p>
        </div>

        <div className="min-w-0">
          <CustomOrderForm initialSuggestion={suggestion} />
        </div>
      </div>
    </section>
  );
}
