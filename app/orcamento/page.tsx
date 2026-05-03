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
    <section className="py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl px-3 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Orçamento personalizado
        </h1>
        <p className="mt-2 text-neutral-600">
          Não precisa encontrar pronto. Se você consegue imaginar, dá pra criar.
        </p>

        <div className="mt-6 w-full">
          <CustomOrderForm initialSuggestion={suggestion} />
        </div>
      </div>
    </section>
  );
}
